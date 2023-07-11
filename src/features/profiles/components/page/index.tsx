import Image from "next/image";
import React from "react";
import { Avatar } from "src/components/elements/Avatar";
import { ButtonLink } from "src/components/elements/ButtonLink";
import { ProfilePageProps } from "src/libs/next/page";

const IMAGE_PATH = process.env.NEXT_PUBLIC_IMAGE_PATH as string;

export const ProfilePage = ({ profile, user }: ProfilePageProps) => {
  return (
    <div className="flex flex-1 flex-col">
      <div className="h-56 overflow-hidden">
        <Image
          alt={user?.name}
          className="!relative  w-full rounded-t-3xl object-cover"
          fill
          src={`${process.env.NEXT_PUBLIC_IMAGE_PATH}/${profile?.cover_img}`}
        />
      </div>
      <div className="flex items-center justify-between">
        <div className="-mt-14 flex items-center px-2 py-4">
          <Avatar
            className="h-20 w-20"
            online={false}
            src={`${process.env.NEXT_PUBLIC_IMAGE_PATH}/${profile?.bio}`}
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
      <div>a</div>
    </div>
  );
};
