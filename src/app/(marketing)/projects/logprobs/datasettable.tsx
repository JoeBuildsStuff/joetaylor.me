export interface QA {
  question: string;
  id: string;
  answers?: { text: string; answer_start: number }[];
  is_impossible: boolean;
}

export interface Paragraph {
  context: string;
  qas: QA[];
}

export interface Article {
  title: string;
  paragraphs: Paragraph[];
}

export interface Dataset {
  version: string;
  data: Article[];
}

import React from "react";
import { Textarea } from "@/components/ui/textarea";
import {
  Card,
  CardContent,
  CardDescription,
  CardTitle,
  CardHeader,
} from "@/components/ui/card";

interface Props {
  dataset: Dataset;
}

const DatasetTable: React.FC<Props> = ({ dataset }) => {
  let rowIndex = 0;

  return (
    <Card>
      <CardHeader>
        <CardTitle>Dataset</CardTitle>
        <CardDescription>This is the full dataset</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="overflow-x-auto border border-muted-foreground/20 rounded-md">
          <table className="min-w-full ">
            <thead className="border-b">
              <tr>
                <th
                  scope="col"
                  className="px-2 py-2 text-left text-xs font-medium uppercase tracking-wider text-muted-foreground"
                >
                  #
                </th>
                <th
                  scope="col"
                  className="px-2 py-2 text-left text-xs font-medium  uppercase tracking-wider text-muted-foreground"
                >
                  Title
                </th>
                <th
                  scope="col"
                  className="px-3 py-2 text-left text-xs font-medium  uppercase tracking-wider text-muted-foreground"
                >
                  Context
                </th>
                <th
                  scope="col"
                  className="px-2 py-2 text-left text-xs font-medium  uppercase tracking-wider text-muted-foreground"
                >
                  Question
                </th>
                <th
                  scope="col"
                  className="px-4 py-2 text-left text-xs font-medium uppercase tracking-wider text-muted-foreground"
                >
                  Relevant
                </th>
                <th
                  scope="col"
                  className="px-2 py-2 text-left text-xs font-medium uppercase tracking-wider text-muted-foreground"
                >
                  Answer
                </th>
              </tr>
            </thead>
            <tbody className="">
              {dataset.data.map((article: Article) =>
                article.paragraphs.map((paragraph: Paragraph) =>
                  paragraph.qas.map((qa: QA) => {
                    rowIndex++; // Increment row index for each row
                    return (
                      <tr key={qa.id} className="border-b">
                        <td className="px-2 py-2 text-left text-sm">
                          {rowIndex}
                        </td>
                        <td className="px-2 py-2 text-left text-sm">
                          {article.title}
                        </td>
                        <td className="py-2 text-left text-sm w-[30rem]">
                          <Textarea
                            value={paragraph.context}
                            className="text-sm border-none"
                          />
                        </td>
                        <td className="px-2 py-2 text-left text-sm">
                          {qa.question}
                        </td>
                        <td className="px-4 py-2 text-left text-sm">
                          {qa.is_impossible ? "No" : "Yes"}
                        </td>
                        <td className="px-2 py-2 text-left text-sm">
                          {qa.answers?.[0]?.text || "No answer"}
                        </td>
                      </tr>
                    );
                  })
                )
              )}
            </tbody>
          </table>
        </div>
      </CardContent>
    </Card>
  );
};

export default DatasetTable;
