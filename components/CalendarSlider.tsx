import Image from "next/image";
import { useRef, useEffect, useState } from "react";

const CalendarSlider = () => {
  type SliderType = "weekday" | "month" | "day";

  const [isDragging, setIsDragging] = useState<SliderType | null>(null);
  const [sliderOffsets, setSliderOffsets] = useState<Record<SliderType, number>>({
    weekday: 0,
    month: 0,
    day: 0,
  });
  const dragStartX = useRef(0);
  const currentOffset = useRef(0);

  const chassisWidth = 77;
  const chassisHeight = 470;
  const visibleSliderWidth = 100; // Width of the visible slider area

  const sliderConfigs: Array<{ type: SliderType; width: number; height: number; y: number; displayHeight: number }> = [
    { type: "weekday", width: 3692, height: 200, y: 145, displayHeight: 40 },
    { type: "month", width: 3692, height: 194, y: 213, displayHeight: 39 },
    { type: "day", width: 3698, height: 190, y: 284, displayHeight: 38 },
  ];

  // Calculate maximum drag distance based on slider width
  const getMaxDragDistance = (sliderWidth: number) => {
    // The maximum distance should be half of (total width - visible width)
    // We divide by 2 because the slider is centered (translateX(-50%))
    return (sliderWidth - visibleSliderWidth) / 12;
  };

  const sliderPositions = Object.fromEntries(
    sliderConfigs.map((config) => [config.type, { y: `${(config.y / chassisHeight) * 100}%` }])
  );

  const handleMouseDown = (e: React.MouseEvent, type: SliderType) => {
    setIsDragging(type);
    dragStartX.current = e.clientX;
    currentOffset.current = sliderOffsets[type as keyof typeof sliderOffsets];
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging) return;

    const config = sliderConfigs.find((c) => c.type === isDragging);
    if (!config) return;

    const maxDistance = getMaxDragDistance(config.width);
    const deltaX = e.clientX - dragStartX.current;
    const newOffset = Math.max(Math.min(currentOffset.current + deltaX, maxDistance), -maxDistance);

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
      className="relative overflow-visible"
      style={{
        height: "470px",
        width: "77px",
        margin: "0 auto",
      }}
      onMouseMove={handleMouseMove}
    >
      {/* Chassis */}
      <div className="absolute left-1/2" style={{ width: "77px", transform: "translateX(-50%)" }}>
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
      {sliderConfigs.map((config) => (
        <div
          key={config.type}
          className="absolute left-1/2 cursor-grab active:cursor-grabbing"
          style={{
            top: sliderPositions[config.type].y,
            width: "750px",
            height: `${config.displayHeight}px`,
            transform: `translateX(calc(-50% + ${sliderOffsets[config.type]}px))`,
            userSelect: "none",
          }}
          onMouseDown={(e) => handleMouseDown(e, config.type)}
        >
          <Image
            src={`/images/slider${sliderConfigs.findIndex((c) => c.type === config.type) + 1}.png`}
            alt={`${config.type} slider`}
            width={config.width}
            height={config.height}
            className="w-full h-full object-cover"
            draggable={false}
          />
        </div>
      ))}

      {/* Diamonds overlay */}
      <div className="absolute left-1/2" style={{ width: "77px", transform: "translateX(-50%)" }}>
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
