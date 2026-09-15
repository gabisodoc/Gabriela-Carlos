import React, { useRef, useState, useEffect } from 'react';

const COUPLE_PHOTOS = [
  {
    url: 'https://images.unsplash.com/photo-1519741497674-611481863552?q=80&w=700&auto=format&fit=crop',
    alt: 'Gabriela & Carlos sorrindo sob luz natural'
  },
  {
    url: 'https://images.unsplash.com/photo-1515934751635-c81c6bc9a2d8?q=80&w=700&auto=format&fit=crop',
    alt: 'Mãos dadas na praia'
  },
  {
    url: 'https://images.unsplash.com/photo-1516589178581-6cd7833ae3b2?q=80&w=700&auto=format&fit=crop',
    alt: 'Gabriela e Carlos abraçados no parque'
  },
  {
    url: 'https://images.unsplash.com/photo-1583939003579-730e3918a45a?q=80&w=700&auto=format&fit=crop',
    alt: 'Momento carinhoso na areia do mar'
  },
  {
    url: 'https://images.unsplash.com/photo-1529634597503-139d3726fed5?q=80&w=700&auto=format&fit=crop',
    alt: 'Sorrisos e carinho'
  },
  {
    url: 'https://images.unsplash.com/photo-1522673607200-164d1b6ce486?q=80&w=700&auto=format&fit=crop',
    alt: 'Abraço no pôr do sol'
  },
  {
    url: 'https://images.unsplash.com/photo-1469371670807-013ccf25f16a?q=80&w=700&auto=format&fit=crop',
    alt: 'Caminhando de mãos dadas'
  },
  {
    url: 'https://images.unsplash.com/photo-1537633552985-df8429e8048b?q=80&w=700&auto=format&fit=crop',
    alt: 'Cumplicidade e amor'
  }
];

export const PhotoMarquee: React.FC = () => {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [isInteracting, setIsInteracting] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);
  const resumeTimerRef = useRef<NodeJS.Timeout | null>(null);

  // Multiply list 4 times for infinite seamless loop in both directions
  const loopedPhotos = [...COUPLE_PHOTOS, ...COUPLE_PHOTOS, ...COUPLE_PHOTOS, ...COUPLE_PHOTOS];

  // Set initial scroll position to the middle so the user can scroll left or right immediately
  useEffect(() => {
    const el = scrollRef.current;
    if (el) {
      // Defer slightly to ensure layout and image wrappers are computed
      const timer = setTimeout(() => {
        if (el.scrollWidth > el.clientWidth) {
          el.scrollLeft = el.scrollWidth / 4;
        }
      }, 100);
      return () => clearTimeout(timer);
    }
  }, []);

  // Continuous auto-scroll animation loop
  useEffect(() => {
    let animationFrameId: number;
    const speed = 0.75; // pixels per frame

    const step = () => {
      const el = scrollRef.current;
      if (el && !isInteracting && !isDragging) {
        el.scrollLeft += speed;

        // Infinite loop boundary reset
        const oneSetWidth = el.scrollWidth / 4;
        if (el.scrollLeft >= oneSetWidth * 3) {
          el.scrollLeft -= oneSetWidth;
        } else if (el.scrollLeft <= 10) {
          el.scrollLeft += oneSetWidth;
        }
      }
      animationFrameId = requestAnimationFrame(step);
    };

    animationFrameId = requestAnimationFrame(step);
    return () => cancelAnimationFrame(animationFrameId);
  }, [isInteracting, isDragging]);

  // Pause auto-scroll temporarily when user interacts, then resume after a short pause
  const notifyUserInteraction = () => {
    setIsInteracting(true);
    if (resumeTimerRef.current) {
      clearTimeout(resumeTimerRef.current);
    }
    resumeTimerRef.current = setTimeout(() => {
      setIsInteracting(false);
    }, 2800);
  };

  // Mouse Drag Events
  const handleMouseDown = (e: React.MouseEvent) => {
    if (!scrollRef.current) return;
    setIsDragging(true);
    setIsInteracting(true);
    setStartX(e.pageX - scrollRef.current.offsetLeft);
    setScrollLeft(scrollRef.current.scrollLeft);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging || !scrollRef.current) return;
    e.preventDefault();
    const x = e.pageX - scrollRef.current.offsetLeft;
    const walk = (x - startX) * 1.5; // drag sensitivity
    scrollRef.current.scrollLeft = scrollLeft - walk;
    notifyUserInteraction();
  };

  const handleMouseUpOrLeave = () => {
    if (isDragging) {
      setIsDragging(false);
      notifyUserInteraction();
    }
  };

  // Touch Events for Mobile / Tablet swipe
  const handleTouchStart = () => {
    setIsInteracting(true);
    if (resumeTimerRef.current) {
      clearTimeout(resumeTimerRef.current);
    }
  };

  const handleTouchEnd = () => {
    notifyUserInteraction();
  };

  return (
    <section 
      id="galeria-fotos" 
      className="py-8 sm:py-12 bg-white border-t border-[#7F9078]/15 relative select-none"
    >
      <div className="relative w-full overflow-hidden">
        {/* Scrollable Container with drag, touch swipe, and auto-scroll */}
        <div
          ref={scrollRef}
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUpOrLeave}
          onMouseLeave={handleMouseUpOrLeave}
          onTouchStart={handleTouchStart}
          onTouchEnd={handleTouchEnd}
          onWheel={notifyUserInteraction}
          className={`flex gap-4 sm:gap-6 items-center overflow-x-auto no-scrollbar px-4 cursor-grab active:cursor-grabbing ${
            isDragging ? 'scroll-auto' : 'scroll-smooth'
          }`}
          style={{
            scrollbarWidth: 'none',
            msOverflowStyle: 'none',
            WebkitOverflowScrolling: 'touch'
          }}
        >
          {loopedPhotos.map((photo, index) => (
            <div
              key={`${photo.url}-${index}`}
              className="w-56 sm:w-64 md:w-72 h-72 sm:h-80 md:h-96 shrink-0 rounded-2xl overflow-hidden shadow-md transition-transform duration-300 hover:scale-[1.02] bg-[#E8A7A0]/10 border border-[#7F9078]/10 select-none"
            >
              <img
                src={photo.url}
                alt={photo.alt}
                loading="lazy"
                draggable={false}
                className="w-full h-full object-cover object-center pointer-events-none"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
