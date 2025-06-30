"use client";

import { CategoryIcon } from "@/entities/category/lib/icons";
import { createFeedMutationKey } from "@/entities/feed/lib/mutation-key";
import {
  defaultValues,
  NewFeedSchema,
  newFeedSchema,
} from "@/entities/feed/lib/schema";
import CategoriesQuery from "@/features/category/ui/query";
import { createFeedMutation } from "@/features/feed/lib/mutation";
import TagsQuery from "@/features/tag/ui/query";
import { useClient } from "@/shared/lib/pocketbase/hook";
import Portal from "@/shared/ui/portal";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { useDebounce } from "@uidotdev/usehooks";
import {
  AlertTriangle,
  ChevronLeft,
  FileText,
  Layers,
  Plus,
  Settings,
  Tag,
  Trash2,
  X,
} from "lucide-react";
import { useRouter } from "next/navigation";
import { MouseEvent, Suspense, useRef } from "react";
import {
  FormProvider,
  useController,
  useFieldArray,
  useForm,
  useFormContext,
} from "react-hook-form";
import { z } from "zod";

const NoticeForm = () => {
  const context = useFormContext<NewFeedSchema>();
  const { fields, append, remove } = useFieldArray({
    control: context.control,
    name: "notices",
  });

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-lg bg-yellow-500/20">
            <AlertTriangle className="w-5 h-5 text-yellow-600 dark:text-yellow-400" />
          </div>
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
            Notices
          </h2>
        </div>
        <button
          type="button"
          onClick={() => append({ text: "" })}
          className="p-2 rounded-xl bg-yellow-500/20 hover:bg-yellow-500/30 border border-yellow-300/30 dark:border-yellow-600/30 text-yellow-600 dark:text-yellow-400 transition-all duration-200"
        >
          <Plus className="w-4 h-4" />
        </button>
      </div>
      <div className="space-y-3">
        {fields.map((field, index) => (
          <div key={field.id} className="flex gap-3">
            <input
              type="text"
              {...context.register(`notices.${index}.text`)}
              className="flex-1 px-4 py-3 rounded-2xl bg-white/70 dark:bg-gray-800/70 backdrop-blur-xl border border-white/30 dark:border-gray-700/30 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-yellow-500/30 transition-all duration-200"
              placeholder="Enter notice text"
            />
            <button
              type="button"
              onClick={() => remove(index)}
              className="p-3 rounded-xl bg-red-500/20 hover:bg-red-500/30 border border-red-300/30 dark:border-red-600/30 text-red-600 dark:text-red-400 transition-all duration-200"
            >
              <Trash2 className="w-4 h-4" />
            </button>
          </div>
        ))}
        {fields.length === 0 && (
          <div className="p-4 rounded-2xl bg-gray-50/70 dark:bg-gray-800/50 border border-gray-200/30 dark:border-gray-700/30 text-center">
            <p className="text-gray-500 dark:text-gray-400 text-sm">
              No notices added yet
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

const VariableForm = () => {
  const context = useFormContext<NewFeedSchema>();
  const { fields, append, remove } = useFieldArray({
    control: context.control,
    name: "variables",
  });

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-lg bg-orange-500/20">
            <Settings className="w-5 h-5 text-orange-600 dark:text-orange-400" />
          </div>
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
            Variables
          </h2>
        </div>
        <button
          type="button"
          onClick={() => append({ name: "", description: "" })}
          className="p-2 rounded-xl bg-orange-500/20 hover:bg-orange-500/30 border border-orange-300/30 dark:border-orange-600/30 text-orange-600 dark:text-orange-400 transition-all duration-200"
        >
          <Plus className="w-4 h-4" />
        </button>
      </div>
      <div className="space-y-4">
        {fields.map((field, index) => (
          <div
            key={field.id}
            className="p-4 rounded-2xl bg-white/50 dark:bg-gray-800/50 backdrop-blur-xl border border-white/30 dark:border-gray-700/30 space-y-3"
          >
            <div className="flex gap-3">
              <input
                type="text"
                {...context.register(`variables.${index}.name`)}
                className="flex-1 px-4 py-3 rounded-xl bg-white/70 dark:bg-gray-800/70 backdrop-blur-xl border border-white/30 dark:border-gray-700/30 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-orange-500/30 transition-all duration-200"
                placeholder="Variable name"
              />
              <button
                type="button"
                onClick={() => remove(index)}
                className="p-3 rounded-xl bg-red-500/20 hover:bg-red-500/30 border border-red-300/30 dark:border-red-600/30 text-red-600 dark:text-red-400 transition-all duration-200"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
            <input
              type="text"
              {...context.register(`variables.${index}.description`)}
              className="w-full px-4 py-3 rounded-xl bg-white/70 dark:bg-gray-800/70 backdrop-blur-xl border border-white/30 dark:border-gray-700/30 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-orange-500/30 transition-all duration-200"
              placeholder="Variable description"
            />
          </div>
        ))}
        {fields.length === 0 && (
          <div className="p-4 rounded-2xl bg-gray-50/70 dark:bg-gray-800/50 border border-gray-200/30 dark:border-gray-700/30 text-center">
            <p className="text-gray-500 dark:text-gray-400 text-sm">
              No variables added yet
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

const TagForm = () => {
  const { control, getValues } = useFormContext<NewFeedSchema>();
  const { fields, append, remove } = useFieldArray({
    control: control,
    name: "tags",
  });
  const input = useForm({
    resolver: zodResolver(z.object({ text: z.string() })),
    defaultValues: { text: "" },
  });
  const controller = useController({ control: input.control, name: "text" });
  const debouncedValue = useDebounce(controller.field.value, 500);
  const hasQuery = debouncedValue.length >= 2 && debouncedValue.length <= 16;
  const onClick = (event: MouseEvent<HTMLButtonElement>, name: string) => {
    const tags = getValues("tags").reduce((acc, cur) => {
      acc.add(cur.name);
      return acc;
    }, new Set<string>());
    if (tags.has(name)) {
      return;
    }
    input.setValue("text", "");
    append({ name });
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-3">
        <div className="p-2 rounded-lg bg-blue-500/20">
          <Tag className="w-5 h-5 text-blue-600 dark:text-blue-400" />
        </div>
        <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
          Tags
        </h2>
      </div>
      <div className="relative">
        <div className="p-4 rounded-2xl bg-white/50 dark:bg-gray-800/50 backdrop-blur-xl border border-white/30 dark:border-gray-700/30">
          <div className="flex flex-wrap gap-3 items-center min-h-[48px]">
            <input
              type="text"
              {...controller.field}
              className="flex-shrink-0 min-w-[120px] px-3 py-2 rounded-xl bg-white/70 dark:bg-gray-800/70 backdrop-blur-sm border border-white/30 dark:border-gray-700/30 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500/30 transition-all duration-200"
              placeholder="Add tags..."
            />
            {fields.map((field, index) => (
              <button
                key={field.id}
                type="button"
                onClick={() => remove(index)}
                className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-blue-500/20 hover:bg-blue-500/30 border border-blue-300/30 dark:border-blue-600/30 text-blue-700 dark:text-blue-300 text-sm font-medium transition-all duration-200 hover:scale-105"
              >
                {field.name}
                <X className="w-3 h-3" />
              </button>
            ))}
          </div>
        </div>
        {hasQuery && (
          <div className="absolute top-full left-0 right-0 mt-2 p-4 rounded-2xl bg-white/95 dark:bg-gray-900/95 backdrop-blur-2xl border border-white/20 dark:border-gray-700/30 shadow-2xl z-10">
            <div className="flex flex-wrap gap-2">
              <button
                key="Custom Tag"
                type="button"
                onClick={(event) => onClick(event, debouncedValue)}
                className="px-3 py-2 rounded-xl bg-indigo-500/20 hover:bg-indigo-500/30 border border-indigo-300/30 dark:border-indigo-600/30 text-indigo-700 dark:text-indigo-300 text-sm font-medium transition-all duration-200"
              >
                Add &quot;{debouncedValue}&quot;
              </button>
              <Suspense>
                <TagsQuery keyword={hasQuery ? debouncedValue : ""}>
                  {(data) => {
                    return data.data.items.map((tag) => (
                      <button
                        key={tag.id}
                        type="button"
                        onClick={(event) => onClick(event, tag.name)}
                        className="px-3 py-2 rounded-xl bg-green-500/20 hover:bg-green-500/30 border border-green-300/30 dark:border-green-600/30 text-green-700 dark:text-green-300 text-sm font-medium transition-all duration-200"
                      >
                        {tag.name}
                      </button>
                    ));
                  }}
                </TagsQuery>
              </Suspense>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

const FeedNew = () => {
  const form = useForm({
    resolver: zodResolver(newFeedSchema),
    defaultValues: defaultValues,
  });
  const { handleSubmit } = form;
  const ref = useRef<HTMLDialogElement | null>(null);
  const {
    field: { value: category },
  } = useController({ control: form.control, name: "category" });
  const client = useClient();
  const router = useRouter();
  const { mutateAsync, isPending } = useMutation({
    mutationKey: createFeedMutationKey(),
    mutationFn: createFeedMutation(client),
  });
  const onSubmit = handleSubmit(async (form) => {
    const { feed } = await mutateAsync({
      schema: form,
    });
    router.push(`/feeds/${feed.id}`);
  });

  return (
    <FormProvider {...form}>
      <div className="flex-1 bg-gradient-to-br from-gray-50 via-white to-indigo-50 dark:from-gray-900 dark:via-gray-900 dark:to-indigo-900/20 flex flex-col">
        {/* Modern glassmorphic navigation header */}
        <nav className="w-full z-50 sticky top-0 h-16 flex items-center backdrop-blur-xl bg-white/70 dark:bg-gray-900/70 border-b border-white/20 dark:border-gray-700/30 supports-[backdrop-filter]:bg-white/60 dark:supports-[backdrop-filter]:bg-gray-900/60 shadow-sm px-4 gap-4">
          <button
            type="button"
            onClick={() => router.back()}
            className="p-2 rounded-xl bg-white/40 dark:bg-gray-800/40 backdrop-blur-sm border border-white/30 dark:border-gray-700/30 hover:bg-white/60 dark:hover:bg-gray-700/60 transition-all duration-200"
          >
            <ChevronLeft className="w-5 h-5 text-gray-700 dark:text-gray-300" />
          </button>
          <div className="flex items-center gap-3 flex-1">
            <div className="p-2 rounded-xl bg-indigo-500/20 backdrop-blur-sm">
              <Plus className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />
            </div>
            <h1 className="text-lg font-bold text-gray-900 dark:text-white">
              Create New Feed
            </h1>
          </div>
        </nav>

        {/* Main form container */}
        <div className="flex-1 flex items-start justify-center p-4 pt-8">
          <div className="w-full max-w-2xl lg:max-w-4xl bg-white/95 dark:bg-gray-900/95 backdrop-blur-2xl border border-white/20 dark:border-gray-700/30 supports-[backdrop-filter]:bg-white/90 dark:supports-[backdrop-filter]:bg-gray-900/90 shadow-2xl rounded-3xl overflow-hidden">
            <form className="p-8 space-y-8" onSubmit={onSubmit}>
              {/* Basic Information */}
              <div className="space-y-6">
                <div className="flex items-center gap-3 mb-6">
                  <div className="p-2 rounded-xl bg-green-500/20">
                    <FileText className="w-5 h-5 text-green-600 dark:text-green-400" />
                  </div>
                  <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
                    Basic Information
                  </h2>
                </div>

                <div className="space-y-3">
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                    Title
                  </label>
                  <input
                    type="text"
                    {...form.register("title")}
                    className="w-full px-4 py-3 rounded-2xl bg-white/70 dark:bg-gray-800/70 backdrop-blur-xl border border-white/30 dark:border-gray-700/30 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-500/30 transition-all duration-200"
                    placeholder="Enter feed title"
                  />
                </div>

                <div className="space-y-3">
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                    Description
                  </label>
                  <input
                    type="text"
                    {...form.register("description")}
                    className="w-full px-4 py-3 rounded-2xl bg-white/70 dark:bg-gray-800/70 backdrop-blur-xl border border-white/30 dark:border-gray-700/30 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-500/30 transition-all duration-200"
                    placeholder="Enter feed description"
                  />
                </div>

                <div className="space-y-3">
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                    Prompt
                  </label>
                  <textarea
                    {...form.register("prompt")}
                    className="w-full px-4 py-3 rounded-2xl bg-white/70 dark:bg-gray-800/70 backdrop-blur-xl border border-white/30 dark:border-gray-700/30 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-500/30 transition-all duration-200 min-h-[120px] resize-y"
                    placeholder="Enter your AI prompt"
                  />
                </div>
              </div>

              {/* Category Selection */}
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-xl bg-purple-500/20">
                    <Layers className="w-5 h-5 text-purple-600 dark:text-purple-400" />
                  </div>
                  <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
                    Category
                  </h2>
                </div>

                {!category.key ? (
                  <button
                    className="w-full p-4 rounded-2xl border-2 border-dashed border-purple-300/50 dark:border-purple-600/50 bg-purple-50/50 dark:bg-purple-900/20 hover:bg-purple-100/50 dark:hover:bg-purple-800/30 text-purple-700 dark:text-purple-300 font-medium transition-all duration-200"
                    type="button"
                    onClick={() => ref.current?.showModal()}
                  >
                    Select Category
                  </button>
                ) : (
                  <div className="flex items-center gap-4 p-4 rounded-2xl bg-white/50 dark:bg-gray-800/50 backdrop-blur-xl border border-white/30 dark:border-gray-700/30">
                    <div className="flex items-center gap-3">
                      <div className="p-2 rounded-lg bg-purple-500/20">
                        <CategoryIcon
                          iconKey={category.key}
                          className="w-5 h-5 text-purple-600 dark:text-purple-400"
                        />
                      </div>
                      <span className="font-semibold text-gray-900 dark:text-white">
                        {category.name}
                      </span>
                    </div>
                    <button
                      className="ml-auto px-4 py-2 rounded-xl border-2 border-dashed border-purple-300/50 dark:border-purple-600/50 bg-purple-50/50 dark:bg-purple-900/20 hover:bg-purple-100/50 dark:hover:bg-purple-800/30 text-purple-700 dark:text-purple-300 font-medium transition-all duration-200"
                      type="button"
                      onClick={() => ref.current?.showModal()}
                    >
                      Change
                    </button>
                  </div>
                )}

                {/* Modern category selection modal */}
                <Portal id="portal">
                  <dialog
                    ref={ref}
                    className="modal p-0 backdrop:backdrop-blur-md backdrop:bg-black/30"
                  >
                    <div
                      className="modal-backdrop"
                      onClick={() => ref.current?.close()}
                    />
                    <div className="max-w-lg w-full mx-4 bg-white/95 dark:bg-gray-900/95 backdrop-blur-2xl border border-white/20 dark:border-gray-700/30 supports-[backdrop-filter]:bg-white/90 dark:supports-[backdrop-filter]:bg-gray-900/90 shadow-2xl rounded-3xl p-8">
                      <div className="space-y-6">
                        <div className="text-center space-y-2">
                          <div className="p-4 rounded-2xl bg-purple-500/20 w-fit mx-auto">
                            <Layers className="w-8 h-8 text-purple-600 dark:text-purple-400" />
                          </div>
                          <h2 className="text-xl font-bold text-gray-900 dark:text-white">
                            Select Category
                          </h2>
                          <p className="text-gray-600 dark:text-gray-400 text-sm">
                            Choose the most appropriate category for your feed
                          </p>
                        </div>
                        <div className="max-h-[60vh] overflow-y-auto space-y-2">
                          <CategoriesQuery>
                            {(data) => (
                              <div className="space-y-2">
                                {data.data.map((category) => (
                                  <button
                                    key={category.id}
                                    type="button"
                                    className="w-full flex items-center gap-4 p-4 rounded-2xl bg-white/50 dark:bg-gray-800/50 backdrop-blur-xl border border-white/30 dark:border-gray-700/30 hover:bg-white/70 dark:hover:bg-gray-700/70 transition-all duration-200 text-left"
                                    onClick={() => {
                                      form.setValue("category", {
                                        id: category.id,
                                        key: category.key,
                                        name: category.name,
                                      });
                                      ref.current?.close();
                                    }}
                                  >
                                    <div className="p-2 rounded-lg bg-purple-500/20">
                                      <CategoryIcon
                                        iconKey={category.key}
                                        className="w-5 h-5 text-purple-600 dark:text-purple-400"
                                      />
                                    </div>
                                    <span className="font-medium text-gray-900 dark:text-white">
                                      {category.name}
                                    </span>
                                  </button>
                                ))}
                              </div>
                            )}
                          </CategoriesQuery>
                        </div>
                      </div>
                    </div>
                  </dialog>
                </Portal>
              </div>

              <TagForm />
              <NoticeForm />
              <VariableForm />

              {/* Submit button */}
              <div className="pt-4">
                <button
                  className="w-full flex items-center justify-center gap-3 px-6 py-4 rounded-2xl bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700 text-white font-semibold transition-all duration-200 shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed"
                  type="submit"
                  disabled={isPending}
                >
                  <Plus className="w-5 h-5" />
                  <span>{isPending ? "Creating Feed..." : "Create Feed"}</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </FormProvider>
  );
};

export default FeedNew;
