"use client";

import { LogoCodeitIcon, LogoTextIcon } from "@repo/ui/public/index";
import { Button, Input, notify } from "@repo/ui";
import { useMutation } from "@tanstack/react-query";
import { type FieldValues, type SubmitHandler, useForm } from "react-hook-form";
import { setCookie } from "cookies-next";
import { type AxiosError } from "axios";
import { postSignIn } from "@/app/api/signIn";

export default function SignInForm(): JSX.Element {
  const { mutate: postSignInMutate } = useMutation({
    mutationFn: (payload: FieldValues) => postSignIn(payload),
    onSuccess: (res) => {
      setCookie("accessToken", res.accessToken);
    },
    onError: (error) => {
      const err = error as AxiosError<{ message: string }>;
      const errMessage = err.response?.data.message;

      if (errMessage) {
        notify({ type: "error", message: errMessage });
        setError("email", { message: errMessage });
        setError("password", { message: errMessage });
      }
    },
  });

  const {
    register,
    formState: { errors },
    handleSubmit,
    setError,
  } = useForm({
    mode: "onBlur",
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const registers = {
    email: register("email", {
      required: "이메일을 입력해주세요.",
    }),
    password: register("password", {
      required: "비밀번호를 입력해주세요.",
    }),
  };

  const onSubmit: SubmitHandler<FieldValues> = (payload) => {
    postSignInMutate(payload);
  };

  return (
    <form className="min-w-372 flex flex-col gap-32" onSubmit={handleSubmit(onSubmit)}>
      <div className="flex flex-col items-center justify-center gap-24">
        <LogoCodeitIcon className="w-78 h-78" />
        <LogoTextIcon className="w-256 h-32 fill-black" />
      </div>
      <div>
        <div className="flex flex-col gap-8">
          <Input
            id="email"
            type="email"
            placeholder="회사 메일"
            isError={Boolean(errors.email)}
            errorMessage={errors.email?.message}
            {...registers.email}
          />
          <Input
            id="password"
            type="password"
            placeholder="비밀번호"
            isError={Boolean(errors.password)}
            errorMessage={errors.password?.message}
            {...registers.password}
          />
        </div>
        <Button className="w-full" type="submit" variant="Primary">
          로그인
        </Button>
      </div>
    </form>
  );
}
