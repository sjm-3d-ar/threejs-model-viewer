import { useEffect, useState } from "react";

const getWindowDimensions = () =>
  // check for existence of window first to account for SSR
  process.browser
    ? {
        width: window.innerWidth,
        height: window.innerHeight,
        landscape: window.innerWidth > window.innerHeight,
      }
    : {
        // choosing some common / standard defaults for SSR
        width: 320,
        height: 568,
        landscape: false,
      };

export const useWindowDimensions = () => {
  const [windowDimensions, setWindowDimensions] = useState(getWindowDimensions());

  useEffect(() => {
    const handleResize = () => setWindowDimensions(getWindowDimensions());

    // no need to check for window existence, useEffect only executed on client
    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return windowDimensions;
};
