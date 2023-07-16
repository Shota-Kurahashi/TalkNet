import { Mood, Profile } from "@prisma/client";
import Image from "next/image";
import React, { FC } from "react";
import { TopicForm } from "src/components/form/topic";
import { useCreateTopic } from "src/features/topics/hooks/useCreateTopic";
import { getImagePath } from "src/utils/getImagePath";

type Props = {
  profile: Profile | null;
  moods: Mood[];
};

export const CreateTopic: FC<Props> = ({ profile, moods }) => {
  const { onValid, isLoading } = useCreateTopic();

  return (
    <div className="flex items-start space-x-4 rounded-xl bg-white/50 p-2">
      <div className="shrink-0">
        <Image
          alt=""
          className="inline-block h-10 w-10 rounded-full"
          height={40}
          src={`${getImagePath()}/${profile?.bio}`}
          width={40}
        />
      </div>
      <div className="min-w-0 flex-1">
        <TopicForm isLoading={isLoading} moods={moods} onValid={onValid} />
      </div>
    </div>
  );
};
