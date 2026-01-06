import React from "react";
import { Link } from "react-router-dom";

const Repairs = () => {
  return (
    <div className="pt-20">
      {/* Hero Section */}
      <section className="relative h-[60vh] min-h-[500px] flex items-center justify-center bg-black overflow-hidden mt-[108px] md:mt-[132px]">
        <div className="absolute inset-0 z-0">
          <img
            alt="Jewelry Repair"
            className="w-full h-full object-cover opacity-60"
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuDZTAhAvNpttkKYkJlJfryS344gRgqpcl4SLVrDbSlj2-9QLYUJgg-ZiYFNMdljkwuXsGQEFM9f3vbRpEGUqVmiZrFyLbcJuWwni2lz_mghpCcUnjroQ8en2SNSEDvkwf-H9YQlhDEV1bc4m8TOVZ_a6c36AoY2qAkmGor3LRAZORdWX35GX45zq6f6zqxU1vNO1WkCt9QlPfW-w9kE_6mf5SnHtDxjfCkpUGlfSLedBgshb5iq6OWB7L7vvMtJZ30yYEi3EMzZQqH9"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/30 to-background-light dark:to-background-dark"></div>
        </div>
        <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">
          <p className="text-primary text-xs md:text-sm tracking-[0.3em] uppercase mb-4 animate-fade-in-up">
            Restoring Brilliance
          </p>
          <h1 className="text-5xl md:text-7xl text-white font-serif mb-6 leading-tight">
            Repairs &{" "}
            <span className="font-script text-primary text-6xl md:text-8xl ml-2">
              Restoration
            </span>
          </h1>
          <p className="text-gray-200 text-sm md:text-base max-w-xl mx-auto font-light tracking-wide leading-relaxed">
            From vintage heirlooms to modern masterpieces, our master artisans
            bring new life to your most cherished pieces with unmatched
            precision.
          </p>
        </div>
      </section>

      {/* Services List */}
      <section className="py-24 bg-background-light dark:bg-background-dark">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
            {[
              {
                title: "Professional Cleaning",
                icon: "auto_fix_high",
                desc: "Ultrasonic cleaning and professional polishing to restore the original luster of your diamonds and precious metals.",
              },
              {
                title: "Ring Resizing",
                icon: "straighten",
                desc: "Expert resizing for rings of all metals, ensuring a perfect fit without compromising the structural integrity or design.",
              },
              {
                title: "Stone Replacement",
                icon: "diamond",
                desc: "Sourcing and setting matching gemstones to replace lost or damaged stones in your favorite settings.",
              },
              {
                title: "Prong Re-tipping",
                icon: "settings_backup_restore",
                desc: "Securing your gemstones by strengthening worn prongs, preventing potential loss of valuable stones.",
              },
              {
                title: "Clasp Repair",
                icon: "lock",
                desc: "Fixing or replacing broken clasps on necklaces and bracelets to ensure they stay securely where they belong.",
              },
              {
                title: "Vintage Restoration",
                icon: "history_edu",
                desc: "Sensitive restoration of antique pieces, preserving historical character while ensuring durability for future generations.",
              },
            ].map((service, idx) => (
              <div
                key={idx}
                className="bg-white dark:bg-surface-dark p-10 border border-gray-100 dark:border-gray-800 shadow-sm hover:shadow-xl hover:border-primary/30 transition-all duration-300 group"
              >
                <div className="w-14 h-14 bg-background-light dark:bg-black/20 rounded-full flex items-center justify-center mb-8 group-hover:bg-primary group-hover:text-white transition-colors duration-500">
                  <span className="material-icons-outlined text-2xl">
                    {service.icon}
                  </span>
                </div>
                <h3 className="text-2xl font-serif mb-4 text-text-main-light dark:text-text-main-dark">
                  {service.title}
                </h3>
                <p className="text-sm text-text-muted-light dark:text-text-muted-dark leading-relaxed font-light">
                  {service.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-[#F5F2EE] dark:bg-[#1a1a1a] border-t border-gray-100 dark:border-gray-800">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h2 className="text-4xl md:text-5xl font-serif mb-8">
            Ready to <span className="italic text-primary">Restore?</span>
          </h2>
          <p className="text-text-muted-light dark:text-text-muted-dark font-light mb-12 text-lg leading-relaxed">
            Schedule a virtual assessment or visit our Mumbai atelier for a
            personal consultation with our master craftsmen.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-6">
            <Link
              to="/bespoke"
              className="bg-primary hover:bg-primary-hover text-white px-10 py-4 text-xs uppercase tracking-[0.2em] font-bold shadow-lg transition-all duration-300"
            >
              Book Assessment
            </Link>
            <a
              href="mailto:repairs@gemsmuse.com"
              className="bg-transparent hover:bg-white dark:hover:bg-surface-dark text-text-main-light dark:text-text-main-dark border border-gray-400 dark:border-gray-600 px-10 py-4 text-xs uppercase tracking-[0.2em] font-bold transition-all duration-300"
            >
              Inquire via Email
            </a>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Repairs;
