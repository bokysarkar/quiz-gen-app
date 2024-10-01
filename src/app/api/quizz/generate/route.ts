import { NextRequest, NextResponse } from "next/server";

import { ChatOpenAI } from "@langchain/openai"; // manages coversations between OpenAI API
import { HumanMessage } from "@langchain/core/messages"; // encapsulates the human message content, making it easy to send and manage
import { JsonOutputFunctionsParser } from "langchain/output_parsers"; // parses the OpenAI API responses that are formatted as JSON
import { PDFLoader } from "langchain/document_loaders/fs/pdf"; // load and extract text from a PDF file
import saveQuizz from "./saveToDb";

export async function POST(req: NextRequest) {
  const body = await req.formData();
  const document = body.get("pdf"); // pdf extracted from req

  try {
    // pdf is passed as ad blob
    const pdfLoader = new PDFLoader(document as Blob, {
      parsedItemSeparator: " ", // extracted content separated with " " space
    });
    const docs = pdfLoader.load();
    const selectedDocuments = (await docs).filter(
      (doc) => doc.pageContent !== undefined
    );
    const texts = selectedDocuments.map((doc) => doc.pageContent); // extracted content as text

    const prompt =
      "given the text which is a summary of the document, generate a quiz based on the text. Return json only that contains a quizz object with fields: name, description and questions. The questions is an array of objects with fields: questionText, answers. The answers is an array of objects with fields: answerText, isCorrect.";

    if (!process.env.OPENAI_API_KEY) {
      return NextResponse.json(
        { message: "OpenAI API key not provided." },
        { status: 500 }
      );
    }

    //sets up the model & the API key
    const model = new ChatOpenAI({
      openAIApiKey: process.env.OPENAI_API_KEY,
      modelName: "gpt-4o-mini",
    });

    const parser = new JsonOutputFunctionsParser(); // this func interpret responses from the OpenAI model that are in JSON format
    // following schema tells OpenAI how the output should be structured
    const extractFunctionSchema = {
      name: "extractor",
      description: "Extracts fields from the output",
      parameters: {
        type: "object",
        properties: {
          quizz: {
            type: "object",
            properties: {
              name: { type: "string" },
              description: { type: "string" },
              questions: {
                type: "array",
                items: {
                  type: "object",
                  properties: {
                    questionText: { type: "string" },
                    answers: {
                      type: "array",
                      items: {
                        type: "object",
                        answerText: { type: "string" },
                        isCorrect: { type: "boolean" },
                      },
                    },
                  },
                },
              },
            },
          },
        },
      },
    };

    const runnable = model
      .bind({
        functions: [extractFunctionSchema], // ensure the model generates output as per the schema
        function_call: { name: "extractor" }, // specifies that when the model runs, it should use the function
      })
      .pipe(parser); // this pipe sets the output will be passed through the JsonOutputFunctionsParser

    const message = new HumanMessage({
      content: [
        {
          type: "text",
          text: prompt + "\n" + texts.join("\n"),
        },
      ],
    });

    const result = await runnable.invoke([message]); // invokes the binded model i.e., runnable otherwise, model.invoke
    console.log(result);

    const { quizzId } = await saveQuizz(result.quizz);

    return NextResponse.json(
      { quizzId },
      { status: 200 }
    );
  } catch (e: any) {
    return NextResponse.json({ error: e.message }, { status: 500 });
  }
}
