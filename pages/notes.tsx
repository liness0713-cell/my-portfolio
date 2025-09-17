import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import DOMPurify from 'dompurify';
import ColorPalette from '../components/ColorPalette';

interface Note {
    id: number;
    title: string | null;
    content: string | null;
    created_at: string;
    user_id: string;
}

export default function Notes() {

    const colors = [
        'custom-blue',
        'custom-orange',
        'custom-green',
        'custom-red',
        'custom-green2',
        'custom-red2',
    ];

    const [note, setNote] = useState<Note | null>(null);
    const router = useRouter();
    const { id } = router.query;

    useEffect(() => {
        if (id) {
            //fetch(`/api/notes?user_id=${sampleUserId}`)
            fetch(`/api/notes?id=${id}`)
                .then(res => res.json())
                .then(setNote)
                .catch(error => console.error('Error fetching note:', error));
        }
    }, [id]);

    if (!note) return <div className="p-4">loading...</div>;

    return (
        <main className="min-h-screen flex items-center justify-center bg-white">
            {/* 容器添加外边距，限制最大宽度 */}
            <div className="w-full max-w-[100rem] mx-4 my-10 sm:mx-20 sm:my-40 flex flex-col sm:flex-row sm:justify-between sm:items-start">

                <div className="sm:sticky sm:top-40 sm:mr-10">
                    <h1 className="text-3xl font-bold text-slate-900 mb-4">{note.title}</h1>
                    <p className="text-gray-400 text-xs mb-4">{new Date(note.created_at).toLocaleString()}</p>
                    <ColorPalette href="/notelist" />
                </div>


                <p className="max-w-6xl w-full space-y-10 mt-10 sm:mt-60" dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(note.content ? note.content : "") }} />
            </div>
        </main>
    );
}