import { Cog8ToothIcon } from "@heroicons/react/24/solid";
import { Meta, StoryObj } from "@storybook/react";
import { ActionIcon } from "src/components/elements/ActionIcon";

export default {
  title: "Components/Elements/ActionIcon",
  component: ActionIcon,
  tags: ["autodocs"],
  args: {
    children: <Cog8ToothIcon className="h-5 w-5 stroke-white" />,
  },
} as Meta<typeof ActionIcon>;

type Story = StoryObj<typeof ActionIcon>;

export const Default: Story = {
  args: {},
};

export const Sizes: Story = {
  args: {
    size: "xs",
    children: <Cog8ToothIcon className="h-3 w-3 stroke-white" />,
  },
};

export const Themes: Story = {
  args: {
    theme: "success",
  },
};

export const Loading: Story = {
  args: {
    loading: true,
  },
};

export const Disabled: Story = {
  args: {
    disabled: true,
  },
};
