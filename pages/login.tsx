import { useState } from 'react';
import { supabase } from '../lib/supabaseClient';
import { useRouter } from 'next/router';
import ColorPalette from '../components/ColorPalette';
import Head from 'next/head';

export default function Login() {
  const colors = [
    'custom-blue',
    'custom-orange',
    'custom-green',
    'custom-red',
    'custom-green2',
    'custom-red2',
  ];

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const router = useRouter();

  async function handleLogin() {
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) alert(error.message);
    else router.push('/notelist');
  }

  async function handleSignup() {
    const { error } = await supabase.auth.signUp({ email, password });
    if (error) alert(error.message);
    else alert('注册成功，请验证邮箱');
  }

  return (
    <>
      <Head>
        {/* 在这里设置标题栏的标题 */}
        <title>ようこそ🤗　ー　千葉２狗 🐶</title>

        {/* 你也可以在这里添加其他 SEO 相关的 meta 标签 */}
        <meta name="description" content="老登💡的网页" />
      </Head>

      <main className="min-h-screen flex items-center justify-center bg-white">
        {/* 容器添加外边距，限制最大宽度 */}
        <div className="w-full max-w-4xl my-40 mx-4 sm:mx-20 flex flex-col items-start space-y-2">
          <h1>ようこそ🤗</h1>
          <ColorPalette href="/" />

          <div>
            <input className="mr-4 my-4 px-2 py-1 border border-gray-300 rounded-lg" placeholder="邮箱" value={email} onChange={e => setEmail(e.target.value)} />
            <input className="mr-4 my-4 px-2 py-1 border border-gray-300 rounded-lg" placeholder="密码" type="password" value={password} onChange={e => setPassword(e.target.value)} />
          </div>
          <div>
            <button className="mr-4" onClick={handleLogin}>登录</button>
            <button className="mr-4" onClick={handleSignup}>注册</button>
          </div>
        </div>
      </main>

    </>
  );
}
