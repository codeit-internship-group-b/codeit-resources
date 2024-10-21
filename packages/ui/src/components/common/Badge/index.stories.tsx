import type { Meta, StoryObj } from "@storybook/react";
import Badge from "@ui/src/components/common/Badge/index";

const meta: Meta<typeof Badge> = {
  title: "Components/Badge",
  component: Badge,
  tags: ["autodocs"],
  argTypes: {
    color: {
      control: {
        type: "select",
        options: ["purple", "green", "pink", "yellow", "gray", "blue"],
      },
    },
    shape: {
      control: {
        type: "select",
        options: ["square", "round"],
      },
    },
    colorApplyTo: {
      control: {
        type: "select",
        options: ["font", "background"],
      },
    },
    children: {
      control: "text",
    },
  },
} satisfies Meta<typeof Badge>;

export default meta;
type Story = StoryObj<typeof meta>;

export const purpleRoundFont: Story = {
  args: {
    color: "purple",
    shape: "round",
    colorApplyTo: "font",
    children: "Purple Font Round Badge",
  },
};

export const greenSquareBg: Story = {
  args: {
    color: "green",
    shape: "square",
    colorApplyTo: "background",
    children: "Green Background Square Badge",
  },
};

export const pinkSquareFont: Story = {
  args: {
    color: "pink",
    shape: "square",
    colorApplyTo: "font",
    children: "Pink Font Square Badge",
  },
};

export const yellowRoundBg: Story = {
  args: {
    color: "yellow",
    shape: "round",
    colorApplyTo: "background",
    children: "Yellow Background Round Badge",
  },
};

export const graySquareFont: Story = {
  args: {
    color: "gray",
    shape: "square",
    colorApplyTo: "font",
    children: "Gray Font Square Badge",
  },
};

export const blueRoundBg: Story = {
  args: {
    color: "blue",
    shape: "round",
    colorApplyTo: "background",
    children: "Blue Background Round Badge",
  },
};
