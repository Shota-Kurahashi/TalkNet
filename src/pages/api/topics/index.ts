import { createTopic } from "src/handlers/topics/create";
import { getTopics, getTopicsByUserId } from "src/handlers/topics/get";
import { handleApiError, notArrowedHandler } from "src/libs/error";
import { ApiHandler, withSession } from "src/libs/next/api";
import { TopicReturn, TopicsReturn, topicSchema } from "src/libs/schema/topic";

import { validate } from "src/libs/validation";

const getHandler = withSession<TopicsReturn>(async (req, res) => {
  try {
    const hasUserId = req.query.user_id;

    if (hasUserId) {
      const userId = Number(req.query.user_id);
      const topics = await getTopicsByUserId(userId);

      res.status(200).json({
        topics,
      });

      return;
    }

    const topics = await getTopics();

    res.status(200).json({
      topics,
    });
  } catch (error) {
    handleApiError({ res, error });
  }
});

const postHandler = withSession<TopicReturn>(async (req, res) => {
  try {
    validate(req.body, topicSchema);

    const { user } = req;
    const topic = await createTopic(user.id, req.body);

    res.status(200).json({
      topic,
    });
  } catch (error) {
    handleApiError({ res, error });
  }
});

const handlers: ApiHandler<TopicReturn | TopicsReturn> = async (req, res) => {
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
