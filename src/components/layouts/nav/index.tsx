import { ChevronRightIcon } from "@heroicons/react/24/outline";

import Link from "next/link";

const mockNavigation = [
  {
    name: "Dashboard",
    href: "/dashboard",
    icon: ChevronRightIcon,
    color: "text-indigo-500",
  },
  {
    name: "Settings",
    href: "/settings",
    icon: ChevronRightIcon,
    color: "text-indigo-500",
  },
  {
    name: "Profile",
    href: "/profile",
    icon: ChevronRightIcon,
    color: "text-indigo-500",
  },
  {
    name: "Sign out",
    href: "/signout",
    icon: ChevronRightIcon,
    color: "text-indigo-500",
  },
];

const navList = mockNavigation.map((item) => (
  <Link
    key={item.name}
    className=" group relative flex  items-center justify-center rounded-md py-1.5 text-xs hover:text-indigo-500 md:py-2 md:text-sm"
    href={`${item.href}`}
  >
    <div className="absolute bottom-0 left-0 h-[1px] w-0" />
    <item.icon className={`mr-2 h-full w-6 ${item.color}`} />
    <div className="flex h-full flex-1 items-center">
      <span className="inline-block flex-1">{item.name}</span>
      <ChevronRightIcon className=" h-4 w-4 stroke-slate-300 group-hover:stroke-indigo-500 md:h-6 md:w-6" />
    </div>
  </Link>
));

export const Nav = () => (
  <nav>
    <div className="grid grid-cols-2 gap-2 md:grid-cols-1">{navList}</div>
  </nav>
);
