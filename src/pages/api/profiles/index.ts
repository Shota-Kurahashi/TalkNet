import { createProfile } from "src/handlers/profiles/create";
import { updateProfile } from "src/handlers/profiles/update";
import { handleApiError, notArrowedHandler } from "src/libs/error";
import { ApiHandler, withSession } from "src/libs/next/api";
import { ProfileReturn, profileSchema } from "src/libs/schema/profile";
import { validate } from "src/libs/validation";

const postHandler = withSession<ProfileReturn>(async (req, res) => {
  try {
    validate(req.body, profileSchema);
    const { user } = req;

    const profile = await createProfile(user.id, req.body);

    res.status(200).json({
      profile,
    });
  } catch (error) {
    handleApiError({ res, error });
  }
});

const putHandler = withSession<ProfileReturn>(async (req, res) => {
  try {
    validate(req.body, profileSchema);

    const { user } = req;
    const profile = await updateProfile(user.id, req.body);

    res.status(200).json({ profile });
  } catch (error) {
    handleApiError({ res, error });
  }
});

const handlers: ApiHandler<ProfileReturn> = async (req, res) => {
  switch (req.method) {
    case "POST":
      return postHandler(req, res);
    case "PUT":
      return putHandler(req, res);
    default:
      return notArrowedHandler(res);
  }
};

export default handlers;
