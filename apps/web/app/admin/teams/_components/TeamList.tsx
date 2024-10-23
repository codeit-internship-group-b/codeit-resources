import TeamListItem from "./TeamListItem";

const mock = ["Management", "Finance", "Strategy", "Brand Experience"];
// TODO: 여기서 데이터 불러올 예정
export default function TeamList(): JSX.Element {
  return (
    <div className="mt-40">
      {mock.map((teamName) => (
        <TeamListItem key={teamName} teamName={teamName} />
      ))}
    </div>
  );
}
