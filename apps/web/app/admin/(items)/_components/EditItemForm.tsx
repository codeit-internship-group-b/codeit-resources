"use client";

import { type TItemStatus } from "@repo/types";
import { Button, Input, Radio } from "@ui/index";
import Dropdown from "@ui/src/components/common/Dropdown";
import { useForm } from "react-hook-form";
import { useEffect } from "react";
import useMeetingsStore from "../_store/useMeetingsStore";

export default function EditItemForm(): JSX.Element {
  const { panelState, currentItem, categories, currentCategory } = useMeetingsStore();

  const { register, handleSubmit, setValue, reset } = useForm({
    defaultValues: {
      name: currentItem ? currentItem.name : "",
      description: currentItem ? currentItem.description : "",
      capacity: currentItem ? currentItem.capacity : 1,
      location: currentItem ? currentItem.location : "",
      status: currentItem ? currentItem.status : "available",
      category: currentItem ? currentItem.category._id : categories[1]?._id,
    },
  });

  useEffect(() => {
    if (panelState === "add") {
      reset({
        name: "",
        description: "",
        capacity: 1,
        location: "",
        status: "available",
        category: categories[1]?._id ?? "",
      });
    } else if (panelState === "edit" && currentItem) {
      reset({
        name: currentItem.name,
        description: currentItem.description,
        capacity: currentItem.capacity,
        location: currentItem.location,
        status: currentItem.status,
        category: currentItem.category._id,
      });
    }
  }, [panelState, currentItem, reset, categories]);

  const handleFormSubmit = handleSubmit((data) => {
    if (panelState === "add") {
      console.log("add", data);
      return data;
    }
  });

  return (
    <form onSubmit={() => handleSubmit} className="flex h-full flex-col justify-between">
      <div>
        <h1>회의실 {panelState === "add" ? "추가" : "수정"}</h1>
        <div className="my-20">
          <Radio.Group
            defaultValue={currentItem ? currentItem.status : "available"}
            {...register("status")}
            onChange={(value) => {
              setValue("status", value as TItemStatus);
            }}
          >
            <Radio.Option value="available">사용 가능</Radio.Option>
            <Radio.Option value="maintenance">사용 불가</Radio.Option>
          </Radio.Group>
        </div>
        <Input {...register("name", { required: true })} name="name" placeholder="회의실 이름" type="text" />
        <Input {...register("description")} name="description" placeholder="설명" type="text" />
        <div className="mb-24">
          <Dropdown
            selectedValue={currentItem?.category.name ?? currentCategory?.name ?? ""}
            onSelect={(value) => {
              const selectedCategory = categories.find((category) => category._id === value);
              if (selectedCategory) {
                setValue("category", selectedCategory.name);
              }
            }}
            isError={false}
            errorMessage="Error"
          >
            <Dropdown.Toggle title="카테고리">{currentItem ? currentItem.category.name : ""}</Dropdown.Toggle>
            <Dropdown.Wrapper>
              {categories.map((category) => {
                return (
                  <Dropdown.Item key={category._id} value={category._id}>
                    {category.name}
                  </Dropdown.Item>
                );
              })}
            </Dropdown.Wrapper>
          </Dropdown>
        </div>
        <Input {...register("capacity")} name="capacity" placeholder="수용인원" type="text" />
        <Input {...register("location")} name="location" placeholder="위치" type="text" />
      </div>
      <Button type="submit" variant="Action">
        회의실 {panelState === "add" ? "추가" : "수정"}
      </Button>
    </form>
  );
}

// "name": "string",
//   "description": "string",
//   "status": "available",
//   "imageUrl": "string",
//   "category": "string",
//   "capacity": 0,
//   "location": "string"
