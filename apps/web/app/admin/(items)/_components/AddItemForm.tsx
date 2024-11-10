"use client";

import { Input, Radio } from "@ui/index";
import Dropdown from "@ui/src/components/common/Dropdown";
import { useState } from "react";

export default function AddItemForm(): JSX.Element {
  const [category, setCategory] = useState("카테고리 선택");

  return (
    <div>
      <div className="mb-24">
        <Radio.Group defaultValue="available">
          <Radio.Option value="available">사용 가능</Radio.Option>
          <Radio.Option value="in-use">사용 중</Radio.Option>
          <Radio.Option value="maintenance">점검 중</Radio.Option>
        </Radio.Group>
      </div>
      <Input name="회의실 이름" placeholder="회의실 이름" type="text" />
      <Input name="설명" placeholder="설명" type="text" />
      <div className="mb-24">
        <Dropdown
          selectedValue={category}
          onSelect={(value) => {
            if (typeof value === "string") {
              setCategory(value);
            }
          }}
          isError={false}
          errorMessage="Error"
        >
          <Dropdown.Toggle title="카테고리">카테고리</Dropdown.Toggle>
          <Dropdown.Wrapper>
            <Dropdown.Item value="Option 1">Option 1</Dropdown.Item>
            <Dropdown.Item value="Option 2">Option 2</Dropdown.Item>
            <Dropdown.Item value="Option 3">Option 3</Dropdown.Item>
          </Dropdown.Wrapper>
        </Dropdown>
      </div>
      <Input name="수용인원" placeholder="수용인원" type="text" />
      <Input name="위치" placeholder="위치" type="text" />
    </div>
  );
}

//  "name": "string",
//  "description": "string",
//  "status": "available",
//  "imageUrl": "string",
//  "category": "string",
//  "capacity": 0,
//  "location": "string"
