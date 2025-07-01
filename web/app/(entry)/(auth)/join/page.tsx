import { getOAuth2MethodsQueryKey } from "@/entities/auth/lib/query-key";
import { getOAuth2MethodsQuery } from "@/features/auth/lib/query";
import { createClient } from "@/shared/lib/pocketbase/server/client";
import HydrationQuery from "@/shared/ui/hydration-query";
import OAuth2Providers from "@/widgets/auth/ui/providers";

const positives = [
  {
    icon: "✨",
    text: "Available in a variety of fields",
    key: "available-in-a-variety-of-fields",
  },
  {
    icon: "🎯",
    text: "Prompts detailed and structured",
    key: "prompts-detailed-and-structured",
  },
  {
    icon: "🚀",
    text: "Exchange opinions and ideas with others",
    key: "exchange-opinions-and-ideas-with-others",
  },
];

const Page = () => {
  const client = createClient();

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-indigo-50 dark:from-gray-900 dark:via-gray-900 dark:to-indigo-900/20 flex items-center justify-center px-4 py-8">
      {/* Background decoration */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-purple-400/30 dark:bg-purple-600/20 rounded-full blur-3xl" />
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-blue-400/30 dark:bg-blue-600/20 rounded-full blur-3xl" />
      </div>

      <HydrationQuery
        queryKey={getOAuth2MethodsQueryKey()}
        queryFn={getOAuth2MethodsQuery(client)}
      >
        <div className="relative w-full max-w-md">
          {/* Main glassmorphic card */}
          <div className="bg-white/70 dark:bg-gray-900/70 backdrop-blur-xl border border-white/30 dark:border-gray-700/30 supports-[backdrop-filter]:bg-white/60 dark:supports-[backdrop-filter]:bg-gray-900/60 shadow-2xl rounded-3xl p-8 space-y-8">
            {/* Header with branding */}
            <div className="text-center space-y-6">
              {/* Logo */}
              <div className="flex justify-center">
                <div className="w-16 h-16 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-2xl shadow-lg flex items-center justify-center transform hover:scale-105 transition-transform duration-300">
                  <span className="text-2xl font-bold text-white">T</span>
                </div>
              </div>

              {/* Title and description */}
              <div className="space-y-3">
                <h1 className="text-3xl font-bold bg-gradient-to-r from-gray-900 to-gray-600 dark:from-white dark:to-gray-300 bg-clip-text text-transparent">
                  Welcome to Textify
                </h1>
                <p className="text-gray-600 dark:text-gray-400 text-lg leading-relaxed">
                  Make better answers of AI with the improved prompts
                </p>
              </div>
            </div>

            {/* Benefits section */}
            <div className="space-y-4">
              <div className="grid gap-3">
                {positives.map((benefit) => (
                  <div
                    key={benefit.key}
                    className="flex items-center gap-3 p-3 rounded-xl bg-white/50 dark:bg-gray-800/50 border border-white/20 dark:border-gray-700/20"
                  >
                    <span className="text-lg">{benefit.icon}</span>
                    <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                      {benefit.text}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* OAuth providers */}
            <div className="space-y-4">
              <div className="text-center">
                <span className="text-sm text-gray-500 dark:text-gray-400">
                  Choose your preferred sign-in method
                </span>
              </div>
              <OAuth2Providers />
            </div>

            {/* Footer */}
            <div className="text-center pt-4 border-t border-gray-200/50 dark:border-gray-700/50">
              <p className="text-xs text-gray-500 dark:text-gray-400">
                By signing in, you agree to our Terms of Service and Privacy
                Policy
              </p>
            </div>
          </div>
        </div>
      </HydrationQuery>
    </div>
  );
};

export default Page;
