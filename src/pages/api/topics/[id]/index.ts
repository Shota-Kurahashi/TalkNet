import { getTopic } from "src/handlers/topics/get";
import { handleApiError, notArrowedHandler } from "src/libs/error";
import { ApiHandler, withSession } from "src/libs/next/api";
import { TopicReturn } from "src/libs/schema/topic";

const getHandler = withSession<TopicReturn>(async (req, res) => {
  try {
    const id = Number(req.query.id);

    const topic = await getTopic(id);

    res.status(200).json({
      topic,
    });
  } catch (error) {
    handleApiError({ res, error });
  }
});

const handlers: ApiHandler<TopicReturn> = async (req, res) => {
  switch (req.method) {
    case "GET":
      return getHandler(req, res);
    default:
      return notArrowedHandler(res);
  }
};

export default handlers;
