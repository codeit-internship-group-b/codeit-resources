"use client";

import { type ICategory, type TItemStatus } from "@repo/types";
import { Button, Input, Radio, notify } from "@ui/index";
import Dropdown from "@ui/src/components/common/Dropdown";
import { useForm } from "react-hook-form";
import { useEffect, useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { patchRoom, postNewRoom } from "@/api/meetings";
import useMeetingsStore from "../_store/useMeetingsStore";

export default function EditItemForm(): JSX.Element {
  const { panelState, currentItem, categories, currentCategory } = useMeetingsStore();
  const [selectedCategory, setSelectedCategory] = useState<ICategory>();
  const queryClient = useQueryClient();

  const { register, handleSubmit, setValue, reset } = useForm({
    defaultValues: {
      name: currentItem?.name ?? "",
      description: currentItem?.description ?? "",
      capacity: currentItem?.capacity ?? 1,
      location: currentItem?.location ?? "",
      status: currentItem?.status ?? "available",
      category: currentCategory?._id,
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
        category: currentCategory?._id,
      });
    }
  }, [panelState, currentItem, currentCategory, reset]);

  const mutation = useMutation({
    mutationFn: async (payload: Record<string, string>) => {
      if (panelState === "add") {
        return await postNewRoom("room", payload);
      }

      if (panelState === "edit" && currentItem) {
        return await patchRoom(currentItem._id, payload);
      }

      throw new Error("Unknown panel state");
    },
    onSuccess: async () => {
      notify({ type: "success", message: panelState === "add" ? "등록완료!" : "수정완료!" });
      await queryClient.invalidateQueries({ queryKey: ["rooms"] });
    },
    onError: () => {
      notify({ type: "error", message: "잘못된 요청입니다." });
    },
  });

  const handleFormSubmit = handleSubmit((data) => {
    const payload = {
      ...data,
      category: selectedCategory?._id ?? String(currentCategory?._id),
      capacity: String(data.capacity),
    };

    mutation.mutate(payload);
  });

  return (
    <form onSubmit={handleFormSubmit} className="flex h-full flex-col justify-between">
      <div>
        <h1>회의실 {panelState === "add" ? "추가" : "수정"}</h1>
        <div className="my-20">
          <Radio.Group
            defaultValue={currentItem ? currentItem.status : "available"}
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
            selectedValue={currentCategory?.name}
            onSelect={(value) => {
              const selectedValue = categories.find((category) => category._id === value);
              if (selectedValue) {
                setSelectedCategory(selectedValue);
                setValue("category", String(value));
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
