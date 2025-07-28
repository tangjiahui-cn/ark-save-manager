import React, { useRef } from "react";
import { useInterval } from "./useInterval";

const dotMap: any = {
  0: ".",
  1: "..",
  2: "...",
};

export function useLoadingText() {
  const [loadingText, setLoadingText] = React.useState("");
  const indexRef = useRef(0);

  const interval = useInterval(() => {
    indexRef.current = (indexRef.current + 1) % 3;
    setLoadingText("自动加载中" + dotMap[indexRef.current as any]);
  }, 500);

  function setLoading(isLoading: boolean) {
    if (isLoading) {
      interval.start();
      return;
    }
    interval.stop();
    setLoadingText("");
  }

  return {
    loadingText,
    setLoading,
  };
}
