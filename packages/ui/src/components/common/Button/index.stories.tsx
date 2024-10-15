import type { Meta, StoryObj } from "@storybook/react";
import Button from "./index";

const meta = {
  title: "Components/Button",
  component: Button,
  tags: ["autodocs"],
  argTypes: {
    variant: {
      control: {
        type: "select",
        options: ["Action", "primary", "secondary", "Tertiary", "TertiaryColor", "Text", "TextColor"],
      },
    },
    isActive: {
      control: "boolean",
    },
    children: {
      control: "text",
    },
  },
} satisfies Meta<typeof Button>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {
    variant: "primary",
    isActive: true,
    children: "Primary Button",
  },
};

export const secondary: Story = {
  args: {
    variant: "secondary",
    isActive: true,
    children: "Secondary Button",
  },
};

export const Action: Story = {
  args: {
    variant: "Action",
    isActive: true,
    children: "Action Button",
  },
};

export const Tertiary: Story = {
  args: {
    variant: "Tertiary",
    isActive: true,
    children: "Tertiary Button",
  },
};

export const TertiaryColor: Story = {
  args: {
    variant: "TertiaryColor",
    isActive: true,
    children: "TertiaryColor Button",
  },
};

export const TextButton: Story = {
  args: {
    variant: "Text",
    isActive: true,
    children: "Text Button",
  },
};

export const TextColor: Story = {
  args: {
    variant: "TextColor",
    isActive: true,
    children: "TextColor Button",
  },
};

export const Disabled: Story = {
  args: {
    variant: "primary",
    isActive: false,
    children: "Disabled Button",
  },
};
