"use client";
import Link from "next/link";

//import next stuff
import Image from "next/image";
import heroImageDark from "../../public/hero-dark.png";
import heroImageLight from "../../public/hero-light.png";

//import custom stuff
import { Hero } from "@/components/pages/landing/hero";
import { Partners } from "@/components/pages/landing/partners";
import { Button } from "@/components/ui/button";

import { Badge } from "@/components/ui/badge";

import { Separator } from "@/components/ui/separator";

import { MarkdownComponents as MDC } from "@/components/markdowncomponents";

import bot_reading from "../../public/projects/logprobs/bot_reading.png";
import bot_writing from "../../public/projects/meetingnotes-ai/bot_writing.png";
import bot_job from "../../public/projects/jobfinder-ai/bot_job.png";
import bot_chat from "../../public/projects/chatapp-ai/bot_chat.png";
import bot_blog from "../../public/projects/socialpost-ai/bot_blog.png";
import bot_task from "../../public/projects/taskmanger-ai/bot_task.png";
import bot_art from "../../public/projects/createart-ai/bot_createart.png";
import wysiwyg from "../../public/projects/wysiwyg-ai/wysiwyg.png";

import wysiwyg_ai from "../../public/projects/wysiwyg-ai/wysiwyg_ai.png";

export default function Home() {
  return (
    <div className="">
      <Hero />

      <div className="max-w-6xl mx-4 sm:mx-8 mb-10 mt-10">
        <div className="my-10">
          <h1 className="leading-tight lg::leading-snug font-black text-3xl lg:text-5xl  ">
            Some Projects.
          </h1>
          <p className="mt-3 leading-8 text-xl text-muted-foreground">
            Some of the things I&apos;ve been working on. Tinkering with LLMs
            and building tools to help me do it.
          </p>
          <p className="mt-3 leading-8 text-xl text-muted-foreground">
            The following projects were primarily built with:
          </p>
          <ul className="mt-3 list-disc list-inside space-y-2 text-muted-foreground">
            <li>Frontend: Next.js, Tailwind CSS, Shadcn/ui, Lucide Icons</li>
            <li>Hosting: Vercel</li>
            <li>Backend: Supabase (BaaS)</li>
            <li>Authentication: OAuth (GitHub and Google)</li>
            <li>AI/ML: OpenAI, Anthropic, Meta LLM models</li>
            <li>
              Speech-to-Text: Whisper, Deepgram (for diarization and streaming)
            </li>
            <li>GPU Compute: RunPod, GCP, Azure (mainly T4s)</li>
            <li>
              Serverless: GCP Functions (for microservices beyond Vercel&apos;s
              limits)
            </li>
          </ul>
        </div>

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
                <MDC.p className="text-sm text-muted-foreground">
                  Jan 2024
                </MDC.p>
                <MDC.h4>Meeting Notes AI</MDC.h4>
                <MDC.p className="text-muted-foreground">
                  I wanted to create a system that could trascribe audio to text
                  and then summarize the meeting notes.
                </MDC.p>
                <MDC.p className="text-muted-foreground">
                  Lots of learnings across speech to text, and audio embeddings.
                </MDC.p>
                <div className="flex flex-wrap gap-2">
                  <Badge>Streaming Transcription</Badge>
                  <Badge>Speaker Diarization</Badge>
                  <Badge>Audio Embeddings</Badge>
                  <Badge>Chat Interface</Badge>
                  <Badge>Meeting Summarization</Badge>
                  <Badge>Text Semantic Classification</Badge>
                </div>
              </div>
              <Button
                asChild
                variant="outline"
                className="w-[8rem] place-self-end mt-10 mr-2 md:mr-10"
              >
                <Link href="https://meetingnotes-ai.com">Live Site</Link>
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
                <MDC.p className="text-sm text-muted-foreground">
                  May 2024
                </MDC.p>
                <MDC.h4>Token Probabilities</MDC.h4>
                <MDC.p className="text-muted-foreground">
                  A little widget to visualize LLM responses and their token
                  probabilities.
                </MDC.p>
                <MDC.p className="text-muted-foreground">
                  Then, utilizing token probabilities to defend against
                  responses that appear to contain hallucinations.
                </MDC.p>
                <div className="flex flex-wrap gap-2">
                  <div className="flex flex-wrap gap-2">
                    <Badge>Token Probabilities</Badge>
                    <Badge>Token Classification</Badge>
                    <Badge>Preplexity Scores</Badge>
                    <Badge>Chat Interface</Badge>
                    <Badge>Dual Agent</Badge>
                    <Badge>Synthetic Dataset</Badge>
                  </div>
                </div>
              </div>
              <Button
                asChild
                variant="outline"
                className="w-[8rem] place-self-end mt-10 mr-2 md:mr-10"
              >
                <Link href="/projects/logprobs">Live Site</Link>
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
                <MDC.p className="text-sm text-muted-foreground">
                  May 2024
                </MDC.p>
                <MDC.h4>JobFinder-AI</MDC.h4>
                <MDC.p className="text-muted-foreground">
                  A simple tool to find jobs that match your skills and
                  interests.
                </MDC.p>
                <MDC.p className="text-muted-foreground">
                  Using job postings and resumes to match candidates to jobs.
                </MDC.p>
                <div className="flex flex-wrap gap-2">
                  <div className="flex flex-wrap gap-2">
                    <Badge>Web Scraping</Badge>
                    <Badge>JSON Mode</Badge>
                    <Badge>LLM Data Extraction</Badge>
                    <Badge>Multi-Agent</Badge>
                    <Badge>Text Embeddings</Badge>
                    <Badge>Embedding Search</Badge>
                    <Badge>Resume Generation</Badge>
                  </div>
                </div>
              </div>
              <Button
                asChild
                variant="outline"
                className="w-[8rem] place-self-end mt-10 mr-2 md:mr-10"
              >
                <Link href="https://jobfinder-ai.com">Live Site</Link>
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
                <MDC.p className="text-sm text-muted-foreground">
                  June 2024
                </MDC.p>
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
                  So I caved and built an interface to use the API. Challenge
                  was to complete it in 1 day.
                </MDC.p>
                <div className="flex flex-wrap gap-2">
                  <div className="flex flex-wrap gap-2">
                    <Badge>1 Day Challenge</Badge>
                    <Badge>Tool Usage</Badge>
                    <Badge>LLM Web Search</Badge>
                    <Badge>Multi File Chat</Badge>
                  </div>
                </div>
              </div>
              <Button
                asChild
                variant="outline"
                className="w-[8rem] place-self-end mt-10 mr-2 md:mr-10"
              >
                <Link href="https://chatapp-ai.com">Live Site</Link>
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
            <div className="flex grow flex-col items-left justify-center space-y-8 w-full sm:w-[15rem] rounded-xl mt-4">
              <div className="flex flex-col space-y-2 m-4 sm:mr-4">
                <MDC.p className="text-sm text-muted-foreground">
                  July 2024
                </MDC.p>
                <MDC.h4>SocialPost-AI</MDC.h4>
                <MDC.p className="text-muted-foreground">
                  Writing blogs takes a lot of time. This tool aided in drafting
                  and editing the posts.
                </MDC.p>
                <MDC.p className="text-muted-foreground">
                  The motifation came when I spent 3 hours using chat to write
                  the blog about building chat.
                </MDC.p>
                <MDC.p className="text-muted-foreground">
                  Perhaps we can imagine a better interface?
                </MDC.p>
                <div className="flex flex-wrap gap-2">
                  <div className="flex flex-wrap gap-2">
                    <Badge>LLM Workflow</Badge>
                    <Badge>Gen AI Suggestions</Badge>
                    <Badge>User Critique</Badge>
                    <Badge>Human in the Loop</Badge>
                  </div>
                </div>
              </div>
              <Button
                asChild
                variant="outline"
                className="w-[8rem] place-self-end mt-10 mr-2 md:mr-10"
              >
                <Link href="https://socialpost-ai.com">Live Site</Link>
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
                <MDC.p className="text-sm text-muted-foreground">
                  July 2024
                </MDC.p>
                <MDC.h4>TaskManager-AI</MDC.h4>
                <MDC.p className="text-muted-foreground">
                  I find myself juggling a lot of balls and even still new ideas
                  come up.
                </MDC.p>
                <MDC.p className="text-muted-foreground">
                  So I built a simple task manager to help me keep track of the
                  things I need to do.
                </MDC.p>
                <div className="flex flex-wrap gap-2">
                  <div className="flex flex-wrap gap-2">
                    <Badge>LLM Project Manager</Badge>
                    <Badge>Tool Calling</Badge>
                    <Badge>Chat Interface</Badge>
                    <Badge>WYSIWYG LLM Editing</Badge>
                  </div>
                </div>
              </div>
              <Button
                asChild
                variant="outline"
                className="w-[8rem] place-self-end mt-10 mr-2 md:mr-10"
              >
                <Link href="https://taskmanager-ai.com">Live Site</Link>
              </Button>
            </div>
          </div>
          <div className="flex flex-col sm:flex-row h-full ml-0 sm:ml-8 grow border border-primary/20 rounded-xl p-2 pb-4">
            <div className="flex justify-center sm:block">
              <Image
                src={bot_art}
                alt="Thumbnail"
                width={200}
                height={200}
                className="overflow-hidden shadow-md bg-background h-[15rem] w-[15rem] border border-primary/20 rounded-xl mt-4 sm:-ml-10 sm:mr-8"
              />
            </div>
            <div className="flex grow flex-col items-left justify-center space-y-8 w-full sm:w-[15rem] rounded-xl mt-4">
              <div className="flex flex-col space-y-2 m-4 sm:mr-4">
                <MDC.p className="text-sm text-muted-foreground">
                  Aug 2024
                </MDC.p>
                <MDC.h4>CreateArt-AI</MDC.h4>
                <MDC.p className="text-muted-foreground">
                  I really wanted to begin integrating images into my projects.
                </MDC.p>
                <MDC.p className="text-muted-foreground">
                  So I built a simple tool using the Stability AI API to
                  generate images.
                </MDC.p>
                <div className="flex flex-wrap gap-2">
                  <div className="flex flex-wrap gap-2">
                    <Badge>Gen AI</Badge>
                    <Badge>Image Generation</Badge>
                    <Badge>Aspect Ratio</Badge>
                    <Badge>Image Editing</Badge>
                    <Badge>Image Prompting</Badge>
                  </div>
                </div>
              </div>
              <Button
                asChild
                variant="outline"
                className="w-[8rem] place-self-end mt-10 mr-2 md:mr-10"
              >
                <Link href="https://createart-ai.com">Live Site</Link>
              </Button>
            </div>
          </div>
          <div className="flex flex-col sm:flex-row h-full ml-0 sm:ml-8 grow border border-primary/20 rounded-xl p-2 pb-4">
            <div className="flex justify-center sm:block">
              <Image
                src={wysiwyg}
                alt="Thumbnail"
                width={200}
                height={200}
                className="overflow-hidden shadow-md bg-background h-[15rem] w-[15rem] border border-primary/20 rounded-xl mt-4 sm:-ml-10 sm:mr-8"
              />
            </div>
            <div className="flex grow flex-col items-left justify-center space-y-8 w-full sm:w-[15rem] rounded-xl mt-4">
              <div className="flex flex-col space-y-2 m-4 sm:mr-4">
                <MDC.p className="text-sm text-muted-foreground">
                  Aug 2024
                </MDC.p>
                <MDC.h4>WYSIWYG-AI</MDC.h4>
                <MDC.p className="text-muted-foreground">
                  Across my previous projects I had needed more features native
                  to a rich text editor.
                </MDC.p>
                <MDC.p className="text-muted-foreground">
                  And I was never happy with what I ended up with, so I built a
                  simple WYSIWYG editor that I can continue to improve.
                </MDC.p>
                <MDC.p className="text-muted-foreground">
                  This editor will be what we can drop into other projects when
                  needed.
                </MDC.p>
                <div className="flex flex-wrap gap-2">
                  <div className="flex flex-wrap gap-2">
                    <Badge>WYSIWYG</Badge>
                    <Badge>Rich Text</Badge>
                    <Badge>Gen AI Text Completion</Badge>
                    <Badge>LLM Editing</Badge>
                  </div>
                </div>
              </div>
              <Button
                asChild
                variant="outline"
                className="w-[8rem] place-self-end mt-10 mr-2 md:mr-10"
              >
                <Link href="https://wysiwyg-ai.com">Live Site</Link>
              </Button>
            </div>
          </div>
        </div>
        {/* <div className="m-4 p-4 border border-border rounded-3xl">
        <Image
          src={heroImageLight}
          alt="Hero"
          priority
          className="rounded-xl dark:hidden"
        />
        <Image
          src={heroImageDark}
          alt="Hero"
          priority
          className="rounded-xl dark:block hidden"
        />
      </div> */}
        {/* <Partners />*/}

        {/* <div className="px-6 md:px-8 mb-24 mt-20 md:mt-10">
        <div className="mx-3 space-y-4 lg:space-y-5 max-w-md md:max-w-2xl lg:max-w-3xl">
          <h1 className="leading-tight lg::leading-snug font-black text-4xl md:text-3xl">
            Some Projects.
          </h1>
          <p className="leading-normal text-xl text-muted-foreground">
            Some of the things I&apos;ve been working on. Right now, we just got
            the single project, but we will be adding stuff weekly.
          </p>
        </div>
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
                <MDC.p className="text-sm text-muted-foreground">
                  May 2024
                </MDC.p>
                <MDC.h4>Token Probabilities</MDC.h4>
                <MDC.p className="text-muted-foreground">
                  A little widget to visualize LLM responses and their token
                  probabilities.
                </MDC.p>
                <MDC.p className="text-muted-foreground">
                  Then, utilizing token probabilities to defend against
                  responses that appear to contain hallucinations.
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
      </div> */}
      </div>
    </div>
  );
}
