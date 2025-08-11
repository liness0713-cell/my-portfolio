// app/dashboard/page.tsx
"use client";
import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabaseClient";

export default function Dashboard() {
  const [contacts, setContacts] = useState<any[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      let { data } = await supabase.from("contacts").select("*");
      setContacts(data || []);
    };
    fetchData();
  }, []);

  return (
    <div className="p-6">
      <h1 className="text-2xl text-white mb-4">留言列表</h1>
      <ul>
        {contacts.map((c) => (
          <li key={c.id} className="p-2 bg-gray-700 mb-2 rounded">{c.name}: {c.message}</li>
        ))}
      </ul>
    </div>
  );
}
