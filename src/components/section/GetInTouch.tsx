import React, { useState, useEffect } from "react";

const Carousel = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const slides = [
    {
      image:
        "https://images.unsplash.com/photo-1515462277126-2dd0c162007a?auto=format&fit=crop&q=80",
      title: "Digital Prism",
      description:
        "Where geometry meets art in a stunning display of light and form.",
    },
    {
      image:
        "https://images.unsplash.com/photo-1550745165-9bc0b252726f?auto=format&fit=crop&q=80",
      title: "Tech Haven",
      description:
        "Immerse yourself in the cutting edge of technology and innovation.",
    },
    {
      image:
        "https://images.unsplash.com/photo-1614850523459-c2f4c699c52e?auto=format&fit=crop&q=80",
      title: "Neural Dreams",
      description:
        "AI-generated masterpieces that blur the line between human and machine creativity.",
    },
  ];

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  };

  useEffect(() => {
    const autoAdvance = setInterval(nextSlide, 5000);
    return () => clearInterval(autoAdvance);
  }, []);

  const progress = ((currentSlide + 1) / slides.length) * 100;

  return (
    <div className="bg-white min-h-screen flex items-center justify-center overflow-hidden p-4 sm:p-8">
      <div className="fixed inset-0 -z-10">
        <div className="absolute inset-0 bg-gradient-to-br from-violet-900/20 via-purple-900/20 to-fuchsia-900/20"></div>
        <div className="absolute top-1/4 left-1/4 w-48 h-48 sm:w-96 sm:h-96 bg-violet-500/10 rounded-full filter blur-3xl"></div>
        <div className="absolute bottom-1/4 right-1/4 w-48 h-48 sm:w-96 sm:h-96 bg-fuchsia-500/10 rounded-full filter blur-3xl"></div>
      </div>

      <div className="w-full max-w-6xl mx-auto relative">
        <div className="absolute top-0 left-0 right-0 h-1 bg-white/10 rounded-full overflow-hidden z-20">
          <div
            className="progress-bar absolute top-0 left-0 h-full"
            style={{ width: `${progress}%` }}
          ></div>
        </div>

        <button
          className="nav-button absolute left-2 sm:left-4 top-1/2 -translate-y-1/2 w-10 h-10 sm:w-12 sm:h-12 rounded-full flex items-center justify-center z-20 text-white"
          onClick={prevSlide}
          title="Previous slide"
        >
          <svg
            className="w-5 h-5 sm:w-6 sm:h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M15 19l-7-7 7-7"
            ></path>
          </svg>
        </button>

        <button
          className="nav-button absolute right-2 sm:right-4 top-1/2 -translate-y-1/2 w-10 h-10 sm:w-12 sm:h-12 rounded-full flex items-center justify-center z-20 text-white"
          onClick={nextSlide}
          title="Next slide"
        >
          <svg
            className="w-5 h-5 sm:w-6 sm:h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M9 5l7 7-7 7"
            ></path>
          </svg>
        </button>

        <div className="carousel-track relative h-[400px] sm:h-[500px] md:h-[600px] overflow-hidden">
          {slides.map((slide, index) => {
            let className = "carousel-item absolute top-0 left-0 w-full h-full";
            if (index === currentSlide) {
              className += " active";
            } else if (index === (currentSlide + 1) % slides.length) {
              className += " next";
            } else if (
              index ===
              (currentSlide - 1 + slides.length) % slides.length
            ) {
              className += " prev";
            } else {
              className += " hidden";
            }

            return (
              <div key={index} className={className}>
                <div className="w-full h-full p-4 sm:p-8">
                  <div className="w-full h-full rounded-xl sm:rounded-2xl overflow-hidden relative group">
                    <img
                      src={slide.image}
                      alt={slide.title}
                      className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-br from-violet-500/40 to-purple-500/40 mix-blend-overlay"></div>
                    <div className="absolute inset-x-0 bottom-0 p-4 sm:p-8 bg-gradient-to-t from-black/80 via-black/40 to-transparent">
                      <h3 className="text-white text-xl sm:text-2xl md:text-3xl font-bold mb-2 sm:mb-3">
                        {slide.title}
                      </h3>
                      <p className="text-gray-200 text-sm sm:text-base md:text-lg max-w-2xl">
                        {slide.description}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        <div className="absolute bottom-2 sm:bottom-4 left-1/2 -translate-x-1/2 flex gap-1 sm:gap-2 z-20">
          {slides.map((_, index) => (
            <button
              key={index}
              className={`w-8 sm:w-12 h-1 sm:h-1.5 rounded-full transition-colors ${
                index === currentSlide ? "bg-white/40" : "bg-white/20"
              } hover:bg-white/60`}
              onClick={() => setCurrentSlide(index)}
              title={`Go to slide ${index + 1}`}
            ></button>
          ))}
        </div>
      </div>
    </div>
  );
};

const GetInTouch = () => {
  return (
    <div className="bg-white text-black p-8 sm:p-16">
      <h2 className="text-3xl font-bold text-center mb-8">Get In Touch</h2>
      <form className="max-w-xl mx-auto">
        <div className="flex flex-col mb-4">
          <label htmlFor="name" className="text-lg mb-2">
            Full Name
          </label>
          <input
            id="name"
            type="text"
            placeholder="Your Name"
            className="p-4 border border-gray-300 rounded-md"
          />
        </div>

        <div className="flex flex-col mb-4">
          <label htmlFor="email" className="text-lg mb-2">
            Email
          </label>
          <input
            id="email"
            type="email"
            placeholder="Your Email"
            className="p-4 border border-gray-300 rounded-md"
          />
        </div>

        <div className="flex flex-col mb-4">
          <label htmlFor="message" className="text-lg mb-2">
            Message
          </label>
          <textarea
            id="message"
            placeholder="Your Message"
            rows="5"
            className="p-4 border border-gray-300 rounded-md"
          ></textarea>
        </div>

        <button
          type="submit"
          className="w-full bg-purple-500 text-white py-3 rounded-md hover:bg-purple-600 transition"
        >
          Send Message
        </button>
      </form>
    </div>
  );
};

const App = () => {
  return (
    <div>
      <Carousel />
      <GetInTouch />
    </div>
  );
};

export default App;
