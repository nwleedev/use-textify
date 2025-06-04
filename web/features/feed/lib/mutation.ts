import { createFeed, deleteFeed, editFeed } from "@/entities/feed/lib/api";
import { NewFeedSchema } from "@/entities/feed/lib/schema";
import Client from "pocketbase";

export interface CreateFeedMutationProps {
  schema: NewFeedSchema;
}

export function createFeedMutation(client: Client) {
  return (props: CreateFeedMutationProps) => {
    return createFeed(client, props.schema);
  };
}

export interface EditFeedMutationProps {
  id: string;
  schema: NewFeedSchema;
}

export function editFeedMutation(client: Client) {
  return (props: EditFeedMutationProps) => {
    return editFeed(client, props.id, props.schema);
  };
}

export interface DeleteFeedMutationProps {
  id: string;
}

export function deleteFeedMutation(client: Client) {
  return (props: DeleteFeedMutationProps) => {
    return deleteFeed(client, props.id);
  };
}
