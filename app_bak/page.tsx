// app/page.tsx
"use client";
import { useState } from "react";
import Navbar from "@/components/Navbar";
import ServiceCard from "@/components/ServiceCard";
import Footer from "@/components/Footer";
import { texts } from "@/lib/i18n";

export default function Home() {
  const [lang, setLang] = useState<"zh" | "ja">("zh");
  const t = texts[lang];

  return (
    <div className="bg-black text-white min-h-screen">
      <Navbar lang={lang} setLang={setLang} />
      <section className="text-center py-20">
        <img src="/avatar.png" alt="avatar" className="mx-auto rounded-full w-32 h-32 mb-6" />
        <h1 className="text-5xl font-bold">{t.intro}</h1>
        <p className="mt-4 text-lg text-gray-400">{t.desc}</p>
      </section>
      <section className="grid md:grid-cols-3 gap-6 px-8">
        {t.services.map((s, i) => (
          <ServiceCard key={i} title={s.title} desc={s.desc} />
        ))}
      </section>
      <div className="text-center py-10">
        <a href="/contact" className="bg-blue-500 px-6 py-3 rounded-lg">{t.contact}</a>
      </div>
      <Footer />
    </div>
  );
}
