import { REGEXP_PATTERNS } from "@repo/constants/regexp";
import { type ChangePasswordPayload } from "@repo/types";
import { useForm, type UseFormRegisterReturn, type UseFormReturn } from "react-hook-form";

interface ChangePasswordRegisters {
  currentPassword: UseFormRegisterReturn;
  newPassword: UseFormRegisterReturn;
  confirmPassword: UseFormRegisterReturn;
}

interface ChangePasswordFormReturn extends UseFormReturn<ChangePasswordPayload> {
  registers: ChangePasswordRegisters;
}

const DEFAULT_VALUES = {
  currentPassword: "",
  newPassword: "",
  confirmPassword: "",
};
const PASSWORD_CONFIG = {
  minLength: 4,
  maxLength: 20,
  pattern: REGEXP_PATTERNS.PASSWORD,
};

export const useChangeUserPasswordForm = (): ChangePasswordFormReturn => {
  const form = useForm({
    mode: "onSubmit",
    defaultValues: DEFAULT_VALUES,
  });

  const { register, watch } = form;
  const registers = {
    currentPassword: {
      ...register("currentPassword", {
        required: "비밀번호를 입력해 주세요.",
        minLength: {
          value: PASSWORD_CONFIG.minLength,
          message: `${PASSWORD_CONFIG.minLength}자리 이상 입력해 주세요.`,
        },
        maxLength: {
          value: PASSWORD_CONFIG.maxLength,
          message: `${PASSWORD_CONFIG.maxLength}자리 까지 입력 가능합니다.`,
        },
      }),
    },
    newPassword: {
      ...register("newPassword", {
        required: "새 비밀번호를 입력해 주세요.",
        pattern: { value: PASSWORD_CONFIG.pattern, message: "비밀번호는 대소문자, 지정된 특수문자만 허용됩니다." },
        minLength: {
          value: PASSWORD_CONFIG.minLength,
          message: `${PASSWORD_CONFIG.minLength}자리 이상 입력해 주세요.`,
        },
        maxLength: {
          value: PASSWORD_CONFIG.maxLength,
          message: `${PASSWORD_CONFIG.maxLength}자리 까지 입력 가능합니다.`,
        },
      }),
    },
    confirmPassword: {
      ...register("confirmPassword", {
        required: "새 비밀번호를 확인해 주세요.",
        validate: (value) => value === watch("newPassword") || "비밀번호가 일치하지 않습니다.",
      }),
    },
  };

  return { registers, ...form };
};
