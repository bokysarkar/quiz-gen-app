import React from "react";

type Props = {
  scorePercentage: number;
  score: number;
  totalQuestions: number;
};

function QuizzSubmission(props: Props) {
  const { scorePercentage, score, totalQuestions } = props;
  return (
    <div className="flex flex-col flex-1 mt-6">
      <main>
        <h2>Quizz is complete!</h2>
        <p>Your score is: {scorePercentage}%</p>
      </main>
    </div>
  );
}

export default QuizzSubmission;
