"use client";

import { Label } from "@ui/index";

export default function Home(): JSX.Element {
  return (
    <div className="space-y-4 p-8">
      <Label color="purple" shape="round" colorApplyTo="font">
        폰트 색상 적용
      </Label>

      <Label color="green" shape="round" colorApplyTo="background">
        배경 색상 적용
      </Label>

      <Label color="pink" shape="square" colorApplyTo="background">
        배경 색상 적용
      </Label>

      <Label color="yellow" shape="round" colorApplyTo="background">
        배경 색상 적용
      </Label>

      <Label color="gray" shape="square" colorApplyTo="background">
        배경 색상 적용
      </Label>

      <Label color="blue" shape="square" colorApplyTo="background">
        배경 색상 적용
      </Label>
    </div>
  );
}
