import { useEffect, useState } from 'react';
import { supabase } from '../lib/supabaseClient';
import { useRouter } from 'next/router';
import Link from 'next/link';
import ColorPalette from '../components/ColorPalette';
import Head from 'next/head';

interface Note {
  id: number;
  content: string;
  title: string | null;
  created_at: string;
  user_id: string;
}

export default function NoteList() {

  const colors = [
    'custom-blue',
    'custom-orange',
    'custom-green',
    'custom-red',
    'custom-green2',
    'custom-red2',
  ];

  const [notes, setNotes] = useState<Note[]>([]);
  const [content, setContent] = useState('');
  const [userId, setUserId] = useState('');
  const router = useRouter();
  const show = false;

  // 解决方案 2：使用第二个 useEffect (更推荐)
  // 这是一种更符合 React 思想的模式。我们将获取用户和获取笔记这两个副作用分离开来，并用 useEffect 的依赖数组来管理它们之间的关系。

  // 第一个 useEffect 负责获取用户 ID 并更新 userId 状态。
  // 第二个 useEffect 负责在 userId 发生变化时才调用 fetchNotes。


  // 第一个 useEffect：仅在组件挂载时运行一次，获取用户 ID
  // useEffect(() => {
  //   supabase.auth.getUser().then(({ data }) => {
  //     if (!data.user) {
  //       router.push('/login');
  //     } else {
  //       console.log('data.user.id' + data.user.id);
  //       //因为 setUserId(data.user.id) 这个操作是异步的，React 会等到组件重新渲染时才会更新 userId 的值。
  //       setUserId(data.user.id);
  //     }
  //   });
  // }, []);


  // 第二个 useEffect：依赖于 userId，当 userId 变化时（即获取到新值时）才运行
  // useEffect(() => {
  //   // 只有当 userId 有值时才执行 fetchNotes
  //   if (userId) {
  //     // 这里的 userId 已经是最新值
  //     fetchNotes();
  //   }
  // }, [userId]); // 当 userId 改变时，这个 useEffect 就会被触发

//20251217 不获取登录了，直接拉全部文章
  useEffect(() => {
    fetchNotes();
  }, []);
  
  function fetchNotes() {
    //fetch(`/api/notes?user_id=${userId}`)
    fetch(`/api/notes`)
      .then(res => res.json())
      .then(setNotes)
      .catch(error => console.error('Error fetching notes:', error));
  }

  async function addNote() {
    try {
      const res = await fetch('/api/notes', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ user_id: userId, content })
      });

      // 首先检查HTTP状态码
      if (res.ok) { // res.ok 检查状态码是否为 200-299
        const newNotes = await res.json();
        //setNotes(newNotes);
        fetchNotes();
      } else {
        // 如果状态码不是 2xx，解析 JSON 并获取错误信息
        const { error } = await res.json();
        console.error('API 错误:', error);
        // 你也可以在这里更新一个错误状态来显示给用户
      }
    } catch (error) {
      // 捕获网络错误或 fetch 本身的问题
      console.error('网络请求失败:', error);
    }
    setContent('');
  }

  return (
    <>
      <Head>
        {/* 在这里设置标题栏的标题 */}
        <title>Note List　ー　千葉２狗 🐶</title>

        {/* 你也可以在这里添加其他 SEO 相关的 meta 标签 */}
        <meta name="description" content="老登💡的网页" />
      </Head>

      <main className="min-h-screen flex items-center justify-center bg-white">
        {/* 容器添加外边距，限制最大宽度 */}
        <div className="w-full max-w-4xl my-40 mx-4 sm:mx-20">

          <h1 className="text-3xl font-bold text-slate-900 mb-4">Note List</h1>
          <ColorPalette href="/" />

          <div className="flex justify-end mt-40">
            {/* 检查 notes 数组是否有内容 */}
            {notes && notes.length > 0 ? (
              // 如果有内容，就渲染列表
              <ul>
                {notes.map(note => (
                  <li key={note.id} className='mb-6'>
                    <Link href={`/notes?id=${note.id}`}>
                      {note.title}
                    </Link>
                  </li>
                ))}
              </ul>
            ) : (
              // 如果没有内容，就渲染提示信息
              <p>No notes</p>
            )}
          </div>
        </div>

        {show && (
          <div className="w-full max-w-4xl">
            <input value={content} onChange={e => setContent(e.target.value)} placeholder="写点什么..." />
            <button onClick={addNote}>添加</button>
          </div>
        )
        }
      </main>
    </>
  );
}
