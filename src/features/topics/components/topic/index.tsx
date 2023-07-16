import { ChatBubbleLeftIcon } from "@heroicons/react/24/outline";
import clsx from "clsx";
import Image from "next/image";
import Link from "next/link";
import React, { FC } from "react";
import { Topic as PTopic } from "src/libs/schema/topic";
import { formatTimeDistance } from "src/utils/formatDistance";
import { getImagePath } from "src/utils/getImagePath";
import { genMood } from "src/utils/mood";

type Props = {
  topic: PTopic;
};

export const Topic: FC<Props> = ({ topic }) => {
  const Icon = genMood(topic?.moodId).icon;

  return (
    <li className="flex flex-col gap-x-6 gap-y-4 py-5 sm:flex-nowrap">
      <div>
        <div className="flex items-center gap-4 font-semibold leading-6 text-gray-800">
          <Image
            alt={topic.title + (topic?.user?.name ?? "") + topic.id}
            className="h-10 w-10 rounded-full bg-gray-50 ring-2 ring-white"
            height={40}
            src={`${getImagePath()}/${topic?.user?.profile?.bio}`}
            width={40}
          />
          <Link
            className="flex-1 underline hover:text-gray-600"
            href={`/topics/${topic.id}`}
          >
            {topic.title}
          </Link>
          <div
            className={clsx(
              genMood(topic.moodId).bgColor,
              "flex h-8 w-8 items-center justify-center rounded-full"
            )}
          >
            <Icon
              aria-hidden="true"
              className={clsx(
                genMood(topic.moodId).iconColor,
                "h-5 w-5 shrink-0"
              )}
            />
          </div>
        </div>
      </div>
      <div>
        {topic.image && (
          <Image
            alt="プレビュー画像"
            className="!relative mb-8 h-10 max-h-96 w-full object-scale-down"
            fill
            loading="lazy"
            quality={80}
            src={`${getImagePath()}/${topic.image}`}
          />
        )}

        <p className="text-sm leading-5 text-gray-800">{topic.content}</p>
      </div>
      <dl className="flex w-full flex-none justify-between gap-x-8 sm:w-auto">
        <div className="flex gap-x-2">
          <dd className="mt-1 flex items-center gap-x-2 text-xs leading-5 text-gray-500">
            <p>
              <Link className="hover:underline" href={`/users/${topic.userId}`}>
                {topic.user?.name}
              </Link>
            </p>
            <svg className="h-0.5 w-0.5 fill-current" viewBox="0 0 2 2">
              <circle cx={1} cy={1} r={1} />
            </svg>
            <p>
              <time>{`${formatTimeDistance(topic.createdAt)}に投稿`}</time>
            </p>
          </dd>
        </div>
        <div className="flex flex-1 justify-end">
          <dt className="sr-only">Commenters</dt>
          {topic.comments?.map((comment) => (
            <div key={comment.id}>
              <Image
                alt={comment.content + comment.id}
                className="h-6 w-6 rounded-full bg-gray-50 ring-2
                ring-white"
                height={24}
                src={`${getImagePath()}/${topic.user?.profile?.bio}`}
                width={24}
              />
            </div>
          ))}
        </div>
        <div className="ml-auto flex gap-x-2">
          <dt>
            <span className="sr-only">Total comments</span>
            <ChatBubbleLeftIcon
              aria-hidden="true"
              className="h-6 w-6 text-gray-400"
            />
          </dt>
          <dd className="text-sm leading-6 text-gray-900">
            {topic.comments?.length}
          </dd>
        </div>
      </dl>
    </li>
  );
};
