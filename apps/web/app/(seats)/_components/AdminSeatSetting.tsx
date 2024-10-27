import { Radio } from "@ui/index";
import Button from "@ui/src/components/common/Button";
import MultiSelectDropdown from "@ui/src/components/common/Dropdown/MulitiSelectDropdown";
import { useState } from "react";
import Profile from "@/components/common/Profile";

interface AdminSeatSettingProps {
  status: "in-use" | "unavailable" | "available" | "reserved";
  userName: string | null | undefined;
}
const mockName = ["강형욱", "이영훈", "강동원", "조현지"];

export default function AdminSeatSetting({ status, userName }: AdminSeatSettingProps): JSX.Element {
  const [selectName, setSelectName] = useState<string[]>(userName ? [userName] : []);
  const [selectedStatus, setSelectedStatus] = useState("");
  return (
    <>
      <h1 className="text-custom-black my-8 hidden md:block">좌석편집</h1>
      <div className="flex h-screen flex-col p-16 md:p-0">
        <div className="px-8 pb-24 pt-4">
          <Radio.Group
            defaultValue={status}
            onChange={(value) => {
              setSelectedStatus(value);
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
              selectedValue={selectName}
              onSelect={(value: string[]) => {
                setSelectName(value);
              }}
              isMultiSelect={false}
            >
              <MultiSelectDropdown.Toggle title="멤버">
                {selectName.length > 0 ? (
                  <div>
                    <div className="max-h-100 flex flex-wrap gap-10 overflow-y-auto">
                      {selectName.slice(0, 1).map((name) => (
                        <Profile size="size-27" key={name} name={name} textColor="black" />
                      ))}
                    </div>
                  </div>
                ) : (
                  "멤버 선택하기"
                )}
              </MultiSelectDropdown.Toggle>
              <MultiSelectDropdown.Wrapper>
                {[...mockName]
                  .sort((a, b) => {
                    const isASelected = selectName.includes(a);
                    const isBSelected = selectName.includes(b);

                    if (isASelected && !isBSelected) return -1;
                    if (!isASelected && isBSelected) return 1;
                    return 0;
                  })
                  .map((profile) => (
                    <MultiSelectDropdown.Item key={profile} value={profile}>
                      <Profile name={profile} size="size-27" textColor="black" />
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
