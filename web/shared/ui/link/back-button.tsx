"use client";

import { useRouter } from "next/navigation";
import { PropsWithChildren } from "react";

export interface BackLinkProps extends PropsWithChildren {
  className?: string;
}

const BackLink = ({ children, className }: BackLinkProps) => {
  const router = useRouter();
  return (
    <button className={className} onClick={() => router.back()}>
      {children}
    </button>
  );
};

export default BackLink;
