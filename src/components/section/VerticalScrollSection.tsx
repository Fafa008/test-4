import { useEffect, useRef } from "react";
import gsap from "gsap";

interface Item {
  id: number;
  title: string;
  description: string;
  video: string;
}

interface VerticalScrollSectionProps {
  items: Item[];
}

export function VerticalScrollSection({ items }: VerticalScrollSectionProps) {
  const sectionRef = useRef<HTMLDivElement>(null);
  const wrapperRef = useRef<HTMLDivElement>(null);
  const itemsRef = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const section = sectionRef.current;
    const wrapper = wrapperRef.current;
    const itemElements = itemsRef.current.filter(Boolean) as HTMLDivElement[];

    if (!section || !wrapper || itemElements.length === 0) return;

    // Initial states
    itemElements.forEach((item, index) => {
      if (index !== 0) {
        gsap.set(item, { yPercent: 100 });
      }
    });

    const ctx = gsap.context(() => {
      const timeline = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          pin: true,
          start: "top top",
          end: () => `+=${items.length * 100}%`,
          scrub: 1,
          invalidateOnRefresh: true,
        },
        defaults: { ease: "none" },
      });

      itemElements.forEach((item, index) => {
        timeline.to(item, {
          scale: 0.9,
          borderRadius: "10px",
        });

        if (itemElements[index + 1]) {
          timeline.to(
            itemElements[index + 1],
            {
              yPercent: 0,
            },
            "<"
          );
        }
      });
    });

    return () => ctx.revert(); // This will clean up all GSAP animations created in this context
  }, [items]);

  return (
    <div ref={sectionRef} className="scroll-section overflow-hidden">
      <div ref={wrapperRef} className="h-screen">
        <div
          role="list"
          className="h-full flex items-center justify-start relative p-0.5"
        >
          {items.map((item, index) => (
            <div
              key={item.id}
              ref={(el) => (itemsRef.current[index] = el)}
              role="listitem"
              className="w-screen h-full absolute inset-0 flex shadow-[0_8px_24px_rgba(149,157,165,0.2)] overflow-hidden"
            >
              <div className="relative w-1/2 bg-white p-12 flex flex-col justify-center items-start">
                <div className="absolute top-24 left-12 h-12 w-12 rounded-full bg-black text-white flex items-center justify-center text-2xl font-normal">
                  {item.id}
                </div>
                <h2 className="text-4xl font-bold mb-4">{item.title}</h2>
                <p className="text-base">{item.description}</p>
              </div>
              <video
                src={item.video}
                className="w-1/2 h-full object-cover"
                autoPlay
                muted
                loop
                playsInline
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
