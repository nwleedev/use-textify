"use client";

import { CategoryIcon } from "@/entities/category/lib/icons";
import {
  feedSearchSchema,
  FeedSearchSchema,
  Stage,
  toFeedSearchSchema,
} from "@/entities/feed/lib/schema/search";
import CategoriesQuery from "@/features/category/ui/query";
import TagsQuery from "@/features/tag/ui/query";
import { zodResolver } from "@hookform/resolvers/zod";
import { ChevronLeft, Plus, RefreshCw, Search, Trash2, X } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import { MouseEvent, Suspense } from "react";
import { useController, useForm } from "react-hook-form";

const Page = () => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const { register, control, getValues, setValue, handleSubmit } =
    useForm<FeedSearchSchema>({
      resolver: zodResolver(feedSearchSchema),
      defaultValues: toFeedSearchSchema(searchParams),
    });
  const controller = useController({ control, name: "tag" });
  const categoryController = useController({ control, name: "category" });
  const tagsController = useController({ control, name: "tags" });
  const {
    field: { value: stage },
  } = useController({ control, name: "stage" });

  const hasQuery =
    controller.field.value &&
    controller.field.value.length >= 2 &&
    controller.field.value.length <= 16;
  const onClick = (event: MouseEvent<HTMLButtonElement>, value: string) => {
    const tags = getValues("tags").reduce((acc, cur) => {
      acc.add(cur.name);
      return acc;
    }, new Set<string>());
    if (tags.has(value)) {
      tags.delete(value);
    } else {
      tags.add(value);
    }
    setValue(
      "tags",
      Array.from(tags).map((name) => ({ name }))
    );
    setValue("tag", "");
  };
  const onSubmit = handleSubmit((form) => {
    const { keyword, tags, category } = form;
    const searchParams = new URLSearchParams();
    if (category.key) {
      searchParams.set("category", category.key);
    }
    if (keyword) {
      searchParams.set("keyword", keyword);
    }
    if (tags.length > 0) {
      searchParams.set("tags", tags.map((tag) => tag.name).join(","));
    }
    router.push(`/feeds?${searchParams.toString()}`);
  });

  return (
    <div className="flex flex-col w-full relative min-h-full bg-gradient-to-br from-gray-50 via-white to-indigo-50 dark:from-gray-900 dark:via-gray-900 dark:to-indigo-900/20">
      {/* Modern glassmorphic header */}
      <div className="flex items-center justify-between pb-4 pt-6 sticky top-0 z-50 backdrop-blur-xl bg-white/70 dark:bg-gray-900/70 border-b border-white/20 dark:border-gray-700/30 supports-[backdrop-filter]:bg-white/60 dark:supports-[backdrop-filter]:bg-gray-900/60 shadow-sm px-6">
        {stage === "dialog" && (
          <div className="flex items-center justify-between w-full">
            <h2 className="font-bold text-xl text-gray-900 dark:text-white">
              Feed Search
            </h2>
            <button
              className="p-2 rounded-xl bg-white/40 dark:bg-gray-800/40 backdrop-blur-sm border border-white/30 dark:border-gray-700/30 hover:bg-white/60 dark:hover:bg-gray-700/60 transition-all duration-200"
              type="button"
              onClick={() => {
                setValue("stage", Stage.DIALOG);
                router.back();
              }}
            >
              <X className="w-5 h-5 text-gray-700 dark:text-gray-300" />
            </button>
          </div>
        )}
        {stage === "category" && (
          <div className="flex gap-2 items-center w-full">
            <button
              className="p-2 rounded-xl bg-white/40 dark:bg-gray-800/40 backdrop-blur-sm border border-white/30 dark:border-gray-700/30 hover:bg-white/60 dark:hover:bg-gray-700/60 transition-all duration-200"
              type="button"
              onClick={() => setValue("stage", Stage.DIALOG)}
            >
              <ChevronLeft className="w-5 h-5 text-gray-700 dark:text-gray-300" />
            </button>
            <h2 className="font-bold text-xl text-gray-900 dark:text-white">
              Select Category
            </h2>
          </div>
        )}
        {stage === "tags" && (
          <div className="flex gap-2 items-center w-full">
            <button
              className="p-2 rounded-xl bg-white/40 dark:bg-gray-800/40 backdrop-blur-sm border border-white/30 dark:border-gray-700/30 hover:bg-white/60 dark:hover:bg-gray-700/60 transition-all duration-200"
              type="button"
              onClick={() => setValue("stage", Stage.DIALOG)}
            >
              <ChevronLeft className="w-5 h-5 text-gray-700 dark:text-gray-300" />
            </button>
            <h2 className="font-bold text-xl text-gray-900 dark:text-white">
              Select Tags
            </h2>
          </div>
        )}
      </div>

      <form
        className="flex flex-col w-full pt-0 pb-3 px-0 flex-1"
        action={"GET"}
        onSubmit={onSubmit}
      >
        <div className="flex flex-col gap-6 px-6 py-6 flex-1">
          {stage === "dialog" && (
            <>
              <div className="flex flex-col gap-3 w-full">
                <label htmlFor="keyword" className="flex-shrink-0">
                  <h3 className="text-base font-semibold text-gray-900 dark:text-white">
                    Keyword
                  </h3>
                </label>
                <div className="relative">
                  <input
                    type="text"
                    autoComplete="off"
                    className="w-full px-4 py-3 pl-4 pr-12 rounded-2xl bg-white/50 dark:bg-gray-800/50 backdrop-blur-xl border border-white/30 dark:border-gray-700/30 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500/30 transition-all duration-200"
                    placeholder="Search for feeds..."
                    {...register("keyword")}
                  />
                  <button
                    className="absolute right-3 top-1/2 -translate-y-1/2 p-1.5 rounded-lg bg-indigo-500/20 hover:bg-indigo-500/30 transition-colors duration-200"
                    type="submit"
                  >
                    <Search className="w-4 h-4 text-indigo-600 dark:text-indigo-400" />
                  </button>
                </div>
              </div>

              <div className="flex flex-col gap-3 w-full">
                <label htmlFor="category" className="flex-shrink-0">
                  <h3 className="text-base font-semibold text-gray-900 dark:text-white">
                    Category
                  </h3>
                </label>
                {!categoryController.field.value.key && (
                  <button
                    className="flex items-center justify-center gap-2 px-4 py-3 rounded-2xl bg-white/50 dark:bg-gray-800/50 backdrop-blur-xl border border-dashed border-indigo-500/50 text-indigo-600 dark:text-indigo-400 hover:bg-indigo-500/10 transition-all duration-200"
                    type="button"
                    onClick={() => setValue("stage", Stage.CATEGORY)}
                  >
                    <span className="text-sm font-medium">Select Category</span>
                  </button>
                )}
                {categoryController.field.value.key && (
                  <div className="flex items-center gap-3 px-4 py-3 rounded-2xl bg-white/50 dark:bg-gray-800/50 backdrop-blur-xl border border-white/30 dark:border-gray-700/30">
                    <div className="p-2 rounded-lg bg-indigo-500/20">
                      <CategoryIcon
                        iconKey={categoryController.field.value.key}
                        className="w-5 h-5 text-indigo-600 dark:text-indigo-400"
                      />
                    </div>
                    <span className="flex-1 text-base font-medium text-gray-900 dark:text-white">
                      {categoryController.field.value.name}
                    </span>
                    <button
                      className="p-2 rounded-lg bg-gray-500/20 hover:bg-gray-500/30 transition-colors duration-200"
                      type="button"
                      onClick={() => {
                        setValue("stage", Stage.CATEGORY);
                      }}
                    >
                      <RefreshCw className="w-4 h-4 text-gray-600 dark:text-gray-400" />
                    </button>
                    <button
                      className="p-2 rounded-lg bg-red-500/20 hover:bg-red-500/30 transition-colors duration-200"
                      type="button"
                      onClick={() => {
                        setValue("category", {
                          id: "",
                          name: "",
                          key: "",
                        });
                      }}
                    >
                      <Trash2 className="w-4 h-4 text-red-600 dark:text-red-400" />
                    </button>
                  </div>
                )}
              </div>

              <div className="flex flex-col gap-3 w-full">
                <label htmlFor="tags" className="flex-shrink-0">
                  <h3 className="text-base font-semibold text-gray-900 dark:text-white">
                    Tags
                  </h3>
                </label>
                {tagsController.field.value.length === 0 && (
                  <button
                    className="flex items-center justify-center gap-2 px-4 py-3 rounded-2xl bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700 text-white transition-all duration-200"
                    type="button"
                    onClick={() => setValue("stage", Stage.TAGS)}
                  >
                    <Plus className="w-4 h-4" />
                    <span className="text-sm font-medium">Add Tags</span>
                  </button>
                )}
                {tagsController.field.value.length > 0 && (
                  <div className="flex flex-wrap gap-3">
                    {tagsController.field.value.map((tag) => (
                      <button
                        key={tag.name}
                        type="button"
                        className="px-3 py-2 rounded-xl bg-indigo-500 hover:bg-indigo-600 text-white text-sm font-medium transition-colors duration-200"
                        onClick={(event) => {
                          onClick(event, tag.name);
                        }}
                      >
                        {tag.name}
                      </button>
                    ))}
                    <button
                      className="p-2 rounded-xl bg-gray-500/20 hover:bg-gray-500/30 transition-colors duration-200"
                      type="button"
                      onClick={() => setValue("stage", Stage.TAGS)}
                    >
                      <Plus className="w-4 h-4 text-gray-600 dark:text-gray-400" />
                    </button>
                  </div>
                )}
              </div>
            </>
          )}

          {stage === "category" && (
            <div className="flex flex-col gap-3 w-full">
              <Suspense>
                <CategoriesQuery>
                  {(response) => {
                    return response.data.map((item) => (
                      <button
                        key={item.id}
                        className="flex items-center gap-4 px-4 py-4 rounded-2xl bg-white/50 dark:bg-gray-800/50 backdrop-blur-xl border border-white/30 dark:border-gray-700/30 hover:bg-white/70 dark:hover:bg-gray-700/70 transition-all duration-200"
                        type="button"
                        onClick={() => {
                          setValue("category", {
                            id: item.id,
                            name: item.name,
                            key: item.key,
                          });
                          setValue("stage", Stage.DIALOG);
                        }}
                      >
                        <div className="p-2 rounded-lg bg-indigo-500/20">
                          <CategoryIcon
                            iconKey={item.key}
                            className="w-5 h-5 text-indigo-600 dark:text-indigo-400"
                          />
                        </div>
                        <span className="text-base font-medium text-gray-900 dark:text-white">
                          {item.name}
                        </span>
                      </button>
                    ));
                  }}
                </CategoriesQuery>
              </Suspense>
            </div>
          )}

          {stage === "tags" && (
            <div className="flex flex-col w-full gap-4">
              <label htmlFor="tag" className="flex-shrink-0">
                <h3 className="text-base font-semibold text-gray-900 dark:text-white">
                  Search Tags
                </h3>
              </label>
              <input
                type="text"
                autoComplete="off"
                className="w-full px-4 py-3 rounded-2xl bg-white/50 dark:bg-gray-800/50 backdrop-blur-xl border border-white/30 dark:border-gray-700/30 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500/30 transition-all duration-200"
                placeholder="Type to search tags..."
                {...register("tag")}
              />
              <div className="w-full h-px relative">
                {hasQuery && (
                  <Suspense>
                    <TagsQuery keyword={controller.field.value}>
                      {(response) => {
                        if (response.data.items.length === 0) {
                          return null;
                        }
                        return (
                          <div className="flex flex-wrap gap-2 py-4 px-2 absolute top-0 left-0 w-full bg-white/80 dark:bg-gray-800/80 backdrop-blur-xl rounded-2xl border border-white/30 dark:border-gray-700/30">
                            {response.data.items.map((item) => (
                              <button
                                key={item.id}
                                className="px-3 py-2 rounded-xl bg-white/70 dark:bg-gray-700/70 border border-gray-300/50 dark:border-gray-600/50 text-gray-900 dark:text-white text-sm font-medium hover:bg-indigo-500 hover:text-white transition-all duration-200"
                                type="button"
                                onClick={(event) => {
                                  onClick(event, item.name);
                                }}
                              >
                                {item.name}
                              </button>
                            ))}
                          </div>
                        );
                      }}
                    </TagsQuery>
                  </Suspense>
                )}
              </div>
              <div className="flex flex-wrap gap-2 py-2">
                {tagsController.field.value.map((tag) => (
                  <button
                    key={tag.name}
                    className="px-3 py-2 rounded-xl bg-indigo-500 hover:bg-indigo-600 text-white text-sm font-medium transition-colors duration-200"
                    type="button"
                    onClick={(event) => {
                      onClick(event, tag.name);
                    }}
                  >
                    {tag.name}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      </form>
    </div>
  );
};

export default Page;
