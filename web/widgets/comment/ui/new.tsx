"use client";

import UserContext from "@/entities/auth/lib/user/context";
import { createCommentMutationKey } from "@/entities/comment/lib/mutation-key";
import { getCommentsByFeedQueryKey } from "@/entities/comment/lib/query-key";
import { newCommentSchema } from "@/entities/comment/lib/schema";
import { createCommentMutation } from "@/features/comment/lib/mutation";
import { useClient } from "@/shared/lib/pocketbase/hook";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useParams } from "next/navigation";
import { useContext } from "react";
import { useForm } from "react-hook-form";

const CommentNew = () => {
  const client = useClient();
  const queryClient = useQueryClient();
  const { id } = useParams<{ id: string }>();
  const user = useContext(UserContext);
  const { register, handleSubmit, resetField } = useForm({
    resolver: zodResolver(newCommentSchema),
    defaultValues: {
      content: "",
      user: user?.id,
      feed: id,
    },
  });
  const { mutateAsync } = useMutation({
    mutationKey: createCommentMutationKey(),
    mutationFn: createCommentMutation(client),
  });
  const onSubmit = handleSubmit(async (data) => {
    await mutateAsync({ schema: data });
    resetField("content", { defaultValue: "" });
    queryClient.invalidateQueries({
      queryKey: getCommentsByFeedQueryKey(id),
    });
  });
  return (
    <div className="bg-base-100 w-full max-w-5xl rounded-xl lg:max-w-7xl flex flex-col gap-4">
      <div className="text-center bg-base-100 w-full max-w-5xl rounded-xl lg:max-w-7xl flex flex-col gap-4">
        <form
          method="POST"
          onSubmit={onSubmit}
          className="flex flex-col gap-4 w-full p-4"
        >
          <div className="form-control w-full">
            <textarea
              className="textarea textarea-bordered w-full"
              {...register("content")}
              placeholder="Add a new comment"
            />
          </div>
          <button type="submit" className="btn btn-primary w-fit">
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};

export default CommentNew;
