/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";

import Image from "next/image";
import Input from "@ui/src/components/common/Input";
import Button from "@ui/src/components/common/Button";
import DefaultProfileImage from "@ui/public/images/image_default_profile.png";

export default function Profile(): JSX.Element {
  const handleImageUpload = (): void => {
    // TODO: 이미지 변경 기능 구현
  };

  return (
    <main className="w-372 flex flex-col gap-56">
      <section>
        <h2 className="text-2xl-bold mb-8">내 프로필</h2>
        <hr className="border-1 mb-22 w-full border-solid border-gray-200/10" />
        <dl className="space-y-14">
          <div className="gap-39 flex">
            <dt className="text-lg-bold">이름</dt>
            <dd className="text-lg-regular">김효준</dd>
          </div>

          <div className="gap-25 flex">
            <dt className="text-lg-bold">이메일</dt>
            <dd className="text-lg-regular">example@codeit.com</dd>
          </div>

          <div className="gap-54 flex">
            <dt className="text-lg-bold">팀</dt>
            <dd className="text-lg-regular">Product, Content</dd>
          </div>

          <div className="gap-19 flex items-center">
            <span className="text-lg-bold">사진</span>
            <Image
              src={DefaultProfileImage}
              alt="프로필 이미지"
              width={72}
              height={72}
              className="size-72 rounded-full object-cover"
            />
            <label
              htmlFor="profileImage"
              className="w-86 border-custom-black/20 rounded-6 text-sm-medium text-custom-black/80 flex h-32 cursor-pointer items-center justify-center border transition-colors duration-300 hover:border-purple-400 hover:text-purple-400"
            >
              사진 변경
              <input
                id="profileImage"
                type="file"
                accept=".png, .jpeg, .jpg"
                className="hidden"
                // onChange={handleImageUpload}
              />
            </label>
          </div>
        </dl>
      </section>

      <section>
        <h2 className="text-2xl-bold mb-8">비밀번호 변경</h2>
        <hr className="border-1 mb-22 w-full border-solid border-gray-200/10" />
        <form>
          <Input id="currentPassword" type="password" placeholder="현재 비밀번호" />
          <Input id="newPassword" type="password" placeholder="새 비밀번호" />
          <Input id="confirmPassword" type="password" placeholder="새 비밀번호 확인" />
          <Button variant="Secondary" type="submit">
            변경하기
          </Button>
        </form>
      </section>

      <section>
        <h2 className="text-2xl-bold mb-8">계정</h2>
        <hr className="border-1 mb-22 w-full border-solid border-gray-200/10" />
        <Button variant="Secondary" type="submit">
          로그아웃
        </Button>
      </section>
    </main>
  );
}
