import { Menu, Transition } from "@headlessui/react";
import {
  ChevronDownIcon,
  MagnifyingGlassIcon,
} from "@heroicons/react/20/solid";
import { Bars3Icon } from "@heroicons/react/24/outline";
import { Profile, User } from "@prisma/client";
import clsx from "clsx";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { Fragment, FC, useState } from "react";
import { Button } from "src/components/elements/Button";
import { useLogout } from "src/features/auth/hooks/useLogout";
import { getImagePath } from "src/utils/getImagePath";

type Props = {
  setSidebarOpen: (open: boolean) => void;
  data: {
    user: User | null;
    profile: Profile | null;
  } | null;
};

const userNavigation = [
  { name: "プロフィールへ", component: Link },
  { name: "ログアウト", component: Button },
];

export const Header: FC<Props> = ({ setSidebarOpen, data }) => {
  const { onClickHandler } = useLogout();
  const router = useRouter();
  const [query, setQuery] = useState("");

  const changeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();

    setQuery(e.target.value);
  };

  const submitHandler = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!query) return;

    router.push(`/topics/search?q=${query}`);
  };

  return (
    <div className="sticky top-0 z-40 flex h-16 shrink-0 items-center gap-x-4 border-b border-gray-200 bg-white px-4 shadow-sm sm:gap-x-6 sm:px-6 lg:px-8">
      <button
        className="-m-2.5 p-2.5 text-gray-700 lg:hidden"
        onClick={() => setSidebarOpen(true)}
        type="button"
      >
        <span className="sr-only">Open sidebar</span>
        <Bars3Icon aria-hidden="true" className="h-6 w-6" />
      </button>

      {/* Separator */}
      <div aria-hidden="true" className="h-6 w-px bg-gray-900/10 lg:hidden" />

      <div className="flex flex-1 gap-x-4 self-stretch lg:gap-x-6">
        <form className="relative flex flex-1" onSubmit={submitHandler}>
          <label className="sr-only" htmlFor="search-field">
            Search
          </label>
          <MagnifyingGlassIcon
            aria-hidden="true"
            className="pointer-events-none absolute inset-y-0 left-0 h-full w-5 text-gray-400"
          />
          <input
            className="block h-full w-full border-0 py-0 pl-8 pr-0 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm"
            id="search-field"
            name="search"
            onChange={changeHandler}
            placeholder="タイトルで検索..."
            type="search"
            value={query}
          />
        </form>
        <div className="flex items-center gap-x-4 lg:gap-x-6">
          {/* Separator */}
          <div
            aria-hidden="true"
            className="hidden lg:block lg:h-6 lg:w-px lg:bg-gray-900/10"
          />

          {/* Profile dropdown */}
          <Menu as="div" className="relative">
            <Menu.Button className="-m-1.5 flex items-center p-1.5">
              <span className="sr-only">Open user menu</span>
              {data?.profile?.bio && (
                <span className="relative inline-block">
                  <Image
                    alt={data?.user?.name ?? ""}
                    className="h-8 w-8 rounded-full"
                    height={32}
                    src={`${getImagePath()}/${data?.profile?.bio}`}
                    width={32}
                  />
                  <span className="absolute bottom-0 right-0 block h-1.5 w-1.5 rounded-full bg-green-500 ring-2 ring-white" />
                </span>
              )}
              <span className="hidden lg:flex lg:items-center">
                <span
                  aria-hidden="true"
                  className="ml-4 text-sm font-semibold leading-6 text-gray-900"
                >
                  {data?.user?.name}
                </span>
                <ChevronDownIcon
                  aria-hidden="true"
                  className="ml-2 h-5 w-5 text-gray-400"
                />
              </span>
            </Menu.Button>
            <Transition
              as={Fragment}
              enter="transition ease-out duration-100"
              enterFrom="transform opacity-0 scale-95"
              enterTo="transform opacity-100 scale-100"
              leave="transition ease-in duration-75"
              leaveFrom="transform opacity-100 scale-100"
              leaveTo="transform opacity-0 scale-95"
            >
              <Menu.Items className="absolute right-0 z-10 mt-2.5 w-32 origin-top-right rounded-md bg-white py-2 shadow-lg ring-1 ring-gray-900/5 focus:outline-none">
                {userNavigation.map((item) => (
                  <Menu.Item key={item.name}>
                    {({ active }) =>
                      item.component === Link ? (
                        <Link
                          className={clsx(
                            active ? "bg-gray-50" : "",
                            "block w-full px-3 py-1 text-sm leading-6 text-gray-900"
                          )}
                          href={
                            data?.profile
                              ? `/profiles/${data?.user?.id}`
                              : `/profiles/${data?.user?.id}/?type=create`
                          }
                        >
                          {item.name}
                        </Link>
                      ) : (
                        <button
                          className={clsx(
                            active ? "bg-gray-50" : "",
                            "block w-full px-3 py-1 text-left text-sm leading-6 text-gray-900"
                          )}
                          onClick={onClickHandler}
                        >
                          {item.name}
                        </button>
                      )
                    }
                  </Menu.Item>
                ))}
              </Menu.Items>
            </Transition>
          </Menu>
        </div>
      </div>
    </div>
  );
};
