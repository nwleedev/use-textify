"use client";

import { CommentExpanded } from "@/entities/comment/lib/model";
import { forwardRef } from "react";

export interface CommentDeleteDialogProps {
  comment: CommentExpanded;
  onClose: () => void;
  onConfirm: () => void;
}

const CommentDeleteDialog = forwardRef<
  HTMLDialogElement,
  CommentDeleteDialogProps
>(function CommentDeleteDialog(
  { comment, onClose, onConfirm }: CommentDeleteDialogProps,
  ref
) {
  return (
    <dialog ref={ref} className="modal">
      <div className="modal-box">
        <h3 className="font-bold text-lg">Delete Comment</h3>
        <div className="py-4">
          <div className="alert alert-warning">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="stroke-current shrink-0 h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.732-.833-2.464 0L4.35 16.5c-.77.833.192 2.5 1.732 2.5z"
              />
            </svg>
            <span>
              Are you sure you want to delete this comment? This action cannot
              be undone.
            </span>
          </div>
          <div className="mt-4 p-4 bg-base-200 rounded-lg">
            <p className="text-sm text-base-content/70">
              Preview of comment to be deleted:
            </p>
            <p className="mt-2 text-base-content/80 line-clamp-3">
              {comment.content}
            </p>
          </div>
        </div>
        <div className="modal-action">
          <form method="dialog" className="flex gap-3">
            <button className="btn btn-outline" onClick={onClose}>
              Cancel
            </button>
            <button
              type="button"
              className="btn btn-error"
              onClick={() => {
                onConfirm();
              }}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-4 w-4"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                />
              </svg>
              Delete Comment
            </button>
          </form>
        </div>
      </div>
      <div className="modal-backdrop" onClick={onClose}></div>
    </dialog>
  );
});
CommentDeleteDialog.displayName = "CommentDeleteDialog";

export default CommentDeleteDialog;
