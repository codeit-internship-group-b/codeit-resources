import { Radio } from "@ui/index";
import Button from "@ui/src/components/common/Button";
import MultiSelectDropdown from "@ui/src/components/common/Dropdown/MulitiSelectDropdown";
import { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { type StaticImageData, type StaticRequire } from "next/dist/shared/lib/get-img-props";
import Profile from "@/components/common/Profile";
import { getMembers } from "@/api/members";

interface AdminSeatSettingProps {
  status: "in-use" | "unavailable" | "available" | "reserved";
  userName: string | null | undefined;
}

interface SelectedMember {
  name: string;
  profileImage: string | StaticRequire | StaticImageData | undefined | null;
}

export default function AdminSeatSetting({ status, userName }: AdminSeatSettingProps): JSX.Element {
  const [selectedMembers, setSelectedMembers] = useState<SelectedMember[]>(
    userName ? [{ name: userName, profileImage: null }] : [],
  );
  const [selectedStatus, setSelectedStatus] = useState(status);

  // TODO: 추후 멤버 페이지에 불러온 데이터로 적용가능한지 확인 후 적용 예정
  const { data: membersData } = useQuery({
    queryKey: ["members", "newest"],
    queryFn: () => getMembers("newest"),
  });

  // 임시로 useEffect로 돌려서 프로필 사진 넣어줌.
  useEffect(() => {
    if (userName && membersData) {
      const userInfo = membersData.find((member) => member.name === userName);
      if (userInfo) {
        setSelectedMembers([
          {
            name: userName,
            profileImage: userInfo.profileImage,
          },
        ]);
      }
    }
  }, [userName, membersData]);

  return (
    <>
      <h1 className="text-custom-black my-8 hidden md:block">좌석편집</h1>
      <div className="flex h-screen flex-col p-16 md:p-0">
        <div className="px-8 pb-24 pt-4">
          <Radio.Group
            defaultValue={status}
            onChange={(value) => {
              setSelectedStatus(value as "in-use" | "unavailable" | "available" | "reserved");
            }}
          >
            <Radio.Option value="available">예약 가능</Radio.Option>
            <Radio.Option value="in-use">고정좌석</Radio.Option>
            <Radio.Option value="unavailable">사용 불가</Radio.Option>
          </Radio.Group>
        </div>
        <div className="grow">
          {(selectedStatus === "in-use" || status === "in-use") && (
            <MultiSelectDropdown
              selectedValue={selectedMembers.map((member) => member.name)} // 이름만 전달
              onSelect={(value: string[]) => {
                const newSelectedMembers = value.map((name) => {
                  const member = membersData?.find((m) => m.name === name);
                  return {
                    name,
                    profileImage: member?.profileImage ?? null,
                  };
                });
                setSelectedMembers(newSelectedMembers);
              }}
              isMultiSelect={false}
            >
              <MultiSelectDropdown.Toggle title="멤버">
                {selectedMembers.length > 0 ? (
                  <div>
                    <div className="max-h-100 flex flex-wrap gap-10 overflow-y-auto">
                      {selectedMembers.slice(0, 1).map((member) => (
                        <Profile
                          size="size-27"
                          key={member.name}
                          name={member.name}
                          textColor="black"
                          src={typeof member.profileImage === "string" ? member.profileImage : null}
                        />
                      ))}
                    </div>
                  </div>
                ) : (
                  "멤버 선택하기"
                )}
              </MultiSelectDropdown.Toggle>
              <MultiSelectDropdown.Wrapper>
                {(membersData ? [...membersData] : [])
                  .sort((a, b) => {
                    const isASelected = selectedMembers.some((selected) => selected.name === a.name);
                    const isBSelected = selectedMembers.some((selected) => selected.name === b.name);

                    if (isASelected && !isBSelected) return -1;
                    if (!isASelected && isBSelected) return 1;
                    return 0;
                  })
                  .map((member) => (
                    <MultiSelectDropdown.Item key={member.name} value={member.name}>
                      <Profile
                        name={member.name}
                        size="size-27"
                        textColor="black"
                        src={typeof member.profileImage === "string" ? member.profileImage : null}
                      />
                    </MultiSelectDropdown.Item>
                  ))}
              </MultiSelectDropdown.Wrapper>
            </MultiSelectDropdown>
          )}
        </div>
        <Button className="h-48" variant="Primary">
          저장하기
        </Button>
      </div>
    </>
  );
}
