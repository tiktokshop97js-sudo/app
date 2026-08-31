import axios from "axios";

const API = `${process.env.REACT_APP_BACKEND_URL}/api`;

export const api = axios.create({ baseURL: API });

api.interceptors.request.use((config) => {
  const token = localStorage.getItem("alfa_token");
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

export const FALLBACK_WHATSAPP = "5598984784793";

export const waLink = (number, message) =>
  `https://wa.me/${number || FALLBACK_WHATSAPP}?text=${encodeURIComponent(message)}`;

export const DEFAULT_WA_MESSAGE =
  "Olá! Vim pelo aplicativo Alfa Blindagem e gostaria de solicitar um orçamento.";

export const formatApiErrorDetail = (detail) => {
  if (detail == null) return "Algo deu errado. Tente novamente.";
  if (typeof detail === "string") return detail;
  if (Array.isArray(detail))
    return detail.map((e) => (e && typeof e.msg === "string" ? e.msg : JSON.stringify(e))).filter(Boolean).join(" ");
  if (detail && typeof detail.msg === "string") return detail.msg;
  return String(detail);
};
