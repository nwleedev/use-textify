import { PropsWithChildren } from "react";

export default function Layout(props: PropsWithChildren) {
  const { children } = props;
  return <div className="flex flex-col w-full h-full flex-1">{children}</div>;
}
