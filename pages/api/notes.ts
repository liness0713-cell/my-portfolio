import type { NextApiRequest, NextApiResponse } from 'next';
import { supabaseServer } from '../../lib/supabaseServer';
import { Database } from '../../types/supabase';
import type { PostgrestFilterBuilder } from '@supabase/postgrest-js';

type Note = Database['public']['Tables']['notes']['Row'];

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Note[] | Note | { error: string }>
) {
  // if (req.method === 'GET') {
  //   const { user_id } = req.query;
  //   const { data, error } = await supabaseServer
  //     .from('notes')
  //     .select('*')
  //     .eq('user_id', user_id as string);
  //   if (error) return res.status(500).json({ error: error.message });
  //   res.status(200).json(data || []);
  // }

  // if (req.method === 'GET' && req.query.id) {
  //   const { id, user_id } = req.query;
  //   const { data, error } = await supabaseServer
  //     .from('notes')
  //     .select('*')
  //     .eq('user_id', user_id as string)
  //     .eq('id', id as string)
  //     .single();
  //   if (error) return res.status(500).json({ error: error.message });
  //   res.status(200).json(data);
  // }


  if (req.method === 'GET' && (req.query.id || req.query.user_id)) {
    const { id, user_id } = req.query;
    // Initialize the query
    let query: PostgrestFilterBuilder<any, any, Note[], "notes", unknown> = supabaseServer.from('notes').select('*');

    if (user_id) {
      query = query.eq('user_id', user_id as string);
    }
    if (id) {
      query = query.eq('id', id as string);
    }

    const { data, error } = id
      ? await query.single() // Expect a single Note when id is provided
      : await query; // Expect an array of Notes otherwise;
      
    if (error) return res.status(500).json({ error: error.message });
    res.status(200).json(data);
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
