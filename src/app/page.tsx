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

import { MarkdownComponents as MDC } from "../components/markdowncomponents";

import bot_reading from "../../public/projects/logprobs/bot_reading.jpg";
import { Separator } from "@/components/ui/separator";

export default function Home() {
  return (
    <div className="">
      <Hero />
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
  );
}
