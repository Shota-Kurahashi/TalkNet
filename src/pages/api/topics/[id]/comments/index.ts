import { createComment, getComments } from "src/handlers/comments";
import { handleApiError, notArrowedHandler } from "src/libs/error";
import { ApiHandler, withSession } from "src/libs/next/api";
import {
  CommentReturn,
  CommentsReturn,
  commentSchema,
} from "src/libs/schema/comment";

import { validate } from "src/libs/validation";

const getHandler = withSession<CommentsReturn>(async (req, res) => {
  try {
    const id = Number(req.query.id);

    const comments = await getComments(id);
    res.status(200).json({
      comments,
    });
  } catch (error) {
    handleApiError({ res, error });
  }
});

const postHandler = withSession<CommentReturn>(async (req, res) => {
  try {
    validate(req.body, commentSchema);

    const { user } = req;
    const comment = await createComment(user.id, req.body);

    res.status(200).json({
      comment,
    });
  } catch (error) {
    handleApiError({ res, error });
  }
});

const handlers: ApiHandler<CommentsReturn | CommentReturn> = async (
  req,
  res
) => {
  switch (req.method) {
    case "GET":
      return getHandler(req, res);
    case "POST":
      return postHandler(req, res);
    default:
      return notArrowedHandler(res);
  }
};

export default handlers;
