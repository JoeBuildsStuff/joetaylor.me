// import ResumePage from "@/components/resume";
// import ExportToPDF from "@/components/ExportToPDF";

// export default function Page() {
//   return (
//     <div className="relative max-w-6xl mx-8 mb-10">
//       {/* <ExportToPDF
//         elementId="resumePageContainer"
//         className="absolute top-[9rem] right-[1rem] "
//       /> */}
//       <ResumePage />
//     </div>
//   );
// }

import React from "react";
import Image from "next/image";
import { headers } from "next/headers";
import { Typography } from "@/lib/typography";

import { FileCheck2, Globe, Linkedin, SquarePen } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";

import { redirect } from "next/navigation";
import { createClient } from "@/utils/supabase/server";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import EditText from "@/components/edit-text";
import { edgeServerAppPaths } from "next/dist/build/webpack/plugins/pages-manifest-plugin";

interface Contact {
  name: string;
  title: string;
  phone: string;
  email: string;
  linkedin: string;
  website: string;
}

interface Education {
  degree: string;
  institution: string;
}

interface Certification {
  name: string;
  institution: string;
  location?: string;
  issued?: string;
  expiration?: string;
}

interface Technologies {
  [category: string]: string[];
}

interface Experience {
  title: string;
  company: string;
  duration: string;
  tags: string[];
  responsibilities: string[];
}

interface ResumeData {
  contact: Contact;
  education: Education[];
  certifications: Certification[];
  technologies: Technologies;
  summary: string;
  experience: Experience[];
}

interface Resume {
  id: string;
  data: ResumeData;
}

export default async function ResumePage() {
  const supabase = createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user || user.id !== "d8f274c4-5f4e-444b-9c67-df6b5c7da9d7") {
    return redirect("/resume");
  }

  const { data: resumes } = await supabase.from("resumes").select();
  const resume = resumes ? resumes[0] : null;

  if (!resume) {
    return <div>No resume data found</div>;
  }

  const {
    contact,
    education,
    certifications,
    technologies,
    summary,
    experience,
  } = resume.data;

  const { data: imageUrl } = await supabase.storage
    .from("public-images")
    .getPublicUrl("headshot.png");

  const updateField = (fieldName: string) => {
    return async (newValue: string) => {
      "use server";

      const supabase = createClient();
      const origin = headers().get("origin");

      const { data, error } = await supabase
        .from("resumes")
        .update({ data: { ...resume.data, [fieldName]: newValue } })
        .eq("id", resume.id)
        .select();

      if (error) {
        console.error(`Error updating ${fieldName}:`, error);
      }

      //   return redirect("/resume-edit");
    };
  };

  return (
    <div
      id="resumePageContainer"
      className="relative resume-container mx-4 flex-col"
    >
      {user && (
        <Button
          asChild
          variant="ghost"
          size="icon"
          className="absolute text-muted-foreground top-4 right-4"
        >
          <Link href="/resume">
            {" "}
            <FileCheck2 />
          </Link>
        </Button>
      )}
      <div className="flex flex-row h-[12rem] space-x-4 items-center justify-start">
        <Image
          src={imageUrl.publicUrl}
          alt="Head Shot"
          width={100}
          height={100}
          className="rounded-full w-[8rem] h-[8rem] lg:w-[10rem] lg:h-[10rem] lg:mr-10"
        />
        <div className="flex flex-col justify-center h-full">
          <EditText
            initialValue={contact.name}
            onSave={updateField("contact.name")}
            className="font-extrabold lg:text-5xl tracking-widest text-2xl"
          />
          <EditText
            initialValue={contact.title}
            onSave={updateField("contact.title")}
            className="mt-3 tracking-widest text-lg font-semibold"
          />
        </div>
      </div>
      <Separator className="mt-0 mb-4" />
      <div className="flex flex-col ">
        <div className="flex flex-col space-y-6 w-full bg-muted rounded-lg p-6 md:flex-row md:space-y-0 md:space-x-16 lg:hidden">
          {/* <SignedIn>
            <p className="text-base items-center flex">
              <div className="bg-primary rounded-sm p-1 mr-4">
                <Phone
                  className="w-4 h-4 text-primary-foreground fill-primary-foreground stroke-none"
                  // fill="#ffffff"
                  // strokeWidth={1}
                />
              </div>
              <span>{contact.phone}</span>
            </p>
            <p className="text-base m-0 items-center flex">
              <div className="bg-primary rounded-sm p-1 mr-4">
                <Mail className="w-4 h-4 text-background" />
              </div>
              <span className="">{contact.email}</span>
            </p>
          </SignedIn> */}
          <p className="text-base m-0 items-center flex">
            <div className="bg-primary rounded-sm p-1 mr-4 w-6 h-6">
              <Globe className="w-4 h-4 text-background " strokeWidth={1.5} />
            </div>
            <Link href={`https://${contact.website}`} className="underline">
              {contact.website}
            </Link>
          </p>
          <p className="text-base m-0 items-center flex">
            <div className="bg-primary rounded-sm p-1 mr-4">
              <Linkedin
                className="w-4 h-4 text-background fill-primary-foreground"
                strokeWidth={1}
              />
            </div>
            <Link href={`https://${contact.linkedin}`} className="underline">
              {contact.linkedin}
            </Link>
          </p>
        </div>
        <div className="flex flex-col lg:flex-row">
          <div className="hidden lg:block w-[22rem] h-full">
            <div className="bg-muted rounded-lg">
              <div className="flex flex-col space-y-6 w-full bg-muted rounded-lg p-4  ">
                <h3 className="text-2xl font-bold tracking-widest">CONTACT</h3>
                {/* <SignedIn>
                  <p className="text-base items-center flex">
                    <div className="bg-primary rounded-sm p-1 mr-4">
                      <Phone
                        className="w-4 h-4 text-primary-foreground fill-primary-foreground stroke-none"
                        // fill="#ffffff"
                        // strokeWidth={0}
                      />
                    </div>
                    <span>{contact.phone}</span>
                  </p>
                  <p className="text-base m-0 items-center flex">
                    <div className="bg-primary rounded-sm p-1 mr-4">
                      <Mail className="w-4 h-4 text-background" />
                    </div>
                    <span className="">{contact.email}</span>
                  </p>
                </SignedIn> */}
                <p className="text-base m-0 items-center flex">
                  <div className="bg-primary rounded-sm p-1 mr-4">
                    <Globe
                      className="w-4 h-4 text-background "
                      strokeWidth={1.5}
                    />
                  </div>
                  <Link
                    href={`https://${contact.website}`}
                    className="underline"
                  >
                    {contact.website}
                  </Link>
                </p>
                <p className="text-base m-0 items-center flex">
                  <div className="bg-primary rounded-sm p-1 mr-4">
                    <Linkedin
                      className="w-4 h-4 text-background fill-primary-foreground"
                      // fill="#ffffff"
                      strokeWidth={1}
                    />
                  </div>
                  <Link
                    href={`https://${contact.linkedin}`}
                    className="underline"
                  >
                    Linkedin.com/in/josephataylor
                  </Link>
                </p>
              </div>
            </div>

            <section className="">
              <div className="bg-muted rounded-lg  p-4 mt-2">
                <h3 className="text-2xl font-bold tracking-widest">
                  EDUCATION
                </h3>
                {education.map((edu: Education, index: number) => (
                  <div key={index} className="mt-8">
                    <EditText
                      initialValue={edu.degree}
                      onSave={updateField("edu.degree")}
                      className="leading-relaxed text-lg font-semibold tracking-wide"
                    />
                    <EditText
                      initialValue={edu.institution}
                      onSave={updateField("edu.institution")}
                      className="leading-relaxed text-lg mt-1 tracking-wide"
                    />
                  </div>
                ))}
              </div>
              <div className="bg-muted rounded-lg  p-4 mt-2">
                <h3 className="text-2xl font-bold tracking-widest">
                  CERTIFICATIONS
                </h3>

                <div className="grid grid-cols-1">
                  {certifications.map((cert: Certification, index: number) => (
                    <div key={index} className="mt-8">
                      <EditText
                        initialValue={cert.name}
                        onSave={updateField("cert.name")}
                        className="leading-relaxed text-lg font-semibold tracking-wide"
                      />
                      <EditText
                        initialValue={cert.institution}
                        onSave={updateField("cert.institution")}
                        className="leading-relaxed text-lg tracking-wide"
                      />
                      {/* <Typography.p>{cert.location}</Typography.p> */}
                      {/* {cert.issued && <Typography.p>Issued: {cert.issued}</Typography.p>}
            {cert.expiration && (
              <Typography.p>Expiration: {cert.expiration}</Typography.p>
            )} */}
                    </div>
                  ))}
                </div>
              </div>
            </section>

            <section className="border border-input rounded-lg p-4 mt-2">
              <h3 className="text-2xl font-bold tracking-widest">
                TECHNOLOGIES
              </h3>
              <div className="grid grid-cols-1">
                {Object.entries(technologies as Record<string, string[]>).map(
                  ([category, techs], index) => (
                    <div key={category} className="mt-8">
                      <EditText
                        initialValue={category}
                        onSave={updateField("category")}
                        className="text-xl font-semibold tracking-wide"
                      />
                      <Typography.ul className="">
                        {techs.map((tech, index) => (
                          <Typography.li key={index} className="pl-2">
                            <EditText
                              initialValue={tech}
                              onSave={updateField("tech")}
                              className=""
                            />
                          </Typography.li>
                        ))}
                      </Typography.ul>
                    </div>
                  )
                )}
              </div>
            </section>
          </div>
          <div className="w-full lg:w-2/3 lg:pl-8 ">
            <section className="rounded-lg p-2 mt-2">
              <h3 className="text-2xl font-bold tracking-widest">
                EXECUTIVE SUMMARY
              </h3>
              {/* <p className="leading-relaxed text-lg mt-4">{summary}</p> */}
              <EditText
                initialValue={summary}
                onSave={updateField("summary")}
                multiline
                className="leading-relaxed text-lg mt-4"
              />
            </section>

            <Separator className="my-4" />

            <section className=" rounded-lg p-2 mt-2">
              <h3 className="text-2xl font-bold tracking-widest">EXPERIENCE</h3>
              <div className="flex flex-row">
                <div className="flex flex-col mt-10 mr-6">
                  <Separator orientation="vertical" />
                </div>
                <div>
                  {experience.map((exp: Experience, index: number) => (
                    <div key={index} className="space-y-0">
                      <div className="relative mt-8">
                        <div className="mt-2 space-x-3">
                          {exp.tags.map((tag: string, tagIndex: number) => (
                            <Badge
                              //   variant="secondary"
                              key={tagIndex}
                              className="py-[5px] px-[12px]"
                            >
                              {tag}
                            </Badge>
                          ))}
                        </div>
                        <Typography.h4 className="text-lg mt-4 tracking-wide">
                          <div className="absolute rounded-full w-5 h-5 bg-background border-2 border-input top-[.3rem] -left-[2.2rem]"></div>
                          {/* <div className="absolute rounded-full w-3 h-3 bg-background top-[.52rem] -left-[1.9rem]"></div> */}
                        </Typography.h4>

                        <EditText
                          initialValue={exp.title}
                          onSave={updateField("exp.title")}
                          className="font-semibold text-lg mt-4 tracking-wide uppercase"
                        />
                        <div className="flex flex-row space-x-4 items-center justify-between mt-2 ">
                          <EditText
                            initialValue={exp.company}
                            onSave={updateField("exp.company")}
                            className="leading-relaxed text-lg"
                          />
                          <EditText
                            initialValue={exp.duration}
                            onSave={updateField("exp.duration")}
                            className="leading-relaxed text-base"
                          />
                        </div>

                        <Typography.ul className="mt-4">
                          {exp.responsibilities.map(
                            (resp: string, index: number) => (
                              <Typography.li className="pl-4" key={index}>
                                <EditText
                                  initialValue={resp}
                                  onSave={updateField("exp.responsibilities")}
                                  className=""
                                  multiline
                                />
                              </Typography.li>
                            )
                          )}
                        </Typography.ul>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </section>

            <div className="block lg:hidden">
              <section className="rounded-lg bg-muted p-4 mt-2">
                <h3 className="text-2xl font-bold tracking-widest">
                  EDUCATION
                </h3>
                {education.map((edu: Education, index: number) => (
                  <div key={index} className="mt-8">
                    <EditText
                      initialValue={edu.degree}
                      onSave={updateField("edu.degree")}
                      className="leading-relaxed text-lg font-semibold tracking-wide"
                    />
                    <EditText
                      initialValue={edu.institution}
                      onSave={updateField("edu.institution")}
                      className="leading-relaxed text-lg mt-1 tracking-wide"
                    />
                  </div>
                ))}
                <Separator className="my-6" />
                <h3 className="text-2xl font-bold tracking-widest">
                  CERTIFICATIONS
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2">
                  {certifications.map((cert: Certification, index: number) => (
                    <div key={index} className="mt-8">
                      <EditText
                        initialValue={cert.name}
                        onSave={updateField("cert.name")}
                        className="leading-relaxed text-lg font-semibold tracking-wide"
                      />
                      <EditText
                        initialValue={cert.institution}
                        onSave={updateField("cert.institution")}
                        className="leading-relaxed text-lg tracking-wide"
                      />
                      {/* <Typography.p>{cert.location}</Typography.p> */}
                      {/* {cert.issued && <Typography.p>Issued: {cert.issued}</Typography.p>}
            {cert.expiration && (
              <Typography.p>Expiration: {cert.expiration}</Typography.p>
            )} */}
                    </div>
                  ))}
                </div>
              </section>

              <section className="rounded-lg border-input border p-4 mt-2">
                <h3 className="text-2xl font-bold tracking-widest">
                  TECHNOLOGIES
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2">
                  {Object.entries(technologies as Record<string, string[]>).map(
                    ([category, techs], index) => (
                      <div key={category} className="mt-8">
                        <EditText
                          initialValue={category}
                          onSave={updateField("category")}
                          className="text-xl font-semibold tracking-wide"
                        />
                        <Typography.ul className="">
                          {techs.map((tech, index) => (
                            <Typography.li key={index} className="pl-2">
                              <EditText
                                initialValue={tech}
                                onSave={updateField("tech")}
                                className=""
                              />
                            </Typography.li>
                          ))}
                        </Typography.ul>
                      </div>
                    )
                  )}
                </div>
              </section>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
