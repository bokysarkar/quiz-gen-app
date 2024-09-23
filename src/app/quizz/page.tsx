"use client";
import { useState } from "react";

import { Button } from "@/components/ui/button";

const questions = [
  {
    questionText: "What is React?",
    answers: [
      {
        answerText: "A library for building user interfaces",
        isCorrect: true,
        id: 1,
      },
      { answerText: "A front-end framework", isCorrect: false, id: 2 },
      { answerText: "A back-end framework", isCorrect: false, id: 3 },
      { answerText: "A database", isCorrect: false, id: 4 },
    ],
  },
  {
    questionText: "What is JSX?",
    answers: [
      { answerText: "JavaScript XML", isCorrect: true, id: 1 },
      { answerText: "JavaScript", isCorrect: false, id: 2 },
      { answerText: "JavaScript and XML", isCorrect: false, id: 3 },
      { answerText: "JavaScript and HTML", isCorrect: false, id: 4 },
    ],
  },
  {
    questionText: "What is the virtual DOM?",
    answers: [
      {
        answerText: "A virtual representation of the DOM",
        isCorrect: true,
        id: 1,
      },
      { answerText: "A real DOM", isCorrect: false, id: 2 },
      {
        answerText: "A virtual representation of the browser",
        isCorrect: false,
        id: 3,
      },
      {
        answerText: "A virtual representation of the server",
        isCorrect: false,
        id: 4,
      },
    ],
  },
];

export default function Quizz() {
  const [started, setStarted] = useState<boolean>(false);
  const [currentQuestion, setCurrentQuestion] = useState(0);

  const handleNext = () => {
    if (!started) {
      setStarted(true);
      return;
    }

    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion((currentQuestion) => currentQuestion + 1);
    }
  };


  return (
    <div className="flex flex-col flex-1">
      <main className="flex justify-center flex-1">
        {!started ? (
          <h1 className="text-3xl font-bold">Welcome to the quiz section 👋</h1>
        ) : (
          <div>
            <h2 className="text-3xl font-bold">
              {questions[currentQuestion].questionText}
            </h2>
            <div className="grid grid-cols-1 gap-2 mt-4">
              {questions[currentQuestion].answers.map((answer) => (
                <Button
                  variant={"outline"}
                  key={answer.id}
                >
                  {answer.answerText}
                </Button>
              ))}
            </div>
          </div>
        )}
      </main>
      <footer className="footer pb-9 px-6 relative mb-0">
        <Button onClick={handleNext}>{!started ? "Start" : "Next"}</Button>
      </footer>
    </div>
  );
}
