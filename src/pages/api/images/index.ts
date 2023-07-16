import S3 from "aws-sdk/clients/s3";
import { notArrowedHandler } from "src/libs/error";

import { ApiHandler, withSession } from "src/libs/next/api";

const s3 = new S3({
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  endpoint: process.env.AWS_S3_ENDPOINT,
});

const handleGet = withSession(async (req, res) => {
  const post = s3.createPresignedPost({
    Bucket: "images",
    Fields: {
      key: req.query.file,
      "Content-Type": req.query.fileType,
    },
    Expires: 60, // seconds
    Conditions: [["content-length-range", 0, 100 * 1024 * 1024]],
  });

  res.status(200).json(post);
});

const handler: ApiHandler<unknown> = async (req, res) => {
  switch (req.method) {
    case "GET":
      return handleGet(req, res);

    default:
      return notArrowedHandler(res);
  }
};

export default handler;
