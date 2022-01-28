import { useEffect, useState } from "react";
import { urlSearchParams } from "../func/url";

export function useSearchParams(): URLSearchParams {
  const [searchParams, setSearchParams] = useState(urlSearchParams());
  useEffect(() => {
    const onStateChange = () => {
      setSearchParams(urlSearchParams());
    };
    window.addEventListener("replacestate", onStateChange);
    return () => window.removeEventListener("replacestate", onStateChange);
  }, []);

  return searchParams;
}
