import supabase from "@/services/supabase/init";
import { destroyCookie } from 'nookies'

export default async function (req, res) {
  console.log("hit signout")
  const token = req.cookies["sb:token"]

  let { error } = await supabase().auth.api.signOut(token);

  if (error) return res.status(401).json({ error: error.message });

  destroyCookie({ res }, "sb:token", { path: "/" });

  res.send()
}
