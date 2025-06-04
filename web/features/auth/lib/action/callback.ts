"use server";

import { createClient } from "@/shared/lib/pocketbase/server/client";
import { cookies } from "next/headers";
import { AuthProviderInfo, cookieParse } from "pocketbase";

type SearchParamsLike = string | Record<string, string> | URLSearchParams;

function decodeProvider(cookie?: string) {
  if (!cookie) {
    return null;
  }
  return JSON.parse(atob(cookie)) as AuthProviderInfo;
}

export async function googleAction(searchParams: SearchParamsLike) {
  return action(searchParams, process.env.OAUTH2_GOOGLE_CALLBACK_URL);
}

async function action(searchParams: SearchParamsLike, callbackURL: string) {
  let errorMessage: string | null = null;
  let payload: string | null = null;
  const expires = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000);
  try {
    const client = createClient();
    searchParams = new URLSearchParams(searchParams);
    const code = searchParams.get("code");
    const state = searchParams.get("state");

    const provider = decodeProvider(cookies().get("provider")?.value);

    if (!provider || provider.state !== state || !code) {
      errorMessage = "Invalid provider";
    } else {
      await client
        .collection("users")
        .authWithOAuth2Code(
          provider.name,
          code,
          provider.codeVerifier,
          callbackURL
        );
      const authCookie = client.authStore.exportToCookie({
        httpOnly: false,
        expires,
        sameSite: "strict",
        path: "/",
        secure: process.env.NODE_ENV === "production",
      });
      payload = cookieParse(authCookie)["pb_auth"];
    }
  } catch (error) {
    errorMessage = "An error occurred";
  }

  if (errorMessage || !payload) {
    return {
      message: errorMessage,
    };
  }

  cookies().set("pb_auth", payload, {
    httpOnly: false,
    expires,
    sameSite: "strict",
    secure: process.env.NODE_ENV === "production",
    path: "/",
  });

  return {};
}
