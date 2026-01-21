import React from "react";
import { Link } from "react-router-dom";
import crafting from "../assets/ouressence/crafting.jpeg";
import shashi from "../assets/ouressence/SHASHI.jpg";
import ranju from "../assets/ouressence/Ranju.jpeg";
import SEO from "../components/SEO";



const About = () => {
  return (
    <div className="pt-20 bg-background-light dark:bg-background-dark">
      <SEO
        title="About Us"
        description="The story of Gems Muse - A journey through time, artistry, and the unwavering pursuit of perfection."
      />
      {/* Hero Section */}
      <section className="relative h-screen min-h-[700px] flex items-center justify-center bg-black overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img
            alt="Luxury Jewelry Essence"
            className="w-full h-full object-cover opacity-50 scale-105"
            src="https://images.unsplash.com/photo-1573408301185-9146fe634ad0?q=80&w=2000&auto=format&fit=crop"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-transparent to-background-light dark:to-background-dark"></div>
        </div>
        <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">
          <span className="text-primary text-[10px] md:text-xs tracking-[0.5em] uppercase mb-4 block animate-fade-in">
            The Story of Gems Muse
          </span>
          <h1 className="text-6xl md:text-8xl lg:text-9xl text-white font-serif mb-6 leading-tight">
            Our Essence{" "}
            <span className="font-script text-primary block mt-2 text-7xl md:text-9xl">
              Refined
            </span>
          </h1>
          <div className="flex flex-col items-center">
            <span className="text-white/40 text-[10px] tracking-[0.3em] uppercase mb-8">
              Our Story
            </span>
            <span className="material-symbols-outlined text-white/60 animate-bounce mb-8">
              expand_more
            </span>
            <p className="text-text-main-dark/80 text-sm md:text-lg max-w-xl mx-auto font-light tracking-wide leading-relaxed">
              A journey through time, artistry, and the unwavering pursuit of
              perfection. Crafting legacies since 2021.
            </p>
          </div>
        </div>
      </section>

      {/* Crafting a Legacy Section */}
      <section className="py-24 md:py-32">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-col lg:flex-row gap-16 lg:gap-24 items-center">
            <div className="w-full lg:w-1/2">
              <div className="relative p-4 md:p-8 bg-white dark:bg-surface-dark shadow-2xl">
                <img
                  alt="Crafting a Legacy"
                  className="w-full h-auto object-cover"
                  src={crafting}
                />
              </div>
            </div>
            <div className="w-full lg:w-1/2 space-y-8">
              <span className="text-primary text-[10px] font-bold tracking-[0.4em] uppercase block">
                Established 2021
              </span>
              <h2 className="text-4xl md:text-5xl lg:text-6xl font-serif text-text-main-light dark:text-text-main-dark">
                Crafting a <span className="italic text-primary">Legacy</span>
              </h2>
              <div className="space-y-6 text-text-muted-light dark:text-text-muted-dark font-light leading-relaxed text-sm md:text-base max-w-lg">
                <p>
                  Gems Muse was born from a desire to capture the ephemeral
                  beauty of nature in eternal forms. What started as a small
                  atelier in the heart of the jewelry district of Hong Kong has
                  blossomed into a sanctuary for bespoke luxury as well as
                  manufacturing & export house supplying worldwide.
                </p>
                <p>
                  Our journey is defined not just by the jewels we create, but
                  by the stories they tell. Every curve, every setting, and
                  every gemstone is chosen with intention, bridging the gap
                  between traditional craftsmanship and modern desire. We
                  believe that true luxury is personal, intimate, and
                  everlasting.
                </p>
              </div>
              <div className="pt-6">
                <span className="font-script text-4xl text-primary block mb-2">
                  Shashi & Dr. Ranju
                </span>
                <span className="text-[10px] uppercase tracking-[0.3em] text-text-muted-light">
                  Founders
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Guiding Philosophy Section */}
      <section className="py-24 bg-[#F9F7F4] dark:bg-[#1a1a1a]">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-20">
            <h2 className="text-4xl md:text-5xl font-serif mb-6">
              Our Guiding Philosophy
            </h2>
            <div className="w-16 h-0.5 bg-primary/30 mx-auto mb-6"></div>
            <p className="text-text-muted-light dark:text-text-muted-dark font-light tracking-wide italic">
              We believe that true luxury lies in the harmony of ethics,
              aesthetics, and emotion.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                icon: "auto_awesome",
                title: "Our Mission",
                text: "To adorn the world with pieces that inspire confidence and celebrate individuality, while upholding the highest standards of artistry and innovation.",
              },
              {
                icon: "visibility",
                title: "Our Vision",
                text: "To be the global benchmark for conscious luxury, where every piece is a testament to sustainable beauty and timeless design that transcends generations.",
              },
              {
                icon: "favorite",
                title: "Our Values",
                text: "Integrity in sourcing, passion in creation, and unwavering transparency in our relationships with our clients and the planet we share.",
              },
            ].map((item, idx) => (
              <div
                key={idx}
                className="bg-white dark:bg-surface-dark p-12 shadow-sm border-t border-primary/20 hover:border-primary transition-all duration-500 text-center"
              >
                <span className="material-symbols-outlined text-3xl text-primary mb-8 font-light">
                  {item.icon}
                </span>
                <h3 className="text-xl font-serif mb-6 tracking-wide">
                  {item.title}
                </h3>
                <p className="text-xs text-text-muted-light dark:text-text-muted-dark leading-relaxed font-light">
                  {item.text}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Visionaries Section */}
      <section className="py-24 md:py-32">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-col lg:flex-row gap-16 lg:gap-24">
            <div className="w-full lg:w-1/3">
              <span className="text-primary text-[10px] font-bold tracking-[0.4em] uppercase block mb-6">
                The Visionaries
              </span>
              <h2 className="text-4xl md:text-5xl font-serif mb-8 leading-tight">
                Minds Behind the <br />
                <span className="italic text-primary">Masterpieces</span>
              </h2>
              <div className="space-y-6 text-text-muted-light dark:text-text-muted-dark font-light text-sm leading-relaxed">
                <p>
                  Shashi Bhushan and Dr. Ranju Kumari met & married in a small
                  village in India. Bonding over a shared love for Renaissance
                  art and modern minimalism, they founded Gems Muse to bridge
                  the gap between the two worlds.
                </p>
                <p>
                  "Jewelry is more than adornment; it is a personal signature,"
                  says Dr. Ranju. Their collaborative approach ensures that
                  every collection balances structural boldness with delicate
                  intricacy.
                </p>
              </div>
              <div className="mt-12 opacity-20">
                <svg viewBox="0 0 100 100" className="w-40 h-40">
                  <path
                    d="M10,50 Q40,10 50,50 T90,50"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="0.5"
                  />
                  <path
                    d="M10,60 Q40,20 50,60 T90,60"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="0.5"
                  />
                </svg>
              </div>
            </div>
            <div className="w-full lg:w-2/3 grid grid-cols-1 sm:grid-cols-2 gap-8 items-end">
              <div className="relative group overflow-hidden">
                <img
                  alt="Alexander Sterling"
                  className="w-full h-[600px] object-cover transition-all duration-700"
                  src={shashi}
                />
                <div className="absolute bottom-5 left-1 right-6 bg-white dark:bg-surface-dark p-6 shadow-xl transform translate-y-4 opacity-90 group-hover:translate-y-0 transition-all border-l-4 border-primary">
                  <h4 className="text-lg font-serif">Shashi Bhushan</h4>
                  <p className="text-[10px] uppercase tracking-widest text-text-muted-light mt-1">
                    Founder, Director & Lead Designer
                  </p>
                </div>
              </div>
              <div className="relative group overflow-hidden sm:mb-20">
                <img
                  alt="Sophia Valenti"
                  className="w-full h-[600px] object-cover filter grayscale-[10%] group-hover:grayscale-0 transition-all duration-700"
                  src={ranju}
                />
                <div className="absolute bottom-5 left-6 right-1 bg-white dark:bg-surface-dark p-6 shadow-xl transform translate-y-4 opacity-90 group-hover:translate-y-0 transition-all border-r-4 border-primary">
                  <h4 className="text-lg font-serif">Dr. Ranju Kumari</h4>
                  <p className="text-[10px] uppercase tracking-widest text-text-muted-light mt-1">
                    Co-Founder & Merchandiser
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Art of Craftsmanship Section */}
      <section className="py-24 bg-white dark:bg-surface-dark border-t border-b border-gray-100 dark:border-gray-800">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-20">
            <h2 className="text-4xl md:text-5xl font-serif mb-6">
              The Art of{" "}
              <span className="italic text-primary">Craftsmanship</span>
            </h2>
            <div className="w-12 h-0.5 bg-primary/40 mx-auto mb-6"></div>
            <p className="text-text-muted-light dark:text-text-muted-dark font-light max-w-2xl mx-auto text-sm italic">
              Behind every piece lies a story of dedication, skill, and an
              unwavering commitment to perfection. Our ateliers are places of
              worship for the art of jewelry making.
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                icon: "diamond",
                title: "Ethically Sourced",
                text: "Every gemstone is carefully selected and ethically sourced from trusted partners worldwide.",
              },
              {
                icon: "architecture",
                title: "Master Crafted",
                text: "Our artisans bring decades of expertise to create pieces that transcend time.",
              },
              {
                icon: "favorite",
                title: "Made with Love",
                text: "Each creation is infused with passion, reflecting our dedication to excellence.",
              },
              {
                icon: "verified",
                title: "Certified Quality",
                text: "All pieces come with certification ensuring authenticity and quality assurance.",
              },
            ].map((item, idx) => (
              <div
                key={idx}
                className="p-10 text-center border border-gray-100 dark:border-gray-800 hover:border-primary/20 transition-colors"
              >
                <span className="material-symbols-outlined text-3xl text-primary/70 mb-8 font-light">
                  {item.icon}
                </span>
                <h3 className="text-lg font-serif mb-4">{item.title}</h3>
                <p className="text-[10px] uppercase tracking-wider text-text-muted-light dark:text-text-muted-dark leading-relaxed">
                  {item.text}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Conscious Luxury Section */}
      <section className="py-24 md:py-32">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-col lg:flex-row gap-16 lg:gap-24 items-center bg-white dark:bg-surface-dark p-8 md:p-16 shadow-2xl">
            <div className="w-full lg:w-1/2">
              <div className="relative aspect-square bg-[#A3BFB8] dark:bg-[#2d4a44] flex items-center justify-center p-12">
                <div className="border border-white/40 w-full h-full flex flex-col items-center justify-center text-white text-center">
                  <h3 className="text-5xl md:text-7xl font-serif mb-4 uppercase tracking-tighter opacity-80">
                    Ethical
                  </h3>
                  <span className="text-[10px] tracking-[0.5em] uppercase font-bold opacity-60">
                    Natural Sourcing
                  </span>
                </div>
                <div className="absolute -bottom-8 -right-8 w-40 h-40 bg-white dark:bg-surface-dark p-4 hidden md:block">
                  <img
                    alt="Sustainable Stone"
                    className="w-full h-full object-cover"
                    src="https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?q=80&w=1974&auto=format&fit=crop"
                  />
                </div>
              </div>
            </div>
            <div className="w-full lg:w-1/2 space-y-8">
              <span className="text-primary text-[10px] font-bold tracking-[0.4em] uppercase block">
                Conscious Luxury
              </span>
              <h2 className="text-4xl md:text-5xl font-serif">
                Ethical at Heart
              </h2>
              <p className="text-text-muted-light dark:text-text-muted-dark font-light text-sm leading-relaxed max-w-lg">
                We recognize the responsibility we hold towards our planet and
                its people. Our commitment to ethical practices goes beyond
                industry standards. We exclusively use conflict-free diamonds
                and recycled gold wherever possible.
              </p>
              <ul className="space-y-4">
                {[
                  "100% Conflict-Free Diamonds",
                  "Fair-Trade Gemstone Sourcing",
                  "Sustainable Packaging",
                ].map((item, i) => (
                  <li
                    key={i}
                    className="flex items-center gap-4 text-xs font-bold tracking-wide text-text-main-light dark:text-text-main-dark"
                  >
                    <span className="material-symbols-outlined text-primary text-xl">
                      check_circle
                    </span>
                    {item}
                  </li>
                ))}
              </ul>
              <div className="pt-6">
                <a
                  href="#"
                  className="text-[10px] font-bold uppercase tracking-[0.3em] text-primary border-b border-primary/30 pb-2 hover:border-primary transition-all"
                >
                  Read Our Full Sustainability Report
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA Section */}
      <section className="py-24 bg-[#F5F2EE] dark:bg-[#1a1a1a] relative border-t border-b border-gray-200 dark:border-gray-800 overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-full opacity-[0.03] pointer-events-none">
          <svg
            width="100%"
            height="100%"
            viewBox="0 0 100 100"
            preserveAspectRatio="none"
          >
            <pattern
              id="grid"
              width="10"
              height="10"
              patternUnits="userSpaceOnUse"
            >
              <path
                d="M 10 0 L 0 0 0 10"
                fill="none"
                stroke="currentColor"
                strokeWidth="0.5"
              />
            </pattern>
            <rect width="100%" height="100%" fill="url(#grid)" />
          </svg>
        </div>
        <div className="max-w-4xl mx-auto px-6 text-center relative z-10">
          <h2 className="text-5xl md:text-7xl font-serif text-text-main-light dark:text-text-main-dark mb-6">
            Begin Your{" "}
            <span className="font-script text-primary block mt-2">Journey</span>
          </h2>
          <p className="text-text-muted-light dark:text-text-muted-dark font-light mb-12 max-w-lg mx-auto text-sm italic">
            Let us help you find the perfect piece that tells your unique story.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-6">
            <Link
              to="/bespoke"
              className="bg-primary hover:bg-primary-hover text-white px-12 py-4 text-[10px] uppercase tracking-[0.3em] font-bold shadow-xl transition-all duration-300 transform hover:-translate-y-1"
            >
              Schedule Consultation
            </Link>
            <Link
              to="/collection"
              className="bg-transparent hover:bg-white dark:hover:bg-surface-dark text-text-main-light dark:text-text-main-dark border border-gray-300 dark:border-gray-600 px-12 py-4 text-[10px] uppercase tracking-[0.3em] font-bold transition-all duration-300"
            >
              View All Collections
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;
