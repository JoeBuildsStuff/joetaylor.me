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

export default function Page() {
  return (
    <div className="mt-8 mx-4">
      <Card className="w-[24rem]">
        <CardHeader>
          <CardTitle>Utilizing Logprobs</CardTitle>
          <CardDescription>
            What utility is there for investigating token proabbility in an LLM
            response?
          </CardDescription>
        </CardHeader>
        <CardContent>
          After comming across this posting in the OpenAI Cookbook, I had on the
          todo list to check this approach out. Then at work the topic of
          detection for possible LLM hallucinations came up. I said, we you know
          you can use logprobs... after having said that I needed to actually
          build something to finally satisfy my own curiousty.
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
