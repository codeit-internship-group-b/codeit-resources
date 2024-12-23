import { Badge } from "@ui/index";

interface ProfileInfoTeamsProps {
  teams: string[];
}

export default function ProfileTeams({ teams }: ProfileInfoTeamsProps): JSX.Element {
  if (teams.length === 0) return <p>소속된 팀이 없습니다.</p>;

  return (
    <>
      {teams.map((team) => (
        <Badge key={team} color="purple" colorApplyTo="font" shape="round">
          {team}
        </Badge>
      ))}
    </>
  );
}
