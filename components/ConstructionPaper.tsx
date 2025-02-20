import React, { useId, useEffect, useState } from "react";

// TypeScript interface defines the expected props for this component
// The ? after the prop name means it's optional
interface ConstructionPaperProps {
  color: string;
  className?: string;
  children: React.ReactNode; // Allows this component to wrap other content
  height?: number | string;
  width?: number | string;
  minHeight?: number | string;
  maxHeight?: number | string;
}

const ConstructionPaper = ({
  color,
  className = "", // Default value if no className is provided
  children,
  height,
  width,
  minHeight,
  maxHeight,
}: ConstructionPaperProps) => {
  // useId generates a unique, stable ID for SVG filters
  // This ensures multiple instances of this component don't conflict
  const stableId = useId();

  // Track if we're on mobile for responsive layout
  const [isMobile, setIsMobile] = useState(false);

  // Random seeds control the paper texture and edge effects
  const [seeds, setSeeds] = useState({
    textureSeed: 1,
    edgeSeed: 1,
  });

  useEffect(() => {
    // Handle resize events to switch between mobile/desktop layouts
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768); // 768px is standard md breakpoint
    };

    // Initial check
    handleResize();

    // Add listener
    window.addEventListener("resize", handleResize);

    // Generate random seeds for unique paper texture
    setSeeds({
      textureSeed: Math.random() * 1000,
      edgeSeed: Math.random() * 1000,
    });

    // Cleanup function removes event listener when component unmounts
    // This is important to prevent memory leaks
    return () => window.removeEventListener("resize", handleResize);
  }, []); // Empty dependency array means this only runs once on mount

  // Create unique IDs for SVG filters using the stable ID
  const textureId = `paper-texture-${stableId}`;
  const edgeId = `rough-edge-${stableId}`;

  // SVG dimensions change based on mobile/desktop
  const viewBox = isMobile ? "0 0 200 300" : "0 0 300 200";

  // Rectangle dimensions for different screen sizes
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

  // Combine all dimension-related styles
  const containerStyle: React.CSSProperties = {
    height,
    width,
    minHeight,
    maxHeight,
  };

  return (
    <div className={`relative ${className}`} style={containerStyle}>
      <svg
        viewBox={viewBox}
        className="w-full h-full absolute"
        preserveAspectRatio="none"
        // Key prop forces re-render when seeds change
        key={`${seeds.textureSeed}-${seeds.edgeSeed}`}
      >
        {/* Filter for paper texture effect */}
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

        {/* Filter for rough edge effect */}
        <filter id={edgeId}>
          <feTurbulence type="turbulence" baseFrequency="0.08" numOctaves="6" seed={seeds.edgeSeed} />
          <feDisplacementMap in="SourceGraphic" scale="4" />
        </filter>

        {/* Base rectangle with rough edges */}
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

        {/* Overlay rectangle with paper texture */}
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
      {/* Container for child content, positioned above the paper background */}
      <div className="relative z-10">{children}</div>
    </div>
  );
};

export default ConstructionPaper;
