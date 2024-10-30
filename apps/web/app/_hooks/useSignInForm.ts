import { type FieldValues, useForm } from "react-hook-form";

export const useSignInForm = (): FieldValues => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    mode: "onBlur",
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const registers = {
    email: register("email"),
    password: register("password"),
  };

  return { registers, handleSubmit, errors };
};
