import DefaultProfileImage from "@ui/public/images/image_default_profile.png";
import ProfileImageUploader from "@/app/admin/members/_components/sidepanel/ProfileImageUploader";

export default function ProfileInfoSkeleton(): JSX.Element {
  return (
    <>
      <div className="flex items-center gap-48">
        <p className="text-lg-bold hidden h-72 items-center md:flex">사진</p>
        <ProfileImageUploader size="sm" currentImage={DefaultProfileImage} />
      </div>
      <div className="rounded-8 bg-gray-60 flex gap-16 border border-[#E4E3E8] px-16 py-12 md:gap-32 md:border-none md:bg-inherit md:p-0">
        <div className="text-md-bold md:text-lg-bold md:text-custom-black flex flex-col justify-center gap-4 text-[#818084] md:gap-16">
          <p>이름</p>
          <p>이메일</p>
          <p>팀</p>
        </div>
        <div className="flex flex-col justify-between gap-4 py-4 md:gap-16 md:py-8">
          <div className="w-84 bg-gray-10 h-12 rounded-full" />
          <div className="w-84 bg-gray-10 h-12 rounded-full" />
          <div className="w-84 bg-gray-10 h-12 rounded-full" />
        </div>
      </div>
    </>
  );
}
