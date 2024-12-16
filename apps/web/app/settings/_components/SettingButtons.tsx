import { Chevron } from "@ui/public";

const MOBILE_OPTIONS = [
  { title: "비밀번호 변경" },
  { title: "멤버 관리" },
  { title: "팀 관리" },
  { title: "회의실 설정" },
  { title: "좌석 설정" },
];

export default function SettingButtons(): JSX.Element {
  return (
    <div>
      {MOBILE_OPTIONS.map(({ title }) => (
        <button
          key={title}
          className="text-lg-medium border-b-1 flex w-full items-center justify-between border-[#E8E8EA] px-8 py-20"
          type="button"
        >
          {title}
          <div className="p-8">
            <Chevron className="rotate-180" />
          </div>
        </button>
      ))}
    </div>
  );
}
