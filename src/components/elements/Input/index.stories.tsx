import { MagnifyingGlassIcon } from "@heroicons/react/24/solid";
import { Meta, StoryObj } from "@storybook/react";
import { Input } from "src/components/elements/Input";

export default {
  title: "Components/Elements/Input",
  component: Input,
  args: { type: "text" },
  tags: ["atuodocs"],
} as Meta<typeof Input>;

type Story = StoryObj<typeof Input>;

export const Default: Story = {};

export const Themes: Story = {
  args: {
    theme: "primary",
  },
};

export const Loading: Story = {
  args: {
    loading: true,
    leftIcon: <MagnifyingGlassIcon className="h-5 w-5" />,
  },
};

export const LeftIcon: Story = {
  args: {
    leftIcon: <MagnifyingGlassIcon className="h-5 w-5" />,
  },
};

export const RightIcon: Story = {
  args: {
    rightIcon: <MagnifyingGlassIcon className="h-5 w-5" />,
  },
};

export const LeftAndRightIcon: Story = {
  args: {
    leftIcon: <MagnifyingGlassIcon className="h-5 w-5" />,
    rightIcon: <MagnifyingGlassIcon className="h-5 w-5" />,
  },
};

export const ActionIconLeft: Story = {
  args: {
    leftIcon: <MagnifyingGlassIcon className="h-5 w-5" />,
    iconActions: {
      left: () => console.log("clicked"),
    },
  },
};

export const ActionIconRight: Story = {
  args: {
    rightIcon: (
      <button onClick={() => console.log("clicked")}>
        <MagnifyingGlassIcon className="h-5 w-5" />
      </button>
    ),
    iconActions: {
      right: () => console.log("clicked"),
    },
  },
};

export const ActionIconLeftAndRight: Story = {
  args: {
    leftIcon: <MagnifyingGlassIcon className="h-5 w-5" />,
    rightIcon: <MagnifyingGlassIcon className="h-5 w-5" />,
    iconActions: {
      left: () => console.log("clicked"),
      right: () => console.log("clicked"),
    },
  },
};
