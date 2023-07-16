import { Prisma } from "@prisma/client";

export const moodFixtures: Prisma.MoodCreateInput[] = [
  {
    name: "Excited",
  },
  {
    name: "Loved",
  },
  {
    name: "Happy",
  },
  {
    name: "Sad",
  },
  {
    name: "Good",
  },
  {
    name: "Bad",
  },
  {
    name: "nothing",
  },
];
