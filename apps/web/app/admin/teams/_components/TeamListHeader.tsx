import Button from "@ui/src/components/common/Button";

export default function TeamListHeader(): JSX.Element {
  // TODO: 버튼 클릭시 팀 추가하는 post 함수 구현
  return (
    <div className="flex justify-between">
      <h1>팀관리</h1>
      <Button variant="Secondary">+ 팀 추가</Button>
    </div>
  );
}
