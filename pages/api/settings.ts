import { PrismaClient } from "@prisma/client";
import { NextApiRequest, NextApiResponse } from "next";
import { getSession } from "next-auth/react";

const prisma = new PrismaClient();

async function updateSettings(req: NextApiRequest, res: NextApiResponse) {
  try {
    const session = await getSession({ req });

    if (!session || !session.user) {
      return res.status(401).json({ unauthorized: true });
    }

    const { includeCapitals, wordsPerLesson } = req.body;

    const settings = await prisma.settings.upsert({
      where: {
        userId: session.user.id,
      },
      update: {
        includeCapitals,
        wordsPerLesson,
      },
      create: {
        includeCapitals,
        wordsPerLesson,
        userId: session.user.id,
      },
    });

    res.status(200).json({ settings });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
}

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === "POST") {
    return updateSettings(req, res);
  }
}
