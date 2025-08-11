import type { NextApiRequest, NextApiResponse } from 'next';
import { supabaseServer } from '../../lib/supabaseServer';
import { Database } from '../../types/supabase';

type Service = Database['public']['Tables']['services']['Row'];

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Service[] | { error: string }>
) {
  if (req.method === 'GET') {
    const { data, error } = await supabaseServer.from('services').select('*');
    if (error) return res.status(500).json({ error: error.message });
    res.status(200).json(data || []);
  } else {
    res.status(405).json({ error: 'Method not allowed' });
  }
}
