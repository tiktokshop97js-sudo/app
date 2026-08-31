from dotenv import load_dotenv
from pathlib import Path

ROOT_DIR = Path(__file__).parent
load_dotenv(ROOT_DIR / ".env")

import os
import logging
import uuid
from datetime import datetime, timezone, timedelta
from typing import List, Optional

import bcrypt
import jwt
from fastapi import FastAPI, APIRouter, HTTPException, Request, Depends
from fastapi.security import HTTPBearer, HTTPAuthorizationCredentials
from starlette.middleware.cors import CORSMiddleware
from motor.motor_asyncio import AsyncIOMotorClient
from pydantic import BaseModel, Field

mongo_url = os.environ["MONGO_URL"]
client = AsyncIOMotorClient(mongo_url)
db = client[os.environ["DB_NAME"]]

app = FastAPI()
api_router = APIRouter(prefix="/api")
bearer = HTTPBearer(auto_error=False)

JWT_ALGORITHM = "HS256"


def get_jwt_secret() -> str:
    return os.environ["JWT_SECRET"]


def hash_password(password: str) -> str:
    return bcrypt.hashpw(password.encode("utf-8"), bcrypt.gensalt()).decode("utf-8")


def verify_password(plain: str, hashed: str) -> bool:
    return bcrypt.checkpw(plain.encode("utf-8"), hashed.encode("utf-8"))


def create_token(user_id: str, email: str, role: str) -> str:
    payload = {
        "sub": user_id,
        "email": email,
        "role": role,
        "exp": datetime.now(timezone.utc) + timedelta(hours=12),
    }
    return jwt.encode(payload, get_jwt_secret(), algorithm=JWT_ALGORITHM)


async def get_current_admin(
    request: Request, creds: HTTPAuthorizationCredentials = Depends(bearer)
) -> dict:
    token = creds.credentials if creds else request.cookies.get("access_token")
    if not token:
        raise HTTPException(status_code=401, detail="Não autenticado")
    try:
        payload = jwt.decode(token, get_jwt_secret(), algorithms=[JWT_ALGORITHM])
    except jwt.ExpiredSignatureError:
        raise HTTPException(status_code=401, detail="Sessão expirada")
    except jwt.InvalidTokenError:
        raise HTTPException(status_code=401, detail="Token inválido")
    user = await db.users.find_one({"_id": payload["sub"]})
    if not user or user.get("role") != "admin":
        raise HTTPException(status_code=403, detail="Acesso negado")
    user.pop("password_hash", None)
    return user


def clean(doc: dict) -> dict:
    doc.pop("_id", None)
    return doc


def new_id() -> str:
    return str(uuid.uuid4())


# ---------- Schemas ----------
class LoginInput(BaseModel):
    email: str
    password: str


class LeadCreate(BaseModel):
    name: str = Field(min_length=2, max_length=120)
    whatsapp: str = Field(min_length=8, max_length=30)
    product: str = Field(max_length=60)
    model: Optional[str] = ""
    service: str = Field(max_length=120)
    message: Optional[str] = ""


class SettingsInput(BaseModel):
    slogan: str
    whatsapp: str
    whatsapp_display: str
    instagram: str
    address: str
    hours: str
    prices: dict


class ServiceInput(BaseModel):
    title: str
    category: str
    description: str = ""
    benefits: List[str] = []
    price_label: str = ""
    image: str = ""
    active: bool = True
    order: int = 0


class PromotionInput(BaseModel):
    title: str
    subtitle: str = ""
    price_label: str = ""
    tag: str = ""
    active: bool = True


class ReviewInput(BaseModel):
    name: str
    stars: int = 5
    comment: str


class GalleryInput(BaseModel):
    url: str
    category: str
    title: str = ""


# ---------- Auth ----------
@api_router.post("/auth/login")
async def login(data: LoginInput, request: Request):
    email = data.email.strip().lower()
    ip = request.client.host if request.client else "unknown"
    key = f"{ip}:{email}"
    attempt = await db.login_attempts.find_one({"key": key})
    if attempt and attempt.get("count", 0) >= 5:
        last = attempt.get("last")
        if last and (datetime.now(timezone.utc) - last) < timedelta(minutes=15):
            raise HTTPException(status_code=429, detail="Muitas tentativas. Aguarde 15 minutos.")
    user = await db.users.find_one({"email": email})
    if not user or not verify_password(data.password, user["password_hash"]):
        await db.login_attempts.update_one(
            {"key": key},
            {"$inc": {"count": 1}, "$set": {"last": datetime.now(timezone.utc)}},
            upsert=True,
        )
        raise HTTPException(status_code=401, detail="Credenciais inválidas")
    await db.login_attempts.delete_one({"key": key})
    token = create_token(user["_id"], email, user.get("role", "admin"))
    return {"token": token, "user": {"email": email, "name": user.get("name", "Admin"), "role": user.get("role", "admin")}}


@api_router.get("/auth/me")
async def auth_me(admin=Depends(get_current_admin)):
    return {"email": admin["email"], "name": admin.get("name", "Admin"), "role": admin["role"]}


# ---------- Public content ----------
@api_router.get("/")
async def root():
    return {"message": "Alfa Blindagem API"}


@api_router.get("/settings")
async def get_settings():
    doc = await db.settings.find_one({"key": "site"})
    return clean(doc) if doc else {}


@api_router.get("/services")
async def list_services():
    items = await db.services.find({"active": True}).sort("order", 1).to_list(100)
    return [clean(i) for i in items]


@api_router.get("/promotions")
async def list_promotions():
    items = await db.promotions.find({"active": True}).to_list(50)
    return [clean(i) for i in items]


@api_router.get("/reviews")
async def list_reviews():
    items = await db.reviews.find({}).to_list(100)
    return [clean(i) for i in items]


@api_router.get("/gallery")
async def list_gallery():
    items = await db.gallery.find({}).to_list(200)
    return [clean(i) for i in items]


@api_router.post("/leads", status_code=201)
async def create_lead(data: LeadCreate):
    doc = data.model_dump()
    doc["id"] = new_id()
    doc["created_at"] = datetime.now(timezone.utc).isoformat()
    doc["status"] = "novo"
    await db.leads.insert_one(doc)
    return {"ok": True, "id": doc["id"]}


# ---------- Admin ----------
@api_router.put("/admin/settings")
async def update_settings(data: SettingsInput, admin=Depends(get_current_admin)):
    doc = data.model_dump()
    doc["key"] = "site"
    await db.settings.update_one({"key": "site"}, {"$set": doc}, upsert=True)
    return clean(doc)


@api_router.get("/admin/leads")
async def admin_leads(admin=Depends(get_current_admin)):
    items = await db.leads.find({}).sort("created_at", -1).to_list(500)
    return [clean(i) for i in items]


@api_router.delete("/admin/leads/{lead_id}")
async def delete_lead(lead_id: str, admin=Depends(get_current_admin)):
    await db.leads.delete_one({"id": lead_id})
    return {"ok": True}


@api_router.get("/admin/services")
async def admin_services(admin=Depends(get_current_admin)):
    items = await db.services.find({}).sort("order", 1).to_list(200)
    return [clean(i) for i in items]


@api_router.post("/admin/services", status_code=201)
async def create_service(data: ServiceInput, admin=Depends(get_current_admin)):
    doc = data.model_dump()
    doc["id"] = new_id()
    await db.services.insert_one(doc)
    return clean(doc)


@api_router.put("/admin/services/{sid}")
async def update_service(sid: str, data: ServiceInput, admin=Depends(get_current_admin)):
    await db.services.update_one({"id": sid}, {"$set": data.model_dump()})
    return {"ok": True}


@api_router.delete("/admin/services/{sid}")
async def delete_service(sid: str, admin=Depends(get_current_admin)):
    await db.services.delete_one({"id": sid})
    return {"ok": True}


@api_router.get("/admin/promotions")
async def admin_promotions(admin=Depends(get_current_admin)):
    items = await db.promotions.find({}).to_list(100)
    return [clean(i) for i in items]


@api_router.post("/admin/promotions", status_code=201)
async def create_promotion(data: PromotionInput, admin=Depends(get_current_admin)):
    doc = data.model_dump()
    doc["id"] = new_id()
    await db.promotions.insert_one(doc)
    return clean(doc)


@api_router.put("/admin/promotions/{pid}")
async def update_promotion(pid: str, data: PromotionInput, admin=Depends(get_current_admin)):
    await db.promotions.update_one({"id": pid}, {"$set": data.model_dump()})
    return {"ok": True}


@api_router.delete("/admin/promotions/{pid}")
async def delete_promotion(pid: str, admin=Depends(get_current_admin)):
    await db.promotions.delete_one({"id": pid})
    return {"ok": True}


@api_router.post("/admin/reviews", status_code=201)
async def create_review(data: ReviewInput, admin=Depends(get_current_admin)):
    doc = data.model_dump()
    doc["id"] = new_id()
    await db.reviews.insert_one(doc)
    return clean(doc)


@api_router.put("/admin/reviews/{rid}")
async def update_review(rid: str, data: ReviewInput, admin=Depends(get_current_admin)):
    await db.reviews.update_one({"id": rid}, {"$set": data.model_dump()})
    return {"ok": True}


@api_router.delete("/admin/reviews/{rid}")
async def delete_review(rid: str, admin=Depends(get_current_admin)):
    await db.reviews.delete_one({"id": rid})
    return {"ok": True}


@api_router.post("/admin/gallery", status_code=201)
async def create_gallery_item(data: GalleryInput, admin=Depends(get_current_admin)):
    doc = data.model_dump()
    doc["id"] = new_id()
    await db.gallery.insert_one(doc)
    return clean(doc)


@api_router.delete("/admin/gallery/{gid}")
async def delete_gallery_item(gid: str, admin=Depends(get_current_admin)):
    await db.gallery.delete_one({"id": gid})
    return {"ok": True}


app.include_router(api_router)

app.add_middleware(
    CORSMiddleware,
    allow_credentials=False,
    allow_origins=os.environ.get("CORS_ORIGINS", "*").split(","),
    allow_methods=["*"],
    allow_headers=["*"],
)

logging.basicConfig(level=logging.INFO, format="%(asctime)s - %(name)s - %(levelname)s - %(message)s")
logger = logging.getLogger(__name__)


DEFAULT_SETTINGS = {
    "key": "site",
    "slogan": "Proteção que você sente. Qualidade que você vê.",
    "whatsapp": "5598984784793",
    "whatsapp_display": "(98) 98478-4793",
    "instagram": "https://www.instagram.com/alfa.blindagem",
    "address": "Rua Augusto Becker, 1413 - São Ludgero - SC",
    "hours": "Seg a Sáb: 08h às 11h | Sáb e Dom: 14h às 19h",
    "prices": {"celular": 180, "tela": 180, "traseira": 180, "combo": 320, "relogio": 150, "tablet": 250, "oculos": 200},
}

DEFAULT_SERVICES = [
    {
        "id": "srv-celular", "title": "CELULAR", "category": "celular", "order": 1, "active": True,
        "description": "Blindagem para iPhone e Android com acabamento invisível e toque original preservado.",
        "benefits": ["iPhone e Android", "Proteção contra riscos", "Blindagem das lentes da câmera", "Acabamento discreto"],
        "price_label": "A partir de R$ 180",
        "image": "https://images.unsplash.com/photo-1592832122594-c0c6bad718b1?q=80&w=1200&auto=format&fit=crop",
    },
    {
        "id": "srv-relogio", "title": "RELÓGIO", "category": "relogio", "order": 2, "active": True,
        "description": "Proteção premium para smartwatches e relógios, sem comprometer o visual.",
        "benefits": ["Smartwatches e analógicos", "Película de alta resistência", "Aplicação precisa"],
        "price_label": "A partir de R$ 150",
        "image": "https://images.unsplash.com/photo-1616353329366-b5546ca70b1a?q=80&w=1200&auto=format&fit=crop",
    },
    {
        "id": "srv-tablet", "title": "TABLET", "category": "tablet", "order": 3, "active": True,
        "description": "Blindagem de tela para tablets com aplicação profissional e bordas alinhadas.",
        "benefits": ["Todas as marcas", "Toque e caneta preservados", "Sem bolhas"],
        "price_label": "A partir de R$ 250",
        "image": "https://images.unsplash.com/photo-1632151023539-a7b0766d4178?q=80&w=1200&auto=format&fit=crop",
    },
    {
        "id": "srv-oculos", "title": "ÓCULOS", "category": "oculos", "order": 4, "active": True,
        "description": "Proteção para lentes e armações de óculos de grau e solares premium.",
        "benefits": ["Lentes e armações", "Proteção contra micro-riscos", "Visual intacto"],
        "price_label": "A partir de R$ 200",
        "image": "https://images.unsplash.com/photo-1591076482161-42ce6da69f67?q=80&w=1200&auto=format&fit=crop",
    },
]

DEFAULT_PROMOTIONS = [
    {
        "id": "promo-combo", "title": "COMBO ALFA", "subtitle": "Tela + traseira + lentes das câmeras",
        "price_label": "R$ 320", "tag": "MAIS VENDIDO", "active": True,
    }
]

DEFAULT_REVIEWS = [
    {"id": "rev-1", "name": "Marcos V.", "stars": 5, "comment": "Aplicação impecável no meu iPhone. Não dá nem para perceber que tem proteção. Atendimento nota dez."},
    {"id": "rev-2", "name": "Juliana R.", "stars": 5, "comment": "Fiz o Combo Alfa e o acabamento ficou perfeito. Equipe muito cuidadosa e profissional."},
    {"id": "rev-3", "name": "Rafael T.", "stars": 5, "comment": "Blindei meu smartwatch e meu óculos. Serviço premium do início ao fim. Recomendo demais."},
]

DEFAULT_GALLERY = [
    {"id": "gal-1", "category": "iphone", "title": "iPhone Protegido", "url": "https://images.unsplash.com/photo-1605236453806-6ff36851218e?q=80&w=1200&auto=format&fit=crop"},
    {"id": "gal-2", "category": "iphone", "title": "Acabamento Premium", "url": "https://images.unsplash.com/photo-1556656793-08538906a9f8?q=80&w=1200&auto=format&fit=crop"},
    {"id": "gal-3", "category": "android", "title": "Galaxy Blindado", "url": "https://images.unsplash.com/photo-1610945415295-d9bbf067e59c?q=80&w=1200&auto=format&fit=crop"},
    {"id": "gal-4", "category": "relogios", "title": "Relógio Premium", "url": "https://images.unsplash.com/photo-1522312346375-d1a52e2b99b3?q=80&w=1200&auto=format&fit=crop"},
    {"id": "gal-5", "category": "relogios", "title": "Smartwatch Protegido", "url": "https://images.unsplash.com/photo-1546868871-7041f2a55e12?q=80&w=1200&auto=format&fit=crop"},
    {"id": "gal-6", "category": "tablets", "title": "Tablet Protegido", "url": "https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?q=80&w=1200&auto=format&fit=crop"},
    {"id": "gal-7", "category": "oculos", "title": "Óculos de Grau Premium", "url": "https://images.unsplash.com/photo-1591076482161-42ce6da69f67?q=80&w=1200&auto=format&fit=crop"},
    {"id": "gal-8", "category": "aplicacoes", "title": "Aplicação Profissional", "url": "https://images.unsplash.com/photo-1580910051074-3eb694886505?q=80&w=1200&auto=format&fit=crop"},
    {"id": "gal-9", "category": "iphone", "title": "iPhone 17 Pro Max", "url": "https://images.unsplash.com/photo-1592899677977-9c10ca588bbd?q=80&w=1200&auto=format&fit=crop"},
    {"id": "gal-10", "category": "android", "title": "Galaxy S26 Ultra", "url": "https://images.unsplash.com/photo-1678911820864-e2c567c655d7?q=80&w=1200&auto=format&fit=crop"},
]


@app.on_event("startup")
async def seed():
    await db.users.create_index("email", unique=True)
    await db.login_attempts.create_index("key")

    admin_email = os.environ.get("ADMIN_EMAIL", "admin@alfablindagem.com").lower()
    admin_password = os.environ.get("ADMIN_PASSWORD", "Alfa@2026")
    existing = await db.users.find_one({"email": admin_email})
    if not existing:
        await db.users.insert_one({
            "_id": new_id(), "email": admin_email, "name": "Administrador Alfa",
            "password_hash": hash_password(admin_password), "role": "admin",
            "created_at": datetime.now(timezone.utc),
        })
    elif not verify_password(admin_password, existing["password_hash"]):
        await db.users.update_one({"email": admin_email}, {"$set": {"password_hash": hash_password(admin_password)}})

    if not await db.settings.find_one({"key": "site"}):
        await db.settings.insert_one(DEFAULT_SETTINGS)
    if await db.services.count_documents({}) == 0:
        await db.services.insert_many(DEFAULT_SERVICES)
    if await db.promotions.count_documents({}) == 0:
        await db.promotions.insert_many(DEFAULT_PROMOTIONS)
    if await db.reviews.count_documents({}) == 0:
        await db.reviews.insert_many(DEFAULT_REVIEWS)
    if await db.gallery.count_documents({}) == 0:
        await db.gallery.insert_many(DEFAULT_GALLERY)
    logger.info("Seed concluído")


@app.on_event("shutdown")
async def shutdown_db_client():
    client.close()
