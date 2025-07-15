import { verifyUser } from "@/entities/auth/lib/verify";
import { getCommentsByFeedQueryKey } from "@/entities/comment/lib/query-key";
import { getFeedById } from "@/entities/feed/lib/api";
import { FeedGridItem } from "@/entities/feed/lib/model";
import { getFeedByIdQueryKey } from "@/entities/feed/lib/query-key";
import UserProvider from "@/features/auth/lib/user/provider";
import {
  getCommentsByFeedQuery,
  initialPageParam,
} from "@/features/comment/lib/query";
import { getFeedByIdQuery } from "@/features/feed/lib/query";
import { createClient } from "@/shared/lib/pocketbase/server/client";
import HydrationInfiniteQuery from "@/shared/ui/hydration-infinite-query";
import HydrationQuery from "@/shared/ui/hydration-query";
import CommentList from "@/widgets/comment/ui/list";
import CommentNew from "@/widgets/comment/ui/new";
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

  function getTitle(feed: FeedGridItem | null): string {
    if (feed && feed.title && feed.expand.category.name) {
      return `${feed.title} - ${feed.expand.category.name} Prompt - Use Textify`;
    }
    if (feed && feed.title) {
      return `${feed.title} - Use Textify`;
    }
    return `Unknown Prompt - Use Textify`;
  }

  return {
    title: getTitle(feed),
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
    alternates: {
      canonical: `https://usetextify.com/feeds/${id}`,
    },
  };
}

const Page = async ({ params }: { params: { id: string } }) => {
  const client = createClient();
  const { id } = params;
  await verifyUser(client);

  return (
    <div className="bg-gradient-to-br from-gray-50 via-white to-indigo-50 dark:from-gray-900 dark:via-gray-900 dark:to-indigo-900/20 flex flex-col items-center justify-start gap-6 py-6 px-4 flex-1">
      <HydrationQuery
        queryKey={getFeedByIdQueryKey(id)}
        queryFn={getFeedByIdQuery(client)}
      >
        <UserProvider user={client.authStore.record}>
          <FeedDetail />
        </UserProvider>
      </HydrationQuery>
      <UserProvider user={client.authStore.record}>
        <CommentNew />
      </UserProvider>
      <HydrationInfiniteQuery
        queryKey={getCommentsByFeedQueryKey(id)}
        queryFn={getCommentsByFeedQuery(client)}
        initialPageParam={initialPageParam}
      >
        <UserProvider user={client.authStore.record}>
          <CommentList />
        </UserProvider>
      </HydrationInfiniteQuery>
    </div>
  );
};

export default Page;
