import { type FieldValues, type SubmitHandler, useForm } from "react-hook-form";
import { useSignInMutation } from "./useSignInMutation";

export const useSignInForm = (): FieldValues => {
  const {
    register,
    formState: { errors },
    handleSubmit,
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

  const { mutate: postSignInMutate } = useSignInMutation();

  const onSignInSubmit: SubmitHandler<FieldValues> = (payload) => {
    postSignInMutate(payload);
  };

  return { registers, errors, onSignInSubmit, handleSubmit };
};
