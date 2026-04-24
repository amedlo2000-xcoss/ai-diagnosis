import { createClient } from "@supabase/supabase-js";

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Supabase環境変数が設定されていません')
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

export interface RegisterFormData {
  name: string;
  email: string;
  industry: string;
  position: string;
  experience: string;
  age: string;
  marital_status: string;
  has_children: string;
  region: string;
}

export async function submitRegistration(data: RegisterFormData) {
  const { error } = await supabase.from("registrations").insert([data]);
  if (error) throw error;
}
