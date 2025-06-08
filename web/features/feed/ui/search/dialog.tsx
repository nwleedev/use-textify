import { CategoryIcon } from "@/entities/category/lib/icons";
import { FeedSearchSchema, Stage } from "@/entities/feed/lib/schema/search";
import CategoriesQuery from "@/features/category/ui/query";
import TagsQuery from "@/features/tag/ui/query";
import {
  ChevronLeftIcon,
  PlusIcon,
  RefreshCwIcon,
  SearchIcon,
  TrashIcon,
  XIcon,
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
      <dialog ref={ref} className="modal p-2">
        <div
          className="modal-backdrop"
          onClick={() => {
            setValue("stage", Stage.DIALOG);
            onClose();
          }}
        ></div>
        <form
          className="modal-box flex flex-col w-full overflow-y-auto pt-0 pb-3 px-0 h-full max-h-[60vh]"
          action={"GET"}
          onSubmit={onSubmit}
        >
          <div className="flex items-center justify-between pb-4 pt-6 sticky top-0 bg-base-100 px-3 z-10">
            {stage === "dialog" && (
              <div className="flex items-center justify-between px-3 w-full">
                <h2 className="font-bold text-lg">Feed Search</h2>
                <button
                  className="btn btn-sm btn-ghost"
                  type="button"
                  onClick={() => {
                    setValue("stage", Stage.DIALOG);
                    onClose();
                  }}
                >
                  <XIcon className="w-5 h-5" />
                </button>
              </div>
            )}
            {stage === "category" && (
              <>
                <div className="flex gap-0.5 items-center">
                  <button
                    className="p-2"
                    type="button"
                    onClick={() => setValue("stage", Stage.DIALOG)}
                  >
                    <ChevronLeftIcon className="w-5 h-5" />
                  </button>
                  <h2 className="font-bold text-lg">Select Category</h2>
                </div>
              </>
            )}
            {stage === "tags" && (
              <>
                <div className="flex gap-0.5 items-center">
                  <button
                    className="p-2"
                    type="button"
                    onClick={() => setValue("stage", Stage.DIALOG)}
                  >
                    <ChevronLeftIcon className="w-5 h-5" />
                  </button>
                  <h2 className="font-bold text-lg">Select Tags</h2>
                </div>
              </>
            )}
          </div>
          <div className="flex flex-col gap-4 px-6 py-3 flex-1">
            {stage === "dialog" && (
              <>
                <div className="flex flex-col gap-2 w-full">
                  <label htmlFor="keyword" className="flex-shrink-0">
                    <h2 className="text-sm font-semibold">Keyword</h2>
                  </label>
                  <div className="flex items-center gap-2 input p-2 w-full">
                    <input
                      type="text"
                      autoComplete="off"
                      className="flex-1 outline-none flex-shrink-0 h-8"
                      {...register("keyword")}
                    />
                    <button className="btn btn-sm btn-ghost" type="submit">
                      <SearchIcon className="w-5 h-5" />
                    </button>
                  </div>
                </div>
                <div className="flex flex-col gap-2 w-full">
                  <label htmlFor="category" className="flex-shrink-0">
                    <h2 className="text-sm font-semibold">Category</h2>
                  </label>
                  {!categoryController.field.value.key && (
                    <button
                      className="btn btn-outline btn-dash"
                      type="button"
                      onClick={() => setValue("stage", Stage.CATEGORY)}
                    >
                      <span className="text-sm font-bold">Select Category</span>
                    </button>
                  )}
                  {categoryController.field.value.key && (
                    <div className="flex items-center gap-2">
                      <div className="flex-1 flex items-center gap-2">
                        <CategoryIcon
                          iconKey={categoryController.field.value.key}
                          className="w-5 h-5"
                        />
                        <span className="text-base font-semibold">
                          {categoryController.field.value.name}
                        </span>
                      </div>
                      <button
                        className="p-1"
                        type="button"
                        onClick={() => {
                          setValue("stage", Stage.CATEGORY);
                        }}
                      >
                        <RefreshCwIcon className="w-5 h-5" />
                      </button>
                      <button
                        className="p-1"
                        type="button"
                        onClick={() => {
                          setValue("category", {
                            id: "",
                            name: "",
                            key: "",
                          });
                        }}
                      >
                        <TrashIcon className="w-5 h-5" />
                      </button>
                    </div>
                  )}
                </div>
                <div className="flex flex-col gap-2 w-full">
                  <label htmlFor="tags" className="flex-shrink-0">
                    <h2 className="text-sm font-semibold">Tags</h2>
                  </label>
                  {tagsController.field.value.length === 0 && (
                    <button
                      className="btn btn-primary text-base-100 w-fit"
                      type="button"
                      onClick={() => setValue("stage", Stage.TAGS)}
                    >
                      <PlusIcon className="w-5 h-5 text-white" />
                      <span className="text-sm font-bold text-white">
                        Add Tags
                      </span>
                    </button>
                  )}
                  {tagsController.field.value.length > 0 && (
                    <div className="flex flex-wrap gap-2">
                      {tagsController.field.value.map((tag) => {
                        return (
                          <button
                            key={tag.name}
                            type="button"
                            className="btn btn-primary text-white text-base"
                            onClick={(event) => {
                              onClick(event, tag.name);
                            }}
                          >
                            {tag.name}
                          </button>
                        );
                      })}
                      <button
                        className="p-2"
                        type="button"
                        onClick={() => setValue("stage", Stage.TAGS)}
                      >
                        <PlusIcon className="w-5 h-5" />
                      </button>
                    </div>
                  )}
                </div>
              </>
            )}
            {stage === "category" && (
              <>
                <div className="flex flex-col gap-2 w-full">
                  <div className="flex flex-col">
                    <CategoriesQuery>
                      {(response) => {
                        return response.data.map((item) => {
                          return (
                            <button
                              key={item.id}
                              className="btn btn-ghost gap-2 p-4 h-auto"
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
                              <CategoryIcon
                                iconKey={item.key}
                                className="w-5 h-5"
                              />
                              {item.name}
                            </button>
                          );
                        });
                      }}
                    </CategoriesQuery>
                  </div>
                </div>
              </>
            )}
            {stage === "tags" && (
              <>
                <div className="flex flex-col w-full">
                  <input
                    type="text"
                    autoComplete="off"
                    className="input w-full"
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
                              <div className="flex flex-wrap gap-2 py-4 px-2 absolute top-0 left-0 w-full bg-base-200">
                                {response.data.items.map((item) => {
                                  return (
                                    <button
                                      key={item.id}
                                      className="btn text-base btn-outline"
                                      type="button"
                                      onClick={(event) => {
                                        onClick(event, item.name);
                                      }}
                                    >
                                      {item.name}
                                    </button>
                                  );
                                })}
                              </div>
                            );
                          }}
                        </TagsQuery>
                      </Suspense>
                    )}
                  </div>
                  <div className="flex flex-wrap gap-2 py-2">
                    {tagsController.field.value.map((tag) => {
                      return (
                        <button
                          key={tag.name}
                          className="btn btn-primary text-white text-base"
                          type="button"
                          onClick={(event) => {
                            onClick(event, tag.name);
                          }}
                        >
                          {tag.name}
                        </button>
                      );
                    })}
                  </div>
                </div>
              </>
            )}
          </div>
        </form>
      </dialog>
    );
  }
);

export default FeedSearchDialog;
