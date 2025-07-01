"use client";

import { toFeedSearchSchema } from "@/entities/feed/lib/schema/search";

import { feedSearchSchema } from "@/entities/feed/lib/schema/search";
import FeedSearchDialog from "@/features/feed/ui/search/dialog";
import Portal from "@/shared/ui/portal";
import { zodResolver } from "@hookform/resolvers/zod";
import { Search, Sparkles } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import { useRef } from "react";
import { FormProvider, useForm } from "react-hook-form";

const NavbarSearch = () => {
  const ref = useRef(null as HTMLDialogElement | null);
  const router = useRouter();
  const searchParams = useSearchParams();
  const form = useForm({
    resolver: zodResolver(feedSearchSchema),
    defaultValues: toFeedSearchSchema(searchParams),
  });
  const { handleSubmit } = form;

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
    ref.current?.close();
  });

  return (
    <>
      <button
        className="group flex flex-shrink-0 items-center gap-3 px-4 py-2.5 rounded-2xl w-full max-w-sm 
                   bg-white/50 dark:bg-gray-800/50 backdrop-blur-xl border border-white/30 dark:border-gray-700/30
                   hover:bg-white/70 dark:hover:bg-gray-700/70 hover:scale-[1.02]
                   transition-all duration-300 ease-in-out outline-none
                   supports-[backdrop-filter]:bg-white/40 dark:supports-[backdrop-filter]:bg-gray-800/40
                   shadow-sm hover:shadow-md focus:ring-2 focus:ring-indigo-500/30"
        onClick={() => {
          ref.current?.showModal();
        }}
      >
        {/* Search icon with subtle animation */}
        <div className="p-1 rounded-lg bg-indigo-500/20 group-hover:bg-indigo-500/30 transition-colors duration-200">
          <Sparkles className="w-4 h-4 text-indigo-600 dark:text-indigo-400" />
        </div>

        {/* Search text */}
        <span className="flex-1 text-left text-sm font-medium text-gray-700 dark:text-gray-300 group-hover:text-gray-900 dark:group-hover:text-gray-100 transition-colors duration-200">
          Search feeds...
        </span>

        {/* Search action icon */}
        <div className="p-1 rounded-lg bg-gray-500/10 group-hover:bg-gray-500/20 transition-colors duration-200">
          <Search className="w-4 h-4 text-gray-500 dark:text-gray-400 group-hover:text-gray-700 dark:group-hover:text-gray-200 transition-colors duration-200" />
        </div>

        {/* Keyboard shortcut hint
        <div className="hidden lg:flex items-center gap-1 px-2 py-1 rounded-md bg-gray-200/50 dark:bg-gray-700/50 backdrop-blur-sm">
          <span className="text-xs font-medium text-gray-500 dark:text-gray-400">
            ⌘K
          </span>
        </div> */}
      </button>

      <Portal id="portal">
        <FormProvider {...form}>
          <FeedSearchDialog
            ref={ref}
            onClose={() => ref.current?.close()}
            onSubmit={onSubmit}
          />
        </FormProvider>
      </Portal>
    </>
  );
};

export default NavbarSearch;
