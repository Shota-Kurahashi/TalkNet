import { Listbox, Transition } from "@headlessui/react";
import {
  FaceFrownIcon,
  FaceSmileIcon as FaceSmileIconMini,
  FireIcon,
  HandThumbUpIcon,
  HeartIcon,
  XMarkIcon,
} from "@heroicons/react/20/solid";
import {
  FaceSmileIcon as FaceSmileIconOutline,
  PaperClipIcon,
} from "@heroicons/react/24/outline";
import clsx from "clsx";
import React, { Fragment, useState } from "react";

const moods = [
  {
    name: "Excited",
    value: "excited",
    icon: FireIcon,
    iconColor: "text-white",
    bgColor: "bg-red-500",
  },
  {
    name: "Loved",
    value: "loved",
    icon: HeartIcon,
    iconColor: "text-white",
    bgColor: "bg-pink-400",
  },
  {
    name: "Happy",
    value: "happy",
    icon: FaceSmileIconMini,
    iconColor: "text-white",
    bgColor: "bg-green-400",
  },
  {
    name: "Sad",
    value: "sad",
    icon: FaceFrownIcon,
    iconColor: "text-white",
    bgColor: "bg-yellow-400",
  },
  {
    name: "Thumbsy",
    value: "thumbsy",
    icon: HandThumbUpIcon,
    iconColor: "text-white",
    bgColor: "bg-blue-500",
  },
  {
    name: "I feel nothing",
    value: null,
    icon: XMarkIcon,
    iconColor: "text-gray-400",
    bgColor: "bg-transparent",
  },
];

export const TopicForm = () => {
  const [selected, setSelected] = useState(moods[5]);

  return (
    <form>
      <div className="border-b border-gray-200 focus-within:border-indigo-600">
        <label className="sr-only" htmlFor="topic">
          トピックを作成
        </label>
        <textarea
          className="block w-full resize-none border-0 border-b border-transparent bg-transparent p-0 pb-2 text-gray-900 placeholder:text-gray-400 focus:border-indigo-600 focus:ring-0 sm:text-sm sm:leading-6"
          defaultValue=""
          id="topic"
          placeholder="話題を投稿..."
          rows={3}
        />
      </div>
      <div className="flex justify-between pt-2">
        <div className="flex items-center space-x-5">
          <div className="flow-root">
            <button
              className="-m-2 inline-flex h-10 w-10 items-center justify-center rounded-full text-gray-400 hover:text-gray-500"
              type="button"
            >
              <PaperClipIcon aria-hidden="true" className="h-6 w-6" />
              <span className="sr-only">Attach a file</span>
            </button>
          </div>
          <div className="flow-root">
            <Listbox onChange={setSelected} value={selected}>
              {({ open }) => (
                <>
                  <Listbox.Label className="sr-only">Your mood</Listbox.Label>
                  <div className="relative">
                    <Listbox.Button className="relative -m-2 inline-flex h-10 w-10 items-center justify-center rounded-full text-gray-400 hover:text-gray-500">
                      <span className="flex items-center justify-center">
                        {selected.value === null ? (
                          <span>
                            <FaceSmileIconOutline
                              aria-hidden="true"
                              className="h-6 w-6 shrink-0"
                            />
                            <span className="sr-only">Add your mood</span>
                          </span>
                        ) : (
                          <span>
                            <span
                              className={clsx(
                                selected.bgColor,
                                "flex h-8 w-8 items-center justify-center rounded-full"
                              )}
                            >
                              <selected.icon
                                aria-hidden="true"
                                className="h-5 w-5 shrink-0 text-white"
                              />
                            </span>
                            <span className="sr-only">{selected.name}</span>
                          </span>
                        )}
                      </span>
                    </Listbox.Button>

                    <Transition
                      as={Fragment}
                      leave="transition ease-in duration-100"
                      leaveFrom="opacity-100"
                      leaveTo="opacity-0"
                      show={open}
                    >
                      <Listbox.Options className="absolute z-10 -ml-6 w-60 rounded-lg bg-white py-3 text-base shadow ring-1 ring-black/5 focus:outline-none sm:ml-auto sm:w-64 sm:text-sm">
                        {moods.map((mood) => (
                          <Listbox.Option
                            key={mood.value}
                            className={({ active }) =>
                              clsx(
                                active ? "bg-gray-100" : "bg-white",
                                "relative cursor-default select-none px-3 py-2"
                              )
                            }
                            value={mood}
                          >
                            <div className="flex items-center">
                              <div
                                className={clsx(
                                  mood.bgColor,
                                  "flex h-8 w-8 items-center justify-center rounded-full"
                                )}
                              >
                                <mood.icon
                                  aria-hidden="true"
                                  className={clsx(
                                    mood.iconColor,
                                    "h-5 w-5 shrink-0"
                                  )}
                                />
                              </div>
                              <span className="ml-3 block truncate font-medium">
                                {mood.name}
                              </span>
                            </div>
                          </Listbox.Option>
                        ))}
                      </Listbox.Options>
                    </Transition>
                  </div>
                </>
              )}
            </Listbox>
          </div>
        </div>
        <div className="shrink-0">
          <button
            className="inline-flex items-center rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            type="submit"
          >
            投稿
          </button>
        </div>
      </div>
    </form>
  );
};
