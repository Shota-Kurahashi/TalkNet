import React, { ReactNode, forwardRef } from "react";
import { Loader } from "src/components/elements/Loader";
import { cn } from "src/utils/cn";

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
  primary: "focus-visible:ring-blue-600",
  secondary: "focus-visible:ring-gray-600",
  success: "focus-visible:ring-green-600",
  danger: "focus-visible:ring-red-600",
  warning: "focus-visible:ring-yellow-600",
  transparent: "bg-transparent",
};

type IconProps = {
  leftIcon?: ReactNode;
  rightIcon?: ReactNode;
};

type ActionIconProps = React.InputHTMLAttributes<HTMLInputElement> & {
  radius?: keyof typeof rounded;
  loading?: boolean;
  theme?: keyof typeof themes;
  className?: string;
  sr: string;
  iconActions?: {
    left?: () => void;
    right?: () => void;
  };
  classNames?: {
    wrapper?: string;
    leftIconWrapper?: string;
    rightIconWrapper?: string;
  };
} & IconProps;

export const Input = forwardRef<HTMLInputElement, ActionIconProps>(
  (
    {
      radius = "md",
      loading = false,
      leftIcon,
      rightIcon,
      theme = "primary",
      className,
      classNames,
      sr,
      iconActions,
      ...props
    },
    ref
  ) => {
    const LeftComponent = iconActions?.left ? "button" : "div";
    const RightComponent = iconActions?.right ? "button" : "div";

    return rightIcon || leftIcon ? (
      <>
        <span className="sr-only">{sr}</span>
        <div
          className={cn("relative rounded-md shadow-sm", classNames?.wrapper)}
        >
          <LeftComponent
            className={cn(
              "absolute inset-y-0 left-0 flex items-center pl-3",
              iconActions?.left ? "cursor-pointer" : "pointer-events-none",
              classNames?.leftIconWrapper
            )}
            onClick={iconActions?.left}
          >
            {loading ? <Loader size="sm" /> : leftIcon}
          </LeftComponent>
          <input
            ref={ref}
            className={cn(
              "block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset sm:text-sm sm:leading-6 disabled:cursor-not-allowed disabled:bg-gray-50 disabled:text-gray-500 disabled:ring-gray-200",
              rounded[radius],
              themes[theme],
              leftIcon ? "pl-10" : "",
              rightIcon ? "pr-10" : "",
              className
            )}
            disabled={loading || props.disabled}
            id={props.id}
            name={props.name}
            placeholder={props.placeholder}
            type={props.type}
            {...props}
          />
          <RightComponent
            className={cn(
              " absolute inset-y-0 right-0 flex items-center pr-3",
              iconActions?.right ? "cursor-pointer" : "pointer-events-none",
              classNames?.rightIconWrapper
            )}
            onClick={iconActions?.right}
          >
            {!loading && rightIcon}
          </RightComponent>
        </div>
      </>
    ) : (
      <>
        <span className="sr-only">{sr}</span>
        <input
          ref={ref}
          className={cn(
            "block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset sm:text-sm sm:leading-6",
            rounded[radius],
            themes[theme],
            className
          )}
          id={props.id}
          name={props.name}
          placeholder={props.placeholder}
          type={props.type}
        />
      </>
    );
  }
);
