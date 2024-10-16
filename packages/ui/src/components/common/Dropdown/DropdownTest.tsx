"use client";

import Dropdown from "@ui/src/components/common/Dropdown";
import { useState } from "react";

export default function DropdownTest(): JSX.Element {
  const [selectedValue, setSelectedValue] = useState("");
  const [selectedValue2, setSelectedValue2] = useState("");
  const [selectedValue3, setSelectedValue3] = useState("어드민");
  const [selectedValue4, setSelectedValue4] = useState("");
  const [selectedValue5, setSelectedValue5] = useState("최신순");

  return (
    <div className="flex flex-col gap-30">
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
        <Dropdown.Toggle title="종료시간">종료시간</Dropdown.Toggle>
        <Dropdown.Wrapper>
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
          <Dropdown.Item value="최신순">멤버</Dropdown.Item>
          <Dropdown.Item value="오래된순">어드민</Dropdown.Item>
        </Dropdown.Wrapper>
      </Dropdown>
    </div>
  );
}
