import React from "react";
import { Link } from "react-router-dom";

const COLLECTIONS = [
  {
    id: "koi",
    name: "The Koi Collection",
    subtitle: "Inspired by Japanese Artistry",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuCH3aikQWtnP0AR_tiSIxkV76ciR09Klao68D9dQkt-J6GTO1W7m-Q1QbZAe1g7xVWZJfdUQILLOH8sq5ExRGH_PKp59RcBAl-Lygoq9GLJB9q2Y0XuzWGT4kb2xP9E-vTZ1lcrz6LRDBzQ04BB7RpfD8yWBDSDe4ieUuxnbrcQcaXjwIvM18dXp9VXxvXh-rvvELvN2hpx86u0IcfbJoxUeAp4x7uv5viUg-xw3ncqG_75HzEUUI5uskR8ku4jvrdeMMmukfaeH7nv",
  },
  {
    id: "arc",
    name: "Colour ARC",
    subtitle: "Spectrum of Light",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuA8upGw2GjwEvqLetBhms9zKBgEapcZlvJ9_hYIyDc9eL990hwONLNdy3RkLQjgIpKGusXZ3OhhJhGvKR1Dr39eIsjmo4iz5XGtYS2bhXSnpY0WG_GEj9wqSd-Z36fzfezZX45MxoWR3ioocx_AA8U8PBebgzvNjpF7YyivvVq2D5X-SzApYKuDJLlF18OZyvfuXugVNNX8q74hwgcUyhP9hRPAiM8ltFdTj0eqUqNcSBaauCvUhYJ4XVvplQwjH4HuJfX7Lb_R2Agj",
  },
  {
    id: "maa",
    name: "Maa Collection",
    subtitle: "Heritage & Legacy",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuCfCSU1KzwU-olDeVOj_GuAGOk-0cB5clAwz-JkZd-8GcKpNa2BokXMG2rDpzUgImmAlp7XeY1jzNdNGqYbcRYHWI4cgtvcknyJjDtID8fsXnLbwyPfO4WiGD8adDmqDDgshIW3SoxRhTFheSsVoinIGZHVCMO3vmO0FUlc4QoBb-9Wq55YTdZbAhzlROWBWlRtiBaS7PCH30t8-qVyitPBa-zutAA4t6EsNAZlkJBqhHlMk2J2_phuKTWZmtPvpWzCwFsRsEBr1ZtZ",
  },
  {
    id: "cuddle",
    name: "Cuddle Kids",
    subtitle: "Playful Charms",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuDukxcd8Ejhy3YefoVjo0Qbm33LM4U_ETtt5UwJXLK8hdMqnKobhYmi5S5KuzKnIdHMbvI1ghh89DJL0kc-UpZ3HLt8r-gZpIMdi8ZLL97IyuoI5dgiwCsb1UE9VB4aj74lFyWb9TzS60bMt1un_6_wtwhZumCM6ndlOK2VtrxeuYyf5seI5uBFqjuyUmo-MmFf7_NBoNLIaEFJCi91oeVvJ9qr2whukQvYM_tYY72KzyvYWVOUFFVmFt200Os0cA3zPjS-61KE0Mpu",
  },
  {
    id: "orbit",
    name: "S-Orbit",
    subtitle: "Modern Geometry",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuClB3689FLlPF7M3O8nXHd721WOkrjrHIVygOZhCoKulF3crRcMYnjCUVxjl6w9hp3GdMpvc7VSlgmNAy25DELz38xs5xMDoqzEuH2UZvAOBCreWa_qxckr1w5-gxRxtS_DNp53w1H8xlKh2erSi_HzUtjOquxQO_Gx0F-IYXFZPGK6egn9mxCe4IOSbddBzhOE_ljWJk5Ka976G8C-ZeI146JStEqst5it3YbWS2SD4a1G_pZhZQj1d_ucw6yNSFnwdscFNAXP58sC",
  },
  {
    id: "lunar",
    name: "Lunar Aura",
    subtitle: "Celestial Glow",
    image:
      "https://images.unsplash.com/photo-1573408301185-9146fe634ad0?q=80&w=2000&auto=format&fit=crop",
  },
  {
    id: "heritage",
    name: "Heritage Gems",
    subtitle: "Vintage Masterpieces",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuDZTAhAvNpttkKYkJlJfryS344gRgqpcl4SLVrDbSlj2-9QLYUJgg-ZiYFNMdljkwuXsGQEFM9f3vbRpEGUqVmiZrFyLbcJuWwni2lz_mghpCcUnjroQ8en2SNSEDvkwf-H9YQlhDEV1bc4m8TOVZ_a6c36AoY2qAkmGor3LRAZORdWX35GX45zq6f6zqxU1vNO1WkCt9QlPfW-w9kE_6mf5SnHtDxjfCkpUGlfSLedBgshb5iq6OWB7L7vvMtJZ30yYEi3EMzZQqH9",
  },
  {
    id: "zen",
    name: "Zen Minimalist",
    subtitle: "Architectural Gold",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuDq5SW83WjWBZfz0rkOUkKTMx9NFRIjpr6Zbo1zToJ5UbrD4SmkFtkeoG-7JclGWZmyNeenmmgSwRTIIfmEekgtHB4gIt1luzcnQejPDFxFiKwkvBnPVQp0MpvrnxvDqZznMibxkN1tZ7poUXF3Tdo6Zxo3zp_4qA4b37G-XJWbfYksDEVu1GPpI0lljEmoLjLfrt9CzgWgPkxeUBqlYSnjeoTa4_oREKWz4MYfKaz53ktBN5RKkET-4djZBDhp6HfjXgp2DLrj_4h-",
  },
];

const Collection = () => {
  return (
    <div className="pt-20">
      {/* Editorial Header */}
      <section className="relative h-[60vh] flex items-center justify-center bg-background-dark overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img
            alt="The Collections"
            className="w-full h-full object-cover opacity-60"
            src="https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?q=80&w=2070&auto=format&fit=crop"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-transparent to-background-light dark:to-background-dark"></div>
        </div>
        <div className="relative z-10 text-center px-4 max-w-4xl mx-auto mt-16">
          <span className="text-primary text-[10px] md:text-xs tracking-[0.5em] uppercase mb-4 block animate-fade-in font-bold">
            The House of Gems Muse
          </span>
          <h1 className="text-6xl md:text-8xl text-white font-serif mb-6 leading-tight">
            The{" "}
            <span className="font-script text-primary text-7xl md:text-[10rem] block -mt-4 italic">
              Galleries
            </span>
          </h1>
          <p className="text-gray-300 text-sm md:text-base max-w-xl mx-auto font-light tracking-widest leading-relaxed">
            Explore our curated collections, each a distinct narrative of
            artistry, heritage, and refined luxury.
          </p>
        </div>
      </section>

      {/* Collection Grid */}
      <section className="py-24 bg-background-light dark:bg-background-dark">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-16">
            {COLLECTIONS.map((collection) => (
              <Link
                key={collection.id}
                to={`/collections/${collection.id}`}
                className="group luxury-frame block relative overflow-hidden bg-white dark:bg-surface-dark shadow-sm hover:shadow-2xl transition-all duration-700"
              >
                <div className="aspect-[16/9] md:aspect-[4/3] relative overflow-hidden">
                  <div className="shimmer-effect"></div>
                  <img
                    src={collection.image}
                    alt={collection.name}
                    className="w-full h-full object-cover transition-transform duration-[2s] group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-colors duration-500"></div>
                </div>

                <div className="p-8 md:p-12 text-center relative z-20">
                  <span className="text-primary text-[10px] font-bold tracking-[0.4em] uppercase block mb-3 group-hover:tracking-[0.6em] transition-all duration-500">
                    {collection.subtitle}
                  </span>
                  <h3 className="text-3xl md:text-4xl font-serif text-text-main-light dark:text-text-main-dark mb-6 group-hover:text-primary transition-colors">
                    {collection.name}
                  </h3>
                  <div className="inline-block border-b border-primary/20 pb-1 group-hover:border-primary transition-all">
                    <span className="text-[10px] uppercase tracking-[0.3em] font-bold">
                      Discover the Narrative
                    </span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Bespoke Invitation */}
      <section className="py-32 bg-[#121212] relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-full opacity-10 pointer-events-none">
          <svg
            width="100%"
            height="100%"
            viewBox="0 0 100 100"
            preserveAspectRatio="none"
          >
            <pattern
              id="grid-bg"
              width="10"
              height="10"
              patternUnits="userSpaceOnUse"
            >
              <path
                d="M 10 0 L 0 0 0 10"
                fill="none"
                stroke="#C5A065"
                strokeWidth="0.5"
              />
            </pattern>
            <rect width="100%" height="100%" fill="url(#grid-bg)" />
          </svg>
        </div>
        <div className="max-w-4xl mx-auto px-6 text-center relative z-10">
          <h2 className="text-4xl md:text-6xl font-serif text-white mb-8">
            Beyond the <span className="italic text-primary">Galleries</span>
          </h2>
          <p className="text-gray-400 font-light mb-12 max-w-lg mx-auto text-sm tracking-widest leading-relaxed">
            Each collection is a starting point. We invite you to collaborate
            with our master artisans to create a bespoke piece that is uniquely
            yours.
          </p>
          <Link
            to="/bespoke"
            className="bg-primary hover:bg-primary-hover text-white px-12 py-4 text-[10px] uppercase tracking-[0.3em] font-bold shadow-xl transition-all duration-500"
          >
            Start Your Bespoke Journey
          </Link>
        </div>
      </section>
    </div>
  );
};

export default Collection;
