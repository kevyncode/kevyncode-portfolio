import "@/styles/globals.css";
import Head from "next/head";
import Image from "next/image";
import { useEffect, useState } from "react";
import imagePerfil from "@/assets/fotoperfil.svg";
import SectionsBar from "@/components/SectionsBar";
import linkedinIcon from "@/assets/linkedinIcon.svg";
import githubIcon from "@/assets/githubIcon.svg";
import twitterIcon from "@/assets/twitterIcon.svg";
import emailIcon from "@/assets/emailIcon.png";
import { Analytics } from "@vercel/analytics/react";
import DecryptedText from "@/components/DecryptedText";
import Particles from "@/components/Particles";

export default function Home() {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    // Garantir que o componente seja renderizado apenas no cliente
    setIsClient(true);
  }, []);

  return (
    <>
      <Head>
        <title>Kevyn Rodrigues | Portfolio</title>
      </Head>
      <div className="relative flex flex-col items-center min-h-screen p-4 overflow-hidden">
        {/* Particles como background */}
        {isClient && (
          <div className="absolute inset-0 -z-10">
            <Particles
              particleColors={["#ffffff", "#ffffff", "##ffffff"]}
              particleCount={200}
              particleSpread={10}
              speed={0.1}
              particleBaseSize={100}
              moveParticlesOnHover={true}
              alphaParticles={false}
              disableRotation={false}
            />
          </div>
        )}

        {/* Conteúdo principal */}
        <div className="relative z-10 flex flex-col items-center justify-center w-full sm:w-3/4 lg:w-2/3 p-4">
          <div className="relative w-40 h-40 sm:w-48 sm:h-48 lg:w-56 lg:h-56 overflow-hidden">
            <Image
              src={imagePerfil}
              alt="Kevyn Rodrigues"
              layout="fill"
              objectFit="cover"
            />
          </div>
        </div>
        <div className="relative z-10 flex flex-col items-center justify-center w-full sm:w-3/4 lg:w-2/3 p-4 mt-4">
          <h1 className="text-3xl sm:text-4xl lg:text-4xl font-bold text-center">
            <DecryptedText text="Kevyn Rodrigues" />
          </h1>
          <p className="text-base sm:text-lg lg:text-l text-zinc-400 mt-2 text-center">
            <DecryptedText text="Software Engineer Student" />
          </p>
        </div>
        <div className="relative z-10 flex flex-col w-full sm:w-3/4 lg:w-2/3 p-4 mt-4">
          <h2 className="text-2xl sm:text-3xl lg:text-2xl font-bold">
            <DecryptedText text="About Me" />
          </h2>
          <p className="text-base sm:text-lg lg:text-l text-justify text-zinc-400 mt-6">
            <DecryptedText text="My name is Kevyn Rodrigues, and I am passionate about software development. Currently, I am studying Software Engineering at Jala University, but I have already gained experience that has prepared me to tackle technical challenges and collaborate on innovative projects." />
          </p>
        </div>
        <div className="relative z-10 w-full sm:w-3/4 lg:w-2/3 mt-4 rounded-lg">
          <SectionsBar />
        </div>
        <div className="relative z-10 flex flex-col w-full sm:w-3/4 lg:w-2/3 p-2 mt-4">
          <h2 className="text-lg sm:text-lg lg:text-lg font-bold">
            <DecryptedText text="Connect With Me" />
          </h2>
          <div className="flex flex-col gap-4 mt-4">
            <a
              href="https://www.linkedin.com/in/kevyncode"
              target="_blank"
              rel="noopener noreferrer"
            >
              <button className="w-full flex items-center px-4 py-2 bg-blue-500 text-white rounded-lg transform transition-transform duration-300 hover:scale-105 hover:bg-blue-600">
                <Image
                  src={linkedinIcon}
                  alt="LinkedIn"
                  width={24}
                  height={24}
                  className="mr-2"
                />
                <DecryptedText text="LinkedIn" />
              </button>
            </a>
            <a
              href="https://github.com/kevyncode"
              target="_blank"
              rel="noopener noreferrer"
            >
              <button className="w-full flex items-center px-4 py-2 bg-gray-800 text-white rounded-lg transform transition-transform duration-300 hover:scale-105 hover:bg-gray-900">
                <Image
                  src={githubIcon}
                  alt="GitHub"
                  width={24}
                  height={24}
                  className="mr-2"
                />
                <DecryptedText text="GitHub" />
              </button>
            </a>
            <a
              href="https://x.com/kevyncode"
              target="_blank"
              rel="noopener noreferrer"
            >
              <button className="w-full flex items-center px-4 py-2 bg-zinc-800 text-white rounded-lg transform transition-transform duration-300 hover:scale-105 hover:bg-zinc-700">
                <Image
                  src={twitterIcon}
                  alt="Twitter"
                  width={24}
                  height={24}
                  className="mr-2"
                />
                <DecryptedText text="Twitter" />
              </button>
            </a>
            <a
              href="mailto:kevyncodes@gmail.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              <button className="w-full flex items-center px-4 py-2 bg-red-500 text-white rounded-lg transform transition-transform duration-300 hover:scale-105 hover:bg-red-600">
                <Image
                  src={emailIcon}
                  alt="Email"
                  width={24}
                  height={24}
                  className="mr-2"
                />
                <DecryptedText text="Email" />
              </button>
            </a>
          </div>
        </div>
      </div>
      <Analytics />
    </>
  );
}
