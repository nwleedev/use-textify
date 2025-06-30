"use client";

import { CategoryIcon } from "@/entities/category/lib/icons";
import FeedsFilterQuery from "@/features/feed/ui/filter-query";
import PrefetchWhenHover from "@/shared/ui/link/preferch-when-hover";

// Category-based gradient backgrounds for glassmorphic cards
const categoryGradients: Record<string, string> = {
  "writing-assistance": "from-blue-500/20 to-indigo-600/20",
  "creative-writing": "from-purple-500/20 to-pink-600/20",
  copywriting: "from-emerald-500/20 to-teal-600/20",
  "marketing-strategy": "from-orange-500/20 to-red-600/20",
  "sales-support": "from-green-500/20 to-emerald-600/20",
  "business-operations": "from-slate-500/20 to-gray-600/20",
  "financial-advice": "from-yellow-500/20 to-amber-600/20",
  "educational-content": "from-indigo-500/20 to-blue-600/20",
  "study-assistance": "from-violet-500/20 to-purple-600/20",
  "software-development": "from-cyan-500/20 to-blue-600/20",
  "data-analysis": "from-teal-500/20 to-cyan-600/20",
  "creative-arts": "from-pink-500/20 to-rose-600/20",
  "idea-generation": "from-amber-500/20 to-yellow-600/20",
  "travel-planning": "from-sky-500/20 to-blue-600/20",
  "personal-development": "from-rose-500/20 to-pink-600/20",
  "relationship-advice": "from-red-500/20 to-rose-600/20",
  "entertainment-prompts": "from-fuchsia-500/20 to-purple-600/20",
  "role-playing": "from-lime-500/20 to-green-600/20",
  "general-inquiry": "from-gray-500/20 to-slate-600/20",
  "information-summary": "from-blue-500/20 to-indigo-600/20",
};

// Bento grid sizing based on content importance
const getBentoSize = (index: number) => {
  const patterns = [
    "col-span-1 md:col-span-2 lg:col-span-2", // Large featured card
    "col-span-1", // Standard card
    "col-span-1", // Standard card
    "col-span-1 md:col-span-1", // Standard card
    "col-span-1 md:col-span-2", // Medium card
    "col-span-1", // Standard card
  ];
  return patterns[index % patterns.length];
};

const FeedsFilterGrid = () => {
  return (
    <FeedsFilterQuery>
      {(response) => {
        const feeds = response.data?.pages.flatMap((page) => page.items);
        return (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 auto-rows-auto p-4 lg:p-6">
            {feeds?.map((feed, index) => {
              const categoryKey =
                feed.expand?.category?.key || "general-inquiry";
              const gradient =
                categoryGradients[categoryKey] ||
                "from-gray-500/20 to-slate-600/20";
              const bentoSize = getBentoSize(index);

              return (
                <PrefetchWhenHover href={`/feeds/${feed.id}`} key={feed.id}>
                  <div
                    className={`${bentoSize} group relative overflow-hidden`}
                  >
                    {/* Glassmorphic card with backdrop blur */}
                    <div
                      className={`
                      h-full min-h-[200px] rounded-2xl bg-gradient-to-br ${gradient}
                      backdrop-blur-xl border border-white/20 dark:border-gray-700/30
                      hover:scale-[1.02] hover:bg-white/80 dark:hover:bg-gray-800/80
                      transition-all duration-300 ease-in-out
                      supports-[backdrop-filter]:bg-white/60 dark:supports-[backdrop-filter]:bg-gray-900/60
                      shadow-lg hover:shadow-xl
                      flex flex-col
                    `}
                    >
                      {/* Content container */}
                      <div className="p-6 flex flex-col gap-4 h-full">
                        {/* Header with category icon and badge */}
                        <div className="flex items-start justify-between">
                          <div className="flex items-center gap-3">
                            <div className="p-2 rounded-lg bg-white/40 dark:bg-gray-800/40 backdrop-blur-sm">
                              <CategoryIcon
                                iconKey={categoryKey}
                                className="w-5 h-5 text-gray-700 dark:text-gray-300"
                              />
                            </div>
                            <span className="px-3 py-1 rounded-full text-xs font-medium bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm border border-white/30 dark:border-gray-700/30">
                              {feed.expand?.category?.name}
                            </span>
                          </div>
                        </div>

                        {/* Title and description */}
                        <div className="flex-1 flex flex-col gap-3">
                          <h2 className="text-lg lg:text-xl font-bold text-gray-900 dark:text-white line-clamp-2 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors duration-200">
                            {feed.title}
                          </h2>
                          <p className="text-sm text-gray-700 dark:text-gray-300 line-clamp-3 leading-relaxed">
                            {feed.description}
                          </p>
                        </div>

                        {/* Tags */}
                        {feed.expand?.tags && feed.expand.tags.length > 0 && (
                          <div className="flex flex-wrap gap-2">
                            {feed.expand.tags.slice(0, 3).map((tag) => (
                              <span
                                key={tag.id}
                                className="px-2 py-1 text-xs font-medium rounded-md bg-indigo-500/20 text-indigo-700 dark:text-indigo-300 border border-indigo-500/30"
                              >
                                {tag.name}
                              </span>
                            ))}
                            {feed.expand.tags.length > 3 && (
                              <span className="px-2 py-1 text-xs font-medium rounded-md bg-gray-500/20 text-gray-600 dark:text-gray-400 border border-gray-500/30">
                                +{feed.expand.tags.length - 3}
                              </span>
                            )}
                          </div>
                        )}

                        {/* Hover overlay */}
                        <div className="absolute inset-0 bg-gradient-to-t from-black/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-2xl pointer-events-none" />
                      </div>
                    </div>
                  </div>
                </PrefetchWhenHover>
              );
            })}
          </div>
        );
      }}
    </FeedsFilterQuery>
  );
};

export default FeedsFilterGrid;
