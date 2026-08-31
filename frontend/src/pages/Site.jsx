import { useEffect, useState } from "react";
import Lenis from "lenis";
import { api } from "../lib/api";
import { scrollToId } from "../lib/media";
import Splash from "../components/site/Splash";
import Navbar from "../components/site/Navbar";
import Hero from "../components/site/Hero";
import Marquee from "../components/site/Marquee";
import Services from "../components/site/Services";
import Pricing from "../components/site/Pricing";
import Calculator from "../components/site/Calculator";
import Gallery from "../components/site/Gallery";
import BeforeAfter from "../components/site/BeforeAfter";
import Steps from "../components/site/Steps";
import Reviews from "../components/site/Reviews";
import Contact from "../components/site/Contact";
import Footer from "../components/site/Footer";
import WhatsAppFloat from "../components/WhatsAppFloat";

export default function Site() {
  const [splashDone, setSplashDone] = useState(false);
  const [settings, setSettings] = useState(null);
  const [services, setServices] = useState([]);
  const [promotions, setPromotions] = useState([]);
  const [reviews, setReviews] = useState([]);
  const [gallery, setGallery] = useState([]);

  useEffect(() => {
    if (splashDone && window.location.hash) {
      const id = window.location.hash.slice(1);
      setTimeout(() => scrollToId(id), 400);
    }
  }, [splashDone]);

  useEffect(() => {
    const timer = setTimeout(() => setSplashDone(true), 2600);

    const lenis = new Lenis({ duration: 1.15, smoothWheel: true });
    let rafId;
    const raf = (time) => {
      lenis.raf(time);
      rafId = requestAnimationFrame(raf);
    };
    rafId = requestAnimationFrame(raf);

    Promise.all([
      api.get("/settings"),
      api.get("/services"),
      api.get("/promotions"),
      api.get("/reviews"),
      api.get("/gallery"),
    ])
      .then(([s, srv, promo, rev, gal]) => {
        setSettings(s.data);
        setServices(srv.data);
        setPromotions(promo.data);
        setReviews(rev.data);
        setGallery(gal.data);
      })
      .catch(() => {});

    return () => {
      clearTimeout(timer);
      cancelAnimationFrame(rafId);
      lenis.destroy();
    };
  }, []);

  return (
    <div id="inicio" className="min-h-screen overflow-x-clip bg-[#050505] text-white">
      <Splash done={splashDone} />
      <div className="noise-overlay" aria-hidden />
      {splashDone && (
        <>
          <Navbar />
          <main>
            <Hero settings={settings} />
            <Marquee />
            <Services services={services} />
            <Pricing settings={settings} promotions={promotions} />
            <Calculator settings={settings} />
            <Gallery items={gallery} />
            <BeforeAfter />
            <Steps />
            <Reviews reviews={reviews} />
            <Contact settings={settings} />
          </main>
          <Footer settings={settings} />
          <WhatsAppFloat number={settings?.whatsapp} />
        </>
      )}
    </div>
  );
}
