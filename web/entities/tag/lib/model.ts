import { RecordModel } from "pocketbase";

export type Tag = RecordModel & {
  id: string;
  name: string;
};

export type Tags = Tag[];
