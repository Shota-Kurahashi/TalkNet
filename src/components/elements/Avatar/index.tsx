import Image from "next/image";
import React, { FC } from "react";
import { cn } from "src/utils/cn";

type Props = {
  src?: string;
  alt?: string;
  className?: string;
  width?: number;
  height?: number;
  online?: boolean;
};

export const Avatar: FC<Props> = ({
  src,
  alt = "Avatar",
  className,
  width = 32,
  height = 32,
  online = true,
}) => {
  return src ? (
    <span className="relative inline-block">
      <Image
        alt={alt}
        className={cn("h-8 w-8 rounded-full", className)}
        height={height}
        src={src}
        width={width}
      />
      {online && (
        <span className="absolute bottom-0 right-0 block h-1.5 w-1.5 rounded-full bg-green-500 ring-2 ring-white" />
      )}
    </span>
  ) : (
    <span className="inline-block h-8 w-8 overflow-hidden rounded-full bg-gray-100">
      <svg
        className="h-full w-full text-gray-300"
        fill="currentColor"
        viewBox="0 0 24 24"
      >
        <path d="M24 20.993V24H0v-2.996A14.977 14.977 0 0112.004 15c4.904 0 9.26 2.354 11.996 5.993zM16.002 8.999a4 4 0 11-8 0 4 4 0 018 0z" />
      </svg>
    </span>
  );
};
