"use client";

import { CategoryIcon } from "@/entities/category/lib/icons";
import { Category } from "@/entities/category/lib/model";
import CategoriesQuery from "@/features/category/ui/query";
import { cx } from "@/shared/lib/style/merge";
import { SidebarClose, SidebarOpen } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

const ItemButton = ({
  category,
  onClick,
}: {
  category: Category;
  onClick: () => void;
}) => {
  return (
    <button
      key={category.id}
      className={
        "btn btn-ghost btn-sm flex w-full rounded-none transition-all duration-200 h-[48px] flex-col items-center justify-center gap-2"
      }
      onClick={onClick}
    >
      <CategoryIcon iconKey={category.key} className="flex-shrink-0" />
    </button>
  );
};

const ItemLink = ({ category }: { category: Category }) => {
  return (
    <Link
      key={category.id}
      href={`/feeds?category=${category.key}`}
      className={
        "btn btn-ghost btn-sm flex w-full rounded-none transition-all duration-200 h-[48px] flex-row items-center gap-2 justify-start px-4"
      }
    >
      <CategoryIcon iconKey={category.key} className="flex-shrink-0" />
      <span className="whitespace-nowrap text-left">{category.name}</span>
    </Link>
  );
};

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(true);
  return (
    <aside
      className={cx(
        "h-[calc(100dvh-64px)] w-60 bg-base-100 shadow-md hidden sm:flex flex-col transition-all duration-200 overflow-y-auto scrollbar-hide sticky top-[64px]",
        isOpen ? "w-60" : "w-16"
      )}
    >
      <header className="flex items-center justify-between py-4 px-4 border-b border-base-200 sticky top-0 bg-base-100">
        {isOpen && (
          <>
            <h2 className="font-bold text-lg">Categories</h2>
            <button
              className="btn btn-sm btn-ghost px-0 flex items-center justify-center"
              onClick={() => setIsOpen(false)}
            >
              <SidebarClose />
            </button>
          </>
        )}
        {!isOpen && (
          <button
            className="btn btn-sm btn-ghost px-0 flex items-center justify-center mx-auto"
            onClick={() => setIsOpen(true)}
          >
            <SidebarOpen />
          </button>
        )}
      </header>
      <CategoriesQuery>
        {({ data }) => (
          <nav
            className={cx(
              "flex flex-col flex-1",
              isOpen ? "items-start justify-start" : "items-start"
            )}
          >
            {data.map((category) =>
              isOpen ? (
                <ItemLink category={category} key={category.id} />
              ) : (
                <ItemButton
                  category={category}
                  onClick={() => setIsOpen(true)}
                  key={category.id}
                />
              )
            )}
          </nav>
        )}
      </CategoriesQuery>
    </aside>
  );
};

export default Sidebar;
