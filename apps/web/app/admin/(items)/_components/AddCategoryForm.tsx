"use client";

import { Button, Input } from "@ui/index";
import { useForm } from "react-hook-form";

export default function AddCategoryForm(): JSX.Element {
  const { register } = useForm();
  return (
    <form className="flex h-full flex-col justify-between">
      <div>
        <h1 className="my-24">카테고리 추가</h1>
        <Input placeholder="카테고리명" {...register("name")} name="name" />
      </div>
      <Button variant="Action" type="submit">
        카테고리 추가
      </Button>
    </form>
  );
}
