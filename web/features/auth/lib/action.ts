"use server";

import { getOAuth2RedirectURL } from "@/entities/auth/lib/redirect";
import { createClient } from "@/shared/lib/pocketbase/server/client";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { AuthProviderInfo } from "pocketbase";

export async function action(info: AuthProviderInfo) {
  let redirectTo: string | null = null;
  let errorMessage: string | null = null;
  try {
    const client = createClient();
    const auths = await client.collection("users").listAuthMethods();
    const provider = auths.oauth2.providers.find(
      (provider) => provider.name === info.name
    );
    const redirectURL = getOAuth2RedirectURL(info.name);

    if (!provider || !redirectURL) {
      errorMessage = "Provider not found";
    } else {
      const cookie = btoa(JSON.stringify(provider));
      const expires = new Date(Date.now() + 5 * 60 * 1000);
      cookies().set("provider", cookie, {
        httpOnly: true,
        sameSite: "lax",
        secure: process.env.NODE_ENV === "production",
        expires,
        path: "/",
      });
      redirectTo = provider.authURL + redirectURL;
    }
  } catch (error) {
    console.error(error);
    errorMessage = "An error occurred";
  }

  if (errorMessage || !redirectTo) {
    return {
      message: errorMessage,
    };
  }

  redirect(redirectTo);
}
