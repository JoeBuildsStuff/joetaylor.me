import {
  ClerkProvider,
  SignInButton,
  SignedIn,
  SignedOut,
  UserButton,
} from "@clerk/nextjs";

import React from "react";
import Image from "next/image";

import { Typography } from "../lib/typography";
import resumeData from "../data/resume.json";

import headshot from "../../public/headshot.png";
import { Globe, Linkedin, Mail, Phone } from "lucide-react";
import { Separator } from "./ui/separator";
import { Badge } from "./ui/badge";
import Link from "next/link";

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

interface ResumePageProps {
  resumeData: ResumeData;
}

const ResumePage = () => {
  const {
    contact,
    education,
    certifications,
    technologies,
    summary,
    experience,
  } = resumeData;

  return (
    <div id="resumePageContainer" className="resume-container mr-4 flex-col">
      <div className="flex flex-row h-[12rem] space-x-4 items-center justify-start">
        <Image
          src={headshot}
          alt="Head Shot"
          className="rounded-full w-[8rem] h-[8rem] lg:w-[10rem] lg:h-[10rem] lg:mr-10"
        />
        <div className="flex flex-col justify-center h-full">
          <Typography.h1 className="tracking-widest text-2xl">
            {contact.name}
          </Typography.h1>
          <Typography.h4 className="mt-3 tracking-widest text-lg">
            {contact.title}
          </Typography.h4>
        </div>
      </div>
      <Separator className="mt-0 mb-4" />
      <div className="flex flex-col ">
        <div className="flex flex-col space-y-6 w-full bg-muted rounded-lg p-6 md:flex-row md:space-y-0 md:justify-between lg:hidden">
          <SignedIn>
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
          </SignedIn>
          <p className="text-base m-0 items-center flex">
            <div className="bg-primary rounded-sm p-1 mr-4">
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
                <SignedIn>
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
                </SignedIn>
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
                    <p className="leading-relaxed text-lg tracking-wide font-semibold">
                      {edu.degree}
                    </p>
                    <p className="leading-relaxed text-lg mt-1 tracking-wide">
                      {edu.institution}
                    </p>
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
                      <p className="leading-relaxed text-lg font-semibold tracking-wide">
                        {cert.name}
                      </p>
                      <p className="leading-relaxed text-lg mt-1 tracking-wide">
                        {cert.institution}
                      </p>
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
                {Object.entries(technologies).map(
                  ([category, techs]: [string, string[]], index: number) => (
                    <div key={category} className="mt-8">
                      <Typography.h4 className="tracking-wide">
                        {category}
                      </Typography.h4>
                      <Typography.ul className="">
                        {techs.map((tech: string, index: number) => (
                          <Typography.li key={index} className="pl-2">
                            {tech}
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
            <section className=" rounded-lg p-2 mt-2">
              <h3 className="text-2xl font-bold tracking-widest">
                EXECUTIVE SUMMARY
              </h3>
              <p className="leading-relaxed text-lg mt-4">{summary}</p>
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
                          {exp.title}
                        </Typography.h4>

                        <div className="flex flex-row space-x-4 items-center justify-between mt-2 ">
                          <p className="leading-relaxed text-lg">
                            {exp.company}
                          </p>
                          {/* <span className="text-xl"> {"|"}</span> */}
                          <p className="leading-relaxed text-base">
                            {exp.duration}
                          </p>
                        </div>

                        <Typography.ul className="mt-4">
                          {exp.responsibilities.map(
                            (resp: string, index: number) => (
                              <Typography.li className="pl-4" key={index}>
                                {resp}
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
                    <p className="leading-relaxed text-lg tracking-wide font-semibold">
                      {edu.degree}
                    </p>
                    <p className="leading-relaxed text-lg mt-1 tracking-wide">
                      {edu.institution}
                    </p>
                  </div>
                ))}
                <Separator className="my-6" />
                <h3 className="text-2xl font-bold tracking-widest">
                  CERTIFICATIONS
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2">
                  {certifications.map((cert: Certification, index: number) => (
                    <div key={index} className="mt-8">
                      <p className="leading-relaxed text-lg font-semibold tracking-wide">
                        {cert.name}
                      </p>
                      <p className="leading-relaxed text-lg mt-1 tracking-wide">
                        {cert.institution}
                      </p>
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
                  {Object.entries(technologies).map(
                    ([category, techs]: [string, string[]], index: number) => (
                      <div key={category} className="mt-8">
                        <Typography.h4 className="tracking-wide">
                          {category}
                        </Typography.h4>
                        <Typography.ul className="">
                          {techs.map((tech: string, index: number) => (
                            <Typography.li key={index}>{tech}</Typography.li>
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
};

export default ResumePage;
