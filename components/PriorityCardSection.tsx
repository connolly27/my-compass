// PriorityCardSection.tsx
import React, { useState, useEffect } from "react";
import PriorityCard from "./PriorityCard";

const STORAGE_KEY = "priority-queue";

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
  const [priorityQueue, setPriorityQueue] = useState<string[]>([]);
  const [isHydrated, setIsHydrated] = useState(false);

  // Load saved queue after hydration
  useEffect(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      setPriorityQueue(JSON.parse(saved));
    }
    setIsHydrated(true);
  }, []);

  // Save to localStorage whenever queue changes (but only after hydration)
  useEffect(() => {
    if (isHydrated) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(priorityQueue));
    }
  }, [priorityQueue, isHydrated]);

  const handleCardClick = (label: string) => {
    setPriorityQueue((prevQueue) => {
      const existingIndex = prevQueue.indexOf(label);

      // If card is already in queue, remove it
      if (existingIndex !== -1) {
        return prevQueue.filter((item) => item !== label);
      }

      // Add new card to queue at the beginning, maintaining max length of 3
      const newQueue = [label, ...prevQueue];
      if (newQueue.length > 3) {
        newQueue.pop(); // Remove oldest item from the end
      }
      return newQueue;
    });
  };

  const getQueuePosition = (label: string): number | null => {
    const index = priorityQueue.indexOf(label);
    return index !== -1 ? index : null;
  };

  if (!isHydrated) {
    return <div className="w-full max-w-6xl mx-auto px-4" />;
  }

  return (
    <div className="w-full max-w-6xl mx-auto px-4">
      {/* Mobile Layout */}
      <div className="md:hidden">
        {[0, 1, 2, 3, 4, 5].map((startIdx) => (
          <div key={startIdx} className="flex justify-center gap-6 mb-4">
            {[priorityCards[startIdx + 6], priorityCards[startIdx]].map((card, idx) => (
              <PriorityCard
                key={idx}
                imagePath={card.imagePath}
                label={card.label}
                isSelected={priorityQueue.includes(card.label)}
                queuePosition={getQueuePosition(card.label)}
                onClick={() => handleCardClick(card.label)}
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
              isSelected={priorityQueue.includes(card.label)}
              queuePosition={getQueuePosition(card.label)}
              onClick={() => handleCardClick(card.label)}
            />
          ))}
        </div>
        <div className="flex justify-center gap-6">
          {priorityCards.slice(6).map((card, idx) => (
            <PriorityCard
              key={idx}
              imagePath={card.imagePath}
              label={card.label}
              isSelected={priorityQueue.includes(card.label)}
              queuePosition={getQueuePosition(card.label)}
              onClick={() => handleCardClick(card.label)}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default PriorityCardSection;
