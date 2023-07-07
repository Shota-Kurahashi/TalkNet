import { PhotoIcon, UserCircleIcon } from "@heroicons/react/24/solid";
import { zodResolver } from "@hookform/resolvers/zod";
import Image from "next/image";
import React, { FC, useCallback, useState } from "react";
import { useDropzone } from "react-dropzone";
import { SubmitHandler, useForm } from "react-hook-form";
import { uploadImage } from "src/features/profiles/utils/uploadImage";
import { ProfileSchema, profileSchema } from "src/libs/schema/profile";

type Props = {
  onValid: SubmitHandler<ProfileSchema>;
  type: "create" | "edit";
  defaultValues?: ProfileSchema;
};

export const ProfileForm: FC<Props> = ({ onValid, defaultValues }) => {
  const [previewFile, setPreviewFile] = useState<string | null>(null);
  const [previewBio, setPreviewBio] = useState<string | null>(null);
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    reset,
  } = useForm<ProfileSchema>({
    resolver: zodResolver(profileSchema),
    defaultValues,
  });

  const onChangeBio = useCallback(
    async (e: React.ChangeEvent<HTMLInputElement>) => {
      const { createObjectURL } = window.URL || window.webkitURL;

      const file = e.target.files?.[0];

      if (!file) return;

      setPreviewBio(createObjectURL(file));

      const { filename } = await uploadImage({
        file,
      });

      setValue("bio", filename);
    },
    [setValue]
  );

  const onDrop = useCallback(
    (acceptedFiles: File[]) => {
      const { createObjectURL } = window.URL || window.webkitURL;

      setPreviewFile(createObjectURL(acceptedFiles[0]));

      const file = acceptedFiles[0];

      const reader = new FileReader();

      reader.readAsDataURL(file);

      reader.onload = async () => {
        const { filename, url } = await uploadImage({
          file,
        });

        setValue("cover_img", `${url}/${filename}`);
      };
    },
    [setValue]
  );

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept: {
      "image/jpeg": [".jpg", ".jpeg"],
      "image/png": [".png"],
    },
  });

  return (
    <form onSubmit={handleSubmit(onValid)}>
      <div className="space-y-12">
        <div className="pb-12">
          <h2 className="text-base font-semibold leading-7 text-gray-900">
            プロフィール
          </h2>
          <p className="mt-1 text-sm leading-6 text-gray-600">
            あなたのプロフィールを作成しましょう。
          </p>

          <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
            <div className="col-span-full">
              <label
                className="block text-sm font-medium leading-6 text-gray-900"
                htmlFor="introduction"
              >
                自己紹介{" "}
                {errors.introduction && (
                  <span className="mt-3 text-sm leading-6 text-red-600">
                    {errors.introduction.message}
                  </span>
                )}
              </label>
              <div className="mt-2">
                <textarea
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  id="introduction"
                  rows={3}
                  {...register("introduction")}
                />
              </div>
              <p className="mt-3 text-sm leading-6 text-gray-600">
                あなたについての詳細を入力してください。
              </p>
            </div>

            <div className="col-span-full">
              <label
                className="block cursor-pointer text-sm font-medium leading-6 text-gray-900"
                htmlFor="bio"
              >
                アバター
              </label>
              <div className="mt-2 flex items-center gap-x-3 ">
                {previewBio ? (
                  <div className="h-12 w-12 overflow-hidden rounded-full">
                    <Image
                      alt="avatar"
                      className="!relative rounded-full object-cover group-hover:opacity-75"
                      height={48}
                      src={previewBio}
                      width={48}
                    />
                  </div>
                ) : (
                  <UserCircleIcon
                    aria-hidden="true"
                    className="h-12 w-12 text-gray-300"
                  />
                )}

                <label htmlFor="bio">
                  <span className="rounded-md bg-white px-2.5 py-1.5 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50">
                    <span>Change</span>
                    <input
                      className="sr-only"
                      id="bio"
                      onChange={onChangeBio}
                      type="file"
                    />
                  </span>
                </label>
                {errors.bio && (
                  <p className="text-sm leading-6 text-red-600">
                    {errors.bio.message}
                  </p>
                )}
              </div>
            </div>

            <div className="col-span-full">
              <label
                className="block text-sm font-medium leading-6 text-gray-900"
                htmlFor="cover-photo"
              >
                カバー写真
              </label>
              <div
                className="mt-2 flex justify-center rounded-lg border border-dashed border-gray-900/25 px-6 py-10"
                {...getRootProps()}
              >
                {previewFile ? (
                  <div className="group h-56  flex-1 overflow-hidden rounded-lg">
                    <Image
                      alt="cover photo"
                      className="!relative object-contain group-hover:opacity-75"
                      fill
                      src={previewFile}
                    />
                  </div>
                ) : (
                  <div className=" text-center">
                    <PhotoIcon
                      aria-hidden="true"
                      className="mx-auto h-12 w-12 text-gray-300"
                    />
                    <div className="mt-4 flex text-sm leading-6 text-gray-600">
                      <label
                        className="relative cursor-pointer rounded-md bg-white font-semibold text-indigo-600 focus-within:outline-none focus-within:ring-2 focus-within:ring-indigo-600 focus-within:ring-offset-2 hover:text-indigo-500"
                        htmlFor="file-upload"
                      >
                        <span>Upload a file</span>
                        <input
                          className="sr-only"
                          id="file-upload"
                          type="file"
                          {...getInputProps()}
                        />
                      </label>
                      <p className="pl-1">or drag and drop</p>
                    </div>
                    <p className="text-xs leading-5 text-gray-600">
                      PNG, JPG up to 1MB
                    </p>
                  </div>
                )}
              </div>
              {errors.cover_img && (
                <p className="mt-3 text-sm leading-6 text-red-600">
                  {errors.cover_img.message}
                </p>
              )}
            </div>
          </div>
        </div>
      </div>
      <div className="mt-6 flex items-center justify-end gap-x-6">
        <button
          className="text-sm font-semibold leading-6 text-gray-900"
          onClick={() => {
            setPreviewFile(null);
            setPreviewBio(null);
            reset();
          }}
          type="button"
        >
          Delete profile
        </button>
        <button
          className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          type="submit"
        >
          Save
        </button>
      </div>
    </form>
  );
};
