import { useState } from 'react';
import { supabase } from '../lib/supabaseClient';
import { useRouter } from 'next/router';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const router = useRouter();

  async function handleLogin() {
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) alert(error.message);
    else router.push('/notes');
  }

  async function handleSignup() {
    const { error } = await supabase.auth.signUp({ email, password });
    if (error) alert(error.message);
    else alert('注册成功，请验证邮箱');
  }

  return (
    <div>
      <h1>登录 / 注册</h1>
      <input placeholder="邮箱" value={email} onChange={e => setEmail(e.target.value)} />
      <input placeholder="密码" type="password" value={password} onChange={e => setPassword(e.target.value)} />
      <button onClick={handleLogin}>登录</button>
      <button onClick={handleSignup}>注册</button>
    </div>
  );
}
