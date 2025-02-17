import React from "react";
import CalendarSlider from "./CalendarSlider";
import StuccoBackground from "./StuccoBackground";
import ConstructionPaper from "./ConstructionPaper";
import PriorityCardSection from "./PriorityCardSection";
import NoteSection from "./NoteSection";

const BobbysRoom: React.FC = () => {
  return (
    <div className="min-h-screen py-4">
      {/* Stucco Background */}
      <StuccoBackground />

      {/* Main Content */}
      <div className="max-w-[1400px] mx-auto space-y-2">
        {/* Heading */}
        <div className="px-4">
          <h1 className="text-6xl text-center my-10 text-slate-800">Bobby&apos;s Room</h1>
        </div>

        {/* Grid Layout */}
        <div className="grid">
          {/* Calendar Slider */}
          <div className="col-span-full overflow-hidden h-[600px]">
            <ConstructionPaper color="#E6B5A6" className="h-full overflow-hidden flex items-center justify-center">
              <CalendarSlider />
            </ConstructionPaper>
          </div>

          {/* Priority Cards Section */}
          <div className="col-span-full">
            <ConstructionPaper color="#FFE4B5" className="min-h-[1250px] md:min-h-[600px]">
              <div className="pt-[120px] md:pt-[100px]">
                <h3 className="mb-8 text-4xl text-center text-slate-800">3 Priorities</h3>
                <PriorityCardSection />
              </div>
            </ConstructionPaper>
          </div>

          {/* Note Section */}
          <div className="col-span-full">
            <NoteSection />
          </div>
        </div>
      </div>
    </div>
  );
};

export default BobbysRoom;
