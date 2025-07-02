"use client";

import UserContext from "@/entities/auth/lib/user/context";
import { createReportMutationKey } from "@/entities/report/lib/mutation-key";
import { getReportsQueryKey } from "@/entities/report/lib/query-key";
import { defaultValues, newReportSchema } from "@/entities/report/lib/schema";
import { createReportMutation } from "@/features/report/lib/mutation";
import { useClient } from "@/shared/lib/pocketbase/hook";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { useContext, useState } from "react";
import { useForm } from "react-hook-form";

const ReportForm = () => {
  const client = useClient();
  const router = useRouter();
  const queryClient = useQueryClient();
  const user = useContext(UserContext);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm({
    resolver: zodResolver(newReportSchema),
    defaultValues: {
      ...defaultValues,
      user: user?.id,
    },
  });

  const { mutateAsync } = useMutation({
    mutationKey: createReportMutationKey(),
    mutationFn: createReportMutation(client),
    onSettled(data, error, variables, context) {
      setIsSubmitting(false);
      if (data) {
        router.push(`/reports/${data.id}`);
        queryClient.invalidateQueries({ queryKey: getReportsQueryKey() });
      }
    },
  });

  const onSubmit = handleSubmit(async (data) => {
    if (user) {
      setIsSubmitting(true);
      await mutateAsync({ schema: { ...data, user: user.id } });
    }
  });

  // Watch form values for character count
  const titleValue = watch("title") || "";
  const textValue = watch("text") || "";

  return (
    <div className="space-y-6">
      {/* Main Form Card */}
      <div className="backdrop-blur-xl bg-white/60 dark:bg-gray-900/60 rounded-2xl border border-white/20 dark:border-gray-700/30 shadow-xl overflow-hidden">
        <form onSubmit={onSubmit} className="p-6 lg:p-8 space-y-6">
          {/* Title Field */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <label
                htmlFor="title"
                className="block text-sm font-semibold text-gray-900 dark:text-white"
              >
                Report Title
              </label>
              <span className="text-xs text-gray-500 dark:text-gray-400">
                {titleValue.length}/50
              </span>
            </div>
            <div className="relative">
              <input
                {...register("title")}
                id="title"
                type="text"
                placeholder="Enter a clear, concise title for your report"
                className={`w-full px-4 py-3 rounded-xl backdrop-blur-sm bg-white/50 dark:bg-gray-800/50 border transition-all duration-300 placeholder:text-gray-400 dark:placeholder:text-gray-500 text-gray-900 dark:text-white focus:ring-2 focus:ring-red-500/50 focus:outline-none
                  ${
                    errors.title
                      ? "border-red-300 dark:border-red-700 focus:border-red-500"
                      : "border-white/20 dark:border-gray-700/30 hover:border-red-300 dark:hover:border-red-600 focus:border-red-500"
                  }
                `}
              />
              {errors.title && (
                <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                  <svg
                    className="w-5 h-5 text-red-500"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L4.082 16.5c-.77.833.192 2.5 1.732 2.5z"
                    />
                  </svg>
                </div>
              )}
            </div>
            {errors.title && (
              <p className="text-sm text-red-600 dark:text-red-400 flex items-center gap-2">
                <svg
                  className="w-4 h-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
                {errors.title.message}
              </p>
            )}
          </div>

          {/* Description Field */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <label
                htmlFor="text"
                className="block text-sm font-semibold text-gray-900 dark:text-white"
              >
                Report Description
              </label>
              <span className="text-xs text-gray-500 dark:text-gray-400">
                {textValue.length}/5000
              </span>
            </div>
            <div className="relative">
              <textarea
                {...register("text")}
                id="text"
                rows={8}
                placeholder="Please provide detailed information about the issue, including steps to reproduce (if applicable), expected behavior, and any additional context that might be helpful..."
                className={`w-full px-4 py-3 rounded-xl backdrop-blur-sm bg-white/50 dark:bg-gray-800/50 border transition-all duration-300 placeholder:text-gray-400 dark:placeholder:text-gray-500 text-gray-900 dark:text-white focus:ring-2 focus:ring-red-500/50 focus:outline-none resize-none
                  ${
                    errors.text
                      ? "border-red-300 dark:border-red-700 focus:border-red-500"
                      : "border-white/20 dark:border-gray-700/30 hover:border-red-300 dark:hover:border-red-600 focus:border-red-500"
                  }
                `}
              />
              {errors.text && (
                <div className="absolute right-3 top-3">
                  <svg
                    className="w-5 h-5 text-red-500"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L4.082 16.5c-.77.833.192 2.5 1.732 2.5z"
                    />
                  </svg>
                </div>
              )}
            </div>
            {errors.text && (
              <p className="text-sm text-red-600 dark:text-red-400 flex items-center gap-2">
                <svg
                  className="w-4 h-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
                {errors.text.message}
              </p>
            )}
          </div>

          {/* Form Actions */}
          <div className="flex flex-col sm:flex-row gap-4 pt-6 border-t border-gray-200/50 dark:border-gray-700/50">
            <button
              type="submit"
              disabled={isSubmitting}
              className="flex-1 inline-flex items-center justify-center gap-3 px-6 py-3 bg-gradient-to-r from-red-500 to-orange-500 text-white font-medium rounded-xl hover:from-red-600 hover:to-orange-600 disabled:from-gray-400 disabled:to-gray-500 disabled:cursor-not-allowed transition-all duration-300 transform hover:scale-[1.02] disabled:hover:scale-100 shadow-lg hover:shadow-xl disabled:shadow-sm backdrop-blur-sm"
            >
              {isSubmitting ? (
                <>
                  <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  <span>Submitting Report...</span>
                </>
              ) : (
                <>
                  <svg
                    className="w-4 h-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"
                    />
                  </svg>
                  <span>Submit Report</span>
                </>
              )}
            </button>

            <button
              type="button"
              onClick={() => router.push("/reports")}
              disabled={isSubmitting}
              className="flex-1 px-6 py-3 backdrop-blur-xl bg-white/60 dark:bg-gray-900/60 border border-white/20 dark:border-gray-700/30 text-gray-900 dark:text-white font-medium rounded-xl hover:bg-white/80 dark:hover:bg-gray-800/80 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 shadow-lg"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>

      {/* Helpful Tips */}
      <div className="backdrop-blur-xl bg-white/60 dark:bg-gray-900/60 rounded-2xl border border-white/20 dark:border-gray-700/30 p-6 shadow-xl">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
          <svg
            className="w-5 h-5 text-yellow-500"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"
            />
          </svg>
          Tips for Better Reports
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-3">
            <div className="flex items-start gap-3">
              <div className="p-1 rounded-full bg-green-500/20 dark:bg-green-400/20 mt-1">
                <svg
                  className="w-3 h-3 text-green-600 dark:text-green-400"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                    clipRule="evenodd"
                  />
                </svg>
              </div>
              <div>
                <p className="text-sm font-medium text-gray-900 dark:text-white">
                  Be Specific
                </p>
                <p className="text-xs text-gray-500 dark:text-gray-400">
                  Include exact error messages and steps to reproduce
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <div className="p-1 rounded-full bg-green-500/20 dark:bg-green-400/20 mt-1">
                <svg
                  className="w-3 h-3 text-green-600 dark:text-green-400"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                    clipRule="evenodd"
                  />
                </svg>
              </div>
              <div>
                <p className="text-sm font-medium text-gray-900 dark:text-white">
                  Add Context
                </p>
                <p className="text-xs text-gray-500 dark:text-gray-400">
                  Mention your browser, device, and when the issue occurred
                </p>
              </div>
            </div>
          </div>

          <div className="space-y-3">
            <div className="flex items-start gap-3">
              <div className="p-1 rounded-full bg-green-500/20 dark:bg-green-400/20 mt-1">
                <svg
                  className="w-3 h-3 text-green-600 dark:text-green-400"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                    clipRule="evenodd"
                  />
                </svg>
              </div>
              <div>
                <p className="text-sm font-medium text-gray-900 dark:text-white">
                  Stay Professional
                </p>
                <p className="text-xs text-gray-500 dark:text-gray-400">
                  Use clear, respectful language to describe the issue
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <div className="p-1 rounded-full bg-green-500/20 dark:bg-green-400/20 mt-1">
                <svg
                  className="w-3 h-3 text-green-600 dark:text-green-400"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                    clipRule="evenodd"
                  />
                </svg>
              </div>
              <div>
                <p className="text-sm font-medium text-gray-900 dark:text-white">
                  Check Duplicates
                </p>
                <p className="text-xs text-gray-500 dark:text-gray-400">
                  Review existing reports to avoid duplicates
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReportForm;
