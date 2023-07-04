import { Meta, StoryObj } from "@storybook/react";
import { Loader } from "src/components/elements/Loader";

export default {
  title: "Components/Elements/Loader",
  component: Loader,
  tags: ["autodocs"],
} as Meta<typeof Loader>;

type Story = StoryObj<typeof Loader>;

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

export const Variants: Story = {
  args: {
    variant: "dots",
  },
};
