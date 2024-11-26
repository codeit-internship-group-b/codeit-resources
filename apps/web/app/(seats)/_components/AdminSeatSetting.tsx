/* eslint-disable @typescript-eslint/no-misused-promises */

import { notify, Radio } from "@ui/index";
import Button from "@ui/src/components/common/Button";
import MultiSelectDropdown from "@repo/ui/src/components/common/Dropdown/MultiSelectDropdown";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { type AdminSeatSettingFormValues } from "@repo/types";
import Profile from "@/components/common/Profile";
import { getMembers } from "@/api/members";
import { patchItem } from "@/api/items";

interface AdminSeatSettingProps {
  itemId: string;
  seatNum: string;
  status: "in-use" | "unavailable" | "available" | "reserved";
  userName: string | null | undefined;
  onClose: () => void;
}

export default function AdminSeatSetting({
  status,
  userName,
  seatNum,
  itemId: id,
  onClose,
}: AdminSeatSettingProps): JSX.Element {
  const queryClient = useQueryClient();

  // TODO: 추후 멤버 페이지에 불러온 데이터로 적용가능한지 확인 후 적용 예정
  const { data: membersData } = useQuery({
    queryKey: ["members", "newest"],
    queryFn: () =>
      getMembers({
        selectedSort: "newest",
      }),
  });

  const initialFormData: AdminSeatSettingFormValues = {
    name: seatNum,
    status,
    user: [
      {
        id: "",
        name: userName ?? "",
        profileImage: null,
      },
    ],
  };

  const { handleSubmit, setValue, watch } = useForm<AdminSeatSettingFormValues>({
    defaultValues: initialFormData,
  });

  const selectedStatus = watch("status");
  const selectedMember = watch("user");

  // 좌석 아이템 수정
  const { mutate: patchItemMutation } = useMutation<string, Error, { itemId: string; formData: FormData }>({
    mutationFn: ({ itemId, formData }) => patchItem(itemId, formData),
    onSuccess: (response: string) => {
      void Promise.all([queryClient.invalidateQueries({ queryKey: ["seats"] })]);
      notify({ type: "success", message: response });
    },
    onError: (error: Error) => {
      notify({ type: "error", message: `오류 발생: ${error.message}` });
    },
  });

  // 폼 전송 로직
  const handleFormSubmit = handleSubmit((data) => {
    if (data.status === "in-use" && !data.user?.[0]?.id) {
      notify({ type: "error", message: "멤버를 선택해주세요" });
      return;
    }

    const formData = new FormData();
    formData.append("status", data.status);
    formData.append("name", data.name);

    if (data.user?.[0]?.id) {
      formData.append("user", data.user[0].id);
    }

    patchItemMutation({ itemId: id, formData });
    onClose();
  });

  return (
    <>
      <h1 className="text-custom-black my-8 hidden md:block">좌석편집</h1>
      <form onSubmit={handleFormSubmit} className="flex h-full flex-col justify-between p-16 md:p-0 md:pb-40">
        <div className="flex flex-col gap-36 px-8 pb-24 pt-4">
          <Radio.Group
            defaultValue={status}
            onChange={(value) => {
              setValue("status", value as AdminSeatSettingFormValues["status"]);
            }}
          >
            <Radio.Option value="available">예약 가능</Radio.Option>
            <Radio.Option value="in-use">고정좌석</Radio.Option>
            <Radio.Option value="unavailable">사용 불가</Radio.Option>
          </Radio.Group>

          {selectedStatus === "in-use" && (
            <MultiSelectDropdown
              selectedValue={
                selectedMember
                  ? selectedMember.map((member) => member.name).filter((name): name is string => name !== undefined)
                  : []
              }
              onSelect={(value: string[]) => {
                const name = value[0];
                const member = membersData?.members.find((m) => m.name === name);

                setValue("user", [
                  {
                    id: member?._id,
                    name: name ?? "",
                    profileImage: typeof member?.profileImage === "string" ? member.profileImage : null,
                  },
                ]);
              }}
              isMultiSelect={false}
            >
              <MultiSelectDropdown.Toggle title="멤버">
                {selectedMember && selectedMember.length > 0 && selectedMember[0]?.name ? (
                  <div>
                    <div className="max-h-100 flex flex-wrap gap-10 overflow-y-auto">
                      {selectedMember.slice(0, 1).map((member) => (
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
                {(membersData?.members ? [...membersData.members] : [])
                  .sort((a, b) => {
                    const isASelected = (selectedMember ?? []).some((selected) => selected.name === a.name);
                    const isBSelected = (selectedMember ?? []).some((selected) => selected.name === b.name);

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
        <Button type="submit" className="h-48" variant="Primary">
          저장하기
        </Button>
      </form>
    </>
  );
}
