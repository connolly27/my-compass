import React from "react";

const StuccoBackground = () => (
  <div className="fixed inset-0 -z-10">
    <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
      <filter id="noise">
        <feTurbulence
          type="fractalNoise"
          baseFrequency="0.6"
          numOctaves="2"
          seed="5"
          stitchTiles="stitch"
        />
        <feColorMatrix type="saturate" values="0" />

        <feComponentTransfer>
          <feFuncR type="gamma" amplitude="0.8" exponent="1" />
          <feFuncG type="gamma" amplitude="0.8" exponent="1" />
          <feFuncB type="gamma" amplitude="0.8" exponent="1" />
        </feComponentTransfer>

        <feBlend mode="soft-light" in2="SourceGraphic" />
      </filter>

      {/* Base layer - solid pink */}
      <rect width="100" height="100" fill="#FFC0CB" />

      {/* Additional layers with noise filter applied */}
      <rect width="100%" height="100%" fill="#FFB6C1" filter="url(#noise)" opacity="0.25" />
      <rect width="100%" height="100%" fill="#FFA7B8" filter="url(#noise)" opacity="0.15" />
      <rect width="100%" height="100%" fill="#FF99B4" filter="url(#noise)" opacity="0.1" />
    </svg>
  </div>
);

export default StuccoBackground;