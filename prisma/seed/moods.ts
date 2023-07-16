/* eslint-disable no-restricted-syntax */
import { Mood, PrismaPromise } from "@prisma/client";
import { prisma } from "../../src/libs/prisma";
import { moodFixtures } from "../fixtures/moods";

export const generateMoods = () => {
  const moods: PrismaPromise<Mood>[] = [];

  for (const mood of moodFixtures) {
    const result = prisma.mood.create({
      data: mood,
    });

    moods.push(result);
  }

  return moods;
};
