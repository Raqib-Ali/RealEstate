import { createClient } from '@supabase/supabase-js'

const projectURL = import.meta.env.VITE_SUPABASE_URL;
const anonkey = import.meta.env.VITE_SUPABASE_SECRET;

export const supabase = createClient(projectURL, anonkey);