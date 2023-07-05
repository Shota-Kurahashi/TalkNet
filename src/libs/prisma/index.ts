import { PrismaClient } from "@prisma/client";
import {
  PrismaClientInitializationError,
  PrismaClientKnownRequestError,
  PrismaClientUnknownRequestError,
  PrismaClientValidationError,
} from "@prisma/client/runtime";
import { BadRequestError, InternalServerError } from "src/libs/error";

export const prisma = new PrismaClient();
if (process.env.NODE_ENV === "development") {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  (global as any).prisma = prisma;
}

export function prismaErrorHandler(err: unknown): never {
  if (err instanceof PrismaClientValidationError) {
    throw new BadRequestError();
  }
  if (err instanceof PrismaClientKnownRequestError) {
    throw new BadRequestError();
  }
  if (err instanceof PrismaClientUnknownRequestError) {
    throw new BadRequestError();
  }
  if (err instanceof PrismaClientInitializationError) {
    throw new InternalServerError();
  }
  throw err;
}
