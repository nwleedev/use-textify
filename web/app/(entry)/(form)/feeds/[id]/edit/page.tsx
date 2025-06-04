import { verifyUser } from "@/entities/auth/lib/verify";
import { getFeedByIdQueryKey } from "@/entities/feed/lib/query-key";
import { getFeedByIdQuery } from "@/features/feed/lib/query";
import { createClient } from "@/shared/lib/pocketbase/server/client";
import { createClient as createQueryClient } from "@/shared/lib/tanstack-query/server/client";
import HydrationQuery from "@/shared/ui/hydration-query";
import FeedEdit from "@/widgets/feeds/ui/edit";
import { redirect } from "next/navigation";

const Page = async ({ params }: { params: { id: string } }) => {
  const { id } = params;
  const client = createClient();
  const queryClient = createQueryClient();
  const [user, isValid] = await verifyUser(client);

  const feed = await queryClient.fetchQuery({
    queryKey: getFeedByIdQueryKey(id),
    queryFn: getFeedByIdQuery(client),
  });

  if (!isValid || feed.user !== user?.id) {
    redirect("/join");
  }

  return (
    <HydrationQuery
      queryKey={getFeedByIdQueryKey(id)}
      queryFn={getFeedByIdQuery(client)}
      queryClient={queryClient}
    >
      <FeedEdit />
    </HydrationQuery>
  );
};

export default Page;
