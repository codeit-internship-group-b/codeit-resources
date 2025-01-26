import { z } from "zod";
import { type StaticImageData } from "next/image";
import { ROLE_LABELS } from "@repo/types/src/membersType";
import { MEMBER_FORM_MESSAGES } from "@repo/constants/messages";

export const memberFormSchema = z.object({
  role: z.enum(Object.keys(ROLE_LABELS) as [keyof typeof ROLE_LABELS]).default("member"),
  name: z
    .string()
    .nonempty(MEMBER_FORM_MESSAGES.VALIDATION.NAME.REQUIRED)
    .min(2, MEMBER_FORM_MESSAGES.VALIDATION.NAME.MIN_LENGTH),
  email: z
    .string()
    .nonempty(MEMBER_FORM_MESSAGES.VALIDATION.EMAIL.REQUIRED)
    .email(MEMBER_FORM_MESSAGES.VALIDATION.EMAIL.PATTERN),
  teams: z.array(z.string()),
  profileImage: z.union([z.string(), z.instanceof(File), z.custom<StaticImageData>(), z.null()]),
});
