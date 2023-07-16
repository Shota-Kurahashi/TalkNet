import Image from "next/image";
import React from "react";
import { Avatar } from "src/components/elements/Avatar";
import { ButtonLink } from "src/components/elements/ButtonLink";
import { Topics } from "src/features/topics/components/page/topics";
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
          <Avatar
            className="h-20 w-20"
            online={false}
            src={`${getImagePath()}/${profile?.bio}`}
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
      <Topics topics={topics} />
    </div>
  );
};
