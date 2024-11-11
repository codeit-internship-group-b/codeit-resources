"use client";

import { type ICategory, type IRoom } from "@repo/types";
import { Input, Radio } from "@ui/index";
import Dropdown from "@ui/src/components/common/Dropdown";
import { Controller, useForm } from "react-hook-form";
import { useEffect, useState } from "react";
import { getAllCategories } from "@/api/meetings";

interface EditItemFormProps {
  defaultItem?: IRoom;
  prevCategory: string;
}

export default function EditItemForm({ prevCategory }: EditItemFormProps): JSX.Element {
  const { register, handleSubmit, setValue } = useForm();

  const [categories, setCategories] = useState<ICategory[]>([]);
  const [currentCategory, setCurrentCategory] = useState(prevCategory);

  const onSubmit = (data: object): void => {
    console.log("submitted", data);
  };

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

    fetchCategories();
  }, []);

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="mb-24">
        <Radio.Group
          defaultValue="available"
          onChange={(value) => {
            setValue("status", value);
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
          selectedValue={currentCategory}
          onSelect={(value) => {
            if (typeof value === "string") {
              setCurrentCategory(value);
              setValue("category", value);
            }
          }}
          isError={false}
          errorMessage="Error"
        >
          <Dropdown.Toggle title="카테고리">{currentCategory}</Dropdown.Toggle>
          <Dropdown.Wrapper>
            {categories.map((category) => {
              return (
                <Dropdown.Item key={category._id} value={category.name}>
                  {category.name}
                </Dropdown.Item>
              );
            })}
          </Dropdown.Wrapper>
        </Dropdown>
      </div>
      <Input {...register("capacity")} name="capacity" placeholder="수용인원" type="text" />
      <Input {...register("location")} name="location" placeholder="위치" type="text" />
      <input type="submit" />
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
