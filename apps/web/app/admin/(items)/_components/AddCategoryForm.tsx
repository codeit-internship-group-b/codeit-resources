"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Button, Input } from "@ui/index";
import { useForm } from "react-hook-form";
import { AxiosError } from "axios";
import { postNewCategory } from "@/api/meetings";
import { notify } from "@/app/store/useToastStore";
import { QUERY_KEYS } from "@/lib/queryKey";

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

  const { mutate: addCategory } = useMutation({
    mutationFn: async (payload: Record<string, string>) => {
      return await postNewCategory(payload);
    },
    onSuccess: () => {
      notify("success", "카테고리가 추가되었습니다!");
      void queryClient.invalidateQueries({ queryKey: QUERY_KEYS.CATEGORIES });
      reset();
    },
    onError: (error) => {
      if (error instanceof AxiosError && error.response) {
        notify("error", String(error.response.data.message));
      } else {
        notify("error", "알 수 없는 오류가 발생했습니다. 다시 시도해주세요.");
      }
    },
  });

  const handleSubmitForm = handleSubmit((data) => {
    const payload = {
      ...data,
      itemType: "room",
    };

    addCategory(payload);
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
