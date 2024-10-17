import { useState } from "react";
import { Meta, StoryObj } from "@storybook/react";
import Dropdown from "./";

const meta: Meta<typeof Dropdown> = {
  title: "Dropdown",
  component: Dropdown,
  tags: ["autodocs"],
};
export default meta;

type Story = StoryObj<typeof Dropdown>;

export const Default: Story = {
  render: () => {
    const [selectedValue, setSelectedValue] = useState("");

    return (
      <Dropdown selectedValue={selectedValue} onSelect={(value: string) => setSelectedValue(value)}>
        <Dropdown.Toggle title="미팅제목">최신순</Dropdown.Toggle>
        <Dropdown.Wrapper>
          <Dropdown.Item value="아이템 1">아이템 1</Dropdown.Item>
          <Dropdown.Item value="아이템 2">아이템 2</Dropdown.Item>
          <Dropdown.Item value="아이템 3">아이템 3</Dropdown.Item>
        </Dropdown.Wrapper>
      </Dropdown>
    );
  },
  args: {},
};
