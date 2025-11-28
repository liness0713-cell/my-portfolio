import { useEffect, useState } from 'react';
import Link from 'next/link';
import Head from 'next/head';

interface Service {
  id: number;
  title: string;
  description: string;
  image_url: string;
}

export default function Home() {

  const colors = [
    'custom-blue',
    'custom-orange',
    'custom-green',
    'custom-red',
    'custom-green2',
    'custom-red2',
  ];

  const [services, setServices] = useState<Service[]>([]);

  useEffect(() => {
    fetch('/api/services')
      .then(res => res.json())
      .then(setServices);
  }, []);

  return (
    <>
      <Head>
        {/* 在这里设置标题栏的标题 */}
        <title>千葉２狗 🐶</title>

        {/* 你也可以在这里添加其他 SEO 相关的 meta 标签 */}
        <meta name="description" content="老登💡的网页" />
      </Head>

      <main className="min-h-screen flex items-center justify-center bg-white">

        {/* 容器添加外边距，限制最大宽度 */}
        <div className="w-full max-w-4xl my-40 mx-4 sm:mx-20">
          <div className="flex flex-row">

            {/* 左侧文字区域 */}
            <div className="w-1/3 text-right">
              <h1 className="text-4xl font-bold text-slate-900 mb-4">
                一步一步着実に生きていく
              </h1>
              <p className="text-lg text-slate-600">按部就班的努力生活</p>
            </div>

            {/* 竖线分割 */}
            <div className="h-64 border-l border-gray-300 mx-6"></div>

            {/* 右侧网格区域 */}
            <div className="w-2/3 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">

              {services.map((s, index) => (
                <Link href={s.image_url}
                  key={s.id}
                  className={`bg-white text-black border-2 border-${colors[index]} aspect-square p-4 text-center rounded-lg hover:bg-${colors[index]} hover:text-white transition-colors duration-200`}
                >
                  {s.title}
                </Link>
              ))}

            </div>
          </div>
        </div>

        {/* 右上角英文 */}
        <div className="absolute top-8 right-8 text-xs text-right text-gray-500">
          To live steadily and diligently<br />step by step
        </div>

      </main>
    </>

  );
}
