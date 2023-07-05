import { ZodSchema, z } from "zod";
import { UnauthorizedError } from "src/libs/error";
import { User, UserSchema } from "src/libs/schema/user";

export function assertUser(user: unknown): asserts user is User {
  try {
    UserSchema.parse(user);
  } catch (error) {
    throw new UnauthorizedError();
  }
}

export function validate<T extends ZodSchema>(
  target: unknown,
  schema: T
): asserts target is z.infer<T> {
  schema.parse(target);
}
