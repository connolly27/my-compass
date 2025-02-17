import React from "react";
import Image from "next/image";

interface PriorityCardProps {
  imagePath: string;
  label: string;
  isSelected: boolean;
  queuePosition: number | null;
  onClick: () => void;
}

const PriorityCard: React.FC<PriorityCardProps> = ({ imagePath, label, isSelected, queuePosition, onClick }) => {
  // Get priority-specific styles
  const getPriorityStyles = (position: number | null) => {
    if (position === null) return "";

    switch (position) {
      case 0: // Gold
        return "ring-2 ring-yellow-400 shadow-lg bg-gradient-to-br from-yellow-50 to-yellow-100";
      case 1: // Silver - darker background with subtle shine
        return "ring-2 ring-gray-400 shadow-lg bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200";
      case 2: // Bronze
        return "ring-2 ring-orange-700 shadow-lg bg-gradient-to-br from-orange-50 to-orange-100";
      default:
        return "";
    }
  };

  // Get priority badge styles
  const getPriorityBadgeStyles = (position: number) => {
    switch (position) {
      case 0: // Gold
        return "bg-gradient-to-br from-yellow-400 to-yellow-500";
      case 1: // Silver
        return "bg-gradient-to-br from-gray-400 to-gray-500";
      case 2: // Bronze
        return "bg-gradient-to-br from-orange-600 to-orange-700";
      default:
        return "bg-blue-400";
    }
  };

  // Dynamic classes based on selection state
  const containerClasses = `
    flex flex-col items-center w-28 cursor-pointer 
    transition-all duration-200 ease-in-out
    ${isSelected ? "scale-105" : "hover:scale-105"}
  `;

  const cardClasses = `
    bg-white rounded-2xl p-4 shadow-md w-full aspect-square 
    flex items-center justify-center relative
    transition-all duration-200
    ${isSelected ? getPriorityStyles(queuePosition) : "hover:shadow-lg"}
  `;

  return (
    <div className={containerClasses} onClick={onClick}>
      <div className={cardClasses}>
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
        <Image src={imagePath} alt={label} width={64} height={64} className="w-16 h-16 object-contain" />
      </div>
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
