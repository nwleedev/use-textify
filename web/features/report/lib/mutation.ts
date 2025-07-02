import { createReport } from "@/entities/report/lib/api";
import { NewReportSchema } from "@/entities/report/lib/schema";
import Client from "pocketbase";

export interface CreateReportMutationProps {
  schema: NewReportSchema;
}

export function createReportMutation(client: Client) {
  return (props: CreateReportMutationProps) => {
    const { schema } = props;
    return createReport(client, schema);
  };
}
