/* eslint-disable max-classes-per-file */
import { NextApiResponse } from "next";
import { ZodError } from "zod";

/* eslint-disable max-classes-per-file */
export const errors = {
  400: { message: "Bad Request" },
  401: { message: "Unauthorized" },
  403: { message: "Forbidden" },
  404: { message: "Not Found" },
  405: { message: "Method Not Allowed" },
  500: { message: "Internal Server Error" },
} as const;

export type ErrorType = keyof typeof errors;
export type Errors = typeof errors;
export type ErrorsMessage = {
  [T in ErrorType]: Errors[T]["message"];
}[ErrorType];

export type Error = {
  status: ErrorType;
  message: ErrorsMessage;
};

export class HttpError extends Error {
  message: ErrorsMessage;
  constructor(public status: ErrorType) {
    super();
    this.message = errors[status].message;
    this.status = status;
  }

  throwMessage() {
    return { message: this.message, status: this.status };
  }
}

export class BadRequestError extends HttpError {
  constructor() {
    super(400);
  }
}

export class UnauthorizedError extends HttpError {
  constructor() {
    super(401);
  }
}

export class ForbiddenError extends HttpError {
  constructor() {
    super(403);
  }
}

export class NotFoundError extends HttpError {
  constructor() {
    super(404);
  }
}

export class MethodNotAllowedError extends HttpError {
  constructor() {
    super(405);
  }
}

export class InternalServerError extends HttpError {
  constructor() {
    super(500);
  }
}

export const handleApiError = ({
  res,
  error,
}: {
  res: NextApiResponse<Error>;
  error: unknown;
}) => {
  if (error instanceof ZodError) {
    const status = 400;
    const { message } = errors[status];
    res.status(status).json({
      message,
      status,
    });

    return;
  }

  if (error instanceof HttpError) {
    const { status, message } = error.throwMessage();
    res.status(status).json({ message, status });

    return;
  }

  const status = 500;

  const { message } = errors[status];

  res.status(status).json({
    message,
    status,
  });
};

export const notArrowedHandler = (res: NextApiResponse<Error>) => {
  const status = 405;
  const { message } = errors[status];
  res.status(status).json({
    message,
    status,
  });
};
