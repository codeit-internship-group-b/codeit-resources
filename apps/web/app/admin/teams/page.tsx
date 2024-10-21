import Button from "@ui/src/components/common/Button";
import TeamList from "./_components/TeamList";

export default function Teams(): JSX.Element {
  return (
    <div className="px-118 text-custom-black mt-80">
      <div className="flex justify-between">
        <h1>팀관리</h1>
        <Button variant="Secondary">+ 팀 추가</Button>
      </div>
      <TeamList />
    </div>
  );
}
