"use client";
import React, { useState } from "react";
import Dropdown from "@ui/src/components/common/Dropdown";
import Input from "@ui/src/components/common/Input";

export default function Home(): JSX.Element {
  const [selectedValue, setSelectedValue] = useState("");
  const [selectedValue2, setSelectedValue2] = useState("");

  return (
    <div>
      <div className="flex flex-col gap-30 m-30">
        <Input id="name" placeholder="참여자" />
        <Input id="name" placeholder="참여자" isError errorMessage="에러 예시" />
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
      </div>
    </div>
  );
}
