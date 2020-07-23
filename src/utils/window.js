import { useEffect, useState } from "react";

import { queryStringToObject } from "_utils";

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

export const getRouteQuery = router => {
  const windowQuery = queryStringToObject(window.location.search);

  const hasRouterQuery = router && Object.values(router.query).length;

  return hasRouterQuery ? router.query : windowQuery;
};
