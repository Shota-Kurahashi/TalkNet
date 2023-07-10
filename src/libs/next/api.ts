import { NextApiHandler, NextApiRequest, NextApiResponse } from "next";
import { Error, handleApiError } from "src/libs/error";
import { User } from "src/libs/schema/user";
import { getSession } from "src/libs/session";
import { assertUser } from "src/libs/validation";

export type NextSessionRequest = NextApiRequest & {
  user: User;
};
export type ApiHandler<T> = NextApiHandler<T | Error>;

export const withSession = <T>(
  next: (req: NextSessionRequest, res: NextApiResponse) => Promise<void | T>
) => {
  return async (req: NextApiRequest, res: NextApiResponse<T | Error>) => {
    try {
      const session = await getSession(req, res);
      assertUser(session.user);

      await next({ ...req, user: session.user } as NextSessionRequest, res);
    } catch (error) {
      handleApiError({ res, error });
    }
  };
};
