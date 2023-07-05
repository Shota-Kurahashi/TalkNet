import { zodResolver } from "@hookform/resolvers/zod";
import React from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { Button } from "src/components/elements/Button";
import { Input } from "src/components/elements/Input";
import { SignUpSchema, SignUpSchemaType } from "src/features/auth/types";

type Props = {
  onValid: SubmitHandler<SignUpSchemaType>;

  isLoading: boolean;
};

export const SignUpForm = ({ onValid, isLoading }: Props) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignUpSchemaType>({
    resolver: zodResolver(SignUpSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  return (
    <form className="space-y-6" onSubmit={handleSubmit(onValid)}>
      <div>
        <label
          className="block text-sm font-medium leading-6 text-gray-900"
          htmlFor="name"
        >
          ユーザー名
        </label>
        <div className="mt-2">
          <Input
            className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-600 sm:text-sm sm:leading-6"
            id="name"
            sr="name"
            type="text"
            {...register("name")}
          />
          {errors.name && (
            <p className="mt-2 text-sm text-red-600" id="email-error">
              {errors.name.message}
            </p>
          )}
        </div>
      </div>
      <div>
        <label
          className="block text-sm font-medium leading-6 text-gray-900"
          htmlFor="email"
        >
          メールアドレス
        </label>
        <div className="mt-2">
          <Input
            className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-600 sm:text-sm sm:leading-6"
            sr="Email address"
            type="email"
            {...register("email")}
          />
          {errors.email && (
            <p className="mt-2 text-sm text-red-600" id="email-error">
              {errors.email.message}
            </p>
          )}
        </div>
      </div>

      <div>
        <div className="flex items-center justify-between">
          <label
            className="block text-sm font-medium leading-6 text-gray-900"
            htmlFor="password"
          >
            パスワード
          </label>
        </div>
        <div className="mt-2">
          <Input
            autoComplete="current-password"
            className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-600 sm:text-sm sm:leading-6"
            id="password"
            sr="Password"
            type="password"
            {...register("password")}
          />
          {errors.password && (
            <p className="mt-2 text-sm text-red-600" id="email-error">
              {errors.password.message}
            </p>
          )}
        </div>
      </div>

      <div>
        <div className="flex items-center justify-between">
          <label
            className="block text-sm font-medium leading-6 text-gray-900"
            htmlFor="password-confirm"
          >
            パスワード(確認用)
          </label>
        </div>
        <div className="mt-2">
          <Input
            autoComplete="current-password"
            className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-600 sm:text-sm sm:leading-6"
            id="password-confirm"
            sr="Password-confirm"
            type="password"
            {...register("confirmPassword")}
          />
          {errors.confirmPassword && (
            <p className="mt-2 text-sm text-red-600" id="email-error">
              {errors.confirmPassword.message}
            </p>
          )}
        </div>
      </div>

      <div>
        <Button
          className="flex w-full justify-center rounded-md bg-blue-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
          loading={isLoading}
          type="submit"
        >
          新規登録
        </Button>
      </div>
    </form>
  );
};
