import { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../lib/prisma";


export async function createUser(req: NextApiRequest, res: NextApiResponse) {
  const { email, name } = req.body;
  const user = await prisma.user.create({
    data: {
      email,
      name,
    },
  });
  res.json(user);
}