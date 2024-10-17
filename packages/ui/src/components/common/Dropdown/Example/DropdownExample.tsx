"use client";

import { useState } from "react";
import Dropdown from "@ui/src/components/common/Dropdown";
import MultiSelectDropdown from "../MulitiSelectDropdown";
import Profile from "./Profile";

const name = ["강형욱", "이영훈", "강동원", "조현지", "한상우", "채종민", "이승현", "이지현"];

export default function DropdownExample(): JSX.Element {
  const [selectedValue, setSelectedValue] = useState("");
  const [selectedValue2, setSelectedValue2] = useState("");
  const [selectedValue3, setSelectedValue3] = useState("어드민");
  const [selectedValue4, setSelectedValue4] = useState("");
  const [selectedValue5, setSelectedValue5] = useState("최신순");
  const [selectedValue6, setSelectedValue6] = useState<string[]>([]);
  const [customTime, setCustomTime] = useState(""); // 사용자가 입력한 시간

  return (
    <div className="gap-30 pb-100 flex flex-col">
      <Dropdown
        selectedValue={selectedValue}
        onSelect={(value: string) => {
          setSelectedValue(value);
        }}
        isError={false}
        errorMessage="에러다 이것아"
      >
        <Dropdown.Toggle title="아이템">Select an option</Dropdown.Toggle>
        <Dropdown.Wrapper>
          <Dropdown.Item value="Option 1">Option 1</Dropdown.Item>
          <Dropdown.Item value="Option 2">Option 2</Dropdown.Item>
          <Dropdown.Item value="Option 3">Option 3</Dropdown.Item>
        </Dropdown.Wrapper>
      </Dropdown>

      <Dropdown
        selectedValue={selectedValue2}
        onSelect={(value: string) => {
          setSelectedValue2(value);
        }}
        isError={false}
        errorMessage="에러다 이것아"
      >
        <Dropdown.Toggle title="종료시간">
          {selectedValue2 === "" ? (
            <input
              type="text"
              value={customTime}
              onChange={(e) => {
                setCustomTime(e.target.value);
              }}
              onBlur={() => {
                setSelectedValue2(customTime);
              }}
              className="w-full focus:outline-none"
            />
          ) : (
            selectedValue2 || "종료시간"
          )}
        </Dropdown.Toggle>
        <Dropdown.Wrapper>
          <Dropdown.Item position="left" value="">
            직접입력
          </Dropdown.Item>
          <Dropdown.Item value="11:30">11:30</Dropdown.Item>
          <Dropdown.Item value="12:30">12:30</Dropdown.Item>
          <Dropdown.Item value="13:30">13:30</Dropdown.Item>
        </Dropdown.Wrapper>
      </Dropdown>

      <Dropdown
        selectedValue={selectedValue3}
        onSelect={(value: string) => {
          setSelectedValue3(value);
        }}
        size="sm"
        errorMessage="에러다 이것아"
      >
        <Dropdown.Toggle>어드민</Dropdown.Toggle>
        <Dropdown.Wrapper className="top-42">
          <Dropdown.Item value="멤버">멤버</Dropdown.Item>
          <Dropdown.Item value="어드민">어드민</Dropdown.Item>
        </Dropdown.Wrapper>
      </Dropdown>

      <Dropdown
        selectedValue={selectedValue4}
        onSelect={(value: string) => {
          setSelectedValue4(value);
        }}
        size="sm"
        errorMessage="에러다 이것아"
      >
        <Dropdown.Toggle iconType="kebab" />
        <Dropdown.Wrapper className="-left-74">
          <Dropdown.Item value="수정">수정</Dropdown.Item>
          <Dropdown.Item value="삭제">삭제</Dropdown.Item>
        </Dropdown.Wrapper>
      </Dropdown>

      <Dropdown
        selectedValue={selectedValue5}
        onSelect={(value: string) => {
          setSelectedValue5(value);
        }}
        size="sm"
        errorMessage="에러다 이것아"
      >
        <Dropdown.Toggle iconType="sort" />
        <Dropdown.Wrapper className="-left-34 top-30">
          <Dropdown.Item value="최신순">최신순</Dropdown.Item>
          <Dropdown.Item value="오래된순">오래된순</Dropdown.Item>
        </Dropdown.Wrapper>
      </Dropdown>

      <MultiSelectDropdown
        selectedValue={selectedValue6}
        onSelect={(value: string[]) => {
          setSelectedValue6(value);
        }}
      >
        <MultiSelectDropdown.Toggle title="멤버">
          {selectedValue6.length > 0 ? (
            <div>
              <div className="max-h-100 flex flex-wrap gap-10 overflow-y-auto">
                {selectedValue6.slice(0, 4).map((profile) => (
                  <Profile size="size-27" key={profile} name={profile} textColor="black" />
                ))}
                {selectedValue6.length > 4 && (
                  <button
                    type="button"
                    onClick={() => {
                      /* 모든 선택된 항목을 보여주는 모달 오픈 이런식으로도 사용 가능*/
                    }}
                  >
                    +{selectedValue6.length - 4}명 더보기
                  </button>
                )}
              </div>
            </div>
          ) : (
            "멤버 선택하기"
          )}
        </MultiSelectDropdown.Toggle>
        <MultiSelectDropdown.Wrapper>
          {[...name]
            .sort((a, b) => {
              const isASelected = selectedValue6.includes(a);
              const isBSelected = selectedValue6.includes(b);

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
    </div>
  );
}
