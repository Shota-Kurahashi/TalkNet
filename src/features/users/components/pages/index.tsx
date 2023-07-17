import Image from "next/image";
import React from "react";
import { Topic } from "src/features/topics/components/topic";
import { UserPage } from "src/libs/next/page";
import { formatTimeDistance } from "src/utils/formatDistance";
import { getImagePath } from "src/utils/getImagePath";

export const User = ({ data }: UserPage) => {
  const { currentProfile, currentUser, topics } = data;

  return (
    <div className="flex flex-1 flex-col">
      <div className="h-56 overflow-hidden">
        {currentProfile?.cover_img && (
          <Image
            alt={currentUser?.name || ""}
            className="!relative  w-full rounded-t-3xl object-cover"
            fill
            src={`${getImagePath()}/${currentProfile?.cover_img}`}
          />
        )}
      </div>
      <div className="flex items-center justify-between">
        <div className="-mt-14 flex items-center px-2 py-4">
          {currentProfile?.bio && (
            <Image
              alt={currentUser?.name || ""}
              className="z-10 h-20 w-20 rounded-full object-cover ring-2 ring-white"
              height={80}
              src={`${getImagePath()}/${currentProfile?.bio}`}
              width={80}
            />
          )}
        </div>
      </div>
      <div className="flex flex-col gap-y-4 px-3">
        <div className="flex items-center gap-x-4 font-semibold">
          <p>{currentUser?.name}</p>
          <p className="text-xs text-gray-500">
            {formatTimeDistance(currentUser?.createdAt ?? "")}
            から使用しています。
          </p>
        </div>
        <div className="flex flex-col gap-2">
          <p className="font-semibold">自己紹介</p>
          <p>{currentProfile?.introduction}</p>
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
