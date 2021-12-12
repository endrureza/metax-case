import { compare } from "bcrypt";

export default async function handler(req, res) {
  const { text, hash } = req.body;

  const isPasswordCorrect = await compare(text, hash);

  if (!isPasswordCorrect) {
    return res.send({ message: false })
  }

  return res.send({ message: true })
}
