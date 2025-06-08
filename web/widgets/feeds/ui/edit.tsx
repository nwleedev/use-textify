"use client";

import { CategoryIcon } from "@/entities/category/lib/icons";
import { editFeedMutationKey } from "@/entities/feed/lib/mutation-key";
import { getFeedByIdQueryKey } from "@/entities/feed/lib/query-key";
import {
  NewFeedSchema,
  newFeedSchema,
  toFeedEditSchema,
} from "@/entities/feed/lib/schema";
import CategoriesQuery from "@/features/category/ui/query";
import { editFeedMutation } from "@/features/feed/lib/mutation";
import { getFeedByIdQuery } from "@/features/feed/lib/query";
import TagsQuery from "@/features/tag/ui/query";
import { useClient } from "@/shared/lib/pocketbase/hook";
import Portal from "@/shared/ui/portal";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useSuspenseQuery } from "@tanstack/react-query";
import { useDebounce } from "@uidotdev/usehooks";
import { ChevronLeftIcon, PlusIcon, TrashIcon, XIcon } from "lucide-react";
import { useParams, useRouter } from "next/navigation";
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
    <div className="flex flex-col w-full gap-4">
      <div className="w-full flex justify-between items-center">
        <h2 className="font-semibold">Notices</h2>
        <button type="button" onClick={() => append({ text: "" })}>
          <PlusIcon className="w-4 h-4" />
        </button>
      </div>
      <div className="flex flex-col w-full gap-2">
        {fields.map((field, index) => {
          return (
            <div key={field.id} className="flex w-full gap-4">
              <input
                type="text"
                {...context.register(`notices.${index}.text`)}
                className="input input-bordered w-full"
              />
              <button type="button" onClick={() => remove(index)}>
                <TrashIcon className="w-4 h-4" />
              </button>
            </div>
          );
        })}
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
    <div className="flex flex-col w-full gap-4">
      <div className="w-full flex justify-between items-center">
        <h2 className="font-semibold">Variables</h2>
        <button
          type="button"
          onClick={() => append({ name: "", description: "" })}
        >
          <PlusIcon className="w-4 h-4" />
        </button>
      </div>
      <div className="flex flex-col w-full gap-2">
        {fields.map((field, index) => {
          return (
            <div key={field.id} className="flex flex-col w-full gap-4">
              <div className="flex w-full gap-2">
                <input
                  type="text"
                  {...context.register(`variables.${index}.name`)}
                  className="input input-bordered w-full input-sm"
                />
                <button type="button" onClick={() => remove(index)}>
                  <TrashIcon className="w-4 h-4" />
                </button>
              </div>
              <input
                type="text"
                {...context.register(`variables.${index}.description`)}
                className="input input-bordered w-full"
              />
            </div>
          );
        })}
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
    <div className="flex flex-col w-full">
      <h2 className="font-semibold">Tags</h2>
      <div className="flex w-full gap-2 gap-x-4 py-1 px-1 mt-2 overflow-x-auto min-h-12 h-fit flex-wrap">
        <input
          type="text"
          {...controller.field}
          className="px-1 outline-none flex-shrink-0 w-[120px] text-base [border-bottom-style:solid] border-b border-base-content h-8"
        />
        {fields.map((field, index) => {
          return (
            <button
              key={field.id}
              type="button"
              onClick={() => {
                remove(index);
              }}
              className="text-sm dark:text-success text-success-content flex items-center gap-1"
            >
              {field.name}
              <XIcon className="w-4 h-4" />
            </button>
          );
        })}
      </div>
      <div className="relative w-full h-px z-[5]">
        {hasQuery && (
          <div className="flex gap-2 flex-wrap absolute bg-base-200 shadow rounded top-1 p-4 w-full">
            <button
              key="Custom Tag"
              type="button"
              onClick={(event) => onClick(event, debouncedValue)}
              className="btn btn-sm text-base text-base-content btn-outline"
            >
              Add a new tag
            </button>
            <Suspense>
              <TagsQuery keyword={hasQuery ? debouncedValue : ""}>
                {(data) => {
                  return data.data.items.map((tag) => {
                    return (
                      <button
                        key={tag.id}
                        type="button"
                        onClick={(event) => onClick(event, tag.name)}
                        className="btn btn-sm text-base text-white btn-success"
                      >
                        {tag.name}
                      </button>
                    );
                  });
                }}
              </TagsQuery>
            </Suspense>
          </div>
        )}
      </div>
    </div>
  );
};

const FeedEdit = () => {
  const params = useParams<{ id: string }>();
  const { id } = params;
  const client = useClient();
  const router = useRouter();
  const { data: feed } = useSuspenseQuery({
    queryKey: getFeedByIdQueryKey(id),
    queryFn: getFeedByIdQuery(client),
  });
  const defaultValues = toFeedEditSchema(feed);
  const form = useForm({
    resolver: zodResolver(newFeedSchema),
    defaultValues: defaultValues,
  });
  const { handleSubmit } = form;
  const ref = useRef<HTMLDialogElement | null>(null);
  const {
    field: { value: category },
  } = useController({ control: form.control, name: "category" });
  const { mutateAsync, isPending } = useMutation({
    mutationKey: editFeedMutationKey(),
    mutationFn: editFeedMutation(client),
  });
  const onSubmit = handleSubmit(async (form) => {
    const { feed } = await mutateAsync({
      schema: form,
      id,
    });
    router.push(`/feeds/${feed.id}`);
  });

  return (
    <FormProvider {...form}>
      <div className="min-h-screen bg-base-200 items-center flex flex-col">
        <nav className="max-w-xl sm:max-w-2xl lg:max-w-3xl w-full z-10 sticky top-0 h-16 items-center flex flex-shrink-0 bg-base-100 dark:border-white border-b shadow-sm gap-4 px-4">
          <button
            type="button"
            onClick={() => {
              router.back();
            }}
            className="btn btn-ghost px-2"
          >
            <ChevronLeftIcon className="w-5 h-5" />
          </button>
          <h1 className="card-title text-lg font-bold text-center">
            Edit Feed
          </h1>
        </nav>
        <div className="card bg-base-100 w-full max-w-xl sm:max-w-2xl lg:max-w-3xl border border-base-200 p-4 sm:p-8 flex-1 z-content rounded-none shadow-none">
          <form className="w-full flex flex-col gap-6" onSubmit={onSubmit}>
            <div className="flex flex-col gap-2">
              <label className="font-semibold">Title</label>
              <input
                type="text"
                {...form.register("title")}
                className="input input-bordered w-full"
              />
            </div>
            <div className="flex flex-col gap-2">
              <label className="font-semibold">Description</label>
              <input
                type="text"
                {...form.register("description")}
                className="input input-bordered w-full"
              />
            </div>
            <div className="flex flex-col gap-2">
              <label className="font-semibold">Prompt</label>
              <textarea
                {...form.register("prompt")}
                className="textarea textarea-bordered w-full min-h-[120px]"
              />
            </div>
            <div className="flex flex-col gap-2">
              <label className="font-semibold">Category</label>
              {!category.key && (
                <button
                  className="btn border-dashed w-full btn-outline"
                  type="button"
                  onClick={() => ref.current?.showModal()}
                >
                  Select Category
                </button>
              )}
              {category.key && (
                <div className="flex items-center gap-2">
                  <div className="flex items-center gap-2 text-base-content font-semibold h-10 px-2">
                    <CategoryIcon iconKey={category.key} />
                    <span>{category.name}</span>
                  </div>
                  <button
                    className="btn border-dashed px-4 btn-outline"
                    type="button"
                    onClick={() => ref.current?.showModal()}
                    disabled={isPending}
                  >
                    Change Category
                  </button>
                </div>
              )}
              <Portal id="portal">
                <dialog ref={ref} className="modal">
                  <div
                    className="modal-backdrop"
                    onClick={() => ref.current?.close()}
                  />
                  <div className="modal-box gap-4 flex flex-col">
                    <h2 className="font-bold text-lg">Select Category</h2>
                    <div className="flex flex-col max-h-[50vh] overflow-y-auto">
                      <CategoriesQuery>
                        {(data) => {
                          return (
                            <div className="flex flex-col gap-0.5">
                              {data.data.map((category) => {
                                return (
                                  <button
                                    key={category.id}
                                    type="button"
                                    className="btn text-base btn-ghost flex items-center gap-2 py-4 h-[unset]"
                                    onClick={() => {
                                      form.setValue("category", {
                                        id: category.id,
                                        key: category.key,
                                        name: category.name,
                                      });
                                      ref.current?.close();
                                    }}
                                  >
                                    <CategoryIcon iconKey={category.key} />
                                    <span>{category.name}</span>
                                  </button>
                                );
                              })}
                            </div>
                          );
                        }}
                      </CategoriesQuery>
                    </div>
                  </div>
                </dialog>
              </Portal>
            </div>
            <TagForm />
            <NoticeForm />
            <VariableForm />
            <button
              className="btn btn-primary btn-block text-base mt-4"
              type="submit"
              disabled={isPending}
            >
              Submit
            </button>
          </form>
        </div>
      </div>
    </FormProvider>
  );
};

export default FeedEdit;
