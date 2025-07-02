import Client from "pocketbase";
import { ReportExpanded } from "./model";
import { NewReportSchema } from "./schema";

export async function getReports(client: Client, page: number, size: number) {
  return client.collection("reports").getList<ReportExpanded>(page, size, {
    expand: "user",
    fields: "*,user",
    sort: "-created",
  });
}

export async function getReportById(client: Client, id: string) {
  return client.collection("reports").getOne<ReportExpanded>(id, {
    expand: "user",
    fields: "*,user",
  });
}

export async function createReport(client: Client, report: NewReportSchema) {
  return client.collection("reports").create(report);
}
