import { Button, Input } from "@ui/index";
import { type SubmitHandler } from "react-hook-form";
import { type ChangePasswordPayload } from "@repo/types";
import { useChangeUserPasswordMutation } from "../_hooks/useUserMutations";
import { useChangeUserPasswordForm } from "../_hooks/useChangePasswordForm";

export default function ChangePasswordForm(): JSX.Element {
  const {
    handleSubmit,
    registers,
    formState: { errors },
  } = useChangeUserPasswordForm();
  const { mutate: patchUserPasswordMutate } = useChangeUserPasswordMutation();

  const onSubmit: SubmitHandler<ChangePasswordPayload> = (payload) => {
    patchUserPasswordMutate(payload);
  };

  return (
    <form className="flex flex-col gap-16" onSubmit={(...rest) => void handleSubmit(onSubmit)(...rest)}>
      <h2 className="text-2xl-bold border-b-1 hidden border-[#E8E8EA] py-8 md:block">비밀번호 변경</h2>
      <div>
        <Input
          type="password"
          placeholder="현재 비밀번호"
          error={errors.currentPassword}
          {...registers.currentPassword}
        />
        <Input type="password" placeholder="새 비밀번호" error={errors.newPassword} {...registers.newPassword} />
        <Input
          type="password"
          placeholder="새 비밀번호 확인"
          error={errors.confirmPassword}
          {...registers.confirmPassword}
        />
        <Button className="text-lg-medium w-106 h-42" type="submit" variant="Secondary">
          변경하기
        </Button>
      </div>
    </form>
  );
}
