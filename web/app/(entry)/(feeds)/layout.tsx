import { getCategoriesQueryKey } from "@/entities/category/lib/query-key";
import { getCategoriesQuery } from "@/features/category/lib/query";
import Navbar from "@/features/utils/ui/navbar";
import { createClient } from "@/shared/lib/pocketbase/server/client";
import HydrationQuery from "@/shared/ui/hydration-query";
import Sidebar from "@/widgets/category/ui/sidebar";
import { PropsWithChildren } from "react";

export default function Layout(props: PropsWithChildren) {
  const client = createClient();
  const { children } = props;
  // Sidebar is now always visible on desktop, toggled on mobile
  return (
    <div className="flex flex-col min-h-screen bg-base-200 relative">
      <div className="w-full flex sticky top-0 z-10">
        <Navbar />
      </div>
      <div className="flex-1 flex flex-row w-full mx-auto">
        <HydrationQuery
          queryKey={getCategoriesQueryKey()}
          queryFn={getCategoriesQuery(client)}
        >
          <Sidebar />
        </HydrationQuery>

        <main className="flex-1 w-full flex flex-col">{children}</main>
      </div>
    </div>
  );
}
