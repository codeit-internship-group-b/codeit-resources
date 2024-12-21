import ProfileImageUploader from "@/app/admin/members/_components/sidepanel/ProfileImageUploader";
import { useSuspenseUserQuery } from "../_hooks/useUserQueries";
import ProfileTeams from "./ProfileTeams";

export default function ProfileDetails(): JSX.Element {
  const { data: user } = useSuspenseUserQuery();
  const { email, name, teams, profileImage = "" } = user;

  return (
    <div className="rounded-8 bg-gray-60 flex gap-16 border border-[#E4E3E8] px-16 py-12 md:gap-32 md:border-none md:bg-inherit md:p-0">
      <div className="text-md-bold md:text-lg-bold md:text-custom-black flex flex-col justify-center gap-4 text-[#818084] md:gap-16">
        <p>이름</p>
        <p>이메일</p>
        <p>팀</p>
        <p className="text-lg-bold hidden h-72 items-center md:flex">사진</p>
      </div>
      <div className="text-lg-regular flex flex-col justify-between gap-4 md:gap-16">
        <p>{name}</p>
        <p>{email}</p>
        <div className="flex items-center gap-8">
          <ProfileTeams teams={teams} />
        </div>
        <ProfileImageUploader size="sm" currentImage={profileImage} />
      </div>
    </div>
  );
}
