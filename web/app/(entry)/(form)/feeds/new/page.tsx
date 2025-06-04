import { verifyUser } from "@/entities/auth/lib/verify";
import { getFeedByIdQueryKey } from "@/entities/feed/lib/query-key";
import { getFeedByIdQuery } from "@/features/feed/lib/query";
import { createClient } from "@/shared/lib/pocketbase/server/client";
import { createClient as createQueryClient } from "@/shared/lib/tanstack-query/server/client";
import HydrationQuery from "@/shared/ui/hydration-query";
import FeedNew from "@/widgets/feeds/ui/new";
import { redirect } from "next/navigation";

const Page = async ({ params }: { params: { id: string } }) => {
  const { id } = params;
  const client = createClient();
  const queryClient = createQueryClient();
  const [user, isValid] = await verifyUser(client);

  if (!isValid) {
    redirect("/join");
  }

  return (
    <HydrationQuery
      queryKey={getFeedByIdQueryKey(id)}
      queryFn={getFeedByIdQuery(client)}
      queryClient={queryClient}
    >
      <FeedNew />
    </HydrationQuery>
  );
};

export default Page;
