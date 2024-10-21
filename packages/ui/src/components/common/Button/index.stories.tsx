import type { Meta, StoryObj } from "@storybook/react";
import Button from ".";

const meta = {
  title: "Components/Button",
  component: Button,
  tags: ["autodocs"],
  argTypes: {
    variant: {
      control: {
        type: "select",
        options: ["Action", "Primary", "Secondary", "Tertiary", "TertiaryColor", "Text", "TextColor"],
      },
    },
    isActive: {
      control: "boolean",
    },
    children: {
      control: "text",
    },
    as: {
      control: {
        type: "select",
        options: ["button", "a", "div"],
      },
    },
    className: {
      control: "text",
    },
  },
} satisfies Meta<typeof Button>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {
    variant: "Primary",
    isActive: true,
    children: "Primary Button",
  },
};

export const Secondary: Story = {
  args: {
    variant: "Secondary",
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
    variant: "Primary",
    isActive: false,
    children: "Disabled Button",
  },
};

export const LinkButton: Story = {
  args: {
    as: "a",
    href: "#",
    variant: "Primary",
    isActive: true,
    children: "Link Button",
  },
};

export const CustomStyled: Story = {
  args: {
    variant: "Primary",
    className: "my-custom-class",
    isActive: true,
    children: "Custom Styled Button",
  },
};

export const IconButton: Story = {
  args: {
    variant: "Primary",
    isActive: true,
    children: (
      <>
        <span role="img" aria-label="check">
          ✅
        </span>{" "}
        Icon Button
      </>
    ),
  },
};
