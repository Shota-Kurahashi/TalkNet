import Image from "next/image";
import React from "react";
import { ButtonLink } from "src/components/elements/ButtonLink";
import { Topic } from "src/features/topics/components/topic";
import { ProfilePageProps } from "src/libs/next/page";
import { formatTimeDistance } from "src/utils/formatDistance";
import { getImagePath } from "src/utils/getImagePath";

export const ProfilePage = ({ profile, user, topics }: ProfilePageProps) => {
  return (
    <div className="flex flex-1 flex-col">
      <div className="h-56 overflow-hidden">
        <Image
          alt={user?.name || ""}
          className="!relative  w-full rounded-t-3xl object-cover"
          fill
          src={`${getImagePath()}/${profile?.cover_img}`}
        />
      </div>
      <div className="flex items-center justify-between">
        <div className="-mt-14 flex items-center px-2 py-4">
          <Image
            alt={user?.name || ""}
            className="z-10 rounded-full ring-2 ring-white"
            height={80}
            src={`${getImagePath()}/${profile?.bio}`}
            width={80}
          />
        </div>
        <ButtonLink
          href={`/profiles/${user?.id}?type=edit`}
          size="xl"
          theme="primary"
        >
          編集
        </ButtonLink>
      </div>
      <div className="flex flex-col gap-y-4 px-3">
        <div className="flex items-center gap-x-4 font-semibold">
          <p>{user.name}</p>
          <p className="text-xs text-gray-500">
            {formatTimeDistance(user.createdAt)}から使用しています。
          </p>
        </div>
        <div className="flex flex-col gap-2">
          <p className="font-semibold">自己紹介</p>
          <p>{profile?.introduction}</p>
        </div>
      </div>
      <ul className="divide-y divide-gray-300">
        {topics?.map((topic) => (
          <Topic key={topic.id} topic={topic} />
        ))}
      </ul>
    </div>
  );
};
