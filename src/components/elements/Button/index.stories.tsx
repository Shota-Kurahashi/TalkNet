import { ArrowPathIcon } from "@heroicons/react/24/outline";
import { Meta, StoryObj } from "@storybook/react";
import { Button } from "src/components/elements/Button";

export default {
  title: "Components/Elements/Button",
  component: Button,
  tags: ["autodocs"],
  args: {
    children: "Button",
  },
} as Meta<typeof Button>;

type Story = StoryObj<typeof Button>;

export const Default: Story = {};

export const Sizes: Story = {
  args: {
    size: "xs",
  },
};

export const Themes: Story = {
  args: {
    theme: "success",
  },
};

export const Radius: Story = {
  args: {
    radius: "full",
  },
};

export const Loading: Story = {
  args: {
    loading: true,
  },
};

export const WithLeftIcon: Story = {
  args: {
    leftIcon: <ArrowPathIcon className="h-5 w-5" />,
  },
};

export const WithRightIcon: Story = {
  args: {
    rightIcon: <ArrowPathIcon className="h-5 w-5" />,
  },
};

export const WithBothIcons: Story = {
  args: {
    leftIcon: <ArrowPathIcon className="h-5 w-5" />,
    rightIcon: <ArrowPathIcon className="h-5 w-5" />,
  },
};
