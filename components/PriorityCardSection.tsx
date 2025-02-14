import React from "react";
import PriorityCard from "./PriorityCard";

const priorityCards = [
  { imagePath: "/images/hobby.png", label: "Hobby" },
  { imagePath: "/images/artists_palette.png", label: "Creativity" },
  { imagePath: "/images/health.png", label: "Health" },
  { imagePath: "/images/social.png", label: "Social" },
  { imagePath: "/images/nature.png", label: "Nature" },
  { imagePath: "/images/open_book.png", label: "Learning" },
  { imagePath: "/images/working.png", label: "Work" },
  { imagePath: "/images/rest.png", label: "Rest" },
  { imagePath: "/images/home.png", label: "Family" },
  { imagePath: "/images/broom.png", label: "Cleaning" },
  { imagePath: "/images/standing_mirror.png", label: "Reflection" },
  { imagePath: "/images/projects.png", label: "Projects" },
];

const PriorityCardSection: React.FC = () => {
  return (
    <div className="w-full max-w-6xl mx-auto px-4">
      {/* Mobile Layout  */}
      <div className="md:hidden">
        {[0, 1, 2, 3, 4, 5].map((startIdx) => (
          <div key={startIdx} className="flex justify-center gap-6 mb-4">
            {[priorityCards[startIdx + 6], priorityCards[startIdx]].map((card, idx) => (
              <PriorityCard
                key={idx}
                imagePath={card.imagePath}
                label={card.label}
                onClick={() => console.log(`Clicked ${card.label}`)}
              />
            ))}
          </div>
        ))}
      </div>

      {/* Desktop Layout (Pyramid: 4-8) */}
      <div className="hidden md:block">
        <div className="flex justify-center gap-6 mb-6">
          {priorityCards.slice(0, 6).map((card, idx) => (
            <PriorityCard
              key={idx}
              imagePath={card.imagePath}
              label={card.label}
              onClick={() => console.log(`Clicked ${card.label}`)}
            />
          ))}
        </div>
        <div className="flex justify-center gap-6">
          {priorityCards.slice(6).map((card, idx) => (
            <PriorityCard
              key={idx}
              imagePath={card.imagePath}
              label={card.label}
              onClick={() => console.log(`Clicked ${card.label}`)}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default PriorityCardSection;
