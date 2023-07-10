import { LoginSchema } from "src/features/auth/types";
import { loginHandler } from "src/handlers/auth/login";
import { handleApiError, notArrowedHandler } from "src/libs/error";
import { ApiHandler } from "src/libs/next/api";
import { getSession } from "src/libs/session";
import { validate } from "src/libs/validation";

export type LoginResult = {
  message: string;
  redirectUrl: string;
};

const postHandler: ApiHandler<LoginResult> = async (req, res) => {
  try {
    validate(req.body, LoginSchema);
    const user = await loginHandler(req.body);

    const session = await getSession(req, res);

    session.user = user;

    res.status(200).json({
      message: "ログインに成功しました",
      redirectUrl: session.redirect ?? "/",
    });
  } catch (error) {
    handleApiError({ res, error });
  }
};

const handlers: ApiHandler<LoginResult> = async (req, res) => {
  switch (req.method) {
    case "POST":
      return postHandler(req, res);
    default:
      return notArrowedHandler(res);
  }
};

export default handlers;
