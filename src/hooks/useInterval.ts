import React from "react";

type IntervalCallback = () => void;

export function useInterval(cb: IntervalCallback, delay: number = 1000) {
  const timerIdRef = React.useRef<number>();
  const cbRef = React.useRef<IntervalCallback>();
  cbRef.current = cb;

  function start() {
    if (timerIdRef.current) {
      return;
    }
    cbRef.current?.();
    timerIdRef.current = window.setInterval(() => {
      cbRef.current?.();
    }, delay);
  }

  function stop() {
    if (!timerIdRef.current) {
      return;
    }
    clearInterval(timerIdRef.current);
  }

  React.useEffect(() => {
    return () => {
      stop();
    };
  }, []);

  return {
    start,
    stop,
  };
}
