import ProfileImageUploader from "@/app/admin/members/_components/sidepanel/ProfileImageUploader";
import { useSuspenseUserQuery } from "../_hooks/useUserQueries";
import { useProfileImage } from "../_hooks/useProfileImage";
import ProfileTeams from "./ProfileTeams";

export default function ProfileDetails(): JSX.Element {
  const { data: user } = useSuspenseUserQuery();
  const { email, name, teams, profileImage = "" } = user;
  const { currentImage, handleImageChange } = useProfileImage(profileImage);

  return (
    <>
      <div className="flex items-center gap-48">
        <span className="text-lg-bold hidden h-72 items-center md:flex">사진</span>
        <ProfileImageUploader size="sm" currentImage={currentImage} onImageChange={handleImageChange} />
      </div>
      <div className="rounded-8 bg-gray-60 flex gap-16 border border-[#E4E3E8] px-16 py-12 md:gap-32 md:border-none md:bg-inherit md:p-0">
        <div className="text-md-bold md:text-lg-bold md:text-custom-black flex flex-col justify-center gap-4 text-[#818084] md:gap-16">
          <span>이름</span>
          <span>이메일</span>
          <span>팀</span>
        </div>
        <div className="text-lg-regular flex flex-col justify-between gap-4 md:gap-16">
          <span>{name}</span>
          <span>{email}</span>
          <div className="flex items-center gap-8">
            <ProfileTeams teams={teams} />
          </div>
        </div>
      </div>
    </>
  );
}
