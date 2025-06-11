import Link from "next/link";
import { ComponentProps, forwardRef, useState } from "react";

export type PrefetchWhenHoverProps = ComponentProps<typeof Link>;

const PrefetchWhenHover = forwardRef<HTMLAnchorElement, PrefetchWhenHoverProps>(
  function PrefetchWhenHover(props, ref) {
    const { prefetch, ...others } = props;
    const [isHovered, setIsHovered] = useState(false);

    return (
      <Link
        ref={ref}
        {...others}
        onMouseEnter={() => setIsHovered(true)}
        prefetch={isHovered ? prefetch : false}
      />
    );
  }
);

export default PrefetchWhenHover;
