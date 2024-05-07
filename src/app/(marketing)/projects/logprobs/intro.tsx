"use client";
import React, { useState, ChangeEvent, useEffect } from "react";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Progress } from "@/components/ui/progress";
import { Slider } from "@/components/ui/slider";
import { Spinner } from "@/components/ui/spinner";

interface ChatMessage {
  role: "user" | "assisstant" | "system";
  content: string;
}

interface TopLogProb {
  token: string;
  logprob: number;
  bytes: number[];
}

interface LogProb {
  token: string;
  logprob: number;
  bytes: number[];
  top_logprobs: TopLogProb[];
}

interface TokenSpan {
  token: string;
  topLogProbs: TopLogProb[];
}

export default function Demonstration() {
  const [selectedModel, setSelectedModel] = useState("gpt-3.5-turbo");
  const [question, setQuestion] = useState("");
  const [response, setResponse] = useState("");
  const [logProbs, setLogProbs] = useState<LogProb[]>([]);
  const [selectedTokenIndexes, setSelectedTokenIndexes] = useState([]);
  const [temperature, setTemperature] = useState(1.0);
  const [perplexity, setPerplexity] = useState<number | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async () => {
    setIsLoading(true);
    const message: ChatMessage = {
      role: "user",
      content: question,
    };

    try {
      const response = await fetch("/api/intro", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          message: message,
          model: selectedModel,
          temperature: temperature,
        }),
      });

      if (!response.ok) {
        throw new Error("Something went wrong!");
      }

      const responseJSON = await response.json();
      setResponse(responseJSON.choices[0].message.content);
      const logProbsWithSelectedIndex =
        responseJSON.choices[0].logprobs.content.map(
          (logProb: LogProb, index: number) => {
            const selectedIndex = logProb.top_logprobs.findIndex(
              (topLogProb: TopLogProb) => topLogProb.token === logProb.token
            );
            return { ...logProb, selectedIndex };
          }
        );

      setLogProbs(logProbsWithSelectedIndex);
      setSelectedTokenIndexes(
        logProbsWithSelectedIndex.map(
          (logProb: { selectedIndex: number }) => logProb.selectedIndex
        )
      );
      const logProbsArray = responseJSON.choices[0].logprobs.content.map(
        (logProb: LogProb) => logProb.logprob
      );
      const averageLogProb =
        logProbsArray.reduce((acc: number, curr: number) => acc + curr, 0) /
        logProbsArray.length;
      const calculatedPerplexity = Math.exp(-averageLogProb);
      setPerplexity(calculatedPerplexity);
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false); // Set loading to false when request completes
    }
  };

  return (
    <div className="w-full flex flex-col gap-4">
      <div className="flex flex-col md:flex-row gap-4">
        <Card className="w-full">
          <CardHeader>
            <CardTitle>Input a Question</CardTitle>
            <CardDescription>
              Input a question and feel free to adjust the temperature slider.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col space-y-4">
              <div className="flex flex-col space-y-2">
                <Label htmlFor="name">Question</Label>
                <Input
                  id="name"
                  placeholder="Submit a quick question..."
                  onChange={(e) => setQuestion(e.target.value)}
                />
              </div>
              <div className="flex flex-col space-y-2">
                <Label htmlFor="name">Response</Label>
                <Textarea
                  id="name"
                  placeholder="Pending question..."
                  value={response}
                />
              </div>
              <div className="flex flex-col space-y-2">
                <Label htmlFor="temperature">Temperature</Label>
                <div className="flex flex-row space-x-4">
                  <Slider
                    id="temperature"
                    defaultValue={[1]}
                    max={2}
                    step={0.01}
                    className=""
                    onValueChange={(value) => setTemperature(value[0])}
                  />
                  <p className="text-muted-foreground text-sm">{temperature}</p>
                </div>
              </div>
            </div>
          </CardContent>
          <CardFooter className="flex flex-row justify-between">
            <Button variant="outline">Random</Button>
            <div className="flex flex-row space-x-4">
              <ToggleGroup
                id="model"
                variant="outline"
                type="single"
                defaultValue="gpt-3.5-turbo"
                onValueChange={(value) => setSelectedModel(value)}
              >
                <ToggleGroupItem value="gpt-3.5-turbo">@3.5</ToggleGroupItem>
                {/* <ToggleGroupItem value="gpt-4">@4.0</ToggleGroupItem> */}
              </ToggleGroup>

              <Button onClick={handleSubmit}>
                {isLoading ? (
                  <div className="flex items-center">
                    <Spinner />
                  </div>
                ) : (
                  <div>Submit</div>
                )}
              </Button>
            </div>
          </CardFooter>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Details of the Response</CardTitle>
            <CardDescription>
              Hover over each token to review the alternatives and their
              probabilities.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col justify-between h-full">
              <div className="">
                {logProbs.length === 0 ? (
                  <div className="flex flex-col items-center justify-center">
                    <p className="text-sm text-muted-foreground">
                      Pending response...
                    </p>
                  </div>
                ) : (
                  <>
                    <div className="flex flex-row items-center justify-start space-x-2 mb-4">
                      <Label
                        htmlFor="perplexity"
                        className="ml-1  text-center text-sm text-muted-foreground"
                      >
                        Perplexity:
                      </Label>
                      <div
                        id="perplexity"
                        className="text-muted-foreground text-sm text-center"
                      >
                        <p>
                          {perplexity
                            ? perplexity.toFixed(3)
                            : "Calculating..."}
                        </p>
                      </div>
                    </div>
                    <TooltipProvider>
                      <div className="flex flex-wrap">
                        {logProbs.map((logProb, index) => {
                          const tokenSpan = {
                            token: logProb.token,
                            topLogProbs: logProb.top_logprobs,
                          };

                          return (
                            <Popover key={index}>
                              <PopoverTrigger asChild>
                                <span className="inline-block bg-secondary rounded px-2.5 py-1 m-1">
                                  {tokenSpan.token}
                                </span>
                              </PopoverTrigger>
                              <PopoverContent>
                                <table className="w-full">
                                  <thead>
                                    <tr>
                                      <th className="px-2 text-left">Token</th>
                                      <th className="px-2 text-left">
                                        Probability
                                      </th>
                                    </tr>
                                  </thead>
                                  <tbody>
                                    {tokenSpan.topLogProbs.map(
                                      (topLogProb, idx) => (
                                        <tr key={idx}>
                                          <td className="px-2 text-left">
                                            {topLogProb.token}
                                          </td>
                                          <td className="px-2 text-left">
                                            {(
                                              Math.exp(topLogProb.logprob) * 100
                                            ).toFixed(2)}
                                            %
                                          </td>
                                        </tr>
                                      )
                                    )}
                                  </tbody>
                                </table>
                              </PopoverContent>
                            </Popover>
                          );
                        })}
                      </div>
                    </TooltipProvider>
                  </>
                )}
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
      <Card>
        <CardHeader>
          <CardTitle>Complete Alternatives</CardTitle>
          <CardDescription>
            A table of each alternative and their respective probabilities.
          </CardDescription>
        </CardHeader>
        <CardContent>
          {logProbs.length === 0 ? (
            <div className="flex flex-col items-center justify-center">
              <p className="text-sm text-muted-foreground">
                Pending response...
              </p>
            </div>
          ) : (
            <div className="w-full text-sm rounded-lg border border-secondary">
              <table className="w-full divide-y">
                <thead>
                  <tr>
                    <th className="px-4 py-4 text-left text-xs font-medium uppercase tracking-wider text-muted-foreground">
                      Option 1
                    </th>
                    <th className="px-4 py-4 text-left text-xs font-medium uppercase tracking-wider text-muted-foreground">
                      Probability 1
                    </th>
                    <th className="px-4 py-4 text-left text-xs font-medium uppercase tracking-wider text-muted-foreground">
                      Option 2
                    </th>
                    <th className="px-4 py-4 text-left text-xs font-medium uppercase tracking-wider text-muted-foreground">
                      Probability 2
                    </th>
                    <th className="px-4 py-4 text-left text-xs font-medium uppercase tracking-wider text-muted-foreground">
                      Option 3
                    </th>
                    <th className="px-4 py-4 text-left text-xs font-medium uppercase tracking-wider text-muted-foreground">
                      Probability 3
                    </th>
                    <th className="px-4 py-4 text-left text-xs font-medium uppercase tracking-wider text-muted-foreground">
                      Option 4
                    </th>
                    <th className="px-4 py-4 text-left text-xs font-medium uppercase tracking-wider text-muted-foreground">
                      Probability 4
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y">
                  {logProbs.map((logProb, index) => (
                    <tr key={index}>
                      {logProb.top_logprobs.map((topLogProb, idx) => (
                        <React.Fragment key={idx}>
                          <td className={`px-4 py-2 text-left}`}>
                            <p
                              className={`relative bg-secondary text-secondary-foreground p-2 rounded-sm ${
                                idx === selectedTokenIndexes[index] ? "  " : ""
                              }`}
                            >
                              {topLogProb.token}
                              {idx === selectedTokenIndexes[index] && (
                                <div className="bg-destructive rounded-full w-1.5 h-1.5 absolute top-0 right-0 m-1"></div>
                              )}
                            </p>
                          </td>
                          <td className="px-4 py-2 text-left">
                            <Progress
                              value={Math.exp(topLogProb.logprob) * 100}
                              className="h-2"
                            />
                          </td>
                        </React.Fragment>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
