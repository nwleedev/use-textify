import { PropsWithChildren } from "react";

const Layout = (props: PropsWithChildren) => {
  const { children } = props;

  return (
    <div className="flex flex-col w-full h-full relative items-center">
      <div className="w-full max-w-2xl min-h-full">{children}</div>
    </div>
  );
};

export default Layout;
