import {
  FaceFrownIcon,
  FaceSmileIcon as FaceSmileIconMini,
  FireIcon,
  HandThumbUpIcon,
  HeartIcon,
  XMarkIcon,
} from "@heroicons/react/20/solid";

import { HandThumbDownIcon } from "@heroicons/react/24/solid";

export type GenMood = {
  icon: React.ForwardRefExoticComponent<
    Omit<React.SVGProps<SVGSVGElement>, "ref"> & {
      title?: string | undefined;
      titleId?: string | undefined;
    } & React.RefAttributes<SVGSVGElement>
  >;
  iconColor: string;
  bgColor: string;
  id: number;
};

export const genMood = (id: number): GenMood => {
  switch (id) {
    case 1:
      return {
        id: 1,
        icon: FireIcon,
        iconColor: "text-white",
        bgColor: "bg-red-500",
      };
    case 2:
      return {
        id: 2,
        icon: HeartIcon,
        iconColor: "text-white",
        bgColor: "bg-pink-400",
      };
    case 3:
      return {
        id: 3,
        icon: FaceSmileIconMini,
        iconColor: "text-white",
        bgColor: "bg-green-400",
      };
    case 4:
      return {
        id: 4,
        icon: FaceFrownIcon,
        iconColor: "text-white",
        bgColor: "bg-yellow-400",
      };
    case 5:
      return {
        id: 5,
        icon: HandThumbUpIcon,
        iconColor: "text-white",
        bgColor: "bg-blue-500",
      };

    case 6:
      return {
        id: 6,
        icon: HandThumbDownIcon,
        iconColor: "text-white",
        bgColor: "bg-indigo-500",
      };
    default:
      return {
        id: 7,
        icon: XMarkIcon,
        iconColor: "text-white",
        bgColor: "bg-gray-800",
      };
  }
};

export const parseJpMood = (name: string): string => {
  switch (name) {
    case "Excited":
      return "最高";
    case "Loved":
      return "大好き";
    case "Happy":
      return "幸せ";
    case "Sad":
      return "悲しい";
    case "Good":
      return "いいね！";
    case "Bad":
      return "大嫌い";
    default:
      return "未評価";
  }
};
