import ListItemSkeleton from "../../../components/common/Skeleton/ListItemSkeleton";
import TeamList from "./_components/TeamList";
import TeamListHeader from "./_components/TeamListHeader";

export default function Teams(): JSX.Element {
  return (
    <div className="px-118 text-custom-black mt-80">
      <TeamListHeader />
      <TeamList />
      <ListItemSkeleton type="team" />
      <ListItemSkeleton type="member" />
    </div>
  );
}
