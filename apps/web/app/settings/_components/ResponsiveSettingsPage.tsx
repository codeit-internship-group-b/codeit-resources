"use client";

import { Button } from "@ui/index";
import { Chevron, ProfileDefaultIcon } from "@ui/public";

// TODO : querykey 상수화
// TODO : gnb settings페이지 연동

const OPTIONS = [
  { title: "비밀번호 변경" },
  { title: "멤버 관리" },
  { title: "팀 관리" },
  { title: "회의실 설정" },
  { title: "좌석 설정" },
];

export default function ResponsiveSettingsPage(): JSX.Element {
  return (
    <div className="flex flex-col gap-24 px-16 py-36">
      <h1>설정</h1>
      <div className="flex items-center gap-16">
        <ProfileDefaultIcon className="h-72 w-72" />
        <Button className="text-sm-medium" type="button" variant="Secondary">
          사진 변경
        </Button>
      </div>
      <div className="rounded-8 bg-gray-60 flex gap-16 border border-[#E4E3E8] px-16 py-12">
        <div className="text-md-bold text-[#818084]">
          <p>이름</p>
          <p>이메일</p>
          <p>팀</p>
        </div>
        <div className="text-lg-regular">
          <p>이름</p>
          <p>이메일</p>
          <p>팀</p>
        </div>
      </div>
      <div>
        {OPTIONS.map(({ title }) => {
          return (
            <div
              key={title}
              className="text-lg-medium border-b-1 flex items-center justify-between border-[#E8E8EA] px-8 py-20"
            >
              {title}
              <div className="p-8">
                <Chevron className="rotate-180" />
              </div>
            </div>
          );
        })}
      </div>
      <Button className="text-lg-medium w-106 h-42" type="button" variant="Secondary">
        로그아웃
      </Button>
    </div>
  );
}
