import Link from "next/link";
import React from "react";
import { LoginForm } from "src/components/form/login";
import { useLogin } from "src/features/auth/hooks/useLogin";

export const Login = () => {
  const { onValid, isLoading } = useLogin();

  return (
    <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
      <div>
        <h1 className="text-center text-4xl font-extrabold text-blue-600 ">
          Welcome to TalkNet 👋
        </h1>
        <h2 className="mt-10 text-center text-xl font-bold leading-9 tracking-tight text-gray-900">
          アカウントにサインインする
        </h2>
      </div>

      <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
        <LoginForm isLoading={isLoading} onValid={onValid} />
        <p className="mt-10 text-center text-sm text-gray-500">
          まだアカウントをお持ちでないですか？
          <Link
            className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500"
            href="/signup"
          >
            新規登録はこちら
          </Link>
        </p>
      </div>
    </div>
  );
};
