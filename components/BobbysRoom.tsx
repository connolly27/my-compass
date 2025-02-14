import React from "react";
import CalendarSlider from "./CalendarSlider";
import StuccoBackground from "./StuccoBackground";
import ConstructionPaper from "./ConstructionPaper";
import PriorityCardSection from "./PriorityCardSection";

const BobbysRoom: React.FC = () => {
  return (
    <div className="min-h-screen py-4">
      {/* Stucco Background */}
      <StuccoBackground />

      {/* Main Content */}
      <div className="max-w-[1400px] mx-auto space-y-2">
        {/* Heading */}
        <div className="px-4">
          <h1 className="text-6xl text-center mt-2 mb-0 text-slate-800">Bobby&apos;s Room</h1>
        </div>

        {/* Grid Layout */}
        <div className="grid gap-2 h-[1000px]">
          {/* Calendar Slider - Full width always */}
          <div className="col-span-full overflow-hidden md:h-[500px] h-[600px]">
            <ConstructionPaper color="#E6B5A6" className="h-full overflow-hidden flex items-center justify-center">
              <CalendarSlider />
            </ConstructionPaper>
          </div>

          {/* Priority Cards Section - Full width */}
          <div className="col-span-full">
            <ConstructionPaper color="#FFE4B5" className="min-h-[1500px] md:min-h-[300px]">
              <PriorityCardSection />
            </ConstructionPaper>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BobbysRoom;
