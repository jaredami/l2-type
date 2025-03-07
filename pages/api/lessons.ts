import { NextApiRequest, NextApiResponse } from "next";
import { getServerSession } from "next-auth";
import { z } from "zod";
import prisma from "../../prisma";
import { authOptions } from "./auth/[...nextauth]";

async function createLesson(
  req: NextApiRequest,
  res: NextApiResponse
): Promise<void> {
  const session = await getServerSession(req, res, authOptions);

  if (!session || !session.user) {
    return res.status(401).json({ unauthorized: true });
  }

  const { wpm, accuracy } = req.body;
  const lessonInput = {
    userId: session.user.id,
    wpm,
    accuracy,
  };

  try {
    z.object({
      userId: z.string(),
      wpm: z.number(),
      accuracy: z.number(),
    }).parse(lessonInput);

    const lesson = await prisma.lesson.create({
      data: lessonInput,
    });
    return res.status(200).json(lesson);
  } catch (error: any) {
    console.error(error);
    if (error instanceof z.ZodError) {
      return res.status(422).send({ error: error.message });
    }
    return res.status(500).json({
      error: { message: error.message, statusText: "Internal Server Error" },
    });
  }
}

export async function getLessons(
  req: NextApiRequest,
  res: NextApiResponse
): Promise<void> {
  try {
    const session = await getServerSession(req, res, authOptions);

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
