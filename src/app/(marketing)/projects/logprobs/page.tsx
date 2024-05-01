import Image from "next/image";
import Link from "next/link";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

import { Chatbot } from "@/app/(marketing)/projects/logprobs/chatbot";
import DatasetTable from "@/app/(marketing)/projects/logprobs/datasettable";

import rawDataSet from "@/app/(marketing)/projects/logprobs/data.json";
import { Dataset } from "@/app/(marketing)/projects/logprobs/datasettable";
import Demonstration from "@/app/(marketing)/projects/logprobs/intro";

export default function Home() {
  return (
    <main>
      <div className="relative mx-4 mt-2">
        <Tabs defaultValue="intro" className="">
          <TabsList>
            <TabsTrigger value="intro">Intro</TabsTrigger>
            <TabsTrigger value="dataset">Dataset</TabsTrigger>
            <TabsTrigger value="guardrails">Demonstration</TabsTrigger>
          </TabsList>
          <TabsContent value="intro">
            <Demonstration />
          </TabsContent>
          <TabsContent value="dataset">
            <DatasetTable dataset={rawDataSet as Dataset} />
          </TabsContent>
          <TabsContent value="guardrails">
            <Chatbot />
          </TabsContent>
        </Tabs>
      </div>
    </main>
  );
}
