import React from "react";
import CalendarSlider from "./CalendarSlider";
import StuccoBackground from "./StuccoBackground";
import ConstructionPaper from "./ConstructionPaper";

const BobbysRoom: React.FC = () => {
  return (
    <div className="min-h-screen py-4">
      {/* Stucco Background */}
      <StuccoBackground />

      {/* Main Content */}
      <div className="max-w-[1400px] mx-auto space-y-4">
        {/* Heading */}
        <div className="px-4">
          <h1 className="text-6xl text-center mt-2 mb-0 text-slate-800">Bobby&apos;s Room</h1>
        </div>

        {/* Grid Layout */}
        <div className="grid gap-4 h-[1000px]">
          {/* Calendar Slider - Full width always */}
          <div className="col-span-full overflow-hidden md:h-[500px] h-[600px]">
            <ConstructionPaper color="#E6B5A6" className="h-full overflow-hidden flex items-center justify-center">
              <CalendarSlider />
            </ConstructionPaper>
          </div>

          {/* Two column grid for the rest */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Middle Cards - Stack on mobile, side by side on desktop */}
            <div className="col-span-1">
              <ConstructionPaper color="#B8C5A6" className="h-full">
                {<div></div>}
              </ConstructionPaper>
            </div>
            <div className="col-span-1">
              <ConstructionPaper color="#D5C5D9" className="h-full">
                {<div></div>}
              </ConstructionPaper>
            </div>
          </div>

          {/* Bottom Card - Full width always */}
          <div className="col-span-full">
            <ConstructionPaper color="#B5D4C5" className="h-full">
              {<div></div>}
            </ConstructionPaper>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BobbysRoom;
