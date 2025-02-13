import React, { useId, useEffect, useState } from "react";

interface ConstructionPaperProps {
  color: string;
  className?: string;
  children: React.ReactNode;
}

const ConstructionPaper = ({ color, className, children }: ConstructionPaperProps) => {
  const stableId = useId();
  const [isMobile, setIsMobile] = useState(false);

  const [seeds, setSeeds] = useState({
    textureSeed: 1,
    edgeSeed: 1,
  });

  useEffect(() => {
    // Handle resize events
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768); // 768px is standard md breakpoint
    };

    // Initial check
    handleResize();

    // Add listener
    window.addEventListener("resize", handleResize);

    // Initial seeds
    setSeeds({
      textureSeed: Math.random() * 1000,
      edgeSeed: Math.random() * 1000,
    });

    // Cleanup
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const textureId = `paper-texture-${stableId}`;
  const edgeId = `rough-edge-${stableId}`;

  // Adjust viewBox based on screen size
  const viewBox = isMobile ? "0 0 200 300" : "0 0 300 200";

  // Adjust rectangle dimensions based on screen size
  const rectDimensions = isMobile
    ? {
        x: "19",
        y: "19",
        width: "162",
        height: "262",
      }
    : {
        x: "19",
        y: "19",
        width: "262",
        height: "162",
      };

  return (
    <div className={`relative ${className}`}>
      <svg viewBox={viewBox} className="w-full h-full absolute" key={`${seeds.textureSeed}-${seeds.edgeSeed}`}>
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
          x={rectDimensions.x}
          y={rectDimensions.y}
          width={rectDimensions.width}
          height={rectDimensions.height}
          fill={color}
          stroke="#444444"
          strokeWidth="0.5"
          strokeOpacity="0.6"
          filter={`url(#${edgeId})`}
          opacity="0.95"
        />

        <rect
          x={rectDimensions.x}
          y={rectDimensions.y}
          width={rectDimensions.width}
          height={rectDimensions.height}
          fill={color}
          filter={`url(#${textureId})`}
          opacity="0.15"
        />
      </svg>
      <div className="relative z-10">{children}</div>
    </div>
  );
};

export default ConstructionPaper;
