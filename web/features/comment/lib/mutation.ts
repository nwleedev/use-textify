import { createComment, deleteComment } from "@/entities/comment/lib/api";
import { NewCommentSchema } from "@/entities/comment/lib/schema";
import Client from "pocketbase";

export interface CreateCommentMutationProps {
  schema: NewCommentSchema;
}

export function createCommentMutation(client: Client) {
  return (props: CreateCommentMutationProps) => {
    return createComment(client, props.schema);
  };
}

export interface DeleteCommentMutationProps {
  id: string;
}

export function deleteCommentMutation(client: Client) {
  return (props: DeleteCommentMutationProps) => {
    return deleteComment(client, props.id);
  };
}
