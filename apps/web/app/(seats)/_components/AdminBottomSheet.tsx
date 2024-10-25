"use client";

import { Radio } from "@ui/index";
import Button from "@ui/src/components/common/Button";
import { Sheet } from "react-modal-sheet";
import MultiSelectDropdown from "@ui/src/components/common/Dropdown/MulitiSelectDropdown";
import { useState } from "react";
import Profile from "@/components/common/Profile";

interface SnapSheetProps {
  isOpen: boolean;
  onClose: () => void;
  status: "in-use" | "unavailable" | "available" | "reserved";
}
const mockName = ["강형욱", "이영훈", "강동원", "조현지"];

export default function AdminBottomSheet({ isOpen, onClose, status }: SnapSheetProps): JSX.Element {
  const [selectName, setSelectName] = useState<string[]>([]);
  return (
    <Sheet isOpen={isOpen} onClose={onClose}>
      <Sheet.Container>
        <Sheet.Header />
        <Sheet.Content>
          <div className="mb-24 mt-20 flex justify-center">
            <Radio.Group defaultValue={status}>
              <Radio.Option value="available">예약 가능</Radio.Option>
              <Radio.Option value="in-use">고정좌석</Radio.Option>
              <Radio.Option value="unavailable">사용 불가</Radio.Option>
            </Radio.Group>
          </div>
          <div className="flex h-screen flex-col p-16">
            <div className="grow">
              <MultiSelectDropdown
                selectedValue={selectName}
                onSelect={(value: string[]) => {
                  setSelectName(value);
                }}
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
                  {[...mockName].map((profile) => (
                    <MultiSelectDropdown.Item key={profile} value={profile}>
                      <Profile name={profile} size="size-27" textColor="black" />
                    </MultiSelectDropdown.Item>
                  ))}
                </MultiSelectDropdown.Wrapper>
              </MultiSelectDropdown>
            </div>
            <Button className="h-48" variant="Primary">
              저장하기
            </Button>
          </div>
        </Sheet.Content>
      </Sheet.Container>
      <Sheet.Backdrop />
    </Sheet>
  );
}
