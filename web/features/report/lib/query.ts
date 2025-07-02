import { getReportById, getReports } from "@/entities/report/lib/api";
import { Report } from "@/entities/report/lib/model";
import {
  GetReportByIdQueryKey,
  GetReportsQueryKey,
} from "@/entities/report/lib/query-key";
import { GetNextPageParamFunction } from "@tanstack/react-query";
import Client, { ListResult } from "pocketbase";

export interface GetReportsQueryProps {
  queryKey: GetReportsQueryKey;
  pageParam: number;
}

const pageSize = 10;

export function getReportsQuery(client: Client) {
  return function (props: GetReportsQueryProps) {
    const { queryKey, pageParam } = props;

    return getReports(client, pageParam, pageSize);
  };
}

export const initialPageParam = 1;

export const getNextPageParam: GetNextPageParamFunction<
  number,
  ListResult<Report>
> = (page, pages, pageParam) => {
  if (page.items.length < pageSize) {
    return null;
  }
  return pageParam + 1;
};

export interface GetReportByIdQueryProps {
  queryKey: GetReportByIdQueryKey;
}
export function getReportByIdQuery(client: Client) {
  return (props: GetReportByIdQueryProps) => {
    const { queryKey } = props;
    const [, id] = queryKey;
    return getReportById(client, id);
  };
}
