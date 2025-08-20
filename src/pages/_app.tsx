import "@/styles/globals.css";
import Head from "next/head";
import Image from "next/image";
import { useEffect, useState } from "react";
import SectionsBar from "@/components/SectionsBar";
import { Analytics } from "@vercel/analytics/react";
import DecryptedText from "@/components/DecryptedText";
import Particles from "@/components/Particles";
import GlassOverlay from "@/components/GlassOverlay";
import FloatingButton from "@/components/FloatingButton";
import ProfileImage from "@/components/ProfileImage";

// Import data from organized files
import { socialLinks, profileData } from "@/data/profile";
import { SITE_CONFIG, PARTICLES_CONFIG } from "@/constants/config";

export default function Home() {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    // Garantir que o componente seja renderizado apenas no cliente
    setIsClient(true);
  }, []);

  return (
    <>
      <Head>
        <title>{SITE_CONFIG.TITLE}</title>
        <meta name="description" content={SITE_CONFIG.DESCRIPTION} />
        <meta name="author" content={SITE_CONFIG.AUTHOR} />
      </Head>
      <div className="relative flex flex-col items-center min-h-screen p-4 overflow-hidden">
        {/* Particles como background */}
        {isClient && (
          <div className="absolute inset-0 -z-20">
            <Particles
              particleColors={PARTICLES_CONFIG.COLORS}
              particleCount={PARTICLES_CONFIG.COUNT}
              particleSpread={PARTICLES_CONFIG.SPREAD}
              speed={PARTICLES_CONFIG.SPEED}
              particleBaseSize={PARTICLES_CONFIG.BASE_SIZE}
              moveParticlesOnHover={PARTICLES_CONFIG.MOVE_ON_HOVER}
              alphaParticles={PARTICLES_CONFIG.ALPHA}
              disableRotation={PARTICLES_CONFIG.DISABLE_ROTATION}
            />
          </div>
        )}

        {/* Glass overlay sobre as partículas */}
        <GlassOverlay blur="md" opacity={0.02} className="-z-10" />

        {/* Conteúdo principal */}
        <div className="relative z-10 flex flex-col items-center justify-center w-full sm:w-3/4 lg:w-2/3 p-4">
          <ProfileImage
            primaryImage={profileData.profileImage}
            hoverImage={profileData.profileImageHover}
            alt={profileData.name}
            size="lg"
            className="group"
          />
        </div>
        <div className="relative z-10 flex flex-col items-center justify-center w-full sm:w-3/4 lg:w-2/3 p-4 mt-4">
          <h1 className="text-3xl sm:text-4xl lg:text-4xl font-bold text-center">
            <DecryptedText text={profileData.name} />
          </h1>
          <p className="text-base sm:text-lg lg:text-l text-zinc-400 mt-2 text-center">
            <DecryptedText text={profileData.title} />
          </p>
        </div>
        <div className="relative z-10 flex flex-col w-full sm:w-3/4 lg:w-2/3 p-4 mt-4">
          <h2 className="text-2xl sm:text-3xl lg:text-2xl font-bold">
            <DecryptedText text="About Me" />
          </h2>
          <p className="text-base sm:text-lg lg:text-l text-justify text-zinc-400 mt-6">
            <DecryptedText text={profileData.aboutMe} />
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
            {socialLinks.map((link) => (
              <a
                key={link.name}
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
              >
                <button
                  className={`w-full flex items-center px-4 py-2 text-white rounded-lg transform transition-transform duration-300 hover:scale-105 ${
                    link.name === "LinkedIn"
                      ? "bg-blue-500 hover:bg-blue-600"
                      : link.name === "GitHub"
                      ? "bg-gray-800 hover:bg-gray-900"
                      : link.name === "Twitter"
                      ? "bg-zinc-800 hover:bg-zinc-700"
                      : "bg-red-500 hover:bg-red-600"
                  }`}
                >
                  <Image
                    src={link.icon}
                    alt={link.name}
                    width={24}
                    height={24}
                    className="mr-2 rounded-full p-1 bg-white/10 backdrop-blur-sm"
                  />
                  <DecryptedText text={link.name} />
                </button>
              </a>
            ))}
          </div>
        </div>

        {/* Floating Resume Button */}
        <FloatingButton
          href={
            profileData.resumeUrl ||
            socialLinks.find((link) => link.name === "LinkedIn")?.url ||
            "https://www.linkedin.com/in/kevyn-rodrigues/"
          }
          tooltip="View Resume"
        />
      </div>
      <Analytics />
    </>
  );
}
