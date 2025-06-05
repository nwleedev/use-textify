"use client";

import { toFeedSearchSchema } from "@/entities/feed/lib/schema/search";

import { feedSearchSchema } from "@/entities/feed/lib/schema/search";
import FeedSearchDialog from "@/features/feed/ui/search/dialog";
import Portal from "@/shared/ui/portal";
import { zodResolver } from "@hookform/resolvers/zod";
import { Search, Tag } from "lucide-react";
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
        className="flex-shrink-0 flex items-center gap-2 px-4 py-2 rounded-full border w-full max-w-sm bg-base-200 hover:bg-base-300 transition outline-none"
        onClick={() => {
          ref.current?.showModal();
        }}
      >
        <Tag className="w-5 h-5" />
        <span className="flex-1 text-left text-sm text-base-content/70">
          Search feeds...
        </span>
        <Search className="w-5 h-5" />
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
