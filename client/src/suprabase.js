import { createClient } from '@supabase/supabase-js'

const projectURL = 'https://rmwsqsqemjcuftsqrwxb.supabase.co';
const anonkey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJtd3Nxc3FlbWpjdWZ0c3Fyd3hiIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTczODE1OTE0OSwiZXhwIjoyMDUzNzM1MTQ5fQ.FAcpgnv1lv6uGXqwtOX5Ky4g7rU6T2Zf7Y-e5vL_yEI'

export const supabase = createClient(projectURL, anonkey);