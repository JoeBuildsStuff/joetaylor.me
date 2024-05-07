import Link from "next/link";
import Image from "next/image";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowRightFromLine } from "lucide-react";
import { Separator } from "@/components/ui/separator";

import { MarkdownComponents as MDC } from "@/components/markdowncomponents";

import bot_reading from "../../../../public/projects/logprobs/bot_reading.jpg";

export default function Page() {
  return (
    <div className="max-w-6xl mx-8 mb-10">
      <div className="my-10">
        <h1 className="leading-tight lg::leading-snug font-black text-8xl ">
          Some Projects.
        </h1>
        <p className="mt-3 leading-8 text-xl text-muted-foreground">
          Some of the things I&apos;ve been working on.
        </p>
      </div>
      <Separator className="mb-8" />
      <div className="mt-12 max-w-[50rem] my-4 rounded-xl">
        <div className="flex flex-row h-full ml-8 grow border border-primary/20 rounded-xl p-2 pb-4">
          <Image
            src={bot_reading}
            alt="Thumbnail"
            layout="fixed"
            className="overflow-hidden shadow-md bg-background h-[15rem] w-[15rem] border border-primary/20 rounded-xl mt-4 -ml-10 mr-3 sm:mr-8"
          />
          <div className="flex grow flex-col items-left justify-center space-y-8 w-[15rem] rounded-xl mt-4">
            <div className="flex flex-col space-y-2 mr-4">
              <MDC.p className="text-sm text-muted-foreground">May 2024</MDC.p>
              <MDC.h4>Token Probabilities</MDC.h4>
              <MDC.p className="text-muted-foreground">
                A little widget to visualize LLM responses and their token
                probabilities.
              </MDC.p>
              <MDC.p className="text-muted-foreground">
                Then, utilizing token probabilities to defend against responses
                that appear to contain hallucinations.
              </MDC.p>
            </div>
            <Button
              asChild
              variant="outline"
              className="w-[8rem] place-self-end mt-10 mr-2 md:mr-10"
            >
              <Link href="/projects/logprobs">Check it out</Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
