import { useMutation } from "@tanstack/react-query";
import { Button, Input, notify } from "@ui/index";
import { type SubmitHandler, useForm } from "react-hook-form";
import { patchUserPassword } from "@/api/users";

export interface ChangePasswordPayload {
  currentPassword: string;
  newPassword: string;
  confirmPassword: string;
}

export default function ChangePasswordForm(): JSX.Element {
  const {
    handleSubmit,
    register,
    watch,
    formState: { errors, isValid },
  } = useForm({
    mode: "onBlur",
    defaultValues: {
      currentPassword: "",
      newPassword: "",
      confirmPassword: "",
    },
  });

  const { mutate: patchUserPasswordMutate } = useMutation({
    mutationFn: (payload: ChangePasswordPayload) => patchUserPassword(payload),
    onSuccess: (res) => {
      notify({ type: "success", message: res.message });
    },
    onError: (error) => {
      // const errMessage = error.response?.data.message;
      // if (errMessage) notify({ type: "error", message: errMessage });
    },
  });

  const onSubmit: SubmitHandler<ChangePasswordPayload> = (payload) => {
    patchUserPasswordMutate(payload);
  };

  return (
    <form className="flex flex-col gap-16" onSubmit={(...rest) => void handleSubmit(onSubmit)(...rest)}>
      <h1 className="text-2xl-bold border-b-1 border-[#E8E8EA] py-8">비밀번호 변경</h1>
      <div>
        <Input type="password" placeholder="현재 비밀번호" {...register("currentPassword")} />
        <Input type="password" placeholder="새 비밀번호" {...register("newPassword")} />
        <Input
          type="password"
          placeholder="새 비밀번호 확인"
          {...register("confirmPassword", {
            validate: (value) => value === watch("newPassword") || "새 비밀번호가 일치하지 않습니다.",
          })}
        />
        <Button className="text-lg-medium w-106 h-42" type="submit" variant="Secondary">
          변경하기
        </Button>
      </div>
    </form>
  );
}
