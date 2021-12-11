import { createClient } from "@supabase/supabase-js";
import config from "@/utils/config"

const supabase = () => {
  try {
    return createClient(config('supabase.url'), config('supabase.apiKey')); 
  } catch (error) {
    throw new Error(error);
  }
}

export default supabase