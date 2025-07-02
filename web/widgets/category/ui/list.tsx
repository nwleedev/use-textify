"use client";

import { CategoryIcon } from "@/entities/category/lib/icons";
import CategoriesQuery from "@/features/category/ui/query";
import { cx } from "@/shared/lib/style/merge";
import Link from "next/link";

const CategoryList = () => {
  return (
    <CategoriesQuery>
      {({ data }) => (
        <div className="w-full bg-gradient-to-r from-gray-50 via-white to-indigo-50 dark:from-gray-900 dark:via-gray-900 dark:to-indigo-900/20 border-b border-white/20 dark:border-gray-700/30">
          {/* Mobile horizontal scroll navigation */}
          <nav className="flex items-center gap-3 w-full px-4 py-2 overflow-x-auto scrollbar-hide">
            {data.map((category) => (
              <Link
                key={category.id}
                href={`/feeds?category=${category.key}`}
                className={cx(
                  "group flex items-center gap-3 px-2 py-1.5 rounded-2xl min-w-fit",
                  "bg-white/60 dark:bg-gray-800/60 backdrop-blur-xl border border-white/30 dark:border-gray-700/30",
                  "hover:bg-white/80 dark:hover:bg-gray-700/80",
                  "transition-all duration-300 ease-in-out",
                  "supports-[backdrop-filter]:bg-white/40 dark:supports-[backdrop-filter]:bg-gray-800/40",
                  "shadow-sm hover:shadow-md"
                )}
              >
                {/* Category icon with glassmorphic background */}
                <div className="p-2 rounded-xl bg-white/50 dark:bg-gray-700/50 backdrop-blur-sm group-hover:bg-indigo-500/20 transition-colors duration-200">
                  <CategoryIcon
                    iconKey={category.key}
                    className="w-5 h-5 text-gray-700 dark:text-gray-300 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors duration-200"
                  />
                </div>

                {/* Category name */}
                <span className="text-sm font-medium text-gray-800 dark:text-gray-200 whitespace-nowrap group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors duration-200">
                  {category.name}
                </span>

                {/* Subtle hover indication */}
                <div className="w-1 h-1 rounded-full bg-indigo-500 opacity-0 group-hover:opacity-100 transition-opacity duration-200" />
              </Link>
            ))}
          </nav>
        </div>
      )}
    </CategoriesQuery>
  );
};

export default CategoryList;
