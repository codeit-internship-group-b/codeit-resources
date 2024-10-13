"use client";

import Input from "@ui/src/components/common/Input";

export default function Home(): JSX.Element {
  return (
    <div>
      {/* <button type="button" className="bg-primary">
        tailwind 확인용
      </button>
      <button type="button" className="bg-primary">
        husky 확인용
      </button>
      <div className="w-10">px 확인용</div> */}
      <div className="flex flex-col gap-20 m-30">
        <Input id="name" placeholder="참여자" />
        <Input id="name" placeholder="참여자" isError errorMessage="에러 예시" />
      </div>
    </div>
  );
}
