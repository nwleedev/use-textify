import { getCategoriesQueryKey } from "@/entities/category/lib/query-key";
import { getCategoriesQuery } from "@/features/category/lib/query";
import Navbar from "@/features/utils/ui/navbar";
import { createClient } from "@/shared/lib/pocketbase/server/client";
import HydrationQuery from "@/shared/ui/hydration-query";
import CategoryList from "@/widgets/category/ui/list";
import { PropsWithChildren } from "react";

export default function Layout(props: PropsWithChildren) {
  const client = createClient();
  const { children } = props;

  return (
    <div className="flex flex-col min-h-screen relative">
      {/* Modern glassmorphic navbar */}
      <div className="w-full flex sticky top-0 z-50">
        <Navbar />
      </div>

      {/* Main content with modern layout */}
      <div className="flex-1 flex flex-row w-full">
        <main className="flex-1 w-full flex flex-col relative">
          {/* Category navigation */}
          <HydrationQuery
            queryKey={getCategoriesQueryKey()}
            queryFn={getCategoriesQuery(client)}
          >
            <CategoryList />
          </HydrationQuery>

          {/* Page content */}
          {children}
        </main>
      </div>
    </div>
  );
}
