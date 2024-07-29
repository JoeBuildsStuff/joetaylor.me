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

import bot_reading from "../../../../public/projects/logprobs/bot_reading.png";
import bot_writing from "../../../../public/projects/meetingnotes-ai/bot_writing.png";
import bot_job from "../../../../public/projects/jobfinder-ai/bot_job.png";
import bot_chat from "../../../../public/projects/chatapp-ai/bot_chat.png";
import bot_blog from "../../../../public/projects/socialpost-ai/bot_blog.png";
import bot_task from "../../../../public/projects/taskmanger-ai/bot_task.png";

export default function Page() {
  return (
    <div className="max-w-6xl mx-4 sm:mx-8 mb-10">
      <div className="my-10">
        <h1 className="leading-tight lg::leading-snug font-black text-4xl sm:text-8xl ">
          Some Projects.
        </h1>
        <p className="mt-3 leading-8 text-xl text-muted-foreground">
          Some of the things I&apos;ve been working on.
        </p>
      </div>
      <Separator className="mb-8" />
      <div className="mt-12 max-w-[50rem] my-4 rounded-xl space-y-8">
        <div className="flex flex-col sm:flex-row h-full ml-0 sm:ml-8 grow border border-primary/20 rounded-xl p-2 pb-4">
          <div className="flex justify-center sm:block">
            <Image
              src={bot_writing}
              alt="Thumbnail"
              layout="fixed"
              className="overflow-hidden shadow-md bg-background h-[15rem] w-[15rem] border border-primary/20 rounded-xl mt-4 sm:-ml-10 sm:mr-8"
            />
          </div>
          <div className="flex grow flex-col items-left justify-center space-y-8 w-full sm:w-[15rem] rounded-xl mt-4">
            <div className="flex flex-col space-y-2 m-4 sm:mr-4">
              <MDC.p className="text-sm text-muted-foreground">Jan 2024</MDC.p>
              <MDC.h4>Meeting Notes AI</MDC.h4>
              <MDC.p className="text-muted-foreground">
                I wanted to create a system that could trascribe audio to text
                and then summarize the meeting notes.
              </MDC.p>
              <MDC.p className="text-muted-foreground">
                Lots of learnings across speech to text, and audio embeddings.
              </MDC.p>
            </div>
            <Button
              asChild
              variant="outline"
              className="w-[8rem] place-self-end mt-10 mr-2 md:mr-10"
            >
              <Link href="https://meetingnotes-ai.com">Check it out</Link>
            </Button>
          </div>
        </div>
        <div className="flex flex-col sm:flex-row h-full ml-0 sm:ml-8 grow border border-primary/20 rounded-xl p-2 pb-4">
          <div className="flex justify-center sm:block">
            <Image
              src={bot_reading}
              alt="Thumbnail"
              layout="fixed"
              className="overflow-hidden shadow-md bg-background h-[15rem] w-[15rem] border border-primary/20 rounded-xl mt-4 sm:-ml-10 sm:mr-8"
            />
          </div>
          <div className="flex grow flex-col items-left justify-center space-y-8 w-full sm:w-[15rem] rounded-xl mt-4">
            <div className="flex flex-col space-y-2 m-4 sm:mr-4">
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
        <div className="flex flex-col sm:flex-row h-full ml-0 sm:ml-8 grow border border-primary/20 rounded-xl p-2 pb-4">
          <div className="flex justify-center sm:block">
            <Image
              src={bot_job}
              alt="Thumbnail"
              layout="fixed"
              className="overflow-hidden shadow-md bg-background h-[15rem] w-[15rem] border border-primary/20 rounded-xl mt-4 sm:-ml-10 sm:mr-8"
            />
          </div>
          <div className="flex grow flex-col items-left justify-center space-y-8 w-full sm:w-[15rem] rounded-xl mt-4">
            <div className="flex flex-col space-y-2 m-4 sm:mr-4">
              <MDC.p className="text-sm text-muted-foreground">May 2024</MDC.p>
              <MDC.h4>JobFinder-AI</MDC.h4>
              <MDC.p className="text-muted-foreground">
                A simple tool to find jobs that match your skills and interests.
              </MDC.p>
              <MDC.p className="text-muted-foreground">
                Using job postings and resumes to match candidates to jobs.
              </MDC.p>
            </div>
            <Button
              asChild
              variant="outline"
              className="w-[8rem] place-self-end mt-10 mr-2 md:mr-10"
            >
              <Link href="https://jobfinder-ai.com">Check it out</Link>
            </Button>
          </div>
        </div>
        <div className="flex flex-col sm:flex-row h-full ml-0 sm:ml-8 grow border border-primary/20 rounded-xl p-2 pb-4">
          <div className="flex justify-center sm:block">
            <Image
              src={bot_chat}
              alt="Thumbnail"
              layout="fixed"
              className="overflow-hidden shadow-md bg-background h-[15rem] w-[15rem] border border-primary/20 rounded-xl mt-4 sm:-ml-10 sm:mr-8"
            />
          </div>
          <div className="flex grow flex-col items-left justify-center space-y-8 w-full sm:w-[15rem] rounded-xl mt-4">
            <div className="flex flex-col space-y-2 m-4 sm:mr-4">
              <MDC.p className="text-sm text-muted-foreground">June 2024</MDC.p>
              <MDC.h4>ChatApp-AI</MDC.h4>
              <MDC.p className="text-muted-foreground">
                A simple chat app that uses Claude 3.5 Sonnet to generate
                responses.
              </MDC.p>
              <MDC.p className="text-muted-foreground">
                I would get messages from the Anthropic interface that I have
                asked too many questions and need to come back in a few hours.
              </MDC.p>
              <MDC.p className="text-muted-foreground">
                So I caved and built an interface to use the API. Challenge was
                to complete it in 1 day.
              </MDC.p>
            </div>
            <Button
              asChild
              variant="outline"
              className="w-[8rem] place-self-end mt-10 mr-2 md:mr-10"
            >
              <Link href="https://chatapp-ai.com">Check it out</Link>
            </Button>
          </div>
        </div>
        <div className="flex flex-col sm:flex-row h-full ml-0 sm:ml-8 grow border border-primary/20 rounded-xl p-2 pb-4">
          <div className="flex justify-center sm:block">
            <Image
              src={bot_blog}
              alt="Thumbnail"
              layout="fixed"
              className="overflow-hidden shadow-md bg-background h-[15rem] w-[15rem] border border-primary/20 rounded-xl mt-4 sm:-ml-10 sm:mr-8"
            />
          </div>
          <div className="flex grow flex-col items-left justify-center space-y-8 w-[15rem] rounded-xl mt-4">
            <div className="flex flex-col space-y-2 m-4 sm:mr-4">
              <MDC.p className="text-sm text-muted-foreground">July 2024</MDC.p>
              <MDC.h4>SocialPost-AI</MDC.h4>
              <MDC.p className="text-muted-foreground">
                Writing blogs takes a lot of time. This tool aided in drafting
                and editing the posts.
              </MDC.p>
              <MDC.p className="text-muted-foreground">
                The motifation came when I spent 3 hours using chat to write the
                blog about building chat.
              </MDC.p>
              <MDC.p className="text-muted-foreground">
                Perhaps we can imagine a better interface?
              </MDC.p>
            </div>
            <Button
              asChild
              variant="outline"
              className="w-[8rem] place-self-end mt-10 mr-2 md:mr-10"
            >
              <Link href="https://socialpost-ai.com">Check it out</Link>
            </Button>
          </div>
        </div>
        <div className="flex flex-col sm:flex-row h-full ml-0 sm:ml-8 grow border border-primary/20 rounded-xl p-2 pb-4">
          <div className="flex justify-center sm:block">
            <Image
              src={bot_task}
              alt="Thumbnail"
              width={240}
              height={240}
              className="overflow-hidden shadow-md bg-background h-[15rem] w-[15rem] border border-primary/20 rounded-xl mt-4 sm:-ml-10 sm:mr-8"
            />
          </div>
          <div className="flex grow flex-col items-left justify-center space-y-8 w-full sm:w-[15rem] rounded-xl mt-4">
            <div className="flex flex-col space-y-2 m-4 sm:mr-4">
              <MDC.p className="text-sm text-muted-foreground">July 2024</MDC.p>
              <MDC.h4>TaskManager-AI</MDC.h4>
              <MDC.p className="text-muted-foreground">
                I find myself juggling a lot of balls and even still new ideas
                come up.
              </MDC.p>
              <MDC.p className="text-muted-foreground">
                So I built a simple task manager to help me keep track of the
                things I need to do.
              </MDC.p>
            </div>
            <Button
              asChild
              variant="outline"
              className="w-[8rem] place-self-end mt-10 mr-2 md:mr-10"
            >
              <Link href="https://taskmanager-ai.com">Check it out</Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
