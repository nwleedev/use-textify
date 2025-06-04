import { deleteFeedMutationKey } from "@/entities/feed/lib/mutation-key";
import { getFeedByIdQueryKey } from "@/entities/feed/lib/query-key";
import { deleteFeedMutation } from "@/features/feed/lib/mutation";
import { getFeedByIdQuery } from "@/features/feed/lib/query";
import { useClient } from "@/shared/lib/pocketbase/hook";
import Portal from "@/shared/ui/portal";
import {
  useMutation,
  useQueryClient,
  useSuspenseQuery,
} from "@tanstack/react-query";
import { PencilIcon, TrashIcon } from "lucide-react";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { useRef } from "react";

const DetailAction = () => {
  const { id } = useParams<{ id: string }>();
  const client = useClient();
  const { data: feed } = useSuspenseQuery({
    queryKey: getFeedByIdQueryKey(id),
    queryFn: getFeedByIdQuery(client),
  });
  const queryClient = useQueryClient();
  const { mutateAsync, isPending } = useMutation({
    mutationKey: deleteFeedMutationKey(),
    mutationFn: deleteFeedMutation(client),
  });
  const userId = client.authStore.record?.id;
  const ref = useRef<HTMLDialogElement | null>(null);
  const router = useRouter();
  const onClick = async (id: string) => {
    await mutateAsync({ id });
    queryClient.invalidateQueries({ queryKey: ["feeds"] });
    ref.current?.close();
    router.push("/feeds");
  };
  if (userId !== feed.user) {
    return null;
  }
  return (
    <div className="card-actions justify-end mt-4">
      <Link href={`/feeds/${feed.id}/edit`} className="btn btn-primary gap-2">
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
  );
};

export default DetailAction;
