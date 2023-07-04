import { forwardRef } from "react";
import { Loader } from "src/components/elements/Loader";
import { cn } from "src/utils/cn";

const sizes = {
  xs: " px-2 py-1 text-xs",
  sm: "px-2 py-1 text-sm",
  md: "px-2.5 py-1.5 text-sm",
  lg: "px-3 py-2 text-sm",
  xl: "px-3.5 py-2.5 text-sm",
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

type IconProps =
  | { leftIcon: React.ReactElement; rightIcon?: never }
  | { rightIcon: React.ReactElement; leftIcon?: never }
  | { rightIcon?: undefined; leftIcon?: undefined }
  | {
      leftIcon: React.ReactElement;
      rightIcon: React.ReactElement;
    };

export type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  radius?: keyof typeof rounded;
  size?: keyof typeof sizes;
  loading?: boolean;
  theme?: keyof typeof themes;
  className?: string;
} & IconProps;

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      children,
      radius = "md",
      size = "md",
      loading = false,
      theme = "primary",
      leftIcon,
      rightIcon,
      className,
      ...props
    },
    ref
  ) => {
    return (
      <button
        ref={ref}
        {...props}
        className={cn(
          "inline-flex items-center font-semibold text-white shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 active:translate-y-0.5 disabled:cursor-not-allowed disabled:opacity-70 disabled:active:translate-y-0  transition-transform duration-75",
          themes[theme],
          sizes[size],
          rounded[radius],
          (leftIcon || rightIcon) && "gap-x-2",
          className
        )}
        disabled={loading || props.disabled}
      >
        {loading && (
          <Loader className="mr-2" size={size} theme="white" variant="oval" />
        )}
        {!loading && leftIcon}
        {children}
        {!loading && rightIcon}
      </button>
    );
  }
);
