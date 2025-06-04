"use client";

import { googleAction } from "@/features/auth/lib/action/callback";
import { useClient } from "@/shared/lib/pocketbase/hook";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect } from "react";

export const GoogleCallback = () => {
  const searchParams = useSearchParams();
  const client = useClient();
  const router = useRouter();

  useEffect(() => {
    async function onAuth() {
      await googleAction(searchParams.toString());
      client.authStore.loadFromCookie(document.cookie);
      await client.collection("users").authRefresh();
      router.push("/");
    }
    onAuth();
  }, [searchParams, client, router]);
  return (
    <>
      <span className="loading loading-spinner loading-lg text-primary" />
      <div className="text-lg font-semibold text-center text-gray-900 dark:text-white">
        Signing you in with Google…
      </div>
    </>
  );
};
