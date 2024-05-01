import Link from "next/link";

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

export default function Page() {
  return (
    <div className="max-w-6xl mx-8 mb-10">
      <div className="my-10">
        <h1 className="leading-tight lg::leading-snug font-black text-5xl ">
          Some Projects.
        </h1>
        <p className="mt-3 leading-8 text-xl text-muted-foreground">
          Some of the things I&apos;ve been working on.
        </p>
      </div>
      <Separator className="mb-8" />
      <Card className="w-[24rem] border-none shadow-none">
        <CardHeader>
          <CardTitle>Utilizing Logprobs</CardTitle>
          <CardDescription>
            What utility is there for investigating token proabbility in an LLM
            response?
          </CardDescription>
        </CardHeader>
        <CardContent>
          I was looking through the OpenAI Cookbook and found a recipe for using
          logprobs to detect hallucinations in LLM responses. I thought this was
          interesting and wanted to check it out.
        </CardContent>
        <CardFooter className="flex justify-end">
          <Button asChild variant="outline" size="icon" className="">
            <div className="flex items-center">
              <Link href="/projects/logprobs">
                <ArrowRightFromLine className="w-5 h-5" />
              </Link>
            </div>
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}
