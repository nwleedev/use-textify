import { RecordModel } from "pocketbase";

export type Category = RecordModel & {
  id: string;
  key: string;
  name: string;
};

export type Categories = Category[];
