export function getString(searchParams: URLSearchParams, key: string) {
  const value = searchParams.get(key);
  if (!value) {
    return;
  }
  return value;
}

export function getNumeric(searchParams: URLSearchParams, key: string) {
  const value = searchParams.get(key);
  if (!value || isNaN(Number(value))) {
    return;
  }
  return Number(value);
}

export function getBoolean(searchParams: URLSearchParams, key: string) {
  const value = searchParams.get(key);
  if (!value || (value !== "true" && value !== "false")) {
    return;
  }
  return value === "true";
}

type SearchParamsLike = URLSearchParams | Record<string, string> | string;

export function toSearchParams(searchParams: SearchParamsLike) {
  if (searchParams instanceof URLSearchParams) {
    return searchParams;
  }
  if (typeof searchParams === "string") {
    return new URLSearchParams(searchParams);
  }
  return new URLSearchParams(searchParams);
}
