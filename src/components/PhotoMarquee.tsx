import React from 'react';

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
  // Repeating array twice for seamless continuous sliding to the right
  const marqueeList = [...COUPLE_PHOTOS, ...COUPLE_PHOTOS];

  return (
    <section className="py-8 sm:py-12 bg-[#F7F2E9] overflow-hidden border-t border-[#7F9078]/15">
      <div className="relative w-full overflow-hidden">
        {/* Marquee Track sliding to the right */}
        <div className="animate-slide-marquee flex gap-4 sm:gap-6 items-center">
          {marqueeList.map((photo, index) => (
            <div
              key={`${photo.url}-${index}`}
              className="w-52 sm:w-64 md:w-72 h-72 sm:h-80 md:h-96 shrink-0 rounded-2xl overflow-hidden shadow-md transition-transform duration-500 hover:scale-102 bg-[#E8A7A0]/10"
            >
              <img
                src={photo.url}
                alt={photo.alt}
                loading="lazy"
                className="w-full h-full object-cover object-center"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
