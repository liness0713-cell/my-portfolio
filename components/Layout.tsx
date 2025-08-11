import { ReactNode, useState } from 'react';

interface LayoutProps {
  children: ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  const [lang, setLang] = useState<'zh' | 'ja'>('zh');

  return (
    <div style={{ maxWidth: '800px', margin: '0 auto' }}>
      <header style={{ display: 'flex', justifyContent: 'space-between' }}>
        <h1>{lang === 'zh' ? '我的网站' : '私のサイト'}</h1>
        <button onClick={() => setLang(lang === 'zh' ? 'ja' : 'zh')}>
          {lang === 'zh' ? '切换到日语' : '中国語に切り替える'}
        </button>
      </header>
      <main>{children}</main>
    </div>
  );
}
