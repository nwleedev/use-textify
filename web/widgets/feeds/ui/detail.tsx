"use client";

import UserContext from "@/entities/auth/lib/user/context";
import { deleteFeedMutationKey } from "@/entities/feed/lib/mutation-key";
import { deleteFeedMutation } from "@/features/feed/lib/mutation";
import { FeedByIdQuery } from "@/features/feed/ui/query";
import { useClient } from "@/shared/lib/pocketbase/hook";
import Portal from "@/shared/ui/portal";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { PencilIcon, TrashIcon } from "lucide-react";
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
        const notices = feed.expand?.feed_notices_via_feed ?? [];
        const variables = feed.expand?.feed_variables_via_feed ?? [];
        return (
          <div className="bg-base-300 flex items-start justify-center py-6 px-4 flex-1">
            <div className="card bg-base-100 shadow-lg w-full max-w-5xl lg:max-w-7xl border border-base-200 rounded-xl p-4">
              <div className="card-body flex flex-col gap-4 p-0">
                <h2 className="card-title text-2xl font-bold break-words">
                  {feed.title}
                </h2>
                <p className="text-lg text-base-content/80 whitespace-pre-line break-words">
                  {feed.description}
                </p>
                <div className="prose max-w-none text-base-content/90 whitespace-pre-line p-2 py-4 bg-base-200 rounded-lg">
                  <p className="w-full font-mono">{feed.prompt}</p>
                </div>
                <div className="flex flex-wrap gap-2 mt-2">
                  <span className="badge badge-accent bg-red-500/80 text-white border-red-500/80 w-fit">
                    {feed.expand?.category?.name}
                  </span>
                  {feed.expand?.tags?.map((tag) => (
                    <span key={tag.id} className="badge badge-soft badge-info">
                      {tag.name}
                    </span>
                  ))}
                </div>
                {variables.length > 0 && (
                  <div>
                    <div className="font-semibold text-lg mb-1">Variables</div>
                    <ul className="list-disc list-inside text-base text-base-content/80">
                      {variables.map((variable) => (
                        <li key={variable.id}>
                          <span className="font-semibold">{variable.name}</span>
                          <span className="text-sm text-base-content/80">
                            : {variable.description}
                          </span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
                {notices.length > 0 && (
                  <div>
                    <div className="font-semibold text-lg mb-1">Notices</div>
                    <ul className="list-disc list-inside text-base text-warning">
                      {notices.map((notice) => (
                        <li key={notice.id}>{notice.text}</li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
              {user?.id === feed.user && (
                <div className="card-actions justify-end mt-4">
                  <Link
                    href={`/feeds/${feed.id}/edit`}
                    className="btn btn-primary gap-2"
                  >
                    <PencilIcon className="w-4 h-4" />
                    <span>Edit</span>
                  </Link>
                  <button
                    className="btn btn-error gap-2 text-white"
                    onClick={() => ref.current?.showModal()}
                  >
                    <TrashIcon className="w-4 h-4" />
                    <span>Delete</span>
                  </button>
                  <Portal id="portal">
                    <dialog ref={ref} className="modal">
                      <div
                        className="modal-backdrop"
                        onClick={() => ref.current?.close()}
                      ></div>
                      <div className="modal-box">
                        <h3 className="font-bold text-lg">Are you sure?</h3>
                        <p className="py-4">This action cannot be undone.</p>
                        <div className="modal-action">
                          <button
                            className="btn btn-error bg-white text-red-500"
                            onClick={() => ref.current?.close()}
                            disabled={isPending}
                          >
                            Cancel
                          </button>
                          <button
                            className="btn btn-error text-white"
                            onClick={() => {
                              onClick(feed.id);
                            }}
                            disabled={isPending}
                          >
                            Delete
                          </button>
                        </div>
                      </div>
                    </dialog>
                  </Portal>
                </div>
              )}
            </div>
          </div>
        );
      }}
    </FeedByIdQuery>
  );
};

export default FeedDetail;
