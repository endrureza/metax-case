import supabase from "@/services/supabase/init";

export default function handler(req, res) {
  console.log('hit auth!')
  supabase().auth.api.setAuthCookie(req, res);
}
