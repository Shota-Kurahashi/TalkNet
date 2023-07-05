import { handleApiError, notArrowedHandler } from "src/libs/error";
import { ApiHandler } from "src/libs/next/api";
import { getSession } from "src/libs/session";

type LogoutResult = {
  message: string;
};

const postHandler: ApiHandler<LogoutResult> = async (req, res) => {
  try {
    const session = await getSession(req, res);
    session.destroy();

    res.status(200).json({
      message: "ログアウトしました。",
    });
  } catch (error) {
    handleApiError({ res, error });
  }
};

const handlers: ApiHandler<LogoutResult> = async (req, res) => {
  switch (req.method) {
    case "POST":
      return postHandler(req, res);
    default:
      return notArrowedHandler(res);
  }
};

export default handlers;
