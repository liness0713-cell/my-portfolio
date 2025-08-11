import { useEffect, useState } from 'react';
import { supabase } from '../lib/supabaseClient';
import { useRouter } from 'next/router';
import { error } from 'console';

interface Note {
  id: number;
  content: string;
}

export default function Notes() {
  const [notes, setNotes] = useState<Note[]>([]);
  const [content, setContent] = useState('');
  const [userId, setUserId] = useState('');
  const router = useRouter();

// 解决方案 2：使用第二个 useEffect (更推荐)
// 这是一种更符合 React 思想的模式。我们将获取用户和获取笔记这两个副作用分离开来，并用 useEffect 的依赖数组来管理它们之间的关系。

// 第一个 useEffect 负责获取用户 ID 并更新 userId 状态。
// 第二个 useEffect 负责在 userId 发生变化时才调用 fetchNotes。


  // 第一个 useEffect：仅在组件挂载时运行一次，获取用户 ID
  useEffect(() => {
    supabase.auth.getUser().then(({ data }) => {
      if (!data.user) {
        router.push('/login');
      } else {
        console.log('data.user.id' + data.user.id);
        //因为 setUserId(data.user.id) 这个操作是异步的，React 会等到组件重新渲染时才会更新 userId 的值。
        setUserId(data.user.id);
      }
    });
  }, []);


  // 第二个 useEffect：依赖于 userId，当 userId 变化时（即获取到新值时）才运行
  useEffect(() => {
    // 只有当 userId 有值时才执行 fetchNotes
    if (userId) {
      // 这里的 userId 已经是最新值
      fetchNotes();
    }
  }, [userId]); // 当 userId 改变时，这个 useEffect 就会被触发

  function fetchNotes() {
    fetch(`/api/notes?user_id=${userId}`)
      .then(res => res.json())
      .then(setNotes);
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
    <div>
      <h1>我的记事本</h1>
      <input value={content} onChange={e => setContent(e.target.value)} placeholder="写点什么..." />
      <button onClick={addNote}>添加</button>

      {/* 检查 notes 数组是否有内容 */}
      {notes && notes.length > 0 ? (
        // 如果有内容，就渲染列表
        <ul>
          {notes.map(note => (
            <li key={note.id}>{note.content}</li>
          ))}
        </ul>
      ) : (
        // 如果没有内容，就渲染提示信息
        <p>没记事</p>
      )}

    </div>
  );
}
