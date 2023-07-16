import { Listbox, Transition } from "@headlessui/react";

import { FaceSmileIcon, PhotoIcon } from "@heroicons/react/24/outline";
import { zodResolver } from "@hookform/resolvers/zod";
import { Mood } from "@prisma/client";
import clsx from "clsx";
import Image from "next/image";
import React, { FC, Fragment, useCallback, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { Button } from "src/components/elements/Button";
import { Input } from "src/components/elements/Input";
import { readFile } from "src/features/profiles/utils/uploadImage";
import { TopicSchemaType, topicSchema } from "src/libs/schema/topic";
import { GenMood, genMood, parseJpMood } from "src/utils/mood";

type Props = {
  moods: Pick<Mood, "id" | "name">[];
  onValid: SubmitHandler<TopicSchemaType>;
  isLoading: boolean;
};

export const TopicForm: FC<Props> = ({ moods, onValid, isLoading }) => {
  const [selected, setSelected] = useState<GenMood | null>(null);
  const [previewImage, setPreviewImage] = useState<string | null>(null);
  const {
    formState: { errors },
    handleSubmit,
    register,
    setValue,
    reset,
  } = useForm<TopicSchemaType>({
    resolver: zodResolver(topicSchema),
  });

  const onChangeImage = useCallback(
    async (e: React.ChangeEvent<HTMLInputElement>) => {
      const { files } = e.target;

      if (!files) return;

      const { createObjectURL } = window.URL || window.webkitURL;

      setPreviewImage(createObjectURL(files[0]));

      const file = files[0];

      readFile((filename) => setValue("image", filename), file);
    },

    [setValue]
  );

  return (
    <form
      onSubmit={handleSubmit((data) => {
        onValid(data);
        reset();
        setPreviewImage(null);
        setSelected(null);
      })}
    >
      <div className="mb-8">
        <Input
          placeholder="タイトルを入力..."
          sr="トピックのタイトル作成"
          type="text"
          {...register("title")}
        />
      </div>
      <div className="border-b border-gray-200 focus-within:border-indigo-600">
        {previewImage && (
          <Image
            alt="プレビュー画像"
            className="!relative mb-8 h-10 max-h-96 w-full object-scale-down"
            fill
            src={previewImage}
          />
        )}

        <label className="sr-only" htmlFor="topic">
          トピックを作成
        </label>
        <textarea
          className="block w-full resize-none border-0 border-b border-transparent bg-transparent p-0 pb-2 text-gray-900 placeholder:text-gray-400 focus:border-indigo-600 focus:ring-0 sm:text-sm sm:leading-6"
          id="topic"
          placeholder="話題を投稿..."
          rows={3}
          {...register("content")}
        />
      </div>
      <div className="flex justify-between pt-2">
        <div className="flex items-center space-x-5">
          <div className="flow-root">
            <label className="-m-2 inline-flex h-10 w-10 items-center justify-center rounded-full text-gray-400 hover:text-gray-500">
              <PhotoIcon aria-hidden="true" className="h-6 w-6" />
              <input className="sr-only" onChange={onChangeImage} type="file" />
              <span className="sr-only">Attach a file</span>
            </label>
          </div>
          <div className="flow-root">
            <Listbox
              onChange={(mood) => {
                if (mood === null) return;

                setValue("moodId", mood.id);
                setSelected(genMood(mood.id));
              }}
              value={selected}
            >
              {({ open }) => (
                <>
                  <Listbox.Label className="sr-only">Your mood</Listbox.Label>
                  <div className="relative">
                    <Listbox.Button className="relative -m-2 inline-flex h-10 w-10 items-center justify-center rounded-full text-gray-400 hover:text-gray-500">
                      <span className="flex items-center justify-center">
                        {selected === null ? (
                          <span>
                            <FaceSmileIcon
                              aria-hidden="true"
                              className="h-6 w-6 shrink-0"
                            />
                            <span className="sr-only">気分を選択</span>
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
                        {moods.map((mood) => {
                          const Icon = genMood(mood.id).icon;

                          return (
                            <Listbox.Option
                              key={mood.id}
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
                                    genMood(mood.id).bgColor,
                                    "flex h-8 w-8 items-center justify-center rounded-full"
                                  )}
                                >
                                  <Icon
                                    aria-hidden="true"
                                    className={clsx(
                                      genMood(mood.id).iconColor,
                                      "h-5 w-5 shrink-0"
                                    )}
                                  />
                                </div>
                                <span className="ml-3 block truncate font-medium">
                                  {parseJpMood(mood.name)}
                                </span>
                              </div>
                            </Listbox.Option>
                          );
                        })}
                      </Listbox.Options>
                    </Transition>
                  </div>
                </>
              )}
            </Listbox>
          </div>
        </div>
        <div className="shrink-0">
          <Button loading={isLoading} type="submit">
            投稿
          </Button>
        </div>
      </div>
      {errors.content && (
        <span className="mt-3 text-sm leading-6 text-red-600">
          {errors.content.message}
        </span>
      )}
      {errors.title && (
        <span className="mt-3 text-sm leading-6 text-red-600">
          {errors.title.message}
        </span>
      )}
      {errors.moodId && (
        <span className="mt-3 text-sm leading-6 text-red-600">
          {errors.moodId.message}
        </span>
      )}
    </form>
  );
};
