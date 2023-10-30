import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.REACT_APP_SUPABASE_URL;
const supabaseKey = process.env.REACT_APP_SUPABASE_API_KEY;

if (!supabaseUrl) {
  throw new Error('REACT_APP_SUPABASE_URL is not defined.');
}

if (!supabaseKey) {
  throw Error('REACT_APP_SUPABASE_API_KEY is not defined.');
}

const supabase = createClient(supabaseUrl, supabaseKey);

export default supabase;