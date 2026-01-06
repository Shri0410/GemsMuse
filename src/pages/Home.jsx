import React from "react";
import { Link } from "react-router-dom";
import { MOCK_PRODUCTS } from "../constants";

const Home = () => {
  return (
    <div className="pt-0">
      {/* Hero Section */}
      <section className="relative h-screen flex items-center justify-center bg-black overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img
            alt="Luxury Necklace Hero"
            className="w-full h-full object-cover opacity-80"
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuDukxcd8Ejhy3YefoVjo0Qbm33LM4U_ETtt5UwJXLK8hdMqnKobhYmi5S5KuzKnIdHMbvI1ghh89DJL0kc-UpZ3HLt8r-gZpIMdi8ZLL97IyuoI5dgiwCsb1UE9VB4aj74lFyWb9TzS60bMt1un_6_wtwhZumCM6ndlOK2VtrxeuYyf5seI5uBFqjuyUmo-MmFf7_NBoNLIaEFJCi91oeVvJ9qr2whukQvYM_tYY72KzyvYWVOUFFVmFt200Os0cA3zPjS-61KE0Mpu"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-black/60"></div>
        </div>
        <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">
          <p className="text-primary text-[10px] md:text-xs tracking-[0.5em] uppercase mb-8 animate-fade-in-up font-bold">
            Exquisite Jewelry
          </p>
          <h1 className="text-6xl md:text-8xl lg:text-9xl text-white font-serif mb-8 leading-none tracking-tight">
            Where Elegance <br />
            <span className="font-script text-primary text-7xl md:text-9xl lg:text-[10rem] block -mt-4 italic">
              Meets Art
            </span>
          </h1>
          <p className="text-gray-300 text-sm md:text-base max-w-xl mx-auto mb-12 font-light tracking-widest leading-relaxed">
            Discover timeless pieces crafted with passion, precision, and the
            finest gemstones from around the world.
          </p>
          <div className="flex flex-col md:flex-row gap-6 justify-center items-center">
            <Link
              to="/collection"
              className="bg-primary hover:bg-primary-hover text-white px-10 py-3.5 uppercase text-[10px] tracking-[0.3em] font-bold transition-all duration-300 shadow-xl"
            >
              Explore Collection
            </Link>
            <Link
              to="/about"
              className="bg-transparent hover:bg-white/10 text-white px-10 py-3.5 uppercase text-[10px] tracking-[0.3em] font-bold transition-all duration-300 border border-white"
            >
              Our Story
            </Link>
          </div>
        </div>
        <div className="absolute bottom-12 left-1/2 transform -translate-x-1/2 text-white flex flex-col items-center opacity-80">
          <span className="text-[9px] uppercase tracking-[0.4em] mb-3 font-bold">
            Scroll
          </span>
          <span className="material-symbols-outlined text-xl animate-bounce">
            keyboard_double_arrow_down
          </span>
        </div>
      </section>

      {/* Our Collections Grid */}
      <section className="py-24 md:py-32 bg-[#FAF8F5] dark:bg-background-dark">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-20">
            <span className="text-primary text-[10px] font-bold tracking-[0.4em] uppercase block mb-4">
              Discover
            </span>
            <h2 className="text-4xl md:text-5xl font-serif text-text-main-light dark:text-text-main-dark">
              Our Collections
            </h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
            {MOCK_PRODUCTS.slice(0, 4).map((product) => (
              <Link
                to={`/product/${product.id}`}
                key={product.id}
                className="group cursor-pointer"
              >
                <div className="relative shimmer-container overflow-hidden bg-white dark:bg-surface-dark mb-6 aspect-square flex items-center justify-center p-5 transition-all duration-500 hover:shadow-2xl">
                  {/* Shimmer Effect Div */}
                  <div className="shimmer-effect"></div>

                  <img
                    alt={product.name}
                    className="w-full h-full object-contain transition-transform duration-700 group-hover:scale-105"
                    src={product.image}
                  />
                </div>
                <h3 className="text-xl font-serif mb-2 text-text-main-light dark:text-text-main-dark tracking-wide">
                  {product.name}
                </h3>
                <p className="text-text-muted-light dark:text-text-muted-dark text-[11px] font-light leading-relaxed tracking-wider uppercase mb-1">
                  {product.description}
                </p>
              </Link>
            ))}
          </div>
          <div className="text-center mt-20">
            <Link
              to="/collection"
              className="inline-block bg-white hover:bg-primary hover:text-white text-text-main-light dark:text-text-main-dark border border-gray-200 dark:border-gray-800 px-12 py-4 text-[10px] uppercase tracking-[0.3em] font-bold transition-all duration-500 shadow-sm"
            >
              View All Products
            </Link>
          </div>
        </div>
      </section>

      {/* The Koi Collection - Featured */}
      <section className="py-24 bg-white dark:bg-[#151515] overflow-hidden">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-col lg:flex-row items-center gap-20">
            <div className="w-full lg:w-1/2 relative">
              <div className="relative z-10 bg-[#FAF8F5] dark:bg-surface-dark p-8 md:p-12 shadow-2xl">
                <img
                  alt="Featured Koi"
                  className="w-full h-auto object-cover shadow-lg"
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuCH3aikQWtnP0AR_tiSIxkV76ciR09Klao68D9dQkt-J6GTO1W7m-Q1QbZAe1g7xVWZJfdUQILLOH8sq5ExRGH_PKp59RcBAl-Lygoq9GLJB9q2Y0XuzWGT4kb2xP9E-vTZ1lcrz6LRDBzQ04BB7RpfD8yWBDSDe4ieUuxnbrcQcaXjwIvM18dXp9VXxvXh-rvvELvN2hpx86u0IcfbJoxUeAp4x7uv5viUg-xw3ncqG_75HzEUUI5uskR8ku4jvrdeMMmukfaeH7nv"
                />
                <div className="absolute bottom-0 right-8 transform translate-x-4 translate-y-4 bg-primary text-white text-[9px] font-bold tracking-[0.3em] uppercase py-2.5 px-6">
                  Featured
                </div>
              </div>
            </div>
            <div className="w-full lg:w-1/2 space-y-8">
              <span className="text-primary text-[10px] font-bold tracking-[0.4em] uppercase block">
                Featured Collection
              </span>
              <h2 className="text-5xl lg:text-6xl font-serif text-text-main-light dark:text-text-main-dark leading-tight">
                The{" "}
                <span className="font-script italic text-primary text-6xl lg:text-7xl">
                  Koi
                </span>{" "}
                Collection
              </h2>
              <div className="space-y-6 text-text-muted-light dark:text-text-muted-dark font-light leading-relaxed text-sm tracking-wide">
                <p>
                  Inspired by the beautiful & colorful{" "}
                  <span className="font-bold">Koi Fish</span>, this collection
                  embodies dedication and bravery. In Japanese culture, Koi
                  symbolizes wealth, luck, victory, and above all — love.
                </p>
                <p>
                  The word 'Koi' is a homophone for 'love', meaning 'affection'
                  or 'love', making these pieces perfect symbols of connection
                  and devotion.
                </p>
              </div>
              <div className="border-l-4 border-primary pl-8 py-2">
                <p className="font-script text-3xl text-text-main-light dark:text-text-main-dark">
                  "Let's keep yourself inspired"
                </p>
              </div>
              <div className="flex flex-wrap gap-4 pt-4">
                <Link
                  to="/collection"
                  className="bg-white hover:bg-primary hover:text-white text-text-main-light dark:text-text-main-dark border border-gray-200 dark:border-gray-800 px-10 py-3.5 text-[10px] uppercase tracking-[0.2em] font-bold transition-all duration-300"
                >
                  View Collection
                </Link>
                <Link
                  to="/bespoke"
                  className="bg-white hover:bg-primary hover:text-white text-text-main-light dark:text-text-main-dark border border-gray-200 dark:border-gray-800 px-10 py-3.5 text-[10px] uppercase tracking-[0.2em] font-bold transition-all duration-300"
                >
                  Book Consultation
                </Link>
              </div>
              <div className="flex items-center gap-6 pt-6 text-[9px] font-bold tracking-[0.2em] uppercase text-text-muted-light">
                <span className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-[#E5B8A3]"></span>{" "}
                  18K Rose Gold
                </span>
                <span className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-[#B22222]"></span>{" "}
                  Red Ruby
                </span>
                <span className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-[#483D8B]"></span>{" "}
                  Colourful Sapphires
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Colour ARC Section */}
      <section className="py-24 bg-[#FAF8F5] dark:bg-background-dark">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-col lg:flex-row-reverse items-center gap-20">
            <div className="w-full lg:w-1/2 relative">
              <div className="relative z-10 bg-white dark:bg-surface-dark p-12 shadow-2xl">
                <img
                  alt="Colour ARC Ring"
                  className="w-full h-auto object-cover"
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuA8upGw2GjwEvqLetBhms9zKBgEapcZlvJ9_hYIyDc9eL990hwONLNdy3RkLQjgIpKGusXZ3OhhJhGvKR1Dr39eIsjmo4iz5XGtYS2bhXSnpY0WG_GEj9wqSd-Z36fzfezZX45MxoWR3ioocx_AA8U8PBebgzvNjpF7YyivvVq2D5X-SzApYKuDJLlF18OZyvfuXugVNNX8q74hwgcUyhP9hRPAiM8ltFdTj0eqUqNcSBaauCvUhYJ4XVvplQwjH4HuJfX7Lb_R2Agj"
                />
              </div>
            </div>
            <div className="w-full lg:w-1/2 space-y-8">
              <span className="text-primary text-[10px] font-bold tracking-[0.4em] uppercase block">
                Signature Collection
              </span>
              <h2 className="text-5xl lg:text-6xl font-serif text-text-main-light dark:text-text-main-dark leading-tight">
                Colour <span className="italic text-primary">ARC</span>
              </h2>
              <div className="space-y-6 text-text-muted-light dark:text-text-muted-dark font-light leading-relaxed text-sm tracking-wide max-w-lg">
                <p>
                  Multi colour natural{" "}
                  <span className="font-bold">sapphires</span> with{" "}
                  <span className="font-bold">pink Kunzite</span> are set to
                  reverberate playful & provocative and hyper-physical emotions.
                  The collection is inspired by dispersion of light through
                  droplets forming a{" "}
                  <span className="font-bold italic">"spectrum of colors"</span>{" "}
                  appearing in the sky.
                </p>
                <p>
                  The rainbow is pure physics and could be accurately explained
                  but at the same time there is magic and poetry in this
                  phenomenon, something beyond a pure comprehension.
                </p>
                <p className="text-[11px] italic opacity-60">
                  Made in 18K Rose & Yellow Gold studded with beautiful Pink
                  Kunzite & Colorful Sapphires.
                </p>
              </div>
              <div className="pt-6">
                <Link
                  to="/collection"
                  className="bg-white hover:bg-primary hover:text-white text-text-main-light dark:text-text-main-dark border border-gray-200 dark:border-gray-800 px-12 py-4 text-[10px] uppercase tracking-[0.3em] font-bold transition-all duration-300"
                >
                  Explore Collection
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Categories */}
      <section className="py-24 bg-white dark:bg-[#121212]">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <span className="text-primary text-[10px] font-bold tracking-[0.4em] uppercase block mb-4">
              More to Explore
            </span>
            <h2 className="text-4xl md:text-5xl font-serif text-text-main-light dark:text-text-main-dark">
              Featured Categories
            </h2>
            <div className="w-16 h-0.5 bg-primary mx-auto mt-8"></div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <Link
              to="/collection"
              className="group relative h-[400px] overflow-hidden"
            >
              <img
                alt="Fine Jewelry Category"
                className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuCfCSU1KzwU-olDeVOj_GuAGOk-0cB5clAwz-JkZd-8GcKpNa2BokXMG2rDpzUgImmAlp7XeY1jzNdNGqYbcRYHWI4cgtvcknyJjDtID8fsXnLbwyPfO4WiGD8adDmqDDgshIW3SoxRhTFheSsVoinIGZHVCMO3vmO0FUlc4QoBb-9Wq55YTdZbAhzlROWBWlRtiBaS7PCH30t8-qVyitPBa-zutAA4t6EsNAZlkJBqhHlMk2J2_phuKTWZmtPvpWzCwFsRsEBr1ZtZ"
              />
              <div className="absolute inset-0 bg-black/30 group-hover:bg-black/40 transition-colors"></div>
              <div className="absolute bottom-10 left-10">
                <h3 className="text-3xl text-white font-serif tracking-wide">
                  Fine Jewelry
                </h3>
              </div>
            </Link>
            <Link
              to="/collection"
              className="group relative h-[400px] overflow-hidden"
            >
              <img
                alt="S-Orbit Category"
                className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuDukxcd8Ejhy3YefoVjo0Qbm33LM4U_ETtt5UwJXLK8hdMqnKobhYmi5S5KuzKnIdHMbvI1ghh89DJL0kc-UpZ3HLt8r-gZpIMdi8ZLL97IyuoI5dgiwCsb1UE9VB4aj74lFyWb9TzS60bMt1un_6_wtwhZumCM6ndlOK2VtrxeuYyf5seI5uBFqjuyUmo-MmFf7_NBoNLIaEFJCi91oeVvJ9qr2whukQvYM_tYY72KzyvYWVOUFFVmFt200Os0cA3zPjS-61KE0Mpu"
              />
              <div className="absolute inset-0 bg-black/30 group-hover:bg-black/40 transition-colors"></div>
              <div className="absolute bottom-10 left-10">
                <h3 className="text-3xl text-white font-serif tracking-wide">
                  S-Orbit
                </h3>
              </div>
            </Link>
          </div>
        </div>
      </section>

      {/* Craftsmanship Highlights */}
      <section className="py-24 bg-[#FAF8F5] dark:bg-background-dark">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-20">
            <div className="w-12 h-0.5 bg-primary mx-auto mb-10"></div>
            <h2 className="text-4xl md:text-5xl font-serif text-text-main-light dark:text-text-main-dark mb-4">
              The Art of{" "}
              <span className="font-serif italic text-primary">
                Craftsmanship
              </span>
            </h2>
            <p className="text-text-muted-light dark:text-text-muted-dark text-[13px] tracking-widest uppercase font-bold max-w-2xl mx-auto opacity-70">
              Behind every piece lies a story of dedication, skill and an
              unwavering commitment to perfection.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                icon: "diamond",
                title: "Ethically Sourced",
                text: "Every gemstone is carefully selected and ethically sourced from trusted partners worldwide.",
              },
              {
                icon: "handyman",
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
                className="bg-white dark:bg-surface-dark p-12 text-center transition-all duration-500 hover:shadow-xl group border border-gray-100 dark:border-gray-800"
              >
                <div className="w-16 h-16 rounded-full border border-primary/20 flex items-center justify-center mx-auto mb-8 text-primary group-hover:bg-primary group-hover:text-white transition-all duration-500 shadow-sm">
                  <span className="material-icons-outlined text-2xl">
                    {item.icon}
                  </span>
                </div>
                <h3 className="text-xl font-serif mb-4 text-text-main-light dark:text-text-main-dark">
                  {item.title}
                </h3>
                <p className="text-[11px] text-text-muted-light dark:text-text-muted-dark leading-relaxed font-light tracking-wider">
                  {item.text}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Final Journey CTA */}
      <section className="py-28 bg-white dark:bg-[#121212] relative overflow-hidden">
        <div className="absolute top-10 left-10 w-20 h-20 border-t-2 border-l-2 border-primary/20 pointer-events-none"></div>
        <div className="absolute bottom-10 right-10 w-20 h-20 border-b-2 border-r-2 border-primary/20 pointer-events-none"></div>
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h2 className="text-5xl md:text-7xl font-serif text-text-main-light dark:text-text-main-dark mb-6">
            Begin Your{" "}
            <span className="font-script text-primary italic text-6xl md:text-8xl block mt-2">
              Journey
            </span>
          </h2>
          <p className="text-text-muted-light dark:text-text-muted-dark font-light mb-14 max-w-lg mx-auto text-sm tracking-widest italic opacity-80">
            Let us help you find the perfect piece that tells your unique story.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-6">
            <Link
              to="/bespoke"
              className="bg-primary hover:bg-primary-hover text-white px-12 py-4 text-[10px] uppercase tracking-[0.3em] font-bold shadow-xl transition-all duration-500 transform hover:-translate-y-1"
            >
              Schedule Consultation
            </Link>
            <Link
              to="/collection"
              className="bg-white hover:bg-gray-50 text-text-main-light dark:text-text-main-dark border border-gray-200 dark:border-gray-800 px-12 py-4 text-[10px] uppercase tracking-[0.3em] font-bold transition-all duration-500"
            >
              View All Collections
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
