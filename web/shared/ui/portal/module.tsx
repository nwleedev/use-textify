import { PropsWithChildren } from "react";
import { createPortal } from "react-dom";

export interface PortalProps extends PropsWithChildren {
  id: string;
}

const Portal = (props: PortalProps) => {
  const { id, children } = props;
  const target = document.getElementById(id);
  if (!target) {
    return null;
  }
  return createPortal(children, target);
};

export default Portal;
