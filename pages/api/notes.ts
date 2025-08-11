import type { NextApiRequest, NextApiResponse } from 'next';
import { supabaseServer } from '../../lib/supabaseServer';
import { Database } from '../../types/supabase';

type Note = Database['public']['Tables']['notes']['Row'];

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Note[] | { error: string }>
) {
  if (req.method === 'GET') {
    const { user_id } = req.query;
    const { data, error } = await supabaseServer
      .from('notes')
      .select('*')
      .eq('user_id', user_id as string);
    if (error) return res.status(500).json({ error: error.message });
    res.status(200).json(data || []);
  }

  if (req.method === 'POST') {
    const { user_id, content } = req.body;
    const { data, error } = await supabaseServer
      .from('notes')
      .insert([{ user_id, content }]);
    if (error) {
      console.log(error.message);
      return res.status(500).json({ error: error.message });
    }
    res.status(200).json(data || []);
  }
}
