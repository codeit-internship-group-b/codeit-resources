import DashboardSection from "./_components/DashboardSection";

const mock = [
  { title: "디자인 콘텐츠 회의", time: "10:00 ~ 11:30", resource: "미팅룸 B", status: "진행 중" },
  { title: "마케팅 전략 회의", time: "14:00 ~ 15:30", resource: "회의실 A", status: "대기 중" },
];
const equipmentMock = [
  { title: "카메라 대여", time: "09:00 ~ 17:00", resource: "카메라 1", status: "진행 중" },
  { title: "삼각대 대여", time: "12:00 ~ 13:30", resource: "삼각대", status: "사용 중" },
];

export default function Dashboard(): JSX.Element {
  return (
    <div className="text-custom-black mx-16 mt-40 flex flex-col gap-80 md:m-80">
      <DashboardSection type="meeting" data={mock} />
      <DashboardSection type="equipment" data={equipmentMock} />
    </div>
  );
}
