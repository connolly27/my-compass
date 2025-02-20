import React, { useState, useEffect } from "react";
import PriorityCard from "./PriorityCard";

// Key for storing selected priorities in localStorage
const STORAGE_KEY = "priority-queue";

// Define all available priority cards with their images and labels
// The .map() adds a 'priority' flag for the first 6 cards to optimize image loading
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
].map((card, index) => ({
  ...card,
  priority: index < 6, // First 6 cards get priority loading
}));

const PriorityCardSection: React.FC = () => {
  // State to track the order of selected priorities (max 3)
  const [priorityQueue, setPriorityQueue] = useState<string[]>([]);
  // Track when localStorage is loaded
  const [isHydrated, setIsHydrated] = useState(false);

  // Load saved priorities from localStorage when component mounts
  useEffect(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      setPriorityQueue(JSON.parse(saved));
    }
    setIsHydrated(true);
  }, []);

  // Save priorities to localStorage whenever they change
  useEffect(() => {
    if (isHydrated) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(priorityQueue));
    }
  }, [priorityQueue, isHydrated]);

  // Handle clicking a priority card:
  // - If already selected, remove it
  // - If not selected, add it to the front (newest first)
  // - Maintain maximum of 3 selected items
  const handleCardClick = (label: string) => {
    // setPriorityQueue takes a function that receives the previous queue state
    setPriorityQueue((prevQueue) => {
      // Check if this priority is already in the queue
      const existingIndex = prevQueue.indexOf(label);

      // If priority is already selected (index exists)
      if (existingIndex !== -1) {
        // Remove it by filtering out this label
        // filter() creates new array with all items that don't match this label
        return prevQueue.filter((item) => item !== label);
      }

      // If priority wasn't in queue:
      // Create new array with new label at start ([label, ...prevQueue] is spread syntax)
      // Example: if label="Health" and prevQueue=["Work", "Rest"]
      // newQueue becomes ["Health", "Work", "Rest"]
      const newQueue = [label, ...prevQueue];

      // Keep only 3 priorities max
      if (newQueue.length > 3) {
        newQueue.pop(); // Remove last item (oldest priority)
      }

      return newQueue;
    });
  };

  // Get the position (0, 1, 2) of a priority in the queue, or null if not selected
  const getQueuePosition = (label: string): number | null => {
    const index = priorityQueue.indexOf(label);
    return index !== -1 ? index : null;
  };

  // Don't render until localStorage is checked
  if (!isHydrated) {
    return <div className="w-full max-w-6xl mx-auto px-4" />;
  }

  return (
    <div className="w-full max-w-6xl mx-auto px-4">
      {/* Mobile Layout: Cards arranged in pairs */}
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
                priority={card.priority}
              />
            ))}
          </div>
        ))}
      </div>

      {/* Desktop Layout: Two rows forming a pyramid (6 cards top, 6 bottom) */}
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
              priority={card.priority}
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
              priority={card.priority}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default PriorityCardSection;
