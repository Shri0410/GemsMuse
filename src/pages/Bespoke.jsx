import React from "react";

const Bespoke = () => {
  return (
    <div className="pt-20 pb-32">
      <div className="max-w-4xl mx-auto px-6">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-serif">Bespoke Services</h1>
          <p className="text-muted text-sm mt-3">
            Design a one-of-a-kind piece with our master artisans.
          </p>
        </div>
        <div className="space-y-6 text-center text-text-muted-light dark:text-text-muted-dark">
          <p>
            Our bespoke offering allows you to collaborate directly with our
            designers and craftsmen. From concept sketches to the final setting,
            every step is curated to ensure perfection.
          </p>
          <p>
            Book a consultation to discuss materials, stones, and design
            inspirations. We can source rare gemstones and provide detailed CAD
            mockups prior to production.
          </p>
          <button className="bg-primary text-white px-8 py-3 uppercase tracking-[0.2em] font-bold">
            Book Consultation
          </button>
        </div>
      </div>
    </div>
  );
};

export default Bespoke;
