import { createClient } from '@supabase/supabase-js';

const supabaseUrl = "https://izzfivjqxnlowchxjjpv.supabase.co";
const supabaseAnonKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Iml6emZpdmpxeG5sb3djaHhqanB2Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3Mzk4NzYwODUsImV4cCI6MjA1NTQ1MjA4NX0.UO8DWgDkxUNRFBmdbzpvM89OsxSaAs2dKm7WoknPgIM";

export const supabase = createClient(supabaseUrl, supabaseAnonKey);