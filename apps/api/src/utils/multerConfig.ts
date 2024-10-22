import { extname } from "node:path";
import multer, { type Multer } from "multer";
import multerS3, { AUTO_CONTENT_TYPE } from "multer-s3";
import { type Request } from "express";
import { type S3Client } from "@aws-sdk/client-s3";
import { createS3Client } from "./createS3Client";

type FileNameCallback = (error: Error | null, key?: string) => void;

const bucket = process.env.S3_BUCKET_NAME;
const s3: S3Client = createS3Client();

if (!bucket) throw new Error("S3_BUCKET_NAME is missing in environment variables");

export const upload: Multer = multer({
  storage: multerS3({
    s3,
    bucket,
    key(req: Request, file: Express.Multer.File, callback: FileNameCallback) {
      const uniqueSuffix = `${Date.now()}-${Math.round(Math.random() * 1e9)}`;
      callback(null, `profiles/${uniqueSuffix}${extname(file.originalname)}`);
    },
    contentType: AUTO_CONTENT_TYPE,
  }),
  limits: {
    fileSize: 1024 * 1024 * 10,
    files: 1,
  },
});
