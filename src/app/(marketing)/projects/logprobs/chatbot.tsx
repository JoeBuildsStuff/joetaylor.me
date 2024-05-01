"use client";
import React, { useState, ChangeEvent, useEffect, PureComponent } from "react";

import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Switch } from "@/components/ui/switch";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";

import {
  Download,
  Circle,
  Dices,
  RotateCcw,
  User,
  Shield,
  ThumbsUp,
  ThumbsDown,
  ShieldCheck,
} from "lucide-react";

import {
  Line,
  LineChart,
  YAxis,
  XAxis,
  ResponsiveContainer,
  Tooltip,
  ReferenceLine,
  BarChart,
  Bar,
} from "recharts";

import { v4 as uuidv4 } from "uuid";

import rawSquadData from "@/app/(marketing)/projects/logprobs/data.json";
export { rawSquadData };

// Define interfaces for the SQuAD data structure
export interface Answer {
  text: string;
  answer_start: number;
}

export interface QA {
  question: string;
  id: string;
  answers: Answer[];
  is_impossible: boolean;
  plausible_answers?: Answer[];
}

export interface Paragraph {
  qas: QA[];
  context: string;
}

export interface Article {
  title: string;
  paragraphs: Paragraph[];
}

export interface SQuAD {
  version: string;
  data: Article[];
}

// Cast the imported JSON data to the SQuAD type
const squadData: SQuAD = rawSquadData as SQuAD;

// Define a type for the message
type Message = {
  id: string;
  content: string;
  role: "user" | "assistant";
  additionalContext?: string;
  probability?: string;
  relevance?: boolean;
  perplexity?: string;
  justification?: string;
  answer: string;
  answerRelevance?: boolean;
  answerProbability?: string;
  answerJustification?: string;
  contextWarningPresented?: boolean;
  userRequestedIncompleteAnswer?: boolean;
  contextWarningAcknowledged?: boolean;
};

type ChatEntry = {
  model: string;
  title: string;
  questionId: string;
  context: string;
  userPrompt: string;
  answer: string;
  assistantResponse: string;
  relevant: boolean;
  expectedRelavance: boolean;
  confidence: string;
  perplexity: string;
  justification: string;
  answerRelevance: boolean;
  answerProbability: string;
  answerJustification: string;
  contextWarningPresented: boolean;
  userRequestedIncompleteAnswer: boolean;
};

interface CustomizedLabelProps {
  x: number;
  y: number;
  stroke: string;
  value: string;
  contextWarningPresented: boolean; // Add the contextWarningPresented prop
}

export function Chatbot() {
  const initialContext = ``;
  const initialPrompt = ``;
  const [selectedModel, setSelectedModel] = useState("gpt-3.5-turbo");
  const [repeatCount, setRepeatCount] = useState("1");
  const [retrievalCount, setRetrievalCount] = useState("1");
  const [chatEntries, setChatEntries] = useState<ChatEntry[]>([]);
  const [additionalContext, setAdditionalContext] = useState(initialContext);
  const [input, setInput] = useState(initialPrompt);
  const [messages, setMessages] = useState<Message[]>([]);
  const [isImpossible, setIsImpossible] = useState(true);
  const [plausibleAnswers, setPlausibleAnswers] = useState<Answer[]>([]);
  const [selectedAnswer, setSelectedAnswer] = useState<Answer | null>(null);
  const [randomTitle, setRandomTitle] = useState("");
  const [randomQAId, setRandomQAId] = useState("");
  const [userRequestedIncompleteAnswer, setUserRequestedIncompleteAnswer] =
    useState(false);
  const [selectedRowIndices, setSelectedRowIndices] = useState<number[]>([]);
  const [contextWarningAcknowledged, setContextWarningAcknowledged] = useState<
    string[]
  >([]);
  const [autoSubmit, setAutoSubmit] = useState(false);

  const runSimulation = async () => {
    for (let i = 0; i < parseInt(retrievalCount, 10); i++) {
      let currentInput = input;
      let currentAdditionalContext = additionalContext;
      let currentSelectedAnswer = selectedAnswer;
      let currentPlausibleAnswers = plausibleAnswers;
      let currentTitle = randomTitle;
      let currentQAId = randomQAId;

      if (i > 0) {
        const {
          newQuestion,
          newAdditionalContext,
          newSelectedAnswer,
          newPlausibleAnswers,
          newCurrentTitle,
          newCurrentQAId,
        } = await handleRandomQAD();
        currentInput = newQuestion;
        currentAdditionalContext = newAdditionalContext;
        currentSelectedAnswer = newSelectedAnswer;
        currentPlausibleAnswers = newPlausibleAnswers;
        currentTitle = newCurrentTitle;
        currentQAId = newCurrentQAId;
      }

      for (let j = 0; j < parseInt(repeatCount, 10); j++) {
        await handleSubmit(
          currentInput,
          currentAdditionalContext,
          currentSelectedAnswer,
          currentPlausibleAnswers,
          currentTitle,
          currentQAId
        );
      }
    }
  };

  const handleClear = async () => {
    setMessages([]);
    setInput("");
    setAdditionalContext("");
    setPlausibleAnswers([]);
    setSelectedAnswer(null);
    setRandomTitle("");
    setRandomQAId("");

    // Ensure state updates are completed before resolving
    await new Promise((resolve) => setTimeout(resolve, 0));
  };

  const handleRandomQAD = () => {
    return new Promise<{
      newQuestion: string;
      newAdditionalContext: string;
      newSelectedAnswer: Answer | null;
      newPlausibleAnswers: Answer[];
      newCurrentTitle: string;
      newCurrentQAId: string;
    }>((resolve) => {
      handleClear(); // Clear existing data

      // Randomly select an article, paragraph, and QA
      const randomArticleIndex = Math.floor(
        Math.random() * squadData.data.length
      );
      const randomArticle = squadData.data[randomArticleIndex];
      const randomParagraphIndex = Math.floor(
        Math.random() * randomArticle.paragraphs.length
      );
      const randomParagraph = randomArticle.paragraphs[randomParagraphIndex];
      const randomQAIndex = Math.floor(
        Math.random() * randomParagraph.qas.length
      );
      const randomQA = randomParagraph.qas[randomQAIndex];
      const newCurrentTitle = randomArticle.title;
      const newCurrentQAId = randomQA.id;
      const newQuestion = randomQA.question;
      const newAdditionalContext = randomParagraph.context;
      const newPlausibleAnswers = randomQA.plausible_answers || [];
      const newUserRequestedIncompleteAnswer =
        contextWarningAcknowledged.includes("acknowledge");

      // Set the additional context and input states
      setAdditionalContext(newAdditionalContext);
      setInput(newQuestion);
      setIsImpossible(randomQA.is_impossible);
      setPlausibleAnswers(newPlausibleAnswers);
      setRandomTitle(newCurrentTitle);
      setRandomQAId(newCurrentQAId);
      const answerString =
        randomQA.answers && randomQA.answers.length > 0
          ? randomQA.answers
              .map((answer, index) => `${index + 1}. ${answer.text}`)
              .join("\n")
          : "No answers available.";
      const newSelectedAnswer = { text: answerString, answer_start: 0 };
      setSelectedAnswer(newSelectedAnswer);

      if (autoSubmit) {
        handleSubmit(
          newQuestion,
          newAdditionalContext,
          newSelectedAnswer,
          newPlausibleAnswers,
          newCurrentTitle,
          newCurrentQAId
        ).then(() => {
          resolve({
            newQuestion,
            newAdditionalContext,
            newSelectedAnswer,
            newPlausibleAnswers,
            newCurrentTitle,
            newCurrentQAId,
          });
        });
      } else {
        resolve({
          newQuestion,
          newAdditionalContext,
          newSelectedAnswer,
          newPlausibleAnswers,
          newCurrentTitle,
          newCurrentQAId,
        });
      }
    });
  };

  const handleSubmit = async (
    input: string,
    additionalContext: string,
    selectedAnswer: Answer | null,
    plausibleAnswers: Answer[],
    title: string,
    qAId: string
  ) => {
    if (!input.trim()) return;

    setMessages([]);

    const newUserMessage: Message = {
      id: uuidv4(),
      content: input,
      role: "user",
      additionalContext: additionalContext,
      answer:
        plausibleAnswers.length > 0
          ? plausibleAnswers[0].text
          : selectedAnswer?.text || "",
      userRequestedIncompleteAnswer:
        contextWarningAcknowledged.includes("acknowledge"),
    };
    setMessages((prevMessages) => [...prevMessages, newUserMessage]);

    const response = await fetch("/api/chat", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        messages: [...messages, newUserMessage],
        model: selectedModel,
      }),
    });
    if (!response.ok) {
      throw new Error("Something went wrong!");
    }

    const {
      reply: assistantReply,
      relevance,
      probability,
      perplexity,
      justification,
      answerRelevance,
      answerProbability,
      answerJustification,
    } = await response.json();

    //if relevance = false or probability < 90 or perplexity > 1.5, show warning
    let showWarning = false;
    if (!relevance) {
      showWarning = true;
    }
    if (probability < 90) {
      showWarning = true;
    }
    if (perplexity > 1.5) {
      showWarning = true;
    }

    const assistantMessage: Message = {
      id: uuidv4(),
      content: assistantReply,
      role: "assistant",
      probability,
      relevance,
      perplexity,
      justification,
      answerRelevance,
      answerProbability,
      answerJustification,
      answer:
        plausibleAnswers.length > 0
          ? plausibleAnswers[0].text
          : selectedAnswer?.text || "",
      contextWarningPresented: showWarning,
    };

    // Add the assistant message to the messages array
    setMessages((prevMessages) => [...prevMessages, assistantMessage]);

    const newChatEntry: ChatEntry = {
      model: selectedModel,
      context: additionalContext,
      title: title,
      questionId: qAId,
      userPrompt: input,
      answer:
        plausibleAnswers.length > 0
          ? plausibleAnswers[0].text
          : selectedAnswer?.text || "",
      assistantResponse: assistantReply,
      relevant: relevance,
      expectedRelavance: !isImpossible,
      confidence: probability,
      perplexity: perplexity,
      justification: justification,
      answerRelevance: answerRelevance,
      answerProbability: answerProbability,
      answerJustification: answerJustification,
      contextWarningPresented: showWarning,
      userRequestedIncompleteAnswer: userRequestedIncompleteAnswer,
    };
    setChatEntries((prevChatEntries) => [...prevChatEntries, newChatEntry]);
  };

  const handleChatEntrySelect = (entry: ChatEntry) => {
    handleClear();

    setAdditionalContext(entry.context);
    setInput(entry.userPrompt);
    setIsImpossible(!entry.expectedRelavance);
    setRandomTitle(entry.title);
    setRandomQAId(entry.questionId);
    setUserRequestedIncompleteAnswer(entry.userRequestedIncompleteAnswer);
    setContextWarningAcknowledged(
      entry.contextWarningPresented ? ["acknowledge"] : []
    );

    if (!entry.expectedRelavance) {
      setPlausibleAnswers([{ text: entry.answer, answer_start: 0 }]);
    } else {
      setSelectedAnswer({ text: entry.answer, answer_start: 0 });
    }

    setMessages([
      {
        id: uuidv4(),
        content: entry.userPrompt,
        role: "user",
        additionalContext: entry.context,
        answer: entry.answer,
      },
      {
        id: uuidv4(),
        content: entry.assistantResponse,
        role: "assistant",
        probability: entry.confidence,
        relevance: entry.relevant,
        perplexity: entry.perplexity,
        justification: entry.justification,
        answerRelevance: entry.answerRelevance,
        answerProbability: entry.answerProbability,
        answerJustification: entry.answerJustification,
        answer: entry.answer,
        contextWarningPresented: entry.contextWarningPresented,
        contextWarningAcknowledged: entry.contextWarningPresented,
        userRequestedIncompleteAnswer: entry.userRequestedIncompleteAnswer,
      },
    ]);

    console.log("chatentryselect:", messages);
  };

  const handleRowSelect = (index: number) => {
    if (selectedRowIndices.includes(index)) {
      setSelectedRowIndices([]);
    } else {
      setSelectedRowIndices([index]);
      handleChatEntrySelect(chatEntries[index]);
    }
    console.log("Row selected:", index);
  };

  useEffect(() => {
    handleRandomQAD();
  }, []);

  const handleDownload = () => {
    const jsonData = JSON.stringify(chatEntries, null, 2);
    const blob = new Blob([jsonData], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = "chat_entries.json";
    link.click();
    URL.revokeObjectURL(url);
  };

  const handleInputChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setInput(e.target.value);
  };

  const CustomizedDot = (props: any) => {
    const { cx, cy, payload, r, fill, fillOpacity, stroke, strokeWidth } =
      props;
    const { contextWarningPresented } = payload;

    // if (contextWarningPresented) {
    //   return (
    //     <g>
    //       <circle
    //         cx={cx}
    //         cy={cy}
    //         r={r + 3}
    //         fill="white"
    //         fillOpacity={1}
    //         stroke="white"
    //         strokeWidth={1}
    //       />
    //       <circle
    //         cx={cx}
    //         cy={cy}
    //         r={r + 2}
    //         fill="gray"
    //         fillOpacity={1}
    //         stroke="gray"
    //         strokeWidth={strokeWidth}
    //       />
    //     </g>
    //   );
    // }

    return (
      <circle
        cx={cx}
        cy={cy}
        r={r}
        fill={fill}
        fillOpacity={fillOpacity}
        stroke={stroke}
        strokeWidth={strokeWidth}
      />
    );
  };

  class CustomizedLabel extends PureComponent<CustomizedLabelProps> {
    render() {
      const { x, y, stroke, value, contextWarningPresented } = this.props;

      let dy = -30;
      if (typeof value === "boolean" && value === false) {
        dy = 10;
      }

      if (contextWarningPresented) {
        return (
          <g>
            <ShieldCheck x={x - 10} y={y + dy} size={20} className="" />
          </g>
        );
      }

      return null;
    }
  }

  const handleChartClick = (event: any) => {
    if (event && event.activePayload) {
      const dataPoint: ChatEntry = event.activePayload[0].payload;
      handleChatEntrySelect(dataPoint);
    }
  };

  const handleDelete = (index: number) => {
    // Remove the chat entry at the specified index
    const updatedChatEntries = [...chatEntries];
    updatedChatEntries.splice(index, 1);
    setChatEntries(updatedChatEntries);
  };

  return (
    <div className="flex flex-col w-full">
      <div className="flex flex-row w-full h-full space-x-4">
        <div className="w-1/2 space-y-4">
          <Card className="w-full">
            <CardHeader>
              <CardTitle>Reference Context and Question:</CardTitle>
              <CardDescription>
                Set paramaters for the AI Chatbot below.
              </CardDescription>
            </CardHeader>
            <CardContent className="flex flex-col gap-5">
              <div className="flex flex-col gap-2">
                <Label htmlFor="topic">Topic:</Label>
                <Input
                  id="topic"
                  placeholder="Joe's Ice Cream"
                  value={randomTitle}
                  onChange={(e) => setRandomTitle(e.target.value)}
                ></Input>
              </div>
              <form className="flex flex-col gap-2">
                <Label htmlFor="context">Context:</Label>
                <Textarea
                  id="context"
                  placeholder="Joe likes rocky road ice cream."
                  value={additionalContext}
                  onChange={(e) => setAdditionalContext(e.target.value)}
                />
              </form>
              <div className="flex flex-col gap-2">
                <Label htmlFor="question">Question:</Label>
                <Input
                  id="question"
                  placeholder="What type of ice cream does Joe like?"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                />
              </div>

              <div className="flex flex-row items-center justify-between">
                <div>
                  <p className="text-base font-strong">Relevance:</p>
                  <p className="text-sm text-muted-foreground capitalize-first">
                    Is the reference context relevant to the question?
                  </p>
                </div>
                <Switch
                  id="relevance"
                  checked={!isImpossible}
                  onCheckedChange={(checked) => setIsImpossible(!checked)}
                />
              </div>
              {isImpossible ? (
                <div className="flex flex-col gap-2">
                  {/* <Label htmlFor="plausible_answers">Plausible Answers:</Label>
                  <Textarea
                    id="plausible_answers"
                    placeholder="Vanilla ice cream."
                    value={plausibleAnswers
                      .map((answer) => answer.text)
                      .join("\n")}
                    onChange={(e) =>
                      setPlausibleAnswers(
                        e.target.value
                          .split("\n")
                          .map((text) => ({ text, answer_start: 0 }))
                      )
                    }
                  /> */}
                  <Label
                    htmlFor="selected_answer"
                    className="text-muted-foreground"
                  >
                    Answer:
                  </Label>
                  <Textarea
                    disabled={true}
                    id="selected_answer"
                    placeholder="Joe likes rocky road ice cream."
                    value={selectedAnswer ? selectedAnswer.text : ""}
                    onChange={(e) =>
                      setSelectedAnswer({
                        text: e.target.value,
                        answer_start: 0,
                      })
                    }
                  />
                </div>
              ) : (
                <div className="flex flex-col gap-2">
                  <Label htmlFor="selected_answer">Answer:</Label>
                  <Textarea
                    id="selected_answer"
                    placeholder="Joe likes rocky road ice cream."
                    value={selectedAnswer ? selectedAnswer.text : ""}
                    onChange={(e) =>
                      setSelectedAnswer({
                        text: e.target.value,
                        answer_start: 0,
                      })
                    }
                  />
                </div>
              )}
              <div className="text-xs text-muted-foreground ">
                ID: {randomQAId}
              </div>
            </CardContent>
            <CardFooter className="flex flex-col border-t px-6 py-4 items-start justify-between space-y-3">
              <div className="flex flex-row w-full justify-between">
                <div className="flex flex-row items-center space-x-2">
                  <Button variant="outline" onClick={handleRandomQAD}>
                    <Dices /> <span className="ml-2">Random</span>
                  </Button>
                </div>

                <div className="flex flex-row gap-2">
                  <ToggleGroup
                    id="model"
                    variant="outline"
                    type="single"
                    defaultValue="gpt-3.5-turbo"
                    onValueChange={(value) => setSelectedModel(value)}
                  >
                    <ToggleGroupItem value="gpt-3.5-turbo">
                      @GPT 3.5
                    </ToggleGroupItem>
                    <ToggleGroupItem value="gpt-4">@GPT 4.0</ToggleGroupItem>
                  </ToggleGroup>

                  <Button
                    type="submit"
                    className=""
                    disabled={autoSubmit}
                    onClick={() =>
                      handleSubmit(
                        input,
                        additionalContext,
                        selectedAnswer,
                        plausibleAnswers,
                        randomTitle,
                        randomQAId
                      )
                    }
                  >
                    Submit
                  </Button>
                </div>
              </div>
              {/* <Collapsible className="w-full">
                <CollapsibleTrigger>
                  <p className="text-sm text-muted-foreground">
                    Advanced Options
                  </p>
                </CollapsibleTrigger>
                <CollapsibleContent className="flex flex-row gap-6">
                  <div className="flex items-center space-x-3">
                    <Label htmlFor="auto-submit">Auto Submit</Label>
                    <Switch
                      id="auto-submit"
                      checked={autoSubmit}
                      onCheckedChange={(checked) => setAutoSubmit(checked)}
                    />
                  </div>
                </CollapsibleContent>
              </Collapsible> */}
            </CardFooter>
          </Card>
        </div>
        <div className="w-1/2 md:w-2/3">
          <Card className="relative w-full h-full">
            <CardHeader>
              <CardTitle>
                Chat History
                <Button
                  variant="ghost"
                  size="sm"
                  className="absolute top-5 right-5"
                  onClick={handleClear}
                >
                  <RotateCcw className="w-5 h-5" />
                </Button>
              </CardTitle>
              <CardDescription>
                Monitor the history of the chat session.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="relative flex flex-col space-y-4">
                <div className="flex justify-start">
                  <Avatar className="mr-4">
                    <AvatarImage src="" alt="AI" />
                    <AvatarFallback className="">AI</AvatarFallback>
                  </Avatar>
                  <div className="bg-primary text-primary-foreground rounded-lg p-3">
                    Hi, how can I help?
                  </div>
                </div>
                {messages.map((m, index) => {
                  return (
                    <div key={m.id} className="flex flex-col">
                      <div
                        className={`flex flex-row ${
                          m.role === "user" ? "justify-end" : "justify-start"
                        }`}
                      >
                        {m.role !== "user" && (
                          <Avatar className="mr-4">
                            <AvatarImage src="" alt="AI" />
                            <AvatarFallback className="">AI</AvatarFallback>
                          </Avatar>
                        )}
                        <div className="flex flex-col space-y-2">
                          {m.contextWarningPresented && (
                            <div>
                              <div className="max-w-[24rem] flex flex-col mb-3 rounded-lg p-3 bg-primary text-primary-foreground whitespace-pre-wrap">
                                <div className="mb-3">
                                  Small hicup, I did some research but I am not
                                  100% confident the reference material
                                  addresses your question.
                                </div>
                                <div className="">
                                  You can still review what answer I could
                                  provide by acknowleding this warning.
                                </div>
                              </div>
                              <div className="flex flex-col space-y-2">
                                {m.role !== "user" && (
                                  <div className="flex flex-row items-center justify-start space-x-2 ">
                                    <Popover>
                                      <PopoverTrigger>
                                        <p className="text-xs text-muted-foreground">
                                          <ShieldCheck
                                            strokeWidth={1.5}
                                            className="w-5 h-5"
                                          />
                                        </p>
                                      </PopoverTrigger>
                                      <PopoverContent className="flex flex-col space-y-4">
                                        <Label
                                          htmlFor="justification"
                                          className=""
                                        >
                                          Justification:
                                        </Label>
                                        <p
                                          id="justification"
                                          className="text-sm text-muted-foreground"
                                        >
                                          {m.justification}
                                        </p>
                                      </PopoverContent>
                                    </Popover>
                                    <p className="text-xs text-muted-foreground">
                                      Relenvance: {m.relevance ? "Yes" : "No"}
                                    </p>
                                    <p className="text-xs text-muted-foreground">
                                      Confidence: {m.probability?.slice(0, 2)}%
                                    </p>
                                    <p className="text-xs text-muted-foreground">
                                      Perplexity: {m.perplexity?.slice(0, 4)}%
                                    </p>
                                  </div>
                                )}
                                <ToggleGroup
                                  variant="outline"
                                  type="multiple"
                                  className="flex flex-col items-start"
                                  onValueChange={(value) => {
                                    setContextWarningAcknowledged(value);
                                    setMessages((prevMessages) =>
                                      prevMessages.map((msg) =>
                                        msg.id === m.id
                                          ? {
                                              ...msg,
                                              userRequestedIncompleteAnswer:
                                                value.includes("acknowledge"),
                                            }
                                          : msg
                                      )
                                    );
                                  }}
                                >
                                  <ToggleGroupItem
                                    value="acknowledge"
                                    aria-label="aknowledge"
                                  >
                                    Aknowledged
                                  </ToggleGroupItem>
                                  {/* <ToggleGroupItem
                                    value="rephrase"
                                    aria-label="rephrase"
                                  >
                                    Why was my question not relevant?
                                  </ToggleGroupItem> */}
                                </ToggleGroup>
                              </div>
                            </div>
                          )}
                          {m.role === "user" ||
                          !m.contextWarningPresented ||
                          m.userRequestedIncompleteAnswer ? (
                            <div
                              className={`max-w-[24rem] rounded-lg p-3 ${
                                m.role === "user"
                                  ? "bg-secondary text-secondary-foreground"
                                  : "bg-primary text-primary-foreground"
                              } whitespace-pre-wrap`}
                            >
                              {m.content}
                            </div>
                          ) : null}
                          {/* {(m.role !== "user" && !m.contextWarningPresented) ||
                          m.userRequestedIncompleteAnswer ? (
                            <div className="flex flex-row items-end justify-end space-x-4 text-xs text-muted-foreground mr-2">
                              <ThumbsUp strokeWidth={1.5} className="w-5 h-5" />
                              <ThumbsDown
                                strokeWidth={1.5}
                                className="w-5 h-5"
                              />
                            </div>
                          ) : null} */}
                        </div>

                        {m.role === "user" && (
                          <Avatar className="ml-4">
                            <AvatarImage src="" alt="User" />
                            <AvatarFallback>
                              <User />
                            </AvatarFallback>
                          </Avatar>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
      <div className="flex flex-row w-full mt-4 space-x-4">
        <Card className="w-1/3">
          <CardHeader>
            <CardTitle>Context Relavance</CardTitle>
            <CardDescription>
              Boolean assessment of query relevance to submitted context.
              Incomplete context submission increases likelihood of
              hallucination.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-[200px]">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart
                  data={chatEntries}
                  margin={{ top: 7, right: 0, left: -60, bottom: 7 }}
                  syncId="charts"
                  onClick={handleChartClick}
                >
                  <YAxis
                    domain={[0, 1]}
                    tick={false}
                    stroke="#1f2937"
                    tickLine={false}
                    padding={{ top: 30, bottom: 30 }}
                  />
                  <XAxis hide={true} padding={{ left: 10, right: 10 }} />
                  <Tooltip
                    content={({ active, payload }) => {
                      if (active && payload && payload.length) {
                        const entry = payload[0].payload;
                        return (
                          <div className="rounded-lg border bg-background p-4 shadow-sm">
                            <div className="grid grid-cols-2 gap-x-6 gap-y-4">
                              <div className="flex flex-col gap-1">
                                <span className="text-xs uppercase text-muted-foreground">
                                  Relevant
                                </span>
                                <span className="text-xs text-muted-foreground">
                                  {entry.relevant ? "Yes" : "No"}
                                </span>
                              </div>
                            </div>
                          </div>
                        );
                      }
                      return null;
                    }}
                  />
                  <ReferenceLine
                    y={0.5}
                    stroke="#1f2937"
                    strokeDasharray="3 3"
                    label={{
                      position: "insideTopRight",
                      value: "No",
                      fill: "#1f2937",
                      fontSize: 12,
                    }}
                  />
                  <ReferenceLine
                    y={0.5}
                    stroke="#1f2937"
                    strokeDasharray="3 3"
                    label={{
                      position: "insideBottomRight",
                      value: "Yes",
                      fill: "#1f2937",
                      fontSize: 12,
                    }}
                  />

                  <Line
                    type="stepAfter"
                    dataKey="relevant"
                    strokeWidth={2}
                    activeDot={{ r: 8, style: { fill: "gray" } }}
                    stroke="gray"
                    dot={
                      <CustomizedDot
                        r={3}
                        fill="gray"
                        fillOpacity={1}
                        stroke="gray"
                        strokeWidth={1}
                      />
                    }
                    label={({ x, y, stroke, value, index }) => (
                      <CustomizedLabel
                        x={x}
                        y={y}
                        stroke={stroke}
                        value={value}
                        contextWarningPresented={
                          chatEntries[index].contextWarningPresented
                        }
                      />
                    )}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
        <Card className="w-1/3">
          <CardHeader>
            <CardTitle>Confidence Score</CardTitle>
            <CardDescription>
              The confidence chart shows how strongly the language model
              believes the provided context addresses the user query.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-[200px]">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart
                  data={chatEntries}
                  margin={{
                    top: 0,
                    right: 0,
                    left: -60,
                    bottom: 0,
                  }}
                  syncId="charts"
                  onClick={handleChartClick}
                >
                  <YAxis
                    domain={[0, 110]}
                    tick={false}
                    stroke="#1f2937"
                    tickLine={false}
                    padding={{ top: 30, bottom: 30 }}
                  />
                  <XAxis hide={true} padding={{ left: 10, right: 10 }} />
                  <Tooltip
                    content={({ active, payload }) => {
                      if (active && payload && payload.length) {
                        const entry = payload[0].payload;
                        return (
                          <div className="rounded-lg border bg-background p-4 shadow-sm">
                            <div className="grid grid-cols-2 gap-x-6 gap-y-4">
                              <div className="flex flex-col gap-1">
                                <span className="text-xs uppercase text-muted-foreground">
                                  Confidence
                                </span>
                                <span className="text-xs text-muted-foreground">
                                  {entry.confidence}%
                                </span>
                              </div>
                            </div>
                          </div>
                        );
                      }
                      return null;
                    }}
                  />
                  <ReferenceLine
                    y={90}
                    stroke="#1f2937"
                    strokeDasharray="3 3"
                    label={{
                      position: "insideBottomRight",
                      value: "Confidence > 90%",
                      fill: "#1f2937",
                      fontSize: 12,
                    }}
                  />
                  <Line
                    type="monotone"
                    dataKey="confidence"
                    strokeWidth={2}
                    activeDot={{
                      r: 8,
                      style: { fill: "gray" },
                    }}
                    stroke="gray"
                    dot={
                      <CustomizedDot
                        r={3}
                        fill="gray"
                        fillOpacity={1}
                        stroke="gray"
                        strokeWidth={1}
                      />
                    }
                    label={({ x, y, stroke, value, index }) => (
                      <CustomizedLabel
                        x={x}
                        y={y}
                        stroke={stroke}
                        value={value}
                        contextWarningPresented={
                          chatEntries[index].contextWarningPresented
                        }
                      />
                    )}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
        <Card className="w-1/3">
          <CardHeader>
            <CardTitle>Perplexity Scores</CardTitle>
            <CardDescription>
              The perplexity chart quantifies the uncertainty or surprise factor
              in the models generated text for each given context and question.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-[200px]">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart
                  data={chatEntries}
                  margin={{
                    top: 0,
                    right: 0,
                    left: -60,
                    bottom: 0,
                  }}
                  syncId="charts"
                  onClick={handleChartClick}
                >
                  <YAxis
                    domain={[0, 2]}
                    tick={false}
                    stroke="#1f2937"
                    tickLine={false}
                    padding={{ top: 30, bottom: 30 }}
                  />
                  <XAxis hide={true} padding={{ left: 10, right: 10 }} />
                  <Tooltip
                    content={({ active, payload }) => {
                      if (active && payload && payload.length) {
                        const entry = payload[0].payload;
                        return (
                          <div className="rounded-lg border bg-background p-4 shadow-sm">
                            <div className="grid grid-cols-2 gap-x-6 gap-y-4">
                              <div className="flex flex-col gap-1">
                                <span className="text-xs uppercase text-muted-foreground">
                                  Perplexity
                                </span>
                                <span className="text-xs text-muted-foreground">
                                  {entry.perplexity}
                                </span>
                              </div>
                            </div>
                          </div>
                        );
                      }
                      return null;
                    }}
                  />
                  <ReferenceLine
                    y={1.5}
                    stroke="#1f2937"
                    strokeDasharray="3 3"
                    label={{
                      position: "insideBottomRight",
                      value: "Perplexity > 1.50%",
                      fill: "#1f2937",
                      fontSize: 12,
                    }}
                  />
                  <Line
                    type="monotone"
                    dataKey="perplexity"
                    strokeWidth={2}
                    activeDot={{
                      r: 8,
                      style: { fill: "gray" },
                    }}
                    stroke="gray"
                    dot={
                      <CustomizedDot
                        r={3}
                        fill="gray"
                        fillOpacity={1}
                        stroke="gray"
                        strokeWidth={1}
                      />
                    }
                    label={({ x, y, stroke, value, index }) => (
                      <CustomizedLabel
                        x={x}
                        y={y}
                        stroke={stroke}
                        value={value}
                        contextWarningPresented={
                          chatEntries[index].contextWarningPresented
                        }
                      />
                    )}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>
      {/*Column charts of success and faliure for confidence and perplexity.
      <div className="flex flex-row w-full mt-4 space-x-4">
        <Card className="w-1/4">
          <CardHeader>
            <CardTitle className="text-lg">Confidence: Success</CardTitle>
            <CardDescription>
              Confidences scores for successfully detecited incomplete context
              queries.
            </CardDescription>
          </CardHeader>
          <CardContent>
            {(() => {
              const successEntries = chatEntries.filter(
                (entry) => entry.relevant === entry.expectedRelavance
              );

              const confidenceRanges = Array.from({ length: 20 }, (_, i) => ({
                range: `${i * 5}-${(i + 1) * 5}%`,
                frequency: 0,
              }));

              successEntries.forEach((entry) => {
                const confidenceScore = parseFloat(entry.confidence);
                const rangeIndex = Math.floor(confidenceScore / 10);
                confidenceRanges[rangeIndex].frequency++;
              });

              return (
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart
                    data={confidenceRanges}
                    margin={{
                      top: 0,
                      right: 0,
                      left: -60,
                      bottom: 0,
                    }}
                  >
                    <XAxis dataKey="range" tick={false} axisLine={false} />
                    <YAxis tick={false} axisLine={false} />
                    <Tooltip
                      content={({ active, payload }) => {
                        if (active && payload && payload.length) {
                          const entry = payload[0].payload;
                          return (
                            <div className="rounded-lg border bg-background p-4 shadow-sm">
                              <div className="grid grid-cols-2 gap-x-6 gap-y-4">
                                <div className="flex flex-col gap-1">
                                  <span className="text-xs uppercase text-muted-foreground">
                                    Confidence Group
                                  </span>
                                  <span className="text-xs text-muted-foreground">
                                    {entry.range}
                                  </span>
                                </div>
                                <div className="flex flex-col gap-1">
                                  <span className="text-xs uppercase text-muted-foreground">
                                    Count
                                  </span>
                                  <span className="text-xs text-muted-foreground">
                                    {entry.frequency}
                                  </span>
                                </div>
                              </div>
                            </div>
                          );
                        }
                        return null;
                      }}
                    />
                    <Bar dataKey="frequency" fill="#6325c5" />
                  </BarChart>
                </ResponsiveContainer>
              );
            })()}
          </CardContent>
        </Card>
        <Card className="w-1/4">
          <CardHeader>
            <CardTitle className="text-lg">Confidence: Failures</CardTitle>
            <CardDescription>
              Confidences scores for un-successfully detecited incomplete
              context queries.
            </CardDescription>
          </CardHeader>
          <CardContent>
            {(() => {
              const successEntries = chatEntries.filter(
                (entry) => entry.relevant !== entry.expectedRelavance
              );

              const confidenceRanges = Array.from({ length: 20 }, (_, i) => ({
                range: `${i * 5}-${(i + 1) * 5}%`,
                frequency: 0,
              }));

              successEntries.forEach((entry) => {
                const confidenceScore = parseFloat(entry.confidence);
                const rangeIndex = Math.floor(confidenceScore / 10);
                confidenceRanges[rangeIndex].frequency++;
              });

              return (
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart
                    data={confidenceRanges}
                    margin={{
                      top: 0,
                      right: 0,
                      left: -60,
                      bottom: 0,
                    }}
                  >
                    <XAxis dataKey="range" tick={false} axisLine={false} />
                    <YAxis tick={false} axisLine={false} />
                    <Tooltip
                      content={({ active, payload }) => {
                        if (active && payload && payload.length) {
                          const entry = payload[0].payload;
                          return (
                            <div className="rounded-lg border bg-background p-4 shadow-sm">
                              <div className="grid grid-cols-2 gap-x-6 gap-y-4">
                                <div className="flex flex-col gap-1">
                                  <span className="text-xs uppercase text-muted-foreground">
                                    Confidence Group
                                  </span>
                                  <span className="text-xs text-muted-foreground">
                                    {entry.range}
                                  </span>
                                </div>
                                <div className="flex flex-col gap-1">
                                  <span className="text-xs uppercase text-muted-foreground">
                                    Count
                                  </span>
                                  <span className="text-xs text-muted-foreground">
                                    {entry.frequency}
                                  </span>
                                </div>
                              </div>
                            </div>
                          );
                        }
                        return null;
                      }}
                    />
                    <Bar dataKey="frequency" fill="#6325c5" />
                  </BarChart>
                </ResponsiveContainer>
              );
            })()}
          </CardContent>
        </Card>
        <Card className="w-1/4">
          <CardHeader>
            <CardTitle className="text-lg">Perplexity: Success</CardTitle>
            <CardDescription>
              Perplexity scores for successfully detected incomplete context
              queries.
            </CardDescription>
          </CardHeader>
          <CardContent>
            {(() => {
              const successEntries = chatEntries.filter(
                (entry) => entry.relevant === entry.expectedRelavance
              );

              const perplexityRanges = Array.from({ length: 20 }, (_, i) => ({
                range: `${1 + i * 0.05}-${1 + (i + 1) * 0.05}`,
                frequency: 0,
              }));

              successEntries.forEach((entry) => {
                const perplexityScore = parseFloat(entry.perplexity);
                const rangeIndex = Math.floor((perplexityScore - 1) / 0.05);
                if (rangeIndex >= 0 && rangeIndex < perplexityRanges.length) {
                  perplexityRanges[rangeIndex].frequency++;
                }
              });

              return (
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart
                    data={perplexityRanges}
                    margin={{
                      top: 0,
                      right: 0,
                      left: -60,
                      bottom: 0,
                    }}
                  >
                    <XAxis dataKey="range" tick={false} axisLine={false} />
                    <YAxis tick={false} axisLine={false} />
                    <Tooltip
                      content={({ active, payload }) => {
                        if (active && payload && payload.length) {
                          const entry = payload[0].payload;
                          return (
                            <div className="rounded-lg border bg-background p-4 shadow-sm">
                              <div className="grid grid-cols-2 gap-x-6 gap-y-4">
                                <div className="flex flex-col gap-1">
                                  <span className="text-xs uppercase text-muted-foreground">
                                    Perplexity Range
                                  </span>
                                  <span className="text-xs text-muted-foreground">
                                    {entry.range}
                                  </span>
                                </div>
                                <div className="flex flex-col gap-1">
                                  <span className="text-xs uppercase text-muted-foreground">
                                    Count
                                  </span>
                                  <span className="text-xs text-muted-foreground">
                                    {entry.frequency}
                                  </span>
                                </div>
                              </div>
                            </div>
                          );
                        }
                        return null;
                      }}
                    />
                    <Bar dataKey="frequency" fill="#6325c5" />
                  </BarChart>
                </ResponsiveContainer>
              );
            })()}
          </CardContent>
        </Card>
        <Card className="w-1/4">
          <CardHeader>
            <CardTitle className="text-lg">Perplexity: Success</CardTitle>
            <CardDescription>
              Perplexity scores for successfully detected incomplete context
              queries.
            </CardDescription>
          </CardHeader>
          <CardContent>
            {(() => {
              const successEntries = chatEntries.filter(
                (entry) => entry.relevant !== entry.expectedRelavance
              );

              const perplexityRanges = Array.from({ length: 20 }, (_, i) => ({
                range: `${1 + i * 0.05}-${1 + (i + 1) * 0.05}`,
                frequency: 0,
              }));

              successEntries.forEach((entry) => {
                const perplexityScore = parseFloat(entry.perplexity);
                const rangeIndex = Math.floor((perplexityScore - 1) / 0.05);
                if (rangeIndex >= 0 && rangeIndex < perplexityRanges.length) {
                  perplexityRanges[rangeIndex].frequency++;
                }
              });

              return (
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart
                    data={perplexityRanges}
                    margin={{
                      top: 0,
                      right: 0,
                      left: -60,
                      bottom: 0,
                    }}
                  >
                    <XAxis dataKey="range" tick={false} axisLine={false} />
                    <YAxis tick={false} axisLine={false} />
                    <Tooltip
                      content={({ active, payload }) => {
                        if (active && payload && payload.length) {
                          const entry = payload[0].payload;
                          return (
                            <div className="rounded-lg border bg-background p-4 shadow-sm">
                              <div className="grid grid-cols-2 gap-x-6 gap-y-4">
                                <div className="flex flex-col gap-1">
                                  <span className="text-xs uppercase text-muted-foreground">
                                    Perplexity Range
                                  </span>
                                  <span className="text-xs text-muted-foreground">
                                    {entry.range}
                                  </span>
                                </div>
                                <div className="flex flex-col gap-1">
                                  <span className="text-xs uppercase text-muted-foreground">
                                    Count
                                  </span>
                                  <span className="text-xs text-muted-foreground">
                                    {entry.frequency}
                                  </span>
                                </div>
                              </div>
                            </div>
                          );
                        }
                        return null;
                      }}
                    />
                    <Bar dataKey="frequency" fill="#6325c5" />
                  </BarChart>
                </ResponsiveContainer>
              );
            })()}
          </CardContent>
        </Card>
      </div> */}
      <div className="w-full mt-4">
        <Card className="relative">
          <CardHeader>
            <CardTitle>
              Chat Entries
              <div className="flex flex-row gap-4 absolute top-5 right-5 items-end">
                <div className="flex flex-col gap-2">
                  <Label
                    htmlFor="retrieval-count"
                    className="text-sm text-muted-foreground"
                  >
                    Retrieval Count
                  </Label>
                  <ToggleGroup
                    id="retrieval-count"
                    variant="outline"
                    type="single"
                    defaultValue="1"
                    onValueChange={(value) => setRetrievalCount(value)}
                  >
                    <ToggleGroupItem value="1">1</ToggleGroupItem>
                    <ToggleGroupItem value="5">5</ToggleGroupItem>
                    <ToggleGroupItem value="10">10</ToggleGroupItem>
                  </ToggleGroup>
                </div>
                <div className="flex flex-col gap-2">
                  <Label
                    htmlFor="repeat-count"
                    className="text-sm text-muted-foreground"
                  >
                    Repeat Count
                  </Label>
                  <ToggleGroup
                    id="repeat-count"
                    variant="outline"
                    type="single"
                    defaultValue="1"
                    onValueChange={(value) => setRepeatCount(value)}
                  >
                    <ToggleGroupItem value="1">1</ToggleGroupItem>
                    <ToggleGroupItem value="5">5</ToggleGroupItem>
                    <ToggleGroupItem value="10">10</ToggleGroupItem>
                  </ToggleGroup>
                </div>
                <Button onClick={runSimulation}>Run</Button>
                <Button
                  variant="secondary"
                  className=""
                  onClick={handleDownload}
                >
                  <Download className="w-5 h-5" />
                </Button>
              </div>
            </CardTitle>
            <CardDescription>
              View the chat entries in a tabular format.
            </CardDescription>
          </CardHeader>
          <CardContent className="mt-6">
            {chatEntries.length === 0 && (
              <div className="flex flex-col items-center justify-center">
                <p className="text-muted-foreground">No chat entries found.</p>
              </div>
            )}
            {chatEntries.length > 0 && (
              <div className="border border-secondary rounded-lg shadow-sm p-2">
                <table className="w-full text-left">
                  <thead>
                    <tr>
                      <th className="px-4 pb-2">
                        <Checkbox disabled></Checkbox>
                      </th>
                      <th className="pb-2">Model</th>
                      <th className="pl-3 pb-2">Context</th>
                      <th className="pl-3 pb-2">Question</th>
                      <th className="pl-3 pb-2">Answer</th>
                      <th className="pl-3 pb-2">Response</th>
                      <th className=" pb-2">Was Context Relavant?</th>
                      <th className=" pb-2">Relavance Confidence</th>
                      <th className=" pb-2">Answer Perplexity</th>
                      <th className=" pb-2">Correct Answer</th>
                      <th className=" pb-2">Scoring Confidence</th>
                      <th className=" pb-2"></th>
                    </tr>
                  </thead>
                  <tbody>
                    {chatEntries.map((entry, index) => (
                      <tr
                        key={index}
                        className={`border-t ${
                          selectedRowIndices.includes(index)
                            ? "bg-primary/10"
                            : ""
                        }`}
                      >
                        <td className="px-4">
                          <Checkbox
                            checked={selectedRowIndices.includes(index)}
                            onCheckedChange={() => handleRowSelect(index)}
                          ></Checkbox>
                        </td>
                        <td className="uppercase text-sm">
                          {entry.model.slice(0, 5)}
                        </td>
                        <td className="">
                          <Textarea
                            className="border-none"
                            defaultValue={entry.context}
                          />
                        </td>
                        <td className="">
                          <Textarea
                            className="border-none"
                            defaultValue={entry.userPrompt}
                          />
                        </td>
                        <td className="">
                          <Textarea
                            className="border-none"
                            defaultValue={entry.answer}
                          />
                        </td>
                        <td className="">
                          <Textarea
                            className="border-none"
                            defaultValue={entry.assistantResponse}
                          />
                        </td>
                        <td className="">
                          <div className="flex flex-row items-center space-x-2">
                            {entry.relevant !== entry.expectedRelavance && (
                              <Popover>
                                <PopoverTrigger>
                                  <Circle className="text-primary" />
                                </PopoverTrigger>
                                <PopoverContent className="flex flex-col space-y-4">
                                  <h4 className="font-medium leading-none">
                                    Justification:
                                  </h4>
                                  <p className="text-sm text-muted-foreground">
                                    {entry.justification}
                                  </p>
                                </PopoverContent>
                              </Popover>
                            )}
                            <span>{entry.relevant ? "Yes" : "No"}</span>
                          </div>
                        </td>
                        <td className="">{entry.confidence}%</td>
                        <td className="">{entry.perplexity.slice(0, 5)}%</td>
                        <td className="">
                          <div className="flex flex-row items-center space-x-2">
                            {!entry.answerRelevance && (
                              <Popover>
                                <PopoverTrigger>
                                  <Circle className="text-primary" />
                                </PopoverTrigger>
                                <PopoverContent className="flex flex-col space-y-4">
                                  <h4 className="font-medium leading-none">
                                    Justification:
                                  </h4>
                                  <p className="text-sm text-muted-foreground">
                                    {entry.answerJustification}
                                  </p>
                                </PopoverContent>
                              </Popover>
                            )}
                            <span> {entry.answerRelevance ? "Yes" : "No"}</span>
                          </div>
                        </td>
                        <td className="items-center">
                          {entry.answerProbability}%
                        </td>

                        <td className="items-center">
                          <Button
                            variant="outline"
                            onClick={() => handleDelete(index)}
                          >
                            Delete
                          </Button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
