import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";
import { useEffect, useRef, useCallback } from "react";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";

interface CarouselProps {
  children: React.ReactNode;
  options?: any;
  className?: string;
}

export const Carousel = ({ children, options = {}, className }: CarouselProps) => {
  const autoplay = useRef(
    Autoplay({ delay: 4000, stopOnInteraction: false })
  );

  const [emblaRef, emblaApi] = useEmblaCarousel(
    { loop: true, ...options },
    [autoplay.current]
  );

  const scrollPrev = useCallback(() => emblaApi?.scrollPrev(), [emblaApi]);
  const scrollNext = useCallback(() => emblaApi?.scrollNext(), [emblaApi]);

  useEffect(() => {
    if (emblaApi) emblaApi.reInit();
  }, [emblaApi]);

  return (
    <div className={`flex flex-col gap-2 ${className}`}>
      <div className="overflow-hidden" ref={emblaRef}>
        <div className="flex">{children}</div>
      </div>

      {/* Buttons Below */}
      <div className="flex justify-center gap-4 mt-2">
        <button
          onClick={scrollPrev}
          className="bg-white shadow rounded-full p-2 hover:bg-gray-100"
        >
          <FaChevronLeft className="h-4 w-4" />
        </button>
        <button
          onClick={scrollNext}
          className="bg-white shadow rounded-full p-2 hover:bg-gray-100"
        >
          <FaChevronRight className="h-4 w-4" />
        </button>
      </div>
    </div>
  );
};
