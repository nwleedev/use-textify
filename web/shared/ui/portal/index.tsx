import dynamic from "next/dynamic";

const Portal = dynamic(() => import("./module"), {
  ssr: false,
});

export default Portal;
