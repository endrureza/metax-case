const supabase = {
  url: process.env.NEXT_PUBLIC_SUPABASE_URL || "",
  apiKey: process.env.NEXT_PUBLIC_SUPABASE_API_KEY || "",
  jwt: process.env.NEXT_PUBLIC_SUPABASE_JWT || "",
};

export default supabase;
