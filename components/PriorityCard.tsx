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
    ${isSelected ? "ring-2 ring-blue-400 shadow-lg bg-blue-50" : "hover:shadow-lg"}
  `;

  return (
    <div className={containerClasses} onClick={onClick}>
      <div className={cardClasses}>
        {isSelected && queuePosition !== null && (
          <div
            className="absolute -top-2 -right-2 w-6 h-6 bg-blue-400 rounded-full 
                         flex items-center justify-center text-white text-sm font-bold"
          >
            {queuePosition + 1}
          </div>
        )}
        <Image src={imagePath} alt={label} width={64} height={64} className="w-16 h-16 object-contain" />
      </div>
      <span className={`mt-2 text-center text-slate-800 ${isSelected ? "font-semibold" : ""}`}>{label}</span>
    </div>
  );
};

export default PriorityCard;
