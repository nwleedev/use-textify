export function createReportMutationKey() {
  return ["reports"];
}

export type CreateReportMutationKey = ReturnType<
  typeof createReportMutationKey
>;

export function editReportMutationKey() {
  return ["reports", "edit"];
}

export type EditReportMutationKey = ReturnType<typeof editReportMutationKey>;
