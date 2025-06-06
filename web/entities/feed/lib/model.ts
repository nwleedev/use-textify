import { Category } from "@/entities/category/lib/model";
import { Tag } from "@/entities/tag/lib/model";
import { RecordModel } from "pocketbase";

export type Feed = {
  id: string;
  title: string;
  description: string;
  prompt: string;
  createdAt: string;
  updatedAt: string;
  user: string;
  status: "pending" | "not_verified" | "verified";
} & RecordModel;

export type FeedVariable = {
  id: string;
  name: string;
  description: string;
  createdAt: string;
  updatedAt: string;
} & RecordModel;

export type FeedNotice = {
  id: string;
  text: string;
  createdAt: string;
  updatedAt: string;
} & RecordModel;

export type FeedGridItem = Feed & {
  expand: {
    category: Category;
    tags?: Tag[];
    feed_variables_via_feed?: FeedVariable[];
    feed_notices_via_feed?: FeedNotice[];
  };
};

export type Feeds = Feed[];

export type FeedFilter = {
  keyword?: string;
  category?: string;
  tags?: string[];
};
