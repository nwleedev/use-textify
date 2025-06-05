"use client";

import { PlusIcon, XIcon } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";

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
      <div className="flex-1 flex flex-col w-full gap-4 p-4">
        <Link
          href="/feeds/new"
          className="btn btn-primary text-base text-white flex items-center gap-2"
        >
          <PlusIcon className="w-5 h-5" />
          <span className="text-base font-bold">New Feed</span>
        </Link>
        <div className="flex flex-col w-full items-start">
          <Link href="/" className="btn btn-ghost text-base py-6">
            <span>Home</span>
          </Link>
          <div className="w-full h-px px-4">
            <div className="w-full bg-white h-px" />
          </div>
          <Link href="/categories" className="btn btn-ghost text-base py-6">
            <span>Categories</span>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Page;
