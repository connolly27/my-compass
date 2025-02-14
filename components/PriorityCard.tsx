import React from "react";
import Image from "next/image";

interface PriorityCardProps {
  imagePath: string;
  label: string;
  onClick?: () => void;
}

const PriorityCard: React.FC<PriorityCardProps> = ({ imagePath, label, onClick }) => {
  return (
    <div
      className="flex flex-col items-center w-28 cursor-pointer hover:scale-105 transition-transform"
      onClick={onClick}
    >
      <div className="bg-white rounded-2xl p-4 shadow-md w-full aspect-square flex items-center justify-center">
        <Image src={imagePath} alt={label} width={64} height={64} className="w-16 h-16 object-contain" />
      </div>
      <span className="mt-2 text-center text-slate-800">{label}</span>
    </div>
  );
};

export default PriorityCard;
