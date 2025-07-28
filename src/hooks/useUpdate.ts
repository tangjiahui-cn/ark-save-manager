import React from "react";

export function useUpdate() {
  const [_, setSign] = React.useState(false);

  return React.useCallback(() => {
    setSign((v) => !v);
  }, []);
}
