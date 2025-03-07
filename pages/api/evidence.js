import { supabase } from '../../lib/supabaseClient';

export default async function handler(req, res) {
  if (req.method === 'GET') {
    const { data, error } = await supabase.from('evidence').select('*');

    if (error) {
      return res.status(500).json({ error: error.message });
    }

    return res.status(200).json(data);
  }

  if (req.method === 'POST') {
    const { title, description } = req.body;
    const { data, error } = await supabase.from('evidence').insert([{ title, description }]);

    if (error) {
      return res.status(500).json({ error: error.message });
    }

    return res.status(201).json(data);
  }

  res.status(405).json({ error: 'Method not allowed' });
}