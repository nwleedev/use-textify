"use client";

import UserContext from "@/entities/auth/lib/user/context";
import { CategoryIcon } from "@/entities/category/lib/icons";
import { deleteFeedMutationKey } from "@/entities/feed/lib/mutation-key";
import { deleteFeedMutation } from "@/features/feed/lib/mutation";
import { FeedByIdQuery } from "@/features/feed/ui/query";
import { useClient } from "@/shared/lib/pocketbase/hook";
import Portal from "@/shared/ui/portal";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import {
  AlertTriangle,
  Code2,
  Edit,
  ExternalLink,
  Settings,
  Trash2,
} from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useContext, useRef } from "react";

const FeedDetail = () => {
  const user = useContext(UserContext);
  const client = useClient();
  const queryClient = useQueryClient();
  const { mutateAsync, isPending } = useMutation({
    mutationKey: deleteFeedMutationKey(),
    mutationFn: deleteFeedMutation(client),
  });
  const ref = useRef<HTMLDialogElement | null>(null);
  const router = useRouter();
  const onClick = async (id: string) => {
    await mutateAsync({ id });
    queryClient.invalidateQueries({ queryKey: ["feeds"] });
    ref.current?.close();
    router.push("/feeds");
  };
  return (
    <FeedByIdQuery>
      {(response) => {
        const feed = response.data;
        const categoryKey = feed.expand?.category?.key;
        const notices = feed.expand?.feed_notices_via_feed ?? [];
        const variables = feed.expand?.feed_variables_via_feed ?? [];

        return (
          <div className="w-full max-w-4xl lg:max-w-6xl bg-white/95 dark:bg-gray-900/95 backdrop-blur-2xl border border-white/20 dark:border-gray-700/30 supports-[backdrop-filter]:bg-white/90 dark:supports-[backdrop-filter]:bg-gray-900/90 shadow-2xl rounded-3xl overflow-hidden">
            {/* Header with enhanced visual hierarchy */}
            <div className="relative p-8 sm:p-10 bg-gradient-to-br from-indigo-500/10 via-purple-500/5 to-pink-500/10 border-b border-white/20 dark:border-gray-700/30">
              {/* Background decorative elements */}
              <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/5 to-purple-500/5 opacity-50"></div>
              <div className="absolute top-4 right-4 w-32 h-32 bg-gradient-to-br from-indigo-400/10 to-purple-400/10 rounded-full blur-3xl"></div>
              <div className="absolute bottom-4 left-4 w-24 h-24 bg-gradient-to-br from-pink-400/10 to-indigo-400/10 rounded-full blur-2xl"></div>

              <div className="relative space-y-6">
                {/* Category and title */}
                <div className="space-y-4">
                  {categoryKey && (
                    <Link
                      href={`/feeds?category=${categoryKey}`}
                      prefetch={false}
                      className="inline-flex items-center gap-3 px-4 py-2 rounded-2xl bg-white/50 dark:bg-gray-800/50 backdrop-blur-xl border border-white/30 dark:border-gray-700/30 hover:bg-white/70 dark:hover:bg-gray-700/70 transition-all duration-200 group"
                    >
                      <div className="p-2 rounded-lg bg-indigo-500/20 group-hover:bg-indigo-500/30 transition-colors duration-200">
                        <CategoryIcon
                          iconKey={categoryKey}
                          className="w-5 h-5 text-indigo-600 dark:text-indigo-400"
                        />
                      </div>
                      <span className="text-sm font-medium text-gray-900 dark:text-white group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors duration-200">
                        {feed.expand?.category?.name}
                      </span>
                      <ExternalLink className="w-4 h-4 text-gray-500 dark:text-gray-400 group-hover:text-indigo-500 dark:group-hover:text-indigo-400 transition-colors duration-200" />
                    </Link>
                  )}

                  <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white leading-tight break-words">
                    {feed.title}
                  </h1>
                </div>

                {/* Tags */}
                {feed.expand?.tags && feed.expand.tags.length > 0 && (
                  <div className="flex flex-wrap gap-3">
                    {feed.expand.tags.map((tag) => (
                      <Link
                        key={tag.id}
                        href={`/feeds?tags=${tag.name}`}
                        prefetch={false}
                        className="px-3 py-1.5 rounded-xl bg-blue-500/20 hover:bg-blue-500/30 border border-blue-300/30 dark:border-blue-600/30 text-blue-700 dark:text-blue-300 text-sm font-medium transition-all duration-200 hover:scale-105"
                      >
                        {tag.name}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            </div>

            {/* Content body */}
            <div className="p-8 sm:p-10 space-y-8">
              {/* Description */}
              <div className="space-y-4">
                <h2 className="text-xl font-semibold text-gray-900 dark:text-white flex items-center gap-3">
                  <div className="p-2 rounded-lg bg-green-500/20">
                    <Settings className="w-5 h-5 text-green-600 dark:text-green-400" />
                  </div>
                  Description
                </h2>
                <div className="p-6 rounded-2xl bg-white/50 dark:bg-gray-800/50 backdrop-blur-xl border border-white/30 dark:border-gray-700/30">
                  <p className="text-lg text-gray-800 dark:text-gray-200 whitespace-pre-line break-words leading-relaxed">
                    {feed.description}
                  </p>
                </div>
              </div>

              {/* Prompt */}
              <div className="space-y-4">
                <h2 className="text-xl font-semibold text-gray-900 dark:text-white flex items-center gap-3">
                  <div className="p-2 rounded-lg bg-purple-500/20">
                    <Code2 className="w-5 h-5 text-purple-600 dark:text-purple-400" />
                  </div>
                  Prompt
                </h2>
                <div className="p-6 rounded-2xl bg-gradient-to-br from-slate-50 to-gray-100 dark:from-gray-800 dark:to-gray-900 border border-gray-200/50 dark:border-gray-700/50">
                  <pre className="w-full font-mono text-sm text-gray-800 dark:text-gray-200 whitespace-pre-wrap break-words leading-relaxed">
                    {feed.prompt}
                  </pre>
                </div>
              </div>

              {/* Variables */}
              {variables.length > 0 && (
                <div className="space-y-4">
                  <h2 className="text-xl font-semibold text-gray-900 dark:text-white flex items-center gap-3">
                    <div className="p-2 rounded-lg bg-orange-500/20">
                      <Settings className="w-5 h-5 text-orange-600 dark:text-orange-400" />
                    </div>
                    Variables
                  </h2>
                  <div className="space-y-3">
                    {variables.map((variable) => (
                      <div
                        key={variable.id}
                        className="p-4 rounded-2xl bg-white/50 dark:bg-gray-800/50 backdrop-blur-xl border border-white/30 dark:border-gray-700/30"
                      >
                        <div className="flex items-start gap-3">
                          <div className="flex-1">
                            <h3 className="font-semibold text-gray-900 dark:text-white">
                              {variable.name}
                            </h3>
                            {variable.description && (
                              <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                                {variable.description}
                              </p>
                            )}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Notices */}
              {notices.length > 0 && (
                <div className="space-y-4">
                  <h2 className="text-xl font-semibold text-gray-900 dark:text-white flex items-center gap-3">
                    <div className="p-2 rounded-lg bg-yellow-500/20">
                      <AlertTriangle className="w-5 h-5 text-yellow-600 dark:text-yellow-400" />
                    </div>
                    Important Notices
                  </h2>
                  <div className="space-y-3">
                    {notices.map((notice) => (
                      <div
                        key={notice.id}
                        className="p-4 rounded-2xl bg-yellow-50/70 dark:bg-yellow-900/20 border border-yellow-200/50 dark:border-yellow-700/50"
                      >
                        <p className="text-yellow-800 dark:text-yellow-200 leading-relaxed">
                          {notice.text}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Action buttons for feed owner */}
            {user?.id === feed.user && (
              <div className="p-8 pt-0 flex items-center gap-4 justify-end">
                <Link
                  href={`/feeds/${feed.id}/edit`}
                  className="flex items-center gap-2 px-6 py-3 rounded-2xl bg-white/50 dark:bg-gray-800/50 backdrop-blur-xl border border-white/30 dark:border-gray-700/30 hover:bg-indigo-500/10 dark:hover:bg-indigo-500/20 text-indigo-600 dark:text-indigo-400 hover:text-indigo-700 dark:hover:text-indigo-300 transition-all duration-200 shadow-sm hover:shadow-md"
                >
                  <Edit className="w-4 h-4" />
                  <span className="font-medium">Edit</span>
                </Link>
                <button
                  className="flex items-center gap-2 px-6 py-3 rounded-2xl bg-red-500/10 hover:bg-red-500/20 border border-red-300/30 dark:border-red-600/30 text-red-600 dark:text-red-400 hover:text-red-700 dark:hover:text-red-300 transition-all duration-200 shadow-sm hover:shadow-md"
                  onClick={() => ref.current?.showModal()}
                >
                  <Trash2 className="w-4 h-4" />
                  <span className="font-medium">Delete</span>
                </button>

                {/* Modern glassmorphic delete confirmation dialog */}
                <Portal id="portal">
                  <dialog
                    ref={ref}
                    className="modal p-0 backdrop:backdrop-blur-md backdrop:bg-black/30"
                  >
                    <div
                      className="modal-backdrop"
                      onClick={() => ref.current?.close()}
                    ></div>
                    <div className="max-w-md w-full mx-4 bg-white/95 dark:bg-gray-900/95 backdrop-blur-2xl border border-white/20 dark:border-gray-700/30 supports-[backdrop-filter]:bg-white/90 dark:supports-[backdrop-filter]:bg-gray-900/90 shadow-2xl rounded-3xl p-8">
                      <div className="text-center space-y-6">
                        <div className="p-4 rounded-2xl bg-red-500/20 w-fit mx-auto">
                          <Trash2 className="w-8 h-8 text-red-600 dark:text-red-400" />
                        </div>
                        <div className="space-y-2">
                          <h3 className="text-xl font-bold text-gray-900 dark:text-white">
                            Delete Feed
                          </h3>
                          <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                            Are you sure you want to delete this feed? This
                            action cannot be undone and will permanently remove
                            all associated data.
                          </p>
                        </div>
                        <div className="flex items-center gap-3 pt-4">
                          <button
                            className="flex-1 px-4 py-3 rounded-2xl bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm border border-white/30 dark:border-gray-700/30 hover:bg-gray-500/10 dark:hover:bg-gray-600/20 text-gray-700 dark:text-gray-300 font-medium transition-all duration-200"
                            onClick={() => ref.current?.close()}
                            disabled={isPending}
                          >
                            Cancel
                          </button>
                          <button
                            className="flex-1 px-4 py-3 rounded-2xl bg-red-500 hover:bg-red-600 text-white font-medium transition-all duration-200 shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed"
                            onClick={() => {
                              onClick(feed.id);
                            }}
                            disabled={isPending}
                          >
                            {isPending ? "Deleting..." : "Delete"}
                          </button>
                        </div>
                      </div>
                    </div>
                  </dialog>
                </Portal>
              </div>
            )}
          </div>
        );
      }}
    </FeedByIdQuery>
  );
};

export default FeedDetail;
