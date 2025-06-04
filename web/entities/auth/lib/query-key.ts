export function getOAuth2MethodsQueryKey() {
  return ["oauth2-methods"] as const;
}

export type GetOAuth2MethodsQueryKey = ReturnType<
  typeof getOAuth2MethodsQueryKey
>;

export function getUserQueryKey() {
  return ["user"] as const;
}

export type GetUserQueryKey = ReturnType<typeof getUserQueryKey>;
