import ResumePage from "@/components/resume";
import ExportToPDF from "@/components/ExportToPDF";

export default function Page() {
  return (
    <div className="relative max-w-6xl mx-8 mb-10">
      {/* <ExportToPDF
        elementId="resumePageContainer"
        className="absolute top-[9rem] right-[1rem] "
      /> */}
      <ResumePage />
    </div>
  );
}
