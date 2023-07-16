import {
  FaceFrownIcon,
  FaceSmileIcon as FaceSmileIconMini,
  FireIcon,
  HandThumbUpIcon,
  HeartIcon,
  XMarkIcon,
} from "@heroicons/react/20/solid";
import { ChatBubbleLeftIcon } from "@heroicons/react/24/outline";
import { HandThumbDownIcon } from "@heroicons/react/24/solid";
import clsx from "clsx";
import Image from "next/image";
import Link from "next/link";
import { FC } from "react";
import { useQueryTopics } from "src/features/topics/api/useQueryTopics";
import { TopPageProps } from "src/libs/next/page";
import { formatTimeDistance } from "src/utils/formatDistance";

type GenMood = {
  icon: React.ForwardRefExoticComponent<
    Omit<React.SVGProps<SVGSVGElement>, "ref"> & {
      title?: string | undefined;
      titleId?: string | undefined;
    } & React.RefAttributes<SVGSVGElement>
  >;
  iconColor: string;
  bgColor: string;
  id: number;
};

const genMood = (id: number): GenMood => {
  switch (id) {
    case 1:
      return {
        id: 1,
        icon: FireIcon,
        iconColor: "text-white",
        bgColor: "bg-red-500",
      };
    case 2:
      return {
        id: 2,
        icon: HeartIcon,
        iconColor: "text-white",
        bgColor: "bg-pink-400",
      };
    case 3:
      return {
        id: 3,
        icon: FaceSmileIconMini,
        iconColor: "text-white",
        bgColor: "bg-green-400",
      };
    case 4:
      return {
        id: 4,
        icon: FaceFrownIcon,
        iconColor: "text-white",
        bgColor: "bg-yellow-400",
      };
    case 5:
      return {
        id: 5,
        icon: HandThumbUpIcon,
        iconColor: "text-white",
        bgColor: "bg-blue-500",
      };

    case 6:
      return {
        id: 6,
        icon: HandThumbDownIcon,
        iconColor: "text-white",
        bgColor: "bg-indigo-500",
      };
    default:
      return {
        id: 7,
        icon: XMarkIcon,
        iconColor: "text-white",
        bgColor: "bg-gray-800",
      };
  }
};

type Props = {
  topics: TopPageProps["topics"];
};
const IMAGE_PATH = process.env.NEXT_PUBLIC_IMAGE_PATH as string;

export const Topic: FC<Props> = ({ topics }) => {
  const { data } = useQueryTopics(topics);

  return (
    <ul className="divide-y divide-gray-300">
      {data.topics.map((topic) => {
        const Icon = genMood(topic.moodId).icon;

        return (
          <li
            key={topic.id}
            className="flex flex-col gap-x-6 gap-y-4 py-5 sm:flex-nowrap"
          >
            <div>
              <div className="flex items-center gap-4 font-semibold leading-6 text-gray-800">
                <Image
                  alt={topic.title + (topic.user?.name ?? "") + topic.id}
                  className="h-10 w-10 rounded-full bg-gray-50 ring-2 ring-white"
                  height={40}
                  src={`${IMAGE_PATH}/${topic.user?.profile?.bio}`}
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
                  src={`${IMAGE_PATH}/${topic.image}`}
                />
              )}

              <p className="text-sm leading-5 text-gray-800">{topic.content}</p>
            </div>
            <dl className="flex w-full flex-none justify-between gap-x-8 sm:w-auto">
              <div className="flex gap-x-2">
                <dd className="mt-1 flex items-center gap-x-2 text-xs leading-5 text-gray-500">
                  <p>
                    <Link
                      className="hover:underline"
                      href={`/users/${topic.userId}`}
                    >
                      {topic.user?.name}
                    </Link>
                  </p>
                  <svg className="h-0.5 w-0.5 fill-current" viewBox="0 0 2 2">
                    <circle cx={1} cy={1} r={1} />
                  </svg>
                  <p>
                    <time>
                      {`${formatTimeDistance(topic.createdAt)}に投稿`}
                    </time>
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
                      src={`${IMAGE_PATH}/${topic.user?.profile?.bio}`}
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
      })}
    </ul>
  );
};
