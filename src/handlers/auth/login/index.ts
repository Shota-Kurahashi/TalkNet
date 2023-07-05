import bcrypt from "bcryptjs";
import { LoginSchemaType } from "src/features/auth/types";
import { BadRequestError, NotFoundError } from "src/libs/error";
import { prisma } from "src/libs/prisma";

export const loginHandler = async ({ email, password }: LoginSchemaType) => {
  const user = await prisma.user.findUnique({
    where: {
      email,
    },
  });

  if (!user) throw new NotFoundError();

  if (!bcrypt.compareSync(password, user.password)) throw new BadRequestError();

  const { id, name, email: userEmail } = user;

  return {
    id,
    name,
    email: userEmail,
  };
};
