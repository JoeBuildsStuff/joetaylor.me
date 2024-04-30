import OpenAI from "openai";

// Create an OpenAI API client (that's edge friendly!)
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export const dynamic = "force-dynamic";

interface Message {
  role: "user" | "assistant" | "system";
  content: string;
  additionalContext?: string;
}

interface APIResponse {
  reply: string;
  relevance: boolean;
  probability: string;
  justification: string;
  perplexity: string;
  answerRelevance: boolean;
  answerProbability: string;
  answerJustification: string;
  // answerPerplexity: string;
}

/**
 * POST handler for the API endpoint.
 * Receives a request with messages and returns a response with the assistant's reply.
 *
 * Request format:
 * {
 *   "messages": [
 *     {
 *       "role": "user" | "assistant",
 *       "content": string,
 *       "additionalContext": string (optional)
 *     }
 *   ]
 * }
 *
 * Response format:
 * {
 *   "reply": string,
 *   "relevance": boolean,
 *   "probability": string,
 *   "justification": string
 * }
 */
export async function POST(req: Request): Promise<Response> {
  try {
    const { messages, model } = await req.json();

    // Determine if sufficient reference context exists
    const lastMessage = messages[messages.length - 1];
    const question = lastMessage.content;
    const additionalContext = lastMessage.additionalContext;
    const expectedAnswer = lastMessage.answer;

    // Check if the reference content is sufficient to resolve the issue
    const contentCompletenessCheckResult = await checkContentCompleteness(
      additionalContext,
      question,
      model
    );

    // Determine the relevance and probability of the content
    const { probability } = await determineRelevance(
      contentCompletenessCheckResult.logprobs
    );

    console.log(contentCompletenessCheckResult.logprobs);

    // If the content is sufficient, use the reference content to construct the response
    const proposedAnswer = await constructAnswer(messages, model);

    // Determine the accuracy of the ai answer to the provided answer
    const determinedAccuracy = await determineAccuracy(
      question,
      expectedAnswer,
      proposedAnswer.answer,
      model
    );

    console.log("answerRelevance", determinedAccuracy.answerProvidedCorrect);
    console.log("answerProbability", determinedAccuracy.justification);
    console.log("expectedAnswer", expectedAnswer);
    console.log("answer", proposedAnswer.answer);

    // Determine the relevance and probability of the ai answer
    const answerDeterminedAccuracy = await determineRelevance(
      determinedAccuracy.logprobs
    );

    console.log("determinedAccuracy.logprobs", determinedAccuracy.logprobs);

    const response: APIResponse = {
      reply: proposedAnswer.answer,
      relevance: contentCompletenessCheckResult.contentContainsAnswer,
      probability: probability.toFixed(2),
      justification: contentCompletenessCheckResult.justification,
      perplexity: proposedAnswer.perplexity.toFixed(2),
      answerRelevance: determinedAccuracy.answerProvidedCorrect,
      answerProbability: answerDeterminedAccuracy.probability.toFixed(2),
      answerJustification: determinedAccuracy.justification,
    };

    return new Response(JSON.stringify(response), {
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("Error in POST handler:", error);
    return new Response("Internal Server Error", { status: 500 });
  }
}

interface DetermineAccuracyResult {
  answerProvidedCorrect: boolean;
  justification: string;
  logprobs: any;
}

async function determineAccuracy(
  question: string,
  expectedAnswer: string,
  answer: string,
  model: string = "gpt-3.5-turbo"
): Promise<DetermineAccuracyResult> {
  try {
    const answerRelevanceResponse = await openai.chat.completions.create({
      model: model,
      messages: [
        {
          role: "system",
          content:
            "You are an expert grader and at comparing submitted answers to the correct answer expected and determining if they are essentially the same answer to the question. Teachers often ask you to compare if a user submitted answer is correct based on the expected correct answer.\n\n" +
            "<question>" +
            question +
            "</question>\n\n" +
            "<correctAnswerExpected>" +
            expectedAnswer +
            "</correctAnswerExpected>",
        },
        {
          role: "user",
          content: `First, determine if the user provided answer is correct when compared to the correct answer expected. Second, respond with a JSON in the format:
                      {
                        "is_userProvidedAnswerCorrect": "boolean",  \\ true if the user provided answer is correct, false otherwise
                        "justification": "string"  \\ a string explaining why the user provided answer is correct or incorrect
                      }

                      <userProvidedAnswer>${answer}</userProvidedAnswer>`,
        },
      ],
      logprobs: true,
    });

    console.log("answerRelevanceResponse", answerRelevanceResponse);
    const assistantReply = answerRelevanceResponse.choices[0].message.content;
    const logprobs = answerRelevanceResponse.choices[0].logprobs;

    console.log("assistantReply", assistantReply);

    let parsedReply: {
      is_userProvidedAnswerCorrect: boolean;
      justification: string;
    } | null = null;

    if (assistantReply) {
      try {
        const parsedJson = JSON.parse(assistantReply);
        parsedReply = {
          is_userProvidedAnswerCorrect:
            !!parsedJson.is_userProvidedAnswerCorrect,
          justification: parsedJson.justification || "",
        };
      } catch (error) {
        console.error("Error parsing assistant reply:", error);
        // Handle the case when the reply is not in the expected JSON format
        parsedReply = {
          is_userProvidedAnswerCorrect: false,
          justification: "Unable to parse assistant reply",
        };
      }
    }

    const answerProvidedCorrect =
      parsedReply?.is_userProvidedAnswerCorrect ?? false;
    console.log("isUserProvidedAnswerCorrect", answerProvidedCorrect);
    const justification = parsedReply?.justification ?? "";

    return {
      answerProvidedCorrect,
      justification,
      logprobs,
    };
  } catch (error) {
    console.error("Error in determineAccuracy:", error);
    throw error;
  }
}

interface ContentCompletenessCheckResult {
  contentContainsAnswer: boolean;
  justification: string;
  logprobs: any;
}

/**
 * Checks if the reference content is sufficient to resolve the issue.
 * @param additionalContext The additional context provided.
 * @param question The question or issue to resolve.
 * @returns An object containing the content completeness check result and log probabilities.
 */
async function checkContentCompleteness(
  additionalContext: string,
  question: string,
  model: string = "gpt-3.5-turbo"
): Promise<ContentCompletenessCheckResult> {
  try {
    const contentCompletnessCheckResponse =
      await openai.chat.completions.create({
        model: model,
        messages: [
          {
            role: "system",
            content:
              "You found the following reference content by searching through documentation. Use only this content to construct your response. \n\n <referenceContent>" +
              additionalContext +
              "</referenceContent>",
          },
          {
            role: "user",
            content: `First, determine if the reference content found is sufficient to address the user querry. Second, respond with a JSON in the format:
                      {
                        "content_contains_answer": "boolean", // true if the reference context contains the answer, false otherwise
                        "justification": "string" // a string justifying why the content contains the answer or not
                      }

                      <question>${question}</question>`,
          },
        ],
        logprobs: true,
      });

    const assistantReply =
      contentCompletnessCheckResponse.choices[0].message.content;
    const logprobs = contentCompletnessCheckResponse.choices[0].logprobs;

    let parsedReply: {
      content_contains_answer: boolean;
      justification: string;
    } | null = null;

    if (assistantReply) {
      try {
        const parsedJson = JSON.parse(assistantReply);
        parsedReply = {
          content_contains_answer: !!parsedJson.content_contains_answer,
          justification: parsedJson.justification || "",
        };
      } catch (error) {
        console.error("Error parsing assistant reply:", error);
        // Handle the case when the reply is not in the expected JSON format
        parsedReply = {
          content_contains_answer: false,
          justification: "Unable to parse assistant reply",
        };
      }
    }

    const contentContainsAnswer = parsedReply?.content_contains_answer ?? false;

    const justification = parsedReply?.justification ?? "";

    return {
      contentContainsAnswer,
      justification,
      logprobs,
    };
  } catch (error) {
    console.error("Error in checkContentCompleteness:", error);
    throw error;
  }
}

interface RelevanceResult {
  probability: number;
}

/**
 * Determines the relevance and probability of the content based on log probabilities at a specified token index.
 * @param logprobs The log probabilities from the content completeness check response.
 * @param tokenIndex The index of the token for which to calculate the probability.
 * @returns An object containing the relevance and probability.
 */
function determineRelevance(logprobs: any | undefined): RelevanceResult {
  let probability = 0;

  if (logprobs && logprobs.content) {
    const targetToken = logprobs.content.find(
      (token: any) =>
        token.token.trim() === "true" || token.token.trim() === "false"
    );

    if (targetToken) {
      probability = Math.exp(targetToken.logprob) * 100;
      console.log("targetToken", targetToken.token);

      console.log("Probability:", probability);
      console.log("targetToken.logprob:", targetToken.logprob);

      const targetIndex = logprobs.content.indexOf(targetToken);
      // Check if the token is neither 'true' nor 'false'
      if (
        targetToken.token.trim() !== "true" &&
        targetToken.token.trim() !== "false"
      ) {
        const prevToken = logprobs.content[targetIndex - 1];
        const nextToken = logprobs.content[targetIndex + 1];
        console.log("Previous Token:", prevToken ? prevToken.token : "None");
        console.log("Next Token:", nextToken ? nextToken.token : "None");
      }
    } else {
      console.log("No 'true' or 'false' token found in the logprobs content.");
    }
  } else {
    console.log("Error: logprobs content is missing.");
  }

  return {
    probability,
  };
}

/**
 * Constructs the answer using the OpenAI API based on the provided messages.
 * @param messages The array of messages.
 * @returns The assistant's reply.
 */
async function constructAnswer(
  messages: Message[],
  model: string = "gpt-3.5-turbo"
): Promise<{ answer: string; perplexity: number }> {
  try {
    // Format the messages array to match the OpenAI API expectations
    const openaiMessages = messages.map(
      ({ role, content, additionalContext }) => {
        const message = {
          role,
          content,
        };

        // Include the additional context in the user's message
        if (role === "user" && additionalContext) {
          message.content = `<additionalContext>\n${additionalContext}</additionalContext>\n\n<userQuestion>${message.content}</userQuestion>`;
        }

        return message;
      }
    );

    // Add a system message at the beginning of the messages array
    openaiMessages.unshift({
      role: "system",
      content:
        "Users will provide additional context in the form of <additionalContext> that you should use to answer their <userQuestion>.",
    });

    const answerResponse = await openai.chat.completions.create({
      model: model,
      messages: openaiMessages,
      logprobs: true,
    });

    const answer = answerResponse.choices[0].message.content!;
    const logprobs = answerResponse.choices[0].logprobs?.content;

    // Calculate perplexity
    let perplexity = 0;
    if (logprobs) {
      const logprobValues = logprobs.map(
        (logprob: { logprob: number }) => logprob.logprob
      );
      perplexity = Math.exp(
        -logprobValues.reduce((a: number, b: number) => a + b, 0) /
          logprobValues.length
      );
    } else {
      console.log("Logprobs not available for perplexity calculation.");
    }

    return { answer, perplexity };
  } catch (error) {
    console.error("Error in constructAnswer:", error);
    throw error;
  }
}
