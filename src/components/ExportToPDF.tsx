"use client";

import React from "react";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";

import { Button } from "./ui/button";
import { cn } from "../lib/utils"; // Import the cn function
import { Download } from "lucide-react";

interface ExportToPDFProps {
  elementId: string; // ID of the element to print
  className?: string; // Optional className prop
}

const ExportToPDF: React.FC<ExportToPDFProps> = ({ elementId, className }) => {
  const printDocument = () => {
    const input = document.getElementById(elementId);
    if (input) {
      html2canvas(input).then((canvas) => {
        const imgData = canvas.toDataURL("image/png");
        const pdf = new jsPDF({
          orientation: "portrait",
          unit: "px",
          format: "a4",
        });
        const imgProps = pdf.getImageProperties(imgData);
        const pdfWidth = pdf.internal.pageSize.getWidth();
        const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;
        pdf.addImage(imgData, "PNG", 0, 0, pdfWidth, pdfHeight);
        pdf.save("resume.pdf");
      });
    }
  };

  return (
    <Button size="icon" onClick={printDocument} className={cn(className)}>
      <Download className="" strokeWidth={1.75} />
    </Button>
  );
};

export default ExportToPDF;
