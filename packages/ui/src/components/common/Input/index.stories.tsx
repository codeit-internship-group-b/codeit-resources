import type { Meta, StoryObj } from "@storybook/react";
import Input from "./";

const meta = {
  title: "Input",
  component: Input,
  tags: ["autodocs"],
} satisfies Meta<typeof Input>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    id: "participant",
    type: "text",
    isError: false,
    placeholder: "참여자",
    errorMessage: "",
    value: "",
  },
};

export const WithError: Story = {
  args: {
    id: "participant-error",
    type: "password",
    isError: true,
    placeholder: "참여자",
    errorMessage: "에러가 발생했습니다.",
    value: "에러 예시",
  },
};
