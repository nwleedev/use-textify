import { User } from "@/entities/auth/lib/model";
import { RecordModel } from "pocketbase";

export type Report = {
  id: string;
  title: string;
  text: string;
  user: string;
} & RecordModel;

export type ReportExpanded = Report & {
  expand: {
    user: User;
  };
};
