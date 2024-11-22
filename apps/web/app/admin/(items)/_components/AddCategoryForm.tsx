"use client";

import { Button, Input } from "@ui/index";
import { useForm } from "react-hook-form";

export default function AddCategoryForm(): JSX.Element {
  const { register } = useForm();
  return (
    <form className="flex flex-col">
      <Input placeholder="카테고리명" {...register("name")} name="name" />
      <Button variant="Action" type="submit">
        카테고리 추가
      </Button>
    </form>
  );
}
