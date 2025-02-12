import { Comic_Neue, Schoolbell, Patrick_Hand } from "next/font/google";

export const comicNeue = Comic_Neue({
  weight: ["400", "700"], // we'll have both regular and bold weights available
  subsets: ["latin"],
});

export const schoolbell = Schoolbell({
  weight: "400",
  subsets: ["latin"],
});

export const patrickHand = Patrick_Hand({
  weight: "400",
  subsets: ["latin"],
});
