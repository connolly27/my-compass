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

  // Base dimensions (scaled down to 25% of original)
  const chassisWidth = 77;
  const chassisHeight = 470;
  const aspectRatio = chassisHeight / chassisWidth;
  const maxDragDistance = containerWidth * 0.5; // 50% of container width

  interface SliderConfig {
    type: "weekday" | "month" | "day";
    width: number;
    height: number;
    y: number;
    displayHeight: number;
  }

  const sliderConfigs: SliderConfig[] = [
    { type: "weekday", width: 3692, height: 200, y: 145, displayHeight: 40 },
    { type: "month", width: 3692, height: 194, y: 213, displayHeight: 39 },
    { type: "day", width: 3698, height: 190, y: 284, displayHeight: 38 },
  ];

  // Calculate relative positions
  const sliderPositions = Object.fromEntries(
    sliderConfigs.map((config) => [config.type, { y: `${(config.y / chassisHeight) * 100}%` }])
  );

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
      {["weekday", "month", "day"].map((type, index) => {
        const config = sliderConfigs[index];
        return (
          <div
            key={type}
            className="absolute left-1/2 cursor-grab active:cursor-grabbing"
            style={{
              top: sliderPositions[type as keyof typeof sliderPositions].y,
              width: "750px",
              height: `${config.displayHeight}px`,
              transform: `translateX(calc(-50% + ${sliderOffsets[type as keyof typeof sliderOffsets]}px))`,
              userSelect: "none",
            }}
            onMouseDown={(e) => handleMouseDown(e, type)}
          >
            <Image
              src={`/images/slider${index + 1}.png`}
              alt={`${config.type} slider`}
              width={config.width}
              height={config.height}
              className="w-full h-full object-cover"
              draggable={false}
            />
          </div>
        );
      })}

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
