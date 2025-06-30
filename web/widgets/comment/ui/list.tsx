"use client";

import CommentFetchNext from "@/features/comment/ui/fetch-next";
import { CommentListQuery } from "@/features/comment/ui/query";
import CommentItem from "./item";

const CommentList = () => {
  return (
    <CommentListQuery>
      {(response) => {
        const comments = response.data.pages.flatMap((page) => page.items);

        if (comments.length === 0) {
          return (
            <div className="text-center py-8 bg-base-100 w-full max-w-5xl rounded-xl lg:max-w-7xl">
              <p className="text-base-content/60">No comments yet</p>
            </div>
          );
        }

        return (
          <div className="py-4 bg-base-100 w-full max-w-5xl rounded-xl lg:max-w-7xl">
            <div className="flex flex-col gap-4">
              {comments.map((comment) => (
                <CommentItem key={comment.id} comment={comment} />
              ))}
            </div>

            <CommentFetchNext>
              <div className="flex w-full h-px"></div>
            </CommentFetchNext>
          </div>
        );
      }}
    </CommentListQuery>
  );
};

export default CommentList;
