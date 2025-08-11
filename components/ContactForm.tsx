// components/ContactForm.tsx
"use client";
import { useState } from "react";

export default function ContactForm() {
  const [name, setName] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    await fetch("/api/submit", {
      method: "POST",
      body: JSON.stringify({ name, message }),
    });
    alert("提交成功！");
    setName(""); setMessage("");
  };

  return (
    <form onSubmit={handleSubmit} className="p-6 bg-gray-800 rounded-lg">
      <input value={name} onChange={(e) => setName(e.target.value)} placeholder="姓名" className="w-full p-2 mb-4 rounded text-black" />
      <textarea value={message} onChange={(e) => setMessage(e.target.value)} placeholder="留言" className="w-full p-2 mb-4 rounded text-black" />
      <button className="bg-blue-500 px-4 py-2 rounded text-white">提交</button>
    </form>
  );
}
