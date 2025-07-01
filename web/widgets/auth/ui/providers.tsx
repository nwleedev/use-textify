"use client";

import { action } from "@/features/auth/lib/action";
import { OAuth2MethodsQuery } from "@/features/auth/ui/query";

const OAuth2Providers = () => {
  return (
    <OAuth2MethodsQuery>
      {({ data }) => {
        return (
          <div className="space-y-3">
            {data.oauth2.providers.map((provider) => (
              <div key={provider.name}>
                <button
                  onClick={() => action(provider)}
                  className="w-full group relative overflow-hidden bg-white/80 dark:bg-gray-800/80 backdrop-blur-xl border border-white/30 dark:border-gray-700/30 hover:bg-white/90 dark:hover:bg-gray-700/90 transition-all duration-300 rounded-2xl p-4 shadow-lg hover:shadow-xl hover:scale-[1.02] focus:outline-none focus:ring-2 focus:ring-indigo-500/50 focus:ring-offset-2 focus:ring-offset-transparent"
                >
                  {/* Background gradient on hover */}
                  <div className="absolute inset-0 bg-gradient-to-r from-indigo-500/10 to-purple-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-2xl" />

                  <div className="relative flex items-center justify-center gap-3">
                    {/* Provider icon */}
                    <div className="w-6 h-6 rounded-lg bg-gradient-to-br from-red-500 to-orange-500 flex items-center justify-center">
                      <span className="text-white text-sm font-bold">G</span>
                    </div>

                    {/* Provider text */}
                    <span className="font-semibold text-gray-900 dark:text-white group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors duration-300">
                      Continue with {provider.displayName}
                    </span>

                    {/* Arrow icon */}
                    <svg
                      className="w-4 h-4 text-gray-400 group-hover:text-indigo-500 group-hover:translate-x-1 transition-all duration-300"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 5l7 7-7 7"
                      />
                    </svg>
                  </div>
                </button>
              </div>
            ))}
          </div>
        );
      }}
    </OAuth2MethodsQuery>
  );
};

export default OAuth2Providers;
