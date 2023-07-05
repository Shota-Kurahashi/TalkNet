import { zodResolver } from "@hookform/resolvers/zod";
import React from "react";
import { SubmitErrorHandler, SubmitHandler, useForm } from "react-hook-form";
import { Button } from "src/components/elements/Button";
import { Input } from "src/components/elements/Input";
import { LoginSchema, LoginSchemaType } from "src/features/auth/types";

type Props = {
  onValid: SubmitHandler<LoginSchemaType>;
  onInvalid: SubmitErrorHandler<LoginSchemaType>;
  isLoading: boolean;
};

export const LoginForm = ({ onValid, onInvalid, isLoading }: Props) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginSchemaType>({
    resolver: zodResolver(LoginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  return (
    <form className="space-y-6" onSubmit={handleSubmit(onValid, onInvalid)}>
      <div>
        <label
          className="block text-sm font-medium leading-6 text-gray-900"
          htmlFor="email"
        >
          メールアドレス
        </label>
        <div className="mt-2">
          <Input
            className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
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
            className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
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
        <Button
          className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          loading={isLoading}
          type="submit"
        >
          ログイン
        </Button>
      </div>
    </form>
  );
};
