import Link from "next/link";
import React from "react";
import { SignUpForm } from "src/components/form/signup";
import { useSignUp } from "src/features/auth/hooks/useSignUp";

export const SignUp = () => {
  const { onInvalid, onValid, isLoading } = useSignUp();

  return (
    <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
      <div>
        <h1 className="text-center text-4xl font-extrabold text-blue-600 ">
          Hello ! Welcome to TalkNet 👋
        </h1>
        <h2 className="mt-10 text-center text-xl font-bold leading-9 tracking-tight text-gray-900">
          アカウントを作成する
        </h2>
      </div>

      <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
        <SignUpForm
          isLoading={isLoading}
          onInvalid={onInvalid}
          onValid={onValid}
        />
        <p className="mt-10 text-center text-sm text-gray-500">
          すでにアカウントをお持ちですか？
          <Link
            className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500"
            href="/auth/login"
          >
            ログインはこちら
          </Link>
        </p>
      </div>
    </div>
  );
};
