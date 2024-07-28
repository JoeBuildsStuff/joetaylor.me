"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { SquarePen, Wand, Wand2 } from "lucide-react";
import { cn } from "@/lib/utils";

interface EditTextProps {
  initialValue: string;
  onSave: (newValue: string) => void;
  multiline?: boolean;
  className?: string;
  flextDirection?: "row" | "column";
}

export default function EditText({
  initialValue,
  onSave,
  multiline = false,
  className = "",
  flextDirection = "column",
}: EditTextProps) {
  const [value, setValue] = useState(initialValue);
  const [isEditMode, setIsEditMode] = useState(false);

  const handleSave = () => {
    onSave(value);
    setIsEditMode(false);
  };

  const handleGenerate = () => {
    console.log("Generate text with AI");
  };

  return (
    <div className="">
      {isEditMode ? (
        <>
          <div className="flex flex-col space-y-3 xl:w-full">
            {multiline ? (
              <Textarea
                value={value}
                onChange={(e) => setValue(e.target.value)}
              />
            ) : (
              <Input value={value} onChange={(e) => setValue(e.target.value)} />
            )}
            <div className="flex flex-row space-x-3 space-y-0  w-full justify-end">
              <Input placeholder="Make this more..." />
              <Button variant="outline" onClick={handleGenerate}>
                <Wand2 className="h-5 w-5 mr-3" /> Generate
              </Button>
              <Button variant="destructive" onClick={handleSave}>
                Save
              </Button>
            </div>
          </div>
        </>
      ) : (
        <div className="group relative">
          <p
            className={cn(
              "", //classname for default
              //   "group-hover:bg-muted transition-colors duration-100 rounded-lg group-hover:p-4 ",
              className // classname from parent
            )}
          >
            {value}
          </p>
          <Button
            onClick={() => setIsEditMode(true)}
            variant="link"
            size="icon"
            className="absolute -top-4 -left-8 text-blue-700 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
          >
            <SquarePen className="h-6 w-6" />
          </Button>
          <div className="absolute top-0 left-0  w-full h-full group-hover:bg-blue-500 opacity-0 group-hover:opacity-20 transition-opacity duration-300 rounded-lg "></div>
        </div>
      )}
    </div>
  );
}
