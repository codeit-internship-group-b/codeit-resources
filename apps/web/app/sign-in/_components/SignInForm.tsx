"use client";

import { LogoCodeitIcon, LogoTextIcon } from "@repo/ui/public/index";
import { Button, Input } from "@repo/ui";
import { type FieldValues, type SubmitHandler } from "react-hook-form";
import { debounce } from "es-toolkit";
import { useSignInForm } from "../_hooks/useSignInForm";
import { useSignInMutation } from "../_hooks/useSignInMutation";

export default function SignInForm(): JSX.Element {
  // TODO : 토큰 유무에 따른 로그인페이지 핸들링
  // TODO : 토큰 유무에 따른 redirect 처리
  // TODO : 모바일 구현
  // TODO : front cicd 환경변수
  // TODO : 회원 추가시 default 비밀번호
  const { handleSubmit, registers, errors } = useSignInForm();
  const { mutate: postSignInMutate } = useSignInMutation();

  const onSignInSubmit: SubmitHandler<FieldValues> = (payload: FieldValues) => {
    postSignInMutate(payload);
  };

  const debouncedSubmit = debounce((payload: FieldValues) => {
    onSignInSubmit(payload);
  }, 500);

  /**
   * Form submit handler that wraps `handleSubmit` to suppress the "Promise-returning function
   * provided to attribute where a void return was expected" warning.
   *
   * ## Issue:
   * `react-hook-form`의 `handleSubmit`이 `Promise`를 반환할 때 발생하는 경고:
   * "Promise-returning function provided to attribute where a void return was expected".
   *
   * ## Solution:
   * `void` 키워드를 사용하여 `Promise` 반환을 무시하고, 함수가 `void`를 반환하도록 함.
   *
   * ## 참고:
   * - 공식 문서 이슈: https://github.com/orgs/react-hook-form/discussions/8020
   */

  return (
    <form
      className="min-w-372 flex flex-col gap-32"
      onSubmit={(...rest) => void handleSubmit(debouncedSubmit)(...rest)}
    >
      <div className="flex flex-col items-center justify-center gap-24">
        <LogoCodeitIcon className="w-78 h-78" />
        <LogoTextIcon className="w-256 h-32 fill-black" />
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
        <Button className="w-full" type="submit" variant="Primary">
          로그인
        </Button>
      </div>
    </form>
  );
}
