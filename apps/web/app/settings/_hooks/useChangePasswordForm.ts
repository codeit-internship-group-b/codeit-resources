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
const MIN_LENGTH = 4;
const DEFAULT_VALUES = {
  currentPassword: "",
  newPassword: "",
  confirmPassword: "",
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
        minLength: { value: MIN_LENGTH, message: "4자리 이상 입력해 주세요." },
      }),
    },
    newPassword: {
      ...register("newPassword", {
        required: "새 비밀번호를 입력해 주세요.",
        minLength: { value: MIN_LENGTH, message: "4자리 이상 입력해 주세요." },
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
