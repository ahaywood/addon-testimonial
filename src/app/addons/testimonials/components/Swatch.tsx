import React from "react";

const Swatch = ({ color }: { color: string }) => {
  return (
    <div
      className="rounded-full size-4 self-start relative top-1"
      style={{ backgroundColor: color }}
    ></div>
  );
};

export { Swatch };
