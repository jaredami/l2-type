import { NextApiRequest, NextApiResponse } from "next";
import { getSession } from "next-auth/react";
import { z } from "zod";
import prisma from "../../prisma";

async function createLesson(
  req: NextApiRequest,
  res: NextApiResponse
): Promise<void> {
  const session = await getSession({ req });

  if (!session || !session.user) {
    return res.status(401).json({ unauthorized: true });
  }

  const { wpm, accuracy } = req.body;
  const lessonInput = {
    userId: session.user.id,
    wpm,
    accuracy,
  };

  const lessonInputSchema = z.object({
    userId: z.string(),
    wpm: z.number(),
    accuracy: z.number(),
  });

  try {
    lessonInputSchema.parse(lessonInput);

    const lesson = await prisma.lesson.create({
      data: lessonInput,
    });
    return res.status(200).json(lesson);
  } catch (error) {
    console.log("error", error);
    return res.status(500).json({ error: "something went wrong" });
  }
}

export async function getLessons(
  req: NextApiRequest,
  res: NextApiResponse
): Promise<void> {
  try {
    const session = await getSession({ req });

    if (!session || !session.user) {
      return res.status(401).json({ unauthorized: true });
    }

    const lessons = await prisma.lesson.findMany({
      where: {
        user: {
          id: session.user.id,
        },
      },
    });

    res.json(lessons);
  } catch (error) {
    console.error(error);
    res.status(500).end();
  }
}

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === "POST") {
    return createLesson(req, res);
  }

  if (req.method === "GET") {
    return getLessons(req, res);
  }
}
