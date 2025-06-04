"use client";

import { action } from "@/features/auth/lib/action";
import { OAuth2MethodsQuery } from "@/features/auth/ui/query";

const OAuth2Providers = () => {
  return (
    <OAuth2MethodsQuery>
      {({ data }) => {
        return (
          <div className="flex w-full h-full justify-center items-center">
            <div className="flex flex-col w-full gap-4">
              {data.oauth2.providers.map((provider) => (
                <div key={provider.name} className="">
                  <div className="flex w-full justify-center">
                    <button
                      className="btn btn-primary"
                      onClick={() => action(provider)}
                    >
                      <span className="text-sm">
                        Sign in with {provider.displayName}
                      </span>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        );
      }}
    </OAuth2MethodsQuery>
  );
};

export default OAuth2Providers;
