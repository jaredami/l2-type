import { NextApiRequest, NextApiResponse } from "next";
import { getSession } from "next-auth/react";
import prisma from "../../prisma";

async function createLesson(
  req: NextApiRequest,
  res: NextApiResponse
): Promise<void> {
  const session = await getSession({ req });

  if (!session || !session.user) {
    return res.status(401).json({ unauthorized: true });
  }

  // TODO validate with zod
  // const valid = await LessonSchema.isValid(req.body);

  // if (!valid) {
  //   return res.status(500).json({ error: "validation error" });
  // }

  const { wpm, accuracy } = req.body;

  const lesson = await prisma.lesson.create({
    data: {
      userId: session.user.id,
      wpm,
      accuracy,
    },
  });

  if (lesson.id) {
    res.status(200).json(lesson);
  } else {
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
