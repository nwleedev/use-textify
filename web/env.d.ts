import "next";

declare global {
  namespace NodeJS {
    interface ProcessEnv {
      NEXT_PUBLIC_API_URL: string;
      OAUTH2_GOOGLE_CALLBACK_URL: string;
      OAUTH2_GITHUB_CALLBACK_URL: string;
    }
  }
}
