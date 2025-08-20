import { useEffect, useState, useRef } from "react";
import { motion } from "framer-motion";

interface DecryptedTextProps {
  text: string;
  speed?: number;
  maxIterations?: number;
  sequential?: boolean;
  revealDirection?: "start" | "end" | "center";
  useOriginalCharsOnly?: boolean;
  characters?: string;
  className?: string;
  encryptedClassName?: string;
  parentClassName?: string;
  animateOn?: "view" | "hover";
  [key: string]: string | number | boolean | undefined;
}

export default function DecryptedText({
  text,
  speed = 80, // Velocidade suave para animação letra por letra
  maxIterations = 6, // Poucas iterações antes de revelar cada letra
  revealDirection = "start",
  useOriginalCharsOnly = false,
  characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()_+",
  className = "",
  parentClassName = "",
  encryptedClassName = "",
  animateOn = "view",
  ...props
}: DecryptedTextProps) {
  const [displayText, setDisplayText] = useState<string>(text);
  const [isHovering, setIsHovering] = useState<boolean>(false);
  const [isScrambling, setIsScrambling] = useState<boolean>(false);
  const [revealedIndices, setRevealedIndices] = useState<Set<number>>(
    new Set()
  );
  const [hasAnimated, setHasAnimated] = useState<boolean>(false);
  const [currentRevealIndex, setCurrentRevealIndex] = useState<number>(0);
  const [iterationsForCurrentChar, setIterationsForCurrentChar] =
    useState<number>(0);
  const containerRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    let interval: number;

    const getNextIndex = (revealedSet: Set<number>): number => {
      const textLength = text.length;
      switch (revealDirection) {
        case "start":
          return revealedSet.size;
        case "end":
          return textLength - 1 - revealedSet.size;
        case "center": {
          const middle = Math.floor(textLength / 2);
          const offset = Math.floor(revealedSet.size / 2);
          const nextIndex =
            revealedSet.size % 2 === 0 ? middle + offset : middle - offset - 1;

          if (
            nextIndex >= 0 &&
            nextIndex < textLength &&
            !revealedSet.has(nextIndex)
          ) {
            return nextIndex;
          }
          for (let i = 0; i < textLength; i++) {
            if (!revealedSet.has(i)) return i;
          }
          return 0;
        }
        default:
          return revealedSet.size;
      }
    };

    const availableChars = useOriginalCharsOnly
      ? Array.from(new Set(text.split(""))).filter((char) => char !== " ")
      : characters.split("");

    const shuffleText = (
      originalText: string,
      currentRevealed: Set<number>,
      currentIndex: number
    ): string => {
      return originalText
        .split("")
        .map((char, i) => {
          if (char === " ") return " ";
          if (currentRevealed.has(i)) return originalText[i];
          if (i === currentIndex) {
            // Scramble apenas a letra atual sendo revelada
            return availableChars[
              Math.floor(Math.random() * availableChars.length)
            ];
          }
          return originalText[i];
        })
        .join("");
    };

    if (isHovering) {
      setIsScrambling(true);

      interval = window.setInterval(() => {
        setRevealedIndices((prevRevealed) => {
          const nextIndex = getNextIndex(prevRevealed);

          // Se chegamos ao fim do texto
          if (prevRevealed.size >= text.length) {
            clearInterval(interval);
            setIsScrambling(false);
            setDisplayText(text);
            return prevRevealed;
          }

          // Se ainda estamos scrambling a letra atual
          if (iterationsForCurrentChar < maxIterations) {
            setIterationsForCurrentChar((prev) => prev + 1);
            setDisplayText(shuffleText(text, prevRevealed, nextIndex));
            return prevRevealed;
          } else {
            // Revelar a letra atual e passar para a próxima
            const newRevealed = new Set(prevRevealed);
            newRevealed.add(nextIndex);
            setCurrentRevealIndex(nextIndex + 1);
            setIterationsForCurrentChar(0);
            setDisplayText(shuffleText(text, newRevealed, nextIndex + 1));
            return newRevealed;
          }
        });
      }, speed);
    } else {
      setDisplayText(text);
      setRevealedIndices(new Set());
      setIsScrambling(false);
      setCurrentRevealIndex(0);
      setIterationsForCurrentChar(0);
    }

    return () => {
      if (interval) clearInterval(interval);
    };
  }, [
    isHovering,
    text,
    speed,
    maxIterations,
    revealDirection,
    characters,
    useOriginalCharsOnly,
    iterationsForCurrentChar,
    currentRevealIndex,
  ]);

  useEffect(() => {
    if (animateOn !== "view") return;

    const observerCallback = (entries: IntersectionObserverEntry[]) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting && !hasAnimated) {
          setIsHovering(true);
          setHasAnimated(true);

          // Auto-desativar após a animação completa
          const totalDuration = text.length * (maxIterations * speed) + 500;
          setTimeout(() => {
            setIsHovering(false);
          }, totalDuration);
        }
      });
    };

    const observerOptions = {
      root: null,
      rootMargin: "0px",
      threshold: 0.1,
    };

    const observer = new IntersectionObserver(
      observerCallback,
      observerOptions
    );
    const currentRef = containerRef.current;
    if (currentRef) {
      observer.observe(currentRef);
    }

    return () => {
      if (currentRef) observer.unobserve(currentRef);
    };
  }, [animateOn, hasAnimated, maxIterations, speed, text.length]);

  const hoverProps =
    animateOn === "hover"
      ? {
          onMouseEnter: () => setIsHovering(true),
          onMouseLeave: () => setIsHovering(false),
        }
      : {};

  return (
    <motion.span
      ref={containerRef}
      className={`inline-block whitespace-pre-wrap ${parentClassName}`}
      {...hoverProps}
      {...props}
    >
      <span className="sr-only">{text}</span>

      <span aria-hidden="true">
        {displayText.split("").map((char, index) => {
          const isRevealed = revealedIndices.has(index);
          const isCurrentlyScrambling =
            index === currentRevealIndex && isScrambling;

          return (
            <motion.span
              key={index}
              className={isRevealed ? className : encryptedClassName}
              initial={{ opacity: 0.7 }}
              animate={{
                opacity: isRevealed ? 1 : isCurrentlyScrambling ? 0.8 : 0.7,
                scale: isCurrentlyScrambling ? 1.05 : 1,
              }}
              transition={{
                duration: 0.1,
                ease: "easeOut",
              }}
            >
              {char}
            </motion.span>
          );
        })}
      </span>
    </motion.span>
  );
}
