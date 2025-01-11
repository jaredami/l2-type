import { PrismaClient } from "@prisma/client";

export interface UserSettings {
    id?: string;  // Optional if defaults are used before database insertion
    includeCapitals: boolean;
    wordsPerLesson: number;
    userId?: string;  // Optional if defaults are used before user assignment
  }


const prisma = new PrismaClient();

const defaultSettings: UserSettings = {
    includeCapitals: false,
    wordsPerLesson: 10,
};

export async function getUserSettingsWithDefaults(userId: string | undefined): Promise<UserSettings> {
  if (!userId) {
    return defaultSettings;
  }

  const settings = await prisma.settings.findFirst({
    where: { userId },
  });

  return settings || defaultSettings;
}
