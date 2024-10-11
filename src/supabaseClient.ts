import { createClient } from '@supabase/supabase-js';

const SUPABASE_URL = 'https://rbxxhwxtjiaemchbplqe.supabase.co';
const SUPABASE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJieHhod3h0amlhZW1jaGJwbHFlIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Mjg0MjQ1ODMsImV4cCI6MjA0NDAwMDU4M30.xJIAGzpN1Yn9_7HVqZTxhGcfs2S_nYPPM4OuTpSltkQ';

export const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);