import Head from "next/head";
import { useState } from "react";
import DecryptedText from "@/components/DecryptedText";
import SpotlightCard from "@/components/SpotlightCard";
import Particles from "@/components/Particles";
import GlassOverlay from "@/components/GlassOverlay";
import ProfileImage from "@/components/ProfileImage";
import { PARTICLES_CONFIG } from "@/constants/config";
import { profileData } from "@/data/profile";

export default function TestPage() {
  const [decryptedText, setDecryptedText] = useState("Hello World!");
  const [spotlightContent, setSpotlightContent] = useState("Spotlight Test");
  const [showParticles, setShowParticles] = useState(true);
  const [showGlass, setShowGlass] = useState(true);
  const [glassBlur, setGlassBlur] = useState<
    "sm" | "md" | "lg" | "xl" | "2xl" | "3xl"
  >("lg");
  const [glassOpacity, setGlassOpacity] = useState(0.05);

  return (
    <>
      <Head>
        <title>Component Test Page | Kevyn Rodrigues</title>
      </Head>
      <div className="relative min-h-screen p-8 bg-black text-white">
        {/* Particles Background */}
        {showParticles && (
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

        {/* Glass overlay */}
        {showGlass && (
          <GlassOverlay
            blur={glassBlur}
            opacity={glassOpacity}
            className="-z-10"
          />
        )}

        <div className="relative z-10 max-w-4xl mx-auto">
          <h1 className="text-4xl font-bold mb-8 text-center">
            <DecryptedText text="Component Test Page" />
          </h1>

          {/* Profile Image Test Section */}
          <div className="mb-12 p-6 bg-zinc-900 rounded-lg bg-opacity-80 backdrop-blur-sm">
            <h2 className="text-2xl font-bold mb-4">Profile Image Component</h2>
            <div className="flex justify-center mb-4">
              <ProfileImage
                primaryImage={profileData.profileImage}
                hoverImage={profileData.profileImageHover}
                alt={profileData.name}
                size="md"
                className="group"
              />
            </div>
            <p className="text-zinc-400 text-center">
              Hover over the image to see the coin flip animation effect!
            </p>
          </div>

          {/* DecryptedText Test Section */}
          <div className="mb-12 p-6 bg-zinc-900 rounded-lg bg-opacity-80 backdrop-blur-sm">
            <h2 className="text-2xl font-bold mb-4">DecryptedText Component</h2>
            <div className="mb-4">
              <label className="block text-sm font-medium mb-2">
                Text to decrypt:
              </label>
              <input
                type="text"
                value={decryptedText}
                onChange={(e) => setDecryptedText(e.target.value)}
                className="w-full p-2 bg-zinc-800 border border-zinc-600 rounded"
                placeholder="Enter text to test..."
              />
            </div>
            <div className="p-4 bg-zinc-800 rounded">
              <h3 className="text-lg mb-2">Result:</h3>
              <DecryptedText text={decryptedText} />
            </div>
          </div>

          {/* Glass Overlay Test Section */}
          <div className="mb-12 p-6 bg-zinc-900 rounded-lg bg-opacity-80 backdrop-blur-sm">
            <h2 className="text-2xl font-bold mb-4">Glass Overlay Component</h2>
            <div className="space-y-4">
              <div>
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    checked={showGlass}
                    onChange={(e) => setShowGlass(e.target.checked)}
                    className="mr-2"
                  />
                  Show Glass Overlay
                </label>
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">
                  Blur Level:
                </label>
                <select
                  value={glassBlur}
                  onChange={(e) =>
                    setGlassBlur(
                      e.target.value as
                        | "sm"
                        | "md"
                        | "lg"
                        | "xl"
                        | "2xl"
                        | "3xl"
                    )
                  }
                  className="w-full p-2 bg-zinc-800 border border-zinc-600 rounded"
                >
                  <option value="sm">Small</option>
                  <option value="md">Medium</option>
                  <option value="lg">Large</option>
                  <option value="xl">Extra Large</option>
                  <option value="2xl">2X Large</option>
                  <option value="3xl">3X Large</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">
                  Opacity: {glassOpacity.toFixed(2)}
                </label>
                <input
                  type="range"
                  min="0"
                  max="0.3"
                  step="0.01"
                  value={glassOpacity}
                  onChange={(e) => setGlassOpacity(parseFloat(e.target.value))}
                  className="w-full"
                />
              </div>
            </div>
            <p className="text-zinc-400 mt-4">
              The glass overlay creates a frosted glass effect over the
              particles background.
            </p>
          </div>

          {/* Particles Test Section */}
          <div className="mb-12 p-6 bg-zinc-900 rounded-lg bg-opacity-80 backdrop-blur-sm">
            <h2 className="text-2xl font-bold mb-4">Particles Component</h2>
            <div className="mb-4">
              <label className="flex items-center">
                <input
                  type="checkbox"
                  checked={showParticles}
                  onChange={(e) => setShowParticles(e.target.checked)}
                  className="mr-2"
                />
                Show Particles Background
              </label>
            </div>
            <p className="text-zinc-400">
              Toggle the checkbox above to show/hide the particles background
              effect.
            </p>
          </div>

          {/* SpotlightCard Test Section */}
          <div className="mb-12 p-6 bg-zinc-900 rounded-lg bg-opacity-80 backdrop-blur-sm">
            <h2 className="text-2xl font-bold mb-4">SpotlightCard Component</h2>
            <div className="mb-4">
              <label className="block text-sm font-medium mb-2">
                Card content:
              </label>
              <textarea
                value={spotlightContent}
                onChange={(e) => setSpotlightContent(e.target.value)}
                className="w-full p-2 bg-zinc-800 border border-zinc-600 rounded h-20"
                placeholder="Enter content to test..."
              />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <SpotlightCard className="p-4">
                <h3 className="text-lg font-bold mb-2">Test Card 1</h3>
                <p>{spotlightContent}</p>
              </SpotlightCard>
              <SpotlightCard className="p-4">
                <h3 className="text-lg font-bold mb-2">Test Card 2</h3>
                <p>Static content for comparison</p>
              </SpotlightCard>
            </div>
          </div>

          {/* Navigation */}
          <div className="text-center">
            <a
              href="/"
              className="inline-block px-6 py-3 bg-zinc-800 hover:bg-zinc-700 rounded-lg transition-colors bg-opacity-80 backdrop-blur-sm"
            >
              ← Back to Portfolio
            </a>
          </div>
        </div>
      </div>
    </>
  );
}
