import React from "react";
import Image from "next/image";

// Define the expected props for this component
interface PriorityCardProps {
  imagePath: string; // Path to the priority icon
  label: string; // Text label for the priority
  isSelected: boolean; // Whether this card is in the priority queue
  queuePosition: number | null; // Position in queue (0,1,2) or null if not selected
  onClick: () => void; // Function to call when card is clicked
  priority?: boolean; // Whether to prioritize loading the image
}

const PriorityCard: React.FC<PriorityCardProps> = ({
  imagePath,
  label,
  isSelected,
  queuePosition,
  onClick,
  priority = false, // Default to false if not provided
}) => {
  // Get styles for the card based on its position in the queue
  // Gold (1st), Silver (2nd), Bronze (3rd)
  const getPriorityStyles = (position: number | null) => {
    if (position === null) return "";

    switch (position) {
      case 0: // Gold - 1st priority
        return "ring-2 ring-yellow-400 shadow-lg bg-gradient-to-br from-yellow-50 to-yellow-100";
      case 1: // Silver - 2nd priority
        return "ring-2 ring-gray-400 shadow-lg bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200";
      case 2: // Bronze - 3rd priority
        return "ring-2 ring-orange-700 shadow-lg bg-gradient-to-br from-orange-50 to-orange-100";
      default:
        return "";
    }
  };

  // Get styles for the position badge (1,2,3) shown on selected cards
  const getPriorityBadgeStyles = (position: number) => {
    switch (position) {
      case 0: // Gold badge
        return "bg-gradient-to-br from-yellow-400 to-yellow-500";
      case 1: // Silver badge
        return "bg-gradient-to-br from-gray-400 to-gray-500";
      case 2: // Bronze badge
        return "bg-gradient-to-br from-orange-600 to-orange-700";
      default:
        return "bg-blue-400";
    }
  };

  // Combine Tailwind classes for the container
  // Scale up slightly when selected or hovered
  const containerClasses = `
    flex flex-col items-center w-28 cursor-pointer 
    transition-all duration-200 ease-in-out
    ${isSelected ? "scale-105" : "hover:scale-105"}
  `;

  // Combine Tailwind classes for the card
  // Apply priority-specific styles when selected
  const cardClasses = `
    bg-white rounded-2xl p-4 shadow-md w-full aspect-square 
    flex items-center justify-center relative
    transition-all duration-200
    ${isSelected ? getPriorityStyles(queuePosition) : "hover:shadow-lg"}
  `;

  return (
    <div className={containerClasses} onClick={onClick}>
      <div className={cardClasses}>
        {/* Show position badge (1,2,3) if card is selected */}
        {isSelected && queuePosition !== null && (
          <div
            className={`
              absolute -top-2 -right-2 w-6 h-6 rounded-full 
              flex items-center justify-center text-white text-sm font-bold
              ${getPriorityBadgeStyles(queuePosition)}
            `}
          >
            {queuePosition + 1}
          </div>
        )}
        {/* Priority icon image */}
        <Image
          src={imagePath}
          alt={label}
          width={64}
          height={64}
          className="w-16 h-16 object-contain"
          priority={priority}
        />
      </div>
      {/* Priority label below the card */}
      <span
        className={`
          mt-2 text-center text-slate-800 
          ${isSelected ? "font-semibold" : ""}
        `}
      >
        {label}
      </span>
    </div>
  );
};

export default PriorityCard;
