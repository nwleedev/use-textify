export function getReportsQueryKey() {
  return ["reports"] as const;
}

export function getReportByIdQueryKey(id: string) {
  return ["reports", id] as const;
}

export type GetReportsQueryKey = ReturnType<typeof getReportsQueryKey>;
export type GetReportByIdQueryKey = ReturnType<typeof getReportByIdQueryKey>;
