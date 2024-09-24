import React from "react";

import clsx from "clsx";
import { cn } from "@/lib/utils";

type Props = {
  isCorrect: boolean | null;
  correctAnswer: string;
};

function ResultCard(props: Props) {
  if (props.isCorrect === null) {
    return null;
  }

  const text = props.isCorrect
    ? "correct"
    : "incorrect answer! here is the correct answer:" + props.correctAnswer;

  const borderClasses = clsx({
    "border-green-500": props.isCorrect,
    "border-red-500": !props.isCorrect,
  });
  return (
    <div
      className={cn(
        borderClasses,
        "border-2",
        "rounded-lg",
        "p-4",
        "text-center",
        "text-lg",
        "font-semibold",
        "m-4",
        "bg-secondary",
        "bg-opacity-20"
      )}
    >
      {text}
    </div>
  );
}

export default ResultCard;
