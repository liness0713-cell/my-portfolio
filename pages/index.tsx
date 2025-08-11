import Layout from '../components/Layout';
import { useEffect, useState } from 'react';

interface Service {
  id: number;
  title: string;
  description: string;
}

export default function Home() {
  const [services, setServices] = useState<Service[]>([]);

  useEffect(() => {
    fetch('/api/services')
      .then(res => res.json())
      .then(setServices);
  }, []);

  return (
    <Layout>
      <h2>服务列表</h2>
      <ul>
        {services.map(s => (
          <li key={s.id}>{s.title} - {s.description}</li>
        ))}
      </ul>
    </Layout>
  );
}
