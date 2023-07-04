import React, { forwardRef } from "react";
import { Loader } from "src/components/elements/Loader";
import { cn } from "src/utils/cn";

const sizes = {
  xs: "p-1",
  sm: "p-1.5",
  md: "p-2",
  lg: "p-2.5",
  xl: "p-3",
};

const rounded = {
  none: "rounded-none",
  sm: "rounded-sm",
  md: "rounded-md",
  lg: "rounded-lg",
  xl: "rounded-xl",
  "2xl": "rounded-2xl",
  "3xl": "rounded-3xl",
  full: "rounded-full",
};

const themes = {
  primary:
    "bg-blue-600 hover:bg-blue-500 text-white focus-visible:outline-blue-600",
  secondary:
    "bg-gray-600 hover:bg-gray-500 text-white focus-visible:outline-gray-600",
  success:
    "bg-green-600 hover:bg-green-500 text-white focus-visible:outline-green-600",
  danger:
    "bg-red-600 hover:bg-red-500 text-white focus-visible:outline-red-600",
  warning:
    "bg-yellow-600 hover:bg-yellow-500 text-white focus-visible:outline-yellow-600",
  transparent: "bg-transparent",
};

type ActionIconProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  radius?: keyof typeof rounded;
  size?: keyof typeof sizes;
  loading?: boolean;
  theme?: keyof typeof themes;
  className?: string;
  sr: string;
};

export const ActionIcon = forwardRef<HTMLButtonElement, ActionIconProps>(
  (
    {
      children,
      radius = "full",
      size = "md",
      loading = false,
      theme = "primary",
      className,
      sr,
      ...props
    },
    ref
  ) => {
    return (
      <button
        ref={ref}
        aria-busy={loading}
        aria-label={sr}
        aria-labelledby={sr}
        className={cn(
          "p-1.5 shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 active:translate-y-0.5 disabled:cursor-not-allowed disabled:opacity-70 disabled:active:translate-y-0  transition-transform duration-75",
          sizes[size],
          rounded[radius],
          themes[theme],
          className
        )}
        disabled={loading || props.disabled}
        {...props}
      >
        <span className="sr-only">
          {loading ? "Loading..." : `${sr}のicon`}
        </span>
        {loading ? (
          <Loader size={size} theme="white" variant="oval" />
        ) : (
          children
        )}
      </button>
    );
  }
);
