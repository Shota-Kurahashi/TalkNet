import bcrypt from "bcryptjs";
import { SignUpSchemaType } from "src/features/auth/types";
import { BadRequestError } from "src/libs/error";
import { prisma } from "src/libs/prisma";

export const signUpHandler = async ({
  email,
  password,
  name,
}: Omit<SignUpSchemaType, "confirmPassword">) => {
  const user = await prisma.user.findUnique({
    where: {
      email,
    },
  });

  if (user) throw new BadRequestError();

  const hashedPassword = bcrypt.hashSync(password, 10);

  const newUser = await prisma.user.create({
    data: {
      email,
      password: hashedPassword,
      name,
    },
  });

  const { id, email: userEmail } = newUser;

  return {
    id,
    email: userEmail,
  };
};
