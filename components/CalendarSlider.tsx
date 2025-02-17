import Image from "next/image";
import { useRef, useEffect, useState } from "react";

const STORAGE_KEY = "calendar-slider-positions";

const defaultOffsets = {
  weekday: 0,
  month: 0,
  day: 0,
};

const CalendarSlider = () => {
  type SliderType = "weekday" | "month" | "day";

  const [isDragging, setIsDragging] = useState<SliderType | null>(null);
  const [sliderOffsets, setSliderOffsets] = useState(defaultOffsets);
  const [isHydrated, setIsHydrated] = useState(false);

  // Load saved positions after hydration
  useEffect(() => {
    const savedPositions = localStorage.getItem(STORAGE_KEY);
    if (savedPositions) {
      setSliderOffsets(JSON.parse(savedPositions));
    }
    setIsHydrated(true);
  }, []);

  const dragStartX = useRef(0);
  const currentOffset = useRef(0);
  const containerRef = useRef<HTMLDivElement>(null);

  const chassisWidth = 77;
  const chassisHeight = 470;
  const visibleSliderWidth = 100;

  const sliderConfigs: Array<{ type: SliderType; width: number; height: number; y: number; displayHeight: number }> = [
    { type: "weekday", width: 3692, height: 200, y: 145, displayHeight: 40 },
    { type: "month", width: 3692, height: 194, y: 213, displayHeight: 39 },
    { type: "day", width: 3698, height: 190, y: 284, displayHeight: 38 },
  ];

  const getMaxDragDistance = (sliderWidth: number) => {
    return (sliderWidth - visibleSliderWidth) / 12;
  };

  const sliderPositions = Object.fromEntries(
    sliderConfigs.map((config) => [config.type, { y: `${(config.y / chassisHeight) * 100}%` }])
  );

  // Save to localStorage whenever sliderOffsets change (but only after hydration)
  useEffect(() => {
    if (isHydrated) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(sliderOffsets));
    }
  }, [sliderOffsets, isHydrated]);

  const handleMouseDown = (e: React.MouseEvent, type: SliderType) => {
    e.preventDefault();
    setIsDragging(type);
    dragStartX.current = e.clientX;
    currentOffset.current = sliderOffsets[type];
  };

  const handleMouseMove = (e: MouseEvent) => {
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

  const handleTouchStart = (e: React.TouchEvent, type: SliderType) => {
    e.preventDefault();
    const touch = e.touches[0];
    setIsDragging(type);
    dragStartX.current = touch.clientX;
    currentOffset.current = sliderOffsets[type];
  };

  const handleTouchMove = (e: TouchEvent) => {
    if (!isDragging) return;
    e.preventDefault();
    const touch = e.touches[0];

    const config = sliderConfigs.find((c) => c.type === isDragging);
    if (!config) return;

    const maxDistance = getMaxDragDistance(config.width);
    const deltaX = touch.clientX - dragStartX.current;
    const newOffset = Math.max(Math.min(currentOffset.current + deltaX, maxDistance), -maxDistance);

    setSliderOffsets((prev) => ({
      ...prev,
      [isDragging]: newOffset,
    }));
  };

  const handleTouchEnd = () => {
    setIsDragging(null);
  };

  // Add and remove document-level event listeners
  useEffect(() => {
    if (isDragging) {
      document.addEventListener("mousemove", handleMouseMove);
      document.addEventListener("mouseup", handleMouseUp);
      document.addEventListener("touchmove", handleTouchMove, { passive: false });
      document.addEventListener("touchend", handleTouchEnd);
    }

    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseup", handleMouseUp);
      document.removeEventListener("touchmove", handleTouchMove);
      document.removeEventListener("touchend", handleTouchEnd);
    };
  }, [isDragging]);

  if (!isHydrated) {
    return (
      <div
        style={{
          height: "470px",
          width: "77px",
          margin: "0 auto",
        }}
      />
    );
  }

  return (
    <div
      ref={containerRef}
      className="relative overflow-visible touch-pan-y"
      style={{
        height: "470px",
        width: "77px",
        margin: "0 auto",
      }}
    >
      {/* Chassis */}
      <div
        className="absolute left-1/2 select-none pointer-events-none"
        style={{ width: "77px", transform: "translateX(-50%)" }}
      >
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
          className="absolute left-1/2 cursor-grab active:cursor-grabbing select-none"
          style={{
            top: sliderPositions[config.type].y,
            width: "750px",
            height: `${config.displayHeight}px`,
            transform: `translateX(calc(-50% + ${sliderOffsets[config.type]}px))`,
            touchAction: "pan-x",
          }}
          onMouseDown={(e) => handleMouseDown(e, config.type)}
          onTouchStart={(e) => handleTouchStart(e, config.type)}
        >
          <Image
            src={`/images/slider${sliderConfigs.findIndex((c) => c.type === config.type) + 1}.png`}
            alt={`${config.type} slider`}
            width={config.width}
            height={config.height}
            className="w-full h-full object-cover pointer-events-none"
            draggable={false}
          />
        </div>
      ))}

      {/* Diamonds overlay */}
      <div
        className="absolute left-1/2 select-none pointer-events-none"
        style={{ width: "77px", transform: "translateX(-50%)" }}
      >
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
