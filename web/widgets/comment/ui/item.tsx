"use client";

import UserContext from "@/entities/auth/lib/user/context";
import { CommentExpanded } from "@/entities/comment/lib/model";
import { deleteCommentMutationKey } from "@/entities/comment/lib/mutation-key";
import { getCommentsByFeedQueryKey } from "@/entities/comment/lib/query-key";
import { deleteCommentMutation } from "@/features/comment/lib/mutation";
import { useClient } from "@/shared/lib/pocketbase/hook";
import Portal from "@/shared/ui/portal";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { format } from "date-fns";
import { TrashIcon } from "lucide-react";
import { useContext, useRef } from "react";
import CommentDeleteDialog from "./dialog/delete";

export interface CommentItemProps {
  comment: CommentExpanded;
}

const CommentItem = ({ comment }: CommentItemProps) => {
  const ref = useRef<HTMLDialogElement>(null);
  const client = useClient();
  const queryClient = useQueryClient();
  const { mutateAsync, isPending } = useMutation({
    mutationKey: deleteCommentMutationKey(),
    mutationFn: deleteCommentMutation(client),
    onSettled() {
      queryClient.invalidateQueries({
        queryKey: getCommentsByFeedQueryKey(comment.expand.feed.id),
      });
    },
  });
  const user = useContext(UserContext);

  const isOwner = comment.user === user?.id;
  return (
    <div key={comment.id} className="card px-4">
      <div className="card-body bg-base-200">
        <div className="flex items-start gap-4">
          <div className="flex-1">
            <div className="flex items-center gap-2 justify-between">
              <div className="flex w-full gap-2">
                <span className="font-medium">{comment.expand.user.name}</span>
                <span className="text-base-content/60 text-sm">
                  {format(new Date(comment.created), "MMM d, yyyy")}
                </span>
              </div>
              {isOwner && (
                <div className="flex items-center gap-2">
                  <button
                    className="btn btn-ghost btn-sm hover:btn-error hover:text-error-content transition-colors"
                    onClick={() => ref.current?.showModal()}
                    aria-label="Delete comment"
                  >
                    <TrashIcon className="w-4 h-4" />
                  </button>
                </div>
              )}
            </div>
            <p className="mt-2 text-base-content/80 whitespace-pre-wrap">
              {comment.content}
            </p>
          </div>
        </div>
      </div>

      <Portal id="portal">
        <CommentDeleteDialog
          ref={ref}
          comment={comment}
          onClose={() => ref.current?.close()}
          onConfirm={async () => {
            await mutateAsync({
              id: comment.id,
            });
            ref.current?.close();
          }}
        />
      </Portal>
    </div>
  );
};

export default CommentItem;
