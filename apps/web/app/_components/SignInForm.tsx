"use client";

import { LogoCodeitIcon, LogoTextIcon } from "@repo/ui/public/index";
import { Button, Input } from "@repo/ui";
import { type FieldValues, type SubmitHandler } from "react-hook-form";
import { debounce } from "es-toolkit";
import { useSignInForm } from "../_hooks/useSignInForm";
import { useSignInMutation } from "../_hooks/useSignInMutation";

export default function SignInForm(): JSX.Element {
  const { handleSubmit, registers, errors } = useSignInForm();
  const { mutate: postSignInMutate, isPending } = useSignInMutation();

  const onSignInSubmit: SubmitHandler<FieldValues> = (payload: FieldValues) => {
    postSignInMutate(payload);
  };

  const debouncedSubmit = debounce((payload: FieldValues) => {
    onSignInSubmit(payload);
  }, 500);

  return (
    <form className="w-372 flex flex-col gap-32" onSubmit={(...rest) => void handleSubmit(debouncedSubmit)(...rest)}>
      <div className="flex flex-col items-center justify-center gap-24">
        <LogoCodeitIcon className="md:w-78 md:h-78 h-60 w-60" />
        <LogoTextIcon className="w-194 md:w-256 h-24 fill-black md:h-32" />
      </div>
      <div>
        <div className="flex flex-col gap-8">
          <Input
            id="email"
            name="email"
            type="email"
            placeholder="회사 메일"
            isError={Boolean(errors.email)}
            errorMessage={errors.email?.message as string}
            {...registers.email}
          />
          <Input
            id="password"
            name="password"
            type="password"
            placeholder="비밀번호"
            isError={Boolean(errors.password)}
            errorMessage={errors.password?.message as string}
            autoComplete="current-password"
            {...registers.password}
          />
        </div>
        <Button className="h-42 w-full" type="submit" variant="Primary" isPending={isPending}>
          로그인
        </Button>
      </div>
    </form>
  );
}
