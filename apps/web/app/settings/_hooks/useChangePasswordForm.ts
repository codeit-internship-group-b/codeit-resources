import { type ChangePasswordPayload } from "@repo/types";
import { useForm, type UseFormRegisterReturn, type UseFormReturn } from "react-hook-form";

interface ChangePasswordRegisters {
  currentPassword: UseFormRegisterReturn;
  newPassword: UseFormRegisterReturn;
  confirmPassword: UseFormRegisterReturn;
}

type ChangePasswordFormReturn = UseFormReturn<ChangePasswordPayload> & {
  registers: ChangePasswordRegisters;
};

const MIN_LENGTH = 4;

export const useChangeUserPasswordForm = (): ChangePasswordFormReturn => {
  const form = useForm({
    mode: "onSubmit",
    defaultValues: {
      currentPassword: "",
      newPassword: "",
      confirmPassword: "",
    },
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
