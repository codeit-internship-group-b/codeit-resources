import { S3Client } from "@aws-sdk/client-s3";

export const createS3Client = (): S3Client => {
  const AWS_ACCESS_KEY_ID = process.env.AWS_ACCESS_KEY_ID;
  const AWS_SECRET_ACCESS_KEY = process.env.AWS_SECRET_ACCESS_KEY;

  if (!AWS_ACCESS_KEY_ID || !AWS_SECRET_ACCESS_KEY) {
    throw new Error("AWS credentials are missing");
  }

  return new S3Client({
    region: process.env.AWS_REGION,
    credentials: {
      accessKeyId: AWS_ACCESS_KEY_ID,
      secretAccessKey: AWS_SECRET_ACCESS_KEY,
    },
  });
};
