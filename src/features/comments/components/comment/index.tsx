import Image from "next/image";
import React, { FC } from "react";
import { Comment as TComment } from "src/libs/schema/comment";
import { getImagePath } from "src/utils/getImagePath";

type Props = {
  comment: TComment;
};

export const Comment: FC<Props> = ({ comment }) => {
  return (
    <li className="flex py-4">
      <div className="mr-4 shrink-0">
        {comment.user?.profile?.bio && (
          <Image
            alt={comment.user?.name ?? "User"}
            className="z-10 h-14 w-14 rounded-full object-cover ring-2 ring-white"
            height={56}
            src={`${getImagePath()}/${comment.user?.profile?.bio}`}
            width={56}
          />
        )}
      </div>
      <div>
        <h4 className="text-lg font-bold">{comment.user?.name ?? "User"}</h4>
        <p className="mt-1">{comment.content}</p>
      </div>
    </li>
  );
};
