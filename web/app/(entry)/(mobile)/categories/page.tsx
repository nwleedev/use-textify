"use client";

import { CategoryIcon } from "@/entities/category/lib/icons";
import CategoriesQuery from "@/features/category/ui/query";
import { XIcon } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Suspense } from "react";

const Page = () => {
  const router = useRouter();
  return (
    <div className="flex flex-col w-full flex-1">
      <div className="w-full flex sticky top-0 z-10">
        <nav className="navbar bg-base-100 shadow-sm px-4 sm:px-8 h-[64px] flex items-center">
          <div className="navbar-start flex items-center gap-2 px-2">
            <Link href="/">
              <h2 className="font-bold text-lg select-none">Textify</h2>
            </Link>
          </div>
          <div className="navbar-end flex items-center gap-8 justify-end">
            <div className="flex items-center gap-2">
              <button
                className="btn btn-ghost btn-square"
                onClick={() => router.back()}
              >
                <XIcon className="w-6 h-6" />
              </button>
            </div>
          </div>
        </nav>
      </div>
      <div className="flex-1 flex flex-col w-full gap-4 p-4 items-start">
        <Suspense>
          <CategoriesQuery>
            {(response) => {
              return response.data.map((category) => {
                return (
                  <Link
                    key={category.id}
                    href={`/feeds?category=${category.key}`}
                    className="btn btn-ghost text-base py-6 gap-4"
                  >
                    <CategoryIcon iconKey={category.key} />
                    <span>{category.name}</span>
                  </Link>
                );
              });
            }}
          </CategoriesQuery>
        </Suspense>
      </div>
    </div>
  );
};

export default Page;
