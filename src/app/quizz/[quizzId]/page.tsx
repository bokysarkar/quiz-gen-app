import { db } from "@/db";

import { quizzes } from "@/db/schema";
import { eq } from "drizzle-orm";
import QuizzQuestions from "../QuizzQuestions";

const page = async ({ params }: { params: { quizzId: string } }) => {
  const quizzId = params.quizzId;
  console.log(quizzId)
  const quizz =await db.query.quizzes.findFirst({ // query written in drizzle - SELECT * WHERE quizz.id == quizzId 
    where: eq(quizzes.id, parseInt(quizzId)),
    with: {
        questions: {
            with: {
                answers: true
            }
        }
    }
  })

  if (!quizzId || !quizz || quizz.questions.length === 0) {
    return <div>Quizz not found</div>
  }

  console.log(typeof(quizzId), typeof(quizzes.id))

  return <QuizzQuestions quizz={quizz} />;
};

export default page;