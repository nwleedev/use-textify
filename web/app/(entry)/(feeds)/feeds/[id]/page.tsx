import { verifyUser } from "@/entities/auth/lib/verify";
import { getFeedById } from "@/entities/feed/lib/api";
import { FeedGridItem } from "@/entities/feed/lib/model";
import { getFeedByIdQueryKey } from "@/entities/feed/lib/query-key";
import UserProvider from "@/features/auth/lib/user/provider";
import { getFeedByIdQuery } from "@/features/feed/lib/query";
import { createClient } from "@/shared/lib/pocketbase/server/client";
import HydrationQuery from "@/shared/ui/hydration-query";
import FeedDetail from "@/widgets/feeds/ui/detail";
import { Metadata } from "next";
import { notFound } from "next/navigation";
import { cache } from "react";

const getFeedMetadata = cache(getFeedById);

export async function generateMetadata({
  params,
}: {
  params: { id: string };
}): Promise<Metadata> {
  const client = createClient();
  const { id } = params;
  let feed: FeedGridItem | null = null;
  try {
    feed = await getFeedMetadata(client, id);
  } catch (error) {
    // TODO: handle error
    notFound();
  }
  if (!feed) {
    notFound();
  }
  const category = feed.expand.category.name;
  const tags = feed.expand.tags?.map((tag) => tag.name) ?? [];
  const keywords = [category, ...tags];

  return {
    title: feed.title,
    description: feed.description,
    keywords,
    openGraph: {
      title: feed.title,
      description: feed.description,
    },
    twitter: {
      title: feed.title,
      description: feed.description,
    },
  };
}

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
