
import { useEffect } from "react";
import React from "react";
import Bar from "@/components/Bar";
import Image from "next/image";
import {useReward} from "react-rewards";

type Props = {
  scorePercentage: number;
  score: number;
  totalQuestions: number;
};

function QuizzSubmission(props: Props) {
  const { scorePercentage, score, totalQuestions } = props;

  const { reward } = useReward("rewardId", "confetti");

  useEffect(()=>{
    if(scorePercentage===100){
        reward();
    }
  },[scorePercentage, reward]);

  return (
    <div className="flex flex-col flex-1 mt-6">
      <main className="py-11 flex flex-col gap-4 items-center flex-1 mt-24">
        <h2 className="text-3xl font-light">Quizz is complete!</h2>
        <p>Your score is: {scorePercentage}%</p>
        {scorePercentage === 100 ? (
          <div className="flex flex-col items-center mt-12 gap-8">
            <p>Congratuations!</p>
            <div>
              <Image
                src="https://static.vecteezy.com/system/resources/thumbnails/042/840/586/small_2x/cute-owl-smile-isolated-on-transparent-background-png.png"
                alt="Champion"
                height={200}
                width={200}
              />
            </div>
            <span id="rewardId"/>
          </div>
        ) : (
          <>
            <div className="flex gap-8 mt-6">
              <Bar
                percentage={scorePercentage}
                color="green"
              />
              <Bar
                percentage={100 - scorePercentage}
                color="red"
              />
            </div>
            <div className="flex gap-8">
              <p>{score} Correct</p>
              <p>{totalQuestions - score} Incorrect</p>
            </div>

          </>
        )}
      </main>
    </div>
  );
}

export default QuizzSubmission;
