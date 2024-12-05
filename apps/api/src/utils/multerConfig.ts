import { extname } from "node:path";
import multer, { type Multer } from "multer";
import multerS3, { AUTO_CONTENT_TYPE } from "multer-s3";
import { type Request } from "express";
import { type S3Client } from "@aws-sdk/client-s3";
import { IMAGE_CONFIG } from "@repo/constants";
import { createS3Client } from "./createS3Client";

type FileNameCallback = (error: Error | null, key?: string) => void;

const bucket = process.env.S3_BUCKET_NAME;

if (!bucket) throw new Error("S3_BUCKET_NAME is missing in environment variables");

const s3: S3Client = createS3Client();

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
    fileSize: IMAGE_CONFIG.MAX_SIZE,
    files: 1,
  },
  fileFilter(req, file, callback) {
    if (IMAGE_CONFIG.TYPES.some((type) => type === file.mimetype)) {
      callback(null, true);
      return;
    }
    callback(new Error("지원하지 않는 파일 형식입니다. JPEG, PNG, GIF 형식의 파일만 업로드할 수 있습니다."));
  },
});
