import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://ruuzjaspuxowwhdjezvc.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJ1dXpqYXNwdXhvd3doZGplenZjIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDY5MzY0ODAsImV4cCI6MjA2MjUxMjQ4MH0.zwMpVSQhijIwdx5D2eerhgvXDzuU2V4KrtGaL_FQwjM';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
