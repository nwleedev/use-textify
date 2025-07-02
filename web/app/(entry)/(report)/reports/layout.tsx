import Navbar from "@/features/utils/ui/navbar";
import { PropsWithChildren } from "react";

const Layout = (props: PropsWithChildren) => {
  const { children } = props;

  return (
    <div className="flex flex-col flex-1 relative">
      {/* Modern glassmorphic navbar */}
      <div className="w-full flex sticky top-0 z-50">
        <Navbar />
      </div>

      {/* Main content with modern layout */}
      <div className="flex-1 flex flex-row w-full">
        <main className="flex-1 w-full flex flex-col relative">
          {/* Page content */}
          {children}
        </main>
      </div>
    </div>
  );
};

export default Layout;
