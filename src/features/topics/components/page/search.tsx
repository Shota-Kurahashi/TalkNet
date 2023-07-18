import React from "react";
import { ButtonLink } from "src/components/elements/ButtonLink";
import { Topic } from "src/features/topics/components/topic";
import { SearchPage } from "src/libs/next/page";

export const Search = ({ data }: SearchPage) => {
  return data.topics?.length > 0 ? (
    <>
      <h2 className="text-2xl font-bold">検索結果</h2>
      <ul className="divide-y divide-gray-300">
        {data.topics?.map((topic) => (
          <Topic key={topic.id} topic={topic} />
        ))}
      </ul>
    </>
  ) : (
    <div className="mt-20 flex flex-col items-center justify-center gap-16">
      <h2 className="text-2xl font-bold text-gray-600">
        検索結果がありませんでした。
      </h2>
      <ButtonLink href="/" theme="primary">
        ホームへ戻る
      </ButtonLink>
    </div>
  );
};
