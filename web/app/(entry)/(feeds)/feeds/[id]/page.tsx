import { verifyUser } from "@/entities/auth/lib/verify";
import { getFeedByIdQueryKey } from "@/entities/feed/lib/query-key";
import UserProvider from "@/features/auth/lib/user/provider";
import { getFeedByIdQuery } from "@/features/feed/lib/query";
import { createClient } from "@/shared/lib/pocketbase/server/client";
import HydrationQuery from "@/shared/ui/hydration-query";
import FeedDetail from "@/widgets/feeds/ui/detail";

const Page = async ({ params }: { params: { id: string } }) => {
  const client = createClient();
  const { id } = params;
  await verifyUser(client);

  return (
    <HydrationQuery
      queryKey={getFeedByIdQueryKey(id)}
      queryFn={getFeedByIdQuery(client)}
    >
      <UserProvider user={client.authStore.record}>
        <FeedDetail />
      </UserProvider>
    </HydrationQuery>
  );
};

export default Page;
