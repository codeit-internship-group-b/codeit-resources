"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Button, Input } from "@ui/index";
import { useForm } from "react-hook-form";
import { type AxiosError } from "axios";
import { postNewCategory } from "@/api/meetings";
import { notify } from "@/app/store/useToastStore";

export default function AddCategoryForm(): JSX.Element {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm({
    defaultValues: {
      name: "",
    },
  });
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: async (payload: Record<string, string>) => {
      return await postNewCategory(payload);
    },
    onSuccess: async () => {
      notify("success", "카테고리가 추가되었습니다!");
      await queryClient.invalidateQueries({ queryKey: ["categories"] });
      reset();
    },
    onError: (error: AxiosError) => {
      if (error.response?.status === 409) {
        notify("error", "이미 존재하는 카테고리입니다.");
      } else {
        notify("error", "요청에 실패했습니다.");
      }
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
        <Input
          placeholder="카테고리명"
          {...register("name", { required: true })}
          name="name"
          error={errors.name}
          disabled={isSubmitting}
        />
      </div>
      <Button variant="Action" type="submit" disabled={isSubmitting} isPending={isSubmitting}>
        카테고리 추가
      </Button>
    </form>
  );
}
