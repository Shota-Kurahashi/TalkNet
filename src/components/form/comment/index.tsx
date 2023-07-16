import { zodResolver } from "@hookform/resolvers/zod";
import { FC } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { Button } from "src/components/elements/Button";
import {
  CommentInputSchemaType,
  commentInputSchema,
} from "src/libs/schema/comment";

type Props = {
  onValid: SubmitHandler<CommentInputSchemaType>;
  isLoading: boolean;
};

export const CommentForm: FC<Props> = ({ onValid, isLoading }) => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<CommentInputSchemaType>({
    resolver: zodResolver(commentInputSchema),
  });

  return (
    <form
      className="rounded-xl bg-white/60 p-6 outline outline-indigo-200"
      onSubmit={handleSubmit((data) => {
        onValid(data);
        reset();
      })}
    >
      <div className="border-b border-gray-200 focus-within:border-indigo-600">
        <label className="sr-only" htmlFor="comment">
          コメントを投稿
        </label>
        <textarea
          className="block w-full resize-none border-0 border-b border-transparent bg-transparent p-0 pb-2 text-gray-900 placeholder:text-gray-400 focus:border-indigo-600 focus:ring-0 sm:text-sm sm:leading-6"
          id="comment"
          placeholder="コメントを投稿..."
          rows={3}
          {...register("content")}
        />
      </div>
      <div className="flex justify-between pt-2">
        <div>
          {errors.content && (
            <span className="mt-3 text-sm leading-6 text-red-600">
              {errors.content.message}
            </span>
          )}
        </div>
        <div className="shrink-0">
          <Button loading={isLoading} type="submit">
            投稿
          </Button>
        </div>
      </div>
    </form>
  );
};
