import { User } from "@prisma/client";
import { NextApiHandler, NextApiRequest, NextApiResponse } from "next";
import { Error, handleApiError } from "src/libs/error";
import { getSession } from "src/libs/session";
import { assertUser } from "src/libs/validation";

export type NextSessionRequest = NextApiRequest & {
  user: User;
};
export type ApiHandler<T> = NextApiHandler<T | Error>;

export const withSession = <T>(
  next: (req: NextSessionRequest, res: NextApiResponse) => Promise<T | void>
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
