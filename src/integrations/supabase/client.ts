import { createClient as createSupabaseClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://fudkxjayttzpgizgtram.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZ1ZGt4amF5dHR6cGdpemd0cmFtIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjI1MzkxNjgsImV4cCI6MjA3ODExNTE2OH0.3V1NGt0gAGS4l1tGnFPB1E7TCh6LeNpvUI4mWLRQ3Bg';

export const createClient = () => createSupabaseClient(supabaseUrl, supabaseAnonKey);

export const supabase = createClient();
