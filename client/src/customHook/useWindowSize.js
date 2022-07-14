import { useLayoutEffect, useState } from "react";

export function useWindowSize() {
  const [size, setSize] = useState([0, 0]);
  useLayoutEffect(() => {
    function updateSize() {
      setSize([window.innerWidth, window.innerHeight]);
    }
    window.addEventListener("resize", updateSize, { capture: true });
    updateSize();
    return () =>
      window?.removeEventListener("resize", updateSize, { capture: true });
  }, []);
  return size;
}
