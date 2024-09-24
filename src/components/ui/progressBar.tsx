import React from "react";

type Props = {
    value: Number,
}

function ProgressBar(props: Props) {
  return (
    <div className="bg-secondary w-full rounded-full h-2.5">
      <div className="bg-primary rounded-full h-2.5" style={{width: `${props.value}%`}}></div>
    </div>
  );
}

export default ProgressBar;
