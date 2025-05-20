import { BoothStateLabelProps } from "@/types/Booth.types";
import React from "react";

const BoothStateLabel: React.FC<BoothStateLabelProps> = ({ isState, children }) => {
  return (
    <div className={isState ? "is-state-true" : "is-state-false"}>
      {children}
    </div>
  );
};

export default BoothStateLabel;