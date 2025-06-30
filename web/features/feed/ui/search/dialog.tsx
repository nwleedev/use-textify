import { CategoryIcon } from "@/entities/category/lib/icons";
import { FeedSearchSchema, Stage } from "@/entities/feed/lib/schema/search";
import CategoriesQuery from "@/features/category/ui/query";
import TagsQuery from "@/features/tag/ui/query";
import {
  ChevronLeft,
  Plus,
  RefreshCw,
  Search,
  Sparkles,
  Trash2,
  X,
} from "lucide-react";
import { FormEvent, forwardRef, MouseEvent, Suspense } from "react";
import { useController, useFormContext } from "react-hook-form";

export interface FeedSearchDialogProps {
  onClose: () => void;
  onSubmit: (event: FormEvent<HTMLFormElement>) => void;
}

const FeedSearchDialog = forwardRef<HTMLDialogElement, FeedSearchDialogProps>(
  function FeedSearchDialog(props, ref) {
    const { onClose, onSubmit } = props;
    const { register, control, getValues, setValue } =
      useFormContext<FeedSearchSchema>();
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

    return (
      <dialog
        ref={ref}
        className="modal p-0 backdrop:backdrop-blur-md backdrop:bg-black/30"
      >
        <div
          className="modal-backdrop"
          onClick={() => {
            setValue("stage", Stage.DIALOG);
            onClose();
          }}
        ></div>
        <form
          className="modal-box max-w-md w-full mx-4 flex flex-col overflow-hidden pt-0 pb-0 px-0 h-full max-h-[80vh] 
                     bg-white/95 dark:bg-gray-900/95 backdrop-blur-2xl border border-white/20 dark:border-gray-700/30
                     supports-[backdrop-filter]:bg-white/90 dark:supports-[backdrop-filter]:bg-gray-900/90
                     shadow-2xl rounded-3xl"
          action={"GET"}
          onSubmit={onSubmit}
        >
          {/* Modern glassmorphic header */}
          <div className="flex items-center justify-between pb-4 pt-6 sticky top-0 z-50 backdrop-blur-xl bg-white/80 dark:bg-gray-900/80 border-b border-white/20 dark:border-gray-700/30 px-6">
            {stage === "dialog" && (
              <div className="flex items-center justify-between w-full">
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-xl bg-indigo-500/20 backdrop-blur-sm">
                    <Sparkles className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />
                  </div>
                  <h2 className="font-bold text-xl text-gray-900 dark:text-white">
                    Feed Search
                  </h2>
                </div>
                <button
                  className="p-2 rounded-xl bg-white/40 dark:bg-gray-800/40 backdrop-blur-sm border border-white/30 dark:border-gray-700/30 hover:bg-white/60 dark:hover:bg-gray-700/60 transition-all duration-200"
                  type="button"
                  onClick={() => {
                    setValue("stage", Stage.DIALOG);
                    onClose();
                  }}
                >
                  <X className="w-5 h-5 text-gray-700 dark:text-gray-300" />
                </button>
              </div>
            )}
            {stage === "category" && (
              <div className="flex gap-3 items-center w-full">
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
              <div className="flex gap-3 items-center w-full">
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

          {/* Modern content area with glassmorphic styling */}
          <div className="flex flex-col gap-6 px-6 py-6 flex-1 overflow-y-auto">
            {stage === "dialog" && (
              <>
                {/* Keyword Search Section */}
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
                      placeholder="Search for feeds..."
                      className="w-full px-4 py-3 pl-4 pr-12 rounded-2xl bg-white/50 dark:bg-gray-800/50 backdrop-blur-xl border border-white/30 dark:border-gray-700/30 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500/30 transition-all duration-200"
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

                {/* Category Selection Section */}
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
                      <span className="text-sm font-medium">
                        Select Category
                      </span>
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

                {/* Tags Selection Section */}
                <div className="flex flex-col gap-3 w-full">
                  <label htmlFor="tags" className="flex-shrink-0">
                    <h3 className="text-base font-semibold text-gray-900 dark:text-white">
                      Tags
                    </h3>
                  </label>
                  {tagsController.field.value.length === 0 && (
                    <button
                      className="flex items-center justify-center gap-2 px-4 py-3 rounded-2xl bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700 text-white transition-all duration-200 shadow-lg hover:shadow-xl"
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
                          className="px-3 py-2 rounded-xl bg-indigo-500 hover:bg-indigo-600 text-white text-sm font-medium transition-colors duration-200 shadow-sm hover:shadow-md"
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

            {/* Category Selection Stage */}
            {stage === "category" && (
              <div className="flex flex-col gap-3 w-full">
                <Suspense
                  fallback={
                    <div className="flex flex-col gap-3">
                      {Array.from({ length: 6 }).map((_, i) => (
                        <div
                          key={i}
                          className="h-16 rounded-2xl bg-white/30 dark:bg-gray-800/30 animate-pulse"
                        />
                      ))}
                    </div>
                  }
                >
                  <CategoriesQuery>
                    {(response) => {
                      return response.data.map((item) => (
                        <button
                          key={item.id}
                          className="group flex items-center gap-4 px-4 py-4 rounded-2xl bg-white/50 dark:bg-gray-800/50 backdrop-blur-xl border border-white/30 dark:border-gray-700/30 hover:bg-white/70 dark:hover:bg-gray-700/70 hover:scale-[1.01] transition-all duration-200"
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
                          <div className="p-2 rounded-lg bg-indigo-500/20 group-hover:bg-indigo-500/30 transition-colors duration-200">
                            <CategoryIcon
                              iconKey={item.key}
                              className="w-5 h-5 text-indigo-600 dark:text-indigo-400"
                            />
                          </div>
                          <span className="text-base font-medium text-gray-900 dark:text-white group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors duration-200">
                            {item.name}
                          </span>
                        </button>
                      ));
                    }}
                  </CategoriesQuery>
                </Suspense>
              </div>
            )}

            {/* Tags Selection Stage */}
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
                  placeholder="Type to search tags..."
                  className="w-full px-4 py-3 rounded-2xl bg-white/50 dark:bg-gray-800/50 backdrop-blur-xl border border-white/30 dark:border-gray-700/30 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500/30 transition-all duration-200"
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
                            <div className="flex flex-wrap gap-2 py-4 px-2 absolute top-0 left-0 w-full bg-white/90 dark:bg-gray-800/90 backdrop-blur-xl rounded-2xl border border-white/30 dark:border-gray-700/30 shadow-lg z-10">
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
                      className="px-3 py-2 rounded-xl bg-indigo-500 hover:bg-indigo-600 text-white text-sm font-medium transition-colors duration-200 shadow-sm hover:shadow-md"
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
      </dialog>
    );
  }
);

export default FeedSearchDialog;
