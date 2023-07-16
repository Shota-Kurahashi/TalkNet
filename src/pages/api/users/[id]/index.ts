import { getUser } from "src/handlers/users/get";
import { handleApiError, notArrowedHandler } from "src/libs/error";
import { ApiHandler, withSession } from "src/libs/next/api";
import { UserReturn } from "src/libs/schema/user";

const getHandler = withSession<UserReturn>(async (req, res) => {
  try {
    const id = Number(req.query.id);
    const user = await getUser(id);
    res.status(200).json({
      user,
    });
  } catch (error) {
    handleApiError({ res, error });
  }
});

const handlers: ApiHandler<UserReturn> = async (req, res) => {
  switch (req.method) {
    case "GET":
      return getHandler(req, res);
    default:
      return notArrowedHandler(res);
  }
};

export default handlers;
