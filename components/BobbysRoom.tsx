import React, { useId, useEffect, useState } from "react";
import CalendarSlider from "./CalendarSlider";

interface ConstructionPaperProps {
  color: string;
  className?: string;
  children: React.ReactNode;
}

const ConstructionPaper = ({ color, className, children }: ConstructionPaperProps) => {
  const stableId = useId();

  const [seeds, setSeeds] = useState({
    textureSeed: 1,
    edgeSeed: 1,
  });

  useEffect(() => {
    // Initial update
    setSeeds({
      textureSeed: Math.random() * 1000,
      edgeSeed: Math.random() * 1000,
    });
  }, []);

  const textureId = `paper-texture-${stableId}`;
  const edgeId = `rough-edge-${stableId}`;

  return (
    <div className={`relative ${className}`}>
      <svg
        viewBox="0 0 300 200"
        className="w-full h-full absolute"
        key={`${seeds.textureSeed}-${seeds.edgeSeed}`} // Force rerender
      >
        <filter id={textureId}>
          <feTurbulence
            type="fractalNoise"
            baseFrequency="1.2"
            numOctaves="4"
            seed={seeds.textureSeed}
            stitchTiles="stitch"
          />
          <feColorMatrix type="saturate" values="0" />
          <feComposite operator="in" in2="SourceGraphic" />
        </filter>

        <filter id={edgeId}>
          <feTurbulence type="turbulence" baseFrequency="0.08" numOctaves="6" seed={seeds.edgeSeed} />
          <feDisplacementMap in="SourceGraphic" scale="4" />
        </filter>

        <rect
          x="19"
          y="19"
          width="262"
          height="162"
          fill={color}
          stroke="#444444"
          strokeWidth="0.5"
          strokeOpacity="0.6"
          filter={`url(#${edgeId})`}
          opacity="0.95"
        />

        <rect
          x="19"
          y="19"
          width="262"
          height="162"
          fill={color}
          filter={`url(#${textureId})`}
          opacity="0.15" // Increased opacity
        />
      </svg>
      <div className="relative z-10">{children}</div>
    </div>
  );
};

const StuccoBackground = () => (
  <div className="fixed inset-0 -z-10">
    <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
      <filter id="noise">
        <feTurbulence type="fractalNoise" baseFrequency="0.6" numOctaves="2" seed="5" stitchTiles="stitch" />
        <feColorMatrix type="saturate" values="0" />
        <feComponentTransfer>
          <feFuncR type="gamma" amplitude="0.8" exponent="1" />
          <feFuncG type="gamma" amplitude="0.8" exponent="1" />
          <feFuncB type="gamma" amplitude="0.8" exponent="1" />
        </feComponentTransfer>
        <feBlend mode="soft-light" in2="SourceGraphic" />
      </filter>

      <rect width="100" height="100" fill="#A7C4E2" />
      <rect width="100%" height="100%" fill="#96B5D6" filter="url(#noise)" opacity="0.25" />
      <rect width="100%" height="100%" fill="#B4CDE5" filter="url(#noise)" opacity="0.15" />
      <rect width="100%" height="100%" fill="#89AAD0" filter="url(#noise)" opacity="0.1" />
    </svg>
  </div>
);

const BobbysRoom: React.FC = () => {
  return (
    <div className="min-h-screen p-4">
      {/* Stucco Background */}
      <StuccoBackground />

      {/* Main Content */}
      <div className="max-w-[1400px] mx-auto space-y-4">
        {/* Heading */}
        <h1 className="text-6xl text-center mb-8 text-slate-800">Bobby&apos;s Room</h1>

        {/* Grid Layout */}
        <div className="grid gap-4 h-[1000px]">
          {/* Calendar Slider - Full width always */}
          <div className="col-span-full">
            <ConstructionPaper color="#E6B5A6" className="h-full overflow-visible flex items-center justify-center">
              <CalendarSlider />
            </ConstructionPaper>
          </div>

          {/* Two column grid for the rest */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Middle Cards - Stack on mobile, side by side on desktop */}
            <div className="col-span-1">
              <ConstructionPaper color="#B8C5A6" className="h-full">
                {<div></div>}
              </ConstructionPaper>
            </div>
            <div className="col-span-1">
              <ConstructionPaper color="#D5C5D9" className="h-full">
                {<div></div>}
              </ConstructionPaper>
            </div>
          </div>

          {/* Bottom Card - Full width always */}
          <div className="col-span-full">
            <ConstructionPaper color="#B5D4C5" className="h-full">
              {<div></div>}
            </ConstructionPaper>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BobbysRoom;
