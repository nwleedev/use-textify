"use client";

import { FeedsQuery } from "@/features/feed/ui/query";
import Link from "next/link";

const FeedsGrid = () => {
  return (
    <FeedsQuery>
      {(response) => {
        const feeds = response.data?.pages.flatMap((page) => page.items);
        return (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {feeds?.map((feed) => (
              <Link href={`/feeds/${feed.id}`} key={feed.id}>
                <div className="card bg-base-100 shadow-lg hover:shadow-xl transition rounded-xl overflow-hidden flex flex-col">
                  <div className="card-body flex flex-col gap-2">
                    <h2 className="card-title text-lg font-semibold line-clamp-2">
                      {feed.title}
                    </h2>
                    <p className="text-sm text-base-content/70 line-clamp-3">
                      {feed.description}
                    </p>
                    <div className="flex flex-col gap-1 mt-2">
                      <span className="badge badge-accent bg-red-500/80 text-white border-red-500/80 badge-sm w-fit">
                        {feed.expand?.category.name}
                      </span>

                      <div className="flex flex-wrap gap-1 mt-1">
                        {feed.expand?.tags?.map((tag) => (
                          <span
                            key={tag.id}
                            className="badge badge-soft badge-info badge-sm"
                          >
                            {tag.name}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        );
      }}
    </FeedsQuery>
  );
};

export default FeedsGrid;
