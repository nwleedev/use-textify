import { RecordModel } from "pocketbase";

export type Comment = {
  id: string;
  content: string;
  created: string;
  updated: string;
  user: string;
  feed: string;
} & RecordModel;

export type CommentExpanded = Comment & {
  expand: {
    user: {
      name: string;
    };
    feed: {
      id: string;
    };
    reference?: {
      id: string;
    };
  };
};
