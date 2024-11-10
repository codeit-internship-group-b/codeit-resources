import { type FieldValues, useForm } from "react-hook-form";

export const useCreateForm = (): FieldValues => {
  return useForm({
    mode: "onChange",
    defaultValues: {
      teamName: "",
    },
  });
};
