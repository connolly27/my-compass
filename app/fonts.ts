import { Comic_Neue, Schoolbell, Patrick_Hand } from "next/font/google";

// Comic Neue - a friendlier alternative to Comic Sans
export const comicNeue = Comic_Neue({
  weight: ["400", "700"], // 400 is regular, 700 is bold
  subsets: ["latin"], // Only load Latin characters to reduce bundle size
});

// Schoolbell - a playful handwriting font
// This is our main font
export const schoolbell = Schoolbell({
  weight: "400", // Only available in regular weight
  subsets: ["latin"],
});

// Patrick Hand - another handwriting style font
// Note: This font is imported but not currently used in the app
export const patrickHand = Patrick_Hand({
  weight: "400",
  subsets: ["latin"],
});
