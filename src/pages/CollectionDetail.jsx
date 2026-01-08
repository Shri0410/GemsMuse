import React, { useMemo } from "react";
import { useParams, Link } from "react-router-dom";
import { MOCK_PRODUCTS } from "../constants";

const COLLECTION_METADATA = {
  koi: {
    title: "The",
    script: "Koi",
    banner:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuCH3aikQWtnP0AR_tiSIxkV76ciR09Klao68D9dQkt-J6GTO1W7m-Q1QbZAe1g7xVWZJfdUQILLOH8sq5ExRGH_PKp59RcBAl-Lygoq9GLJB9q2Y0XuzWGT4kb2xP9E-vTZ1lcrz6LRDBzQ04BB7RpfD8yWBDSDe4ieUuxnbrcQcaXjwIvM18dXp9VXxvXh-rvvELvN2hpx86u0IcfbJoxUeAp4x7uv5viUg-xw3ncqG_75HzEUUI5uskR8ku4jvrdeMMmukfaeH7nv",
    description:
      "Inspired by the vibrant and graceful Koi fish, a symbol of bravery, strength, and love in Japanese culture. Each piece captures the fluid motion and vivid scales of these legendary creatures.",
    philosophy: "Strength through grace, love through persistence.",
  },
  arc: {
    title: "Colour",
    script: "ARC",
    banner:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuA8upGw2GjwEvqLetBhms9zKBgEapcZlvJ9_hYIyDc9eL990hwONLNdy3RkLQjgIpKGusXZ3OhhJhGvKR1Dr39eIsjmo4iz5XGtYS2bhXSnpY0WG_GEj9wqSd-Z36fzfezZX45MxoWR3ioocx_AA8U8PBebgzvNjpF7YyivvVq2D5X-SzApYKuDJLlF18OZyvfuXugVNNX8q74hwgcUyhP9hRPAiM8ltFdTj0eqUqNcSBaauCvUhYJ4XVvplQwjH4HuJfX7Lb_R2Agj",
    description:
      "A celebration of light dispersion and natural vibrance. Multi-color natural sapphires and pink Kunzite are set to reverberate playful, hyper-physical emotions.",
    philosophy: "A spectrum of magic found in the physics of light.",
  },
  maa: {
    title: "Heritage",
    script: "Maa",
    banner:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuCfCSU1KzwU-olDeVOj_GuAGOk-0cB5clAwz-JkZd-8GcKpNa2BokXMG2rDpzUgImmAlp7XeY1jzNdNGqYbcRYHWI4cgtvcknyJjDtID8fsXnLbwyPfO4WiGD8adDmqDDgshIW3SoxRhTFheSsVoinIGZHVCMO3vmO0FUlc4QoBb-9Wq55YTdZbAhzlROWBWlRtiBaS7PCH30t8-qVyitPBa-zutAA4t6EsNAZlkJBqhHlMk2J2_phuKTWZmtPvpWzCwFsRsEBr1ZtZ",
    description:
      "Traditional motifs reimagined for the modern era. The Maa collection celebrates roots, heritage, and the eternal bond of family.",
    philosophy: "Yesterday's artistry, today's treasures.",
  },
  cuddle: {
    title: "Playful",
    script: "Cuddle",
    banner:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuDukxcd8Ejhy3YefoVjo0Qbm33LM4U_ETtt5UwJXLK8hdMqnKobhYmi5S5KuzKnIdHMbvI1ghh89DJL0kc-UpZ3HLt8r-gZpIMdi8ZLL97IyuoI5dgiwCsb1UE9VB4aj74lFyWb9TzS60bMt1un_6_wtwhZumCM6ndlOK2VtrxeuYyf5seI5uBFqjuyUmo-MmFf7_NBoNLIaEFJCi91oeVvJ9qr2whukQvYM_tYY72KzyvYWVOUFFVmFt200Os0cA3zPjS-61KE0Mpu",
    description:
      "Delicate charms and whimsical designs for the next generation of muses. Crafted with safety and joy in mind.",
    philosophy: "First memories in fine jewelry.",
  },
  orbit: {
    title: "Modern",
    script: "Orbit",
    banner:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuClB3689FLlPF7M3O8nXHd721WOkrjrHIVygOZhCoKulF3crRcMYnjCUVxjl6w9hp3GdMpvc7VSlgmNAy25DELz38xs5xMDoqzEuH2UZvAOBCreWa_qxckr1w5-gxRxtS_DNp53w1H8xlKh2erSi_HzUtjOquxQO_Gx0F-IYXFZPGK6egn9mxCe4IOSbddBzhOE_ljWJk5Ka976G8C-ZeI146JStEqst5it3YbWS2SD4a1G_pZhZQj1d_ucw6yNSFnwdscFNAXP58sC",
    description:
      "Architectural precision meets high polish. The S-Orbit series focuses on the purity of the circle and the gravity of gold.",
    philosophy: "Geometric harmony in motion.",
  },
  lunar: {
    title: "Celestial",
    script: "Lunar",
    banner:
      "https://images.unsplash.com/photo-1573408301185-9146fe634ad0?q=80&w=2000&auto=format&fit=crop",
    description:
      "Capturing the ethereal glow of moonlight on midnight waves. White gold, platinum, and brilliant diamonds dominate this celestial series.",
    philosophy: "Adorned in starlight.",
  },
  heritage: {
    title: "Timeless",
    script: "Heritage",
    banner:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuDZTAhAvNpttkKYkJlJfryS344gRgqpcl4SLVrDbSlj2-9QLYUJgg-ZiYFNMdljkwuXsGQEFM9f3vbRpEGUqVmiZrFyLbcJuWwni2lz_mghpCcUnjroQ8en2SNSEDvkwf-H9YQlhDEV1bc4m8TOVZ_a6c36AoY2qAkmGor3LRAZORdWX35GX45zq6f6zqxU1vNO1WkCt9QlPfW-w9kE_6mf5SnHtDxjfCkpUGlfSLedBgshb5iq6OWB7L7vvMtJZ30yYEi3EMzZQqH9",
    description:
      "Exceptional gemstones meet vintage-inspired settings. These are pieces destined to become future antiques.",
    philosophy: "Forging the antiques of tomorrow.",
  },
  zen: {
    title: "Pure",
    script: "Zen",
    banner:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuDq5SW83WjWBZfz0rkOUkKTMx9NFRIjpr6Zbo1zToJ5UbrD4SmkFtkeoG-7JclGWZmyNeenmmgSwRTIIfmEekgtHB4gIt1luzcnQejPDFxFiKwkvBnPVQp0MpvrnxvDqZznMibxkN1tZ7poUXF3Tdo6Zxo3zp_4qA4b37G-XJWbfYksDEVu1GPpI0lljEmoLjLfrt9CzgWgPkxeUBqlYSnjeoTa4_oREKWz4MYfKaz53ktBN5RKkET-4djZBDhp6HfjXgp2DLrj_4h-",
    description:
      "Minimalism at its most luxurious. Clean lines, balanced proportions, and a focus on the tactile quality of 18K yellow gold.",
    philosophy: "Silence as an adornment.",
  },
};

const CollectionDetail = () => {
  const { collectionId } = useParams();

  const meta = useMemo(
    () =>
      COLLECTION_METADATA[collectionId || ""] || {
        title: "The",
        script: "Collection",
        banner:
          "https://images.unsplash.com/photo-1531995811006-35cb42e1a022?q=80&w=2070&auto=format&fit=crop",
        description:
          "Discover our curated selection of fine jewelry masterpieces.",
        philosophy: "Timeless elegance for the modern muse.",
      },
    [collectionId]
  );

  const products = useMemo(
    () => MOCK_PRODUCTS.filter((p) => p.collection === collectionId),
    [collectionId]
  );

  return (
    <div className="pt-0 bg-background-light dark:bg-background-dark min-h-screen">
      {/* Immersive Hero */}
      <section className="relative h-[85vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img
            alt={meta.script}
            className="w-full h-full object-cover animate-fade-in transition-transform duration-[10s] hover:scale-110"
            src={meta.banner}
          />
          <div className="absolute inset-0 bg-black/40"></div>
          <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-transparent to-background-light dark:to-background-dark"></div>
        </div>

        <div className="relative z-10 text-center px-6 max-w-5xl mx-auto">
          <Link
            to="/collection"
            className="inline-flex items-center gap-2 text-white/60 hover:text-primary text-[10px] uppercase tracking-[0.4em] mb-8 transition-all"
          >
            <span className="material-icons-outlined text-sm">west</span> Back
            to Galleries
          </Link>
          <span className="text-primary text-[10px] md:text-xs tracking-[0.6em] uppercase mb-6 block animate-fade-in-up font-bold">
            Fine Jewelry Curation
          </span>
          <h1 className="text-6xl md:text-8xl lg:text-9xl text-white font-serif mb-8 leading-tight animate-fade-in-up">
            {meta.title}{" "}
            <span className="font-script text-primary text-7xl md:text-9xl lg:text-[11rem] block -mt-6 italic">
              {meta.script}
            </span>
          </h1>
          <div className="w-px h-24 bg-primary mx-auto opacity-50 animate-fade-in [animation-delay:0.5s]"></div>
        </div>
      </section>

      {/* Narrative Section */}
      <section className="py-24 md:py-32 bg-white dark:bg-background-dark relative">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <span className="material-icons-outlined text-primary text-4xl mb-8 opacity-30">
            diamond
          </span>
          <h2 className="text-3xl md:text-4xl font-serif text-text-main-light dark:text-text-main-dark mb-10 leading-relaxed">
            "{meta.philosophy}"
          </h2>
          <p className="text-text-muted-light dark:text-text-muted-dark font-light leading-relaxed text-lg tracking-wide max-w-2xl mx-auto mb-16">
            {meta.description}
          </p>
        </div>
      </section>

      {/* Product Grid */}
      <section className="py-24 bg-[#FAF8F5] dark:bg-[#121212]">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex justify-between items-end mb-16 border-b border-gray-100 dark:border-gray-800 pb-8">
            <div>
              <span className="text-primary text-[10px] font-bold tracking-[0.4em] uppercase block mb-2">
                Catalogue
              </span>
              <h3 className="text-2xl md:text-3xl font-serif">The Pieces</h3>
            </div>
            <div className="text-[10px] font-bold uppercase tracking-widest text-text-muted-light">
              Showing {products.length} Curated Treasures
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-12 lg:gap-16">
            {products.map((product) => (
              <Link
                key={product.id}
                to={`/product/${product.id}`}
                className="group luxury-frame block"
              >
                <div className="relative aspect-[4/5] bg-white dark:bg-surface-dark flex items-center justify-center p-12 overflow-hidden shadow-sm transition-all duration-700 group-hover:shadow-2xl">
                  <div className="shimmer-effect"></div>
                  <img
                    alt={product.name}
                    className="w-full h-full object-contain transition-all duration-1000 group-hover:scale-110 group-hover:rotate-2"
                    src={product.image}
                  />
                  <div className="absolute bottom-0 inset-x-0 p-6 bg-white/90 dark:bg-surface-dark/90 backdrop-blur-md translate-y-full group-hover:translate-y-0 transition-transform duration-500 text-center border-t border-gray-100 dark:border-gray-800">
                    <span className="text-[9px] font-bold uppercase tracking-[0.4em] text-primary">
                      Discover Details
                    </span>
                  </div>
                </div>

                <div className="mt-8 text-center space-y-2">
                  <h4 className="text-xl font-serif text-text-main-light dark:text-text-main-dark group-hover:text-primary transition-colors">
                    {product.name}
                  </h4>
                  <p className="text-[10px] text-text-muted-light dark:text-text-muted-dark uppercase tracking-[0.2em] font-medium">
                    {product.material}
                  </p>
                  <p className="text-sm font-bold text-primary tracking-widest">
                    ${product.price.toLocaleString()}
                  </p>
                </div>
              </Link>
            ))}
          </div>

          {products.length === 0 && (
            <div className="py-32 text-center">
              <span className="material-icons-outlined text-6xl text-gray-200 dark:text-gray-800 mb-6">
                diamond
              </span>
              <p className="text-text-muted-light font-serif text-xl italic">
                This collection is currently being prepared for the next
                unveiling.
              </p>
              <Link
                to="/collection"
                className="mt-8 inline-block text-primary text-[10px] font-bold uppercase tracking-[0.3em] border-b border-primary/20 pb-1 hover:border-primary transition-all"
              >
                Explore Other Galleries
              </Link>
            </div>
          )}
        </div>
      </section>
    </div>
  );
};

export default CollectionDetail;
