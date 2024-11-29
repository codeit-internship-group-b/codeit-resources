"use client";

import { type IEquipment, type ICategory, type IRoom, type TItemStatus } from "@repo/types";
import { Button, Input, Radio, notify } from "@ui/index";
import Dropdown from "@ui/src/components/common/Dropdown";
import { type FieldValues, useForm } from "react-hook-form";
import { useEffect, useState } from "react";
import { getAllCategories } from "@/api/meetings";

interface EditItemFormProps {
  panelState: string;
  prevCategory: ICategory;
  defaultItem?: IRoom;
  onSubmit: (data: FormData, itemId?: string) => Promise<IRoom | IEquipment>;
}

export default function EditItemForm({
  panelState,
  defaultItem,
  prevCategory,
  onSubmit,
}: EditItemFormProps): JSX.Element {
  const { register, handleSubmit, setValue } = useForm({
    defaultValues: {
      name: defaultItem ? defaultItem.name : "",
      description: defaultItem ? defaultItem.description : "",
      capacity: defaultItem ? defaultItem.capacity : 1,
      location: defaultItem ? defaultItem.location : "",
      status: defaultItem ? defaultItem.status : "available",
      category: defaultItem ? defaultItem.category._id : prevCategory._id,
    },
  });

  const [categories, setCategories] = useState<ICategory[]>([]);
  const [currentCategory, setCurrentCategory] = useState<ICategory>(prevCategory);

  useEffect(() => {
    if (defaultItem) {
      setValue("name", defaultItem.name);
      setValue("description", defaultItem.description);
      setValue("capacity", defaultItem.capacity);
      setValue("location", defaultItem.location);
      setValue("status", defaultItem.status);
      setValue("category", defaultItem.category._id);
    }
  }, [defaultItem, setValue]);

  useEffect(() => {
    const fetchCategories = async (): Promise<void> => {
      try {
        const res = await getAllCategories();
        const roomCategories = res.filter((item) => item.itemType === "room");
        setCategories(roomCategories);
      } catch (error) {
        throw new Error();
      }
    };

    void fetchCategories();
  }, []);

  const handleFormSubmit = async (data: FieldValues): Promise<void> => {
    const formData = new FormData();
    Object.entries(data).forEach(([key, value]) => {
      formData.set(key, value as string);
    });
    formData.set("category", currentCategory._id);
    // formData.set("status", defaultItem ? defaultItem.status : "available");
    try {
      const res = await onSubmit(formData, defaultItem?._id);
      console.log(res);
    } catch (error) {
      notify({ type: "error", message: "제출실패" });
    }
  };

  return (
    <form
      onSubmit={(event) => void handleSubmit(handleFormSubmit)(event)}
      className="flex h-full flex-col justify-between"
    >
      <div>
        <h1>회의실 {panelState === "add" ? "추가" : "수정"}</h1>
        <div className="my-20">
          <Radio.Group
            defaultValue={defaultItem ? defaultItem.status : "available"}
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
            selectedValue={currentCategory.name}
            onSelect={(value) => {
              const selectedCategory = categories.find((category) => category._id === value);
              if (selectedCategory) {
                setCurrentCategory(selectedCategory);
                setValue("category", value as string);
              }
            }}
            isError={false}
            errorMessage="Error"
          >
            <Dropdown.Toggle title="카테고리">{currentCategory.name}</Dropdown.Toggle>
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
