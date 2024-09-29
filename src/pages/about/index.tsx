/* eslint-disable @next/next/no-img-element */
import MarkdownRenderer from "@/components/MarkdownRenderer";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import aboutMd from "@/docs/about.md";
import { Github, Linkedin } from "lucide-react";
import Link from "next/link";
import React from "react";

const About = () => {
  const devs = [
    {
      name: "Annie Fernandez",
      linkedIn: "https://www.linkedin.com/in/annie-fernandez-cs",
      image: "/images/annie.jpg",
      github: "https://github.com/annie-fernandez",
    },
    {
      name: "Anthony Fernandez",
      linkedIn: "https://www.linkedin.com/in/anthony-fernandez-556622201",
      image: "/images/mugshot.jpg",
      github: "https://github.com/anthony-fdez",
    },
    {
      name: "Alejandro Vera",
      linkedIn: "https://www.linkedin.com/in/alejandrovera09",
      image: "/images/ale.jpg",
      github: "https://github.com/AlejandroV01",
    },
    {
      name: "Alfredo Bidopia",
      linkedIn: "https://www.linkedin.com/in/alfredo-bidopia",
      image: "/images/leadpaintstare.jpg",
      github: "https://github.com/Abidopia",
    },
  ];

  const shuffledDevs = devs.sort(() => Math.random() - 0.5);

  return (
    <div className="w-full flex flex-col items-center gap-5 p-4">
      <Link href={"/"} className="flex items-center gap-1 mr-auto z-40">
        <img src="/images/Logo.png" alt="" className="w-[55px]" />
        <span className="font-bold">Quiz Sensei</span>
      </Link>
      <div className="w-full flex flex-col items-center gap-5 max-w-[1000px]">
        <div className="w-full">
          <MarkdownRenderer markdown={"## Meet the Team"} />
        </div>
        <div className="flex flex-wrap w-full gap-5 justify-center my-5">
          {shuffledDevs.map((dev, index) => {
            return (
              <Card
                key={index}
                className="w-full max-w-[350px] p-4 flex flex-col gap-2"
              >
                <Avatar className="rounded w-full h-full aspect-square object-fill max-h-[300px] max-w-[300px]">
                  <AvatarImage
                    src={dev.image}
                    alt={dev.name}
                    className={"aspect-square max-h-[300px] max-w-[300px]"}
                  />
                </Avatar>
                <h4 className="font-semibold text-lg">{dev.name}</h4>
                <div className="flex items-center gap-2">
                  <a
                    href={dev.linkedIn}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <Badge className="flex items-center gap-1 w-fit text-white">
                      <Linkedin size={14} />
                      <span>LinkedIn</span>
                    </Badge>
                  </a>
                  <a
                    href={dev.github}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <Badge className="flex items-center gap-1 w-fit bg-neutral-800 text-white hover:bg-neutral-900">
                      <Github size={14} />
                      <span>GitHub</span>
                    </Badge>
                  </a>
                </div>
              </Card>
            );
          })}
        </div>
        <div className="mt-10">
          <MarkdownRenderer markdown={aboutMd} />
        </div>
      </div>
    </div>
  );
};

export default About;
