"use client";
import { useState } from "react";
import { ChevronLeft, X } from "lucide-react";

import { Button } from "@/components/ui/button";
import ProgressBar from "@/components/ui/progressBar";
import ResultCard from "./ResultCard";

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

type Answer = {
  answerText: string;
  isCorrect: boolean;
  id: number;
};

export default function Quizz() {
  const [started, setStarted] = useState<boolean>(false);
  const [currentQuestion, setCurrentQuestion] = useState<number>(0);
  const [score, setScore] = useState<number>(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);

  const handleNext = () => {
    if (!started) {
      setStarted(true);
      return;
    }

    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion((currentQuestion) => currentQuestion + 1);
    }

    setSelectedAnswer(null);
    setIsCorrect(null);
  };

  const handleAnswer = (answer:Answer) => {
    setSelectedAnswer(answer.id);
    const isCurrentCorrect = answer.isCorrect;
    if (isCurrentCorrect) {
      setScore((score) => score + 1);
    }
    setIsCorrect(isCurrentCorrect);
  };

  return (
    <div className="flex flex-col flex-1 mt-6">
      <div className="position-sticky top-0 z-10 shadow-md py-4 w-full">
        <header className="grid grid-cols-[auto,1fr,auto] grid-flow-col items-center justify-between py-2 gap-2">
          <Button
            className=""
            variant="outline"
            size="icon"
          >
            <ChevronLeft />
          </Button>
          <ProgressBar value={(currentQuestion / questions.length) * 100} />
          <Button
            className=""
            variant="outline"
            size="icon"
          >
            <X />
          </Button>
        </header>
      </div>
      <main className="flex justify-center flex-1">
        {!started ? (
          <h1 className="text-3xl font-bold">Welcome to the quiz section 👋</h1>
        ) : (
          <div>
            <h2 className="text-3xl font-bold">
              {questions[currentQuestion].questionText}
            </h2>
            <div className="grid grid-cols-1 gap-6 mt-4">
              {questions[currentQuestion].answers.map((answer) => (
                <Button
                  variant={"neoOutline"}
                  size={"xl"}
                  key={answer.id}
                  onClick={() => handleAnswer(answer)}
                >
                  {answer.answerText}
                </Button>
              ))}
            </div>
          </div>
        )}
      </main>
      <footer className="flex flex-col footer pb-9 px-6 relative mb-0 justify-end">
        <ResultCard
          isCorrect={isCorrect}
          correctAnswer={
            questions[currentQuestion].answers.find(
              (answer) => answer.isCorrect === true
            )?.answerText || "Correct answer not found"
          }
        />
        <Button variant={"neo"} onClick={handleNext}>{!started ? "Start" : "Next"}</Button>
      </footer>
    </div>
  );
}
