import { createClient } from '@supabase/supabase-js';

const supabaseUrl = "https://hwosizzojvggpcalopeo.supabase.co";
const supabaseAnonKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imh3b3NpenpvanZnZ3BjYWxvcGVvIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzY2MzAzODAsImV4cCI6MjA1MjIwNjM4MH0.dpzRW7OAGMDgZvmswe_r4eKpFBvYuhT0vaiGdvMDTyg";

export const supabase = createClient(supabaseUrl, supabaseAnonKey);