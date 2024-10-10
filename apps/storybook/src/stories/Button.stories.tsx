import { button } from "@repo/ui";
import type { Meta, StoryObj } from "@storybook/react";

const meta = {
  title: "Example/Button",
  component: button,
  tags: ["autodocs"],
} satisfies Meta<typeof button>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {
    appName: "Button",
    children: "I am a primary button.",
  },
};
