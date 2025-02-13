import Image from "next/image";
import { useRef, useEffect, useState } from "react";

const CalendarSlider = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [containerWidth, setContainerWidth] = useState(0);
  const [isDragging, setIsDragging] = useState<string | null>(null);
  const [sliderOffsets, setSliderOffsets] = useState({
    weekday: 0,
    month: 0,
    day: 0,
  });
  const dragStartX = useRef(0);
  const currentOffset = useRef(0);

  // Update container width on resize
  useEffect(() => {
    const updateWidth = () => {
      if (containerRef.current) {
        setContainerWidth(containerRef.current.offsetWidth);
      }
    };

    updateWidth();
    window.addEventListener("resize", updateWidth);
    return () => window.removeEventListener("resize", updateWidth);
  }, []);

  // Base dimensions
  const chassisWidth = 310;
  const chassisHeight = 1880;
  const aspectRatio = chassisHeight / chassisWidth;
  const maxDragDistance = containerWidth * 0.5; // 50% of container width

  // Calculate relative positions
  const sliderPositions = {
    weekday: { y: `${(581 / chassisHeight) * 100}%` },
    month: { y: `${(859 / chassisHeight) * 100}%` },
    day: { y: `${(1137 / chassisHeight) * 100}%` },
  };

  const handleMouseDown = (e: React.MouseEvent, type: string) => {
    setIsDragging(type);
    dragStartX.current = e.clientX;
    currentOffset.current = sliderOffsets[type as keyof typeof sliderOffsets];
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging) return;

    const deltaX = e.clientX - dragStartX.current;
    const newOffset = Math.max(Math.min(currentOffset.current + deltaX, maxDragDistance), -maxDragDistance);

    setSliderOffsets((prev) => ({
      ...prev,
      [isDragging]: newOffset,
    }));
  };

  const handleMouseUp = () => {
    setIsDragging(null);
  };

  useEffect(() => {
    if (isDragging) {
      document.addEventListener("mouseup", handleMouseUp);
      document.addEventListener("mouseleave", handleMouseUp);
    }
    return () => {
      document.removeEventListener("mouseup", handleMouseUp);
      document.removeEventListener("mouseleave", handleMouseUp);
    };
  }, [isDragging]);

  return (
    <div
      ref={containerRef}
      className="relative overflow-visible"
      style={{
        height: 0,
        paddingBottom: `${aspectRatio * 14}%`,
      }}
      onMouseMove={handleMouseMove}
    >
      {/* Chassis */}
      <div className="absolute right-0" style={{ width: `${14}%` }}>
        <Image
          src="/images/chassis.png"
          alt="Slider chassis"
          width={chassisWidth}
          height={chassisHeight}
          className="w-full h-auto"
          priority
        />
      </div>

      {/* Sliders */}
      {["weekday", "month", "day"].map((type, index) => (
        <div
          key={type}
          className="absolute right-[8.5%] cursor-grab active:cursor-grabbing"
          style={{
            top: sliderPositions[type as keyof typeof sliderPositions].y,
            width: `${17 * 8.82}%`,
            transform: `translateX(calc(50% + ${sliderOffsets[type as keyof typeof sliderOffsets]}px))`,
            userSelect: "none",
          }}
          onMouseDown={(e) => handleMouseDown(e, type)}
        >
          <Image
            src={`/images/slider${index + 1}.png`}
            alt={`${type} slider`}
            width={3692}
            height={200}
            className="w-full h-auto"
            draggable={false}
          />
        </div>
      ))}

      {/* Diamonds overlay */}
      <div className="absolute right-0" style={{ width: `${14}%` }}>
        <Image
          src="/images/diamonds.png"
          alt="Slider diamonds"
          width={chassisWidth}
          height={chassisHeight}
          className="w-full h-auto"
          priority
        />
      </div>
    </div>
  );
};

export default CalendarSlider;
