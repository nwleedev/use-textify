import { RecordModel } from "pocketbase";

export type Preference = {
  id: string;
  user: string;
  username: string;
} & RecordModel;
