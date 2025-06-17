declare global {
  namespace NodeJS {
    interface ProcessEnv {
      APP_PORT: number;
      APP_USER_ID: string;
      OPENAI_API_KEY: string;
    }
  }
}

export {};
