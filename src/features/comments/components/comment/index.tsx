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
            className="rounded-full"
            height={52}
            src={`${getImagePath()}/${comment.user?.profile?.bio}`}
            width={52}
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
