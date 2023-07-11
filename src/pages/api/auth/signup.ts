import { z } from "zod";
import { signUpHandler } from "src/handlers/auth/signup";
import { notArrowedHandler } from "src/libs/error";
import { ApiHandler } from "src/libs/next/api";
import { getSession } from "src/libs/session";
import { validate } from "src/libs/validation";

export type SignUpResult = {
  redirect: string;
  user_id: number;
};

const validateSchema = z.object({
  name: z.string(),
  email: z.string().email(),
  password: z.string().min(8),
});

const postHandler: ApiHandler<SignUpResult> = async (req, res) => {
  validate(req.body, validateSchema);
  const user = await signUpHandler(req.body);

  const session = await getSession(req, res);

  session.user = user;

  res.status(200).json({
    redirect: `profiles/${user.id}?type=create`,
    user_id: user.id,
  });
};

const handlers: ApiHandler<SignUpResult> = async (req, res) => {
  switch (req.method) {
    case "POST":
      return postHandler(req, res);
    default:
      return notArrowedHandler(res);
  }
};

export default handlers;
