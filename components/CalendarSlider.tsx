import Image from "next/image";
import { useRef, useEffect, useState } from "react";

// Key used to save slider positions in the browser's local storage
const STORAGE_KEY = "calendar-slider-positions";

// Initial position for all sliders (centered)
const defaultOffsets = {
  weekday: 0,
  month: 0,
  day: 0,
};

// Configuration for each slider (weekday, month, day)
// These values control the dimensions and positioning of each slider
const sliderConfigs: Array<{
  type: SliderType;
  width: number;
  height: number;
  y: number;
  displayHeight: number;
}> = [
  { type: "weekday", width: 3692, height: 200, y: 145, displayHeight: 40 },
  { type: "month", width: 3692, height: 194, y: 213, displayHeight: 39 },
  { type: "day", width: 3698, height: 190, y: 284, displayHeight: 38 },
];

// TypeScript type definition for the different kinds of sliders
type SliderType = "weekday" | "month" | "day";

const CalendarSlider = () => {
  // State management using React hooks
  // These track which slider is being dragged and their positions
  const [isDragging, setIsDragging] = useState<SliderType | null>(null);
  const [sliderOffsets, setSliderOffsets] = useState(defaultOffsets);
  const [isHydrated, setIsHydrated] = useState(false);

  // Load saved positions from localStorage when the component first loads
  useEffect(() => {
    const savedPositions = localStorage.getItem(STORAGE_KEY);
    if (savedPositions) {
      setSliderOffsets(JSON.parse(savedPositions));
    }
    setIsHydrated(true);
  }, []);

  // References to track drag interactions
  // useRef maintains values between renders without causing re-renders
  const dragStartX = useRef(0);
  const currentOffset = useRef(0);
  const containerRef = useRef<HTMLDivElement>(null);

  // Visual dimensions for the slider component
  const chassisWidth = 77;
  const chassisHeight = 470;
  const visibleSliderWidth = 100;

  // Calculate how far each slider can move
  const getMaxDragDistance = (sliderWidth: number) => {
    return (sliderWidth - visibleSliderWidth) / 12;
  };

  // Calculate vertical positions for each slider
  const sliderPositions = Object.fromEntries(
    sliderConfigs.map((config) => [config.type, { y: `${(config.y / chassisHeight) * 100}%` }])
  );

  // Save slider positions to localStorage whenever they change
  useEffect(() => {
    if (isHydrated) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(sliderOffsets));
    }
  }, [sliderOffsets, isHydrated]);

  // Mouse event handlers for drag interactions
  const handleMouseDown = (e: React.MouseEvent, type: SliderType) => {
    e.preventDefault();
    setIsDragging(type);
    dragStartX.current = e.clientX;
    currentOffset.current = sliderOffsets[type];
  };

  const handleMouseUp = () => {
    setIsDragging(null);
  };

  // Set up mouse move and mouse up listeners when dragging
  useEffect(() => {
    if (isDragging) {
      const handleMouseMove = (e: MouseEvent) => {
        const config = sliderConfigs.find((c) => c.type === isDragging);
        // Early return (known as a "guard clause") prevents the code from
        // continuing if no config is found. This pattern is common in React
        // for safely handling edge cases before running main logic
        if (!config) return;

        const maxDistance = getMaxDragDistance(config.width);
        const deltaX = e.clientX - dragStartX.current;
        const newOffset = Math.max(Math.min(currentOffset.current + deltaX, maxDistance), -maxDistance);

        setSliderOffsets((prev) => ({
          ...prev,
          [isDragging]: newOffset,
        }));
      };

      document.addEventListener("mousemove", handleMouseMove);
      document.addEventListener("mouseup", handleMouseUp);

      // Cleanup event listeners when dragging stops
      return () => {
        document.removeEventListener("mousemove", handleMouseMove);
        document.removeEventListener("mouseup", handleMouseUp);
      };
    }
  }, [isDragging]);

  // Show empty container while loading saved positions
  if (!isHydrated) {
    return (
      <div
        style={{
          width: `${chassisWidth}px`,
          height: `${chassisHeight}px`,
          margin: "0 auto",
        }}
      />
    );
  }

  // Main component render
  return (
    <div
      ref={containerRef}
      className="relative overflow-visible touch-pan-y"
      style={{
        width: `${chassisWidth}px`,
        height: `${chassisHeight}px`,
        margin: "0 auto",
      }}
    >
      {/* Background frame for the sliders */}
      <div className="absolute left-1/2 select-none pointer-events-none w-full h-full -translate-x-1/2">
        <div className="relative w-full h-full">
          <Image
            src="/images/chassis.png"
            alt="Slider chassis"
            fill
            priority
            sizes={`${chassisWidth}px`}
            className="object-contain"
          />
        </div>
      </div>

      {/* Generate the three interactive sliders */}
      {/* We use .map() to avoid repeating similar code for each slider. 
          This creates all three sliders (weekday, month, day) from our sliderConfigs array */}
      {sliderConfigs.map((config) => (
        <div
          // React needs a unique 'key' prop when creating lists of elements
          // to keep track of which element is which when updating the UI
          key={config.type}
          className="absolute left-1/2 cursor-grab active:cursor-grabbing select-none"
          style={{
            top: sliderPositions[config.type].y,
            width: "750px",
            height: `${config.displayHeight}px`,
            // Centers the slider and applies the drag offset
            transform: `translateX(calc(-50% + ${sliderOffsets[config.type]}px))`,
            // Prevents default touch behavior on mobile devices
            touchAction: "none",
          }}
          onMouseDown={(e) => handleMouseDown(e, config.type)}
          // Touch event handlers for mobile support
          onTouchStart={(e) => {
            const touch = e.touches[0];
            setIsDragging(config.type);
            dragStartX.current = touch.clientX;
            currentOffset.current = sliderOffsets[config.type];
          }}
          onTouchMove={(e) => {
            if (isDragging === config.type) {
              const touch = e.touches[0];
              const maxDistance = getMaxDragDistance(config.width);
              const deltaX = touch.clientX - dragStartX.current;
              // Clamp the offset between negative and positive maxDistance
              const newOffset = Math.max(Math.min(currentOffset.current + deltaX, maxDistance), -maxDistance);

              setSliderOffsets((prev) => ({
                ...prev,
                [config.type]: newOffset,
              }));
            }
          }}
          onTouchEnd={() => {
            if (isDragging === config.type) {
              setIsDragging(null);
            }
          }}
        >
          <div className="relative w-full h-full">
            <Image
              // Dynamically selects the correct slider image (slider1.png, slider2.png, etc.)
              src={`/images/slider${sliderConfigs.findIndex((c) => c.type === config.type) + 1}.png`}
              alt={`${config.type} slider`}
              // Next.js Image props for optimized image loading
              fill
              priority
              sizes="750px"
              className="object-cover pointer-events-none"
              draggable={false}
            />
          </div>
        </div>
      ))}

      {/* Decorative overlay */}
      <div className="absolute left-1/2 select-none pointer-events-none w-full h-full -translate-x-1/2">
        <div className="relative w-full h-full">
          <Image
            src="/images/diamonds.png"
            alt="Slider diamonds"
            fill
            priority
            sizes={`${chassisWidth}px`}
            className="object-contain"
          />
        </div>
      </div>
    </div>
  );
};

export default CalendarSlider;
