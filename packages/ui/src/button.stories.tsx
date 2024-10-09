import type { Meta, StoryObj } from '@storybook/react';
import Button from './button';

// 스토리 기본 설정
const meta: Meta<typeof Button> = {
  title: 'Example/Button',
  component: Button,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    appName: { control: 'text' },
    children: { control: 'text' },
  },
};

export default meta;
type Story = StoryObj<typeof Button>;

// 기본 스토리: Primary
export const Primary: Story = {
  args: {
    appName: 'MyApp',
    children: 'Primary Button',
  },
};
