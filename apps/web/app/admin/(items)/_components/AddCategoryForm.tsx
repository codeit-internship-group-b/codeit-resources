"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Button, Input } from "@ui/index";
import { useForm } from "react-hook-form";
import { postNewCategory } from "@/api/meetings";
import { notify } from "@/app/store/useToastStore";

export default function AddCategoryForm(): JSX.Element {
  const { register, handleSubmit } = useForm();
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: async (payload: Record<string, string>) => {
      return await postNewCategory(payload);
    },
    onSuccess: async () => {
      notify("success", "카테고리가 추가되었습니다!");
      await queryClient.invalidateQueries({ queryKey: ["categories"] });
    },
    onError: () => {
      notify("error", "요청에 실패했습니다.");
    },
  });

  const handleSubmitForm = handleSubmit((data) => {
    const payload = {
      ...data,
      itemType: "room",
    };

    mutation.mutate(payload);
  });

  return (
    <form onSubmit={handleSubmitForm} className="flex h-full flex-col justify-between">
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
