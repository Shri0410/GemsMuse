import React from "react";
import { Link } from "react-router-dom";

const Services = () => {
  return (
    <div className="pt-20">
      <section className="relative h-[60vh] min-h-[500px] flex items-center justify-center bg-background-dark overflow-hidden mt-[108px] md:mt-[132px]">
        <div className="absolute inset-0 z-0">
          <img
            alt="Luxury Background"
            className="w-full h-full object-cover opacity-50"
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuDukxcd8Ejhy3YefoVjo0Qbm33LM4U_ETtt5UwJXLK8hdMqnKobhYmi5S5KuzKnIdHMbvI1ghh89DJL0kc-UpZ3HLt8r-gZpIMdi8ZLL97IyuoI5dgiwCsb1UE9VB4aj74lFyWb9TzS60bMt1un_6_wtwhZumCM6ndlOK2VtrxeuYyf5seI5uBFqjuyUmo-MmFf7_NBoNLIaEFJCi91oeVvJ9qr2whukQvYM_tYY72KzyvYWVOUFFVmFt200Os0cA3zPjS-61KE0Mpu"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/20 to-background-light dark:to-background-dark"></div>
        </div>
        <div className="relative z-10 text-center px-4 max-w-4xl mx-auto mt-8">
          <p className="text-primary text-xs md:text-sm tracking-[0.3em] uppercase mb-4 animate-fade-in-up">
            Craftsmanship & Care
          </p>
          <h1 className="text-5xl md:text-7xl text-white font-serif mb-6 leading-tight">
            Products{" "}
            <span className="font-script text-primary text-6xl md:text-8xl ml-2">
              {" "}
              & Services
            </span>
          </h1>
          <p className="text-gray-200 text-sm md:text-base max-w-xl mx-auto font-light tracking-wide leading-relaxed">
            Explore our exquisite range of jewelry masterpieces and the
            dedicated services we offer to maintain their timeless beauty.
          </p>
        </div>
      </section>

      <section className="py-20 bg-background-light dark:bg-background-dark">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
            {[
              {
                title: "Rings",
                image:
                  "https://lh3.googleusercontent.com/aida-public/AB6AXuDq5SW83WjWBZfz0rkOUkKTMx9NFRIjpr6Zbo1zToJ5UbrD4SmkFtkeoG-7JclGWZmyNeenmmgSwRTIIfmEekgtHB4gIt1luzcnQejPDFxFiKwkvBnPVQp0MpvrnxvDqZznMibxkN1tZ7poUXF3Tdo6Zxo3zp_4qA4b37G-XJWbfYksDEVu1GPpI0lljEmoLjLfrt9CzgWgPkxeUBqlYSnjeoTa4_oREKWz4MYfKaz53ktBN5RKkET-4djZBDhp6HfjXgp2DLrj_4h-",
                desc: "Symbols of eternal bonds.",
              },
              {
                title: "Necklaces",
                image:
                  "https://lh3.googleusercontent.com/aida-public/AB6AXuCfCSU1KzwU-olDeVOj_GuAGOk-0cB5clAwz-JkZd-8GcKpNa2BokXMG2rDpzUgImmAlp7XeY1jzNdNGqYbcRYHWI4cgtvcknyJjDtID8fsXnLbwyPfO4WiGD8adDmqDDgshIW3SoxRhTFheSsVoinIGZHVCMO3vmO0FUlc4QoBb-9Wq55YTdZbAhzlROWBWlRtiBaS7PCH30t8-qVyitPBa-zutAA4t6EsNAZlkJBqhHlMk2J2_phuKTWZmtPvpWzCwFsRsEBr1ZtZ",
                desc: "Graceful adornments.",
              },
              {
                title: "Earrings",
                image:
                  "https://lh3.googleusercontent.com/aida-public/AB6AXuClB3689FLlPF7M3O8nXHd721WOkrjrHIVygOZhCoKulF3crRcMYnjCUVxjl6w9hp3GdMpvc7VSlgmNAy25DELz38xs5xMDoqzEuH2UZvAOBCreWa_qxckr1w5-gxRxtS_DNp53w1H8xlKh2erSi_HzUtjOquxQO_Gx0F-IYXFZPGK6egn9mxCe4IOSbddBzhOE_ljWJk5Ka976G8C-ZeI146JStEqst5it3YbWS2SD4a1G_pZhZQj1d_ucw6yNSFnwdscFNAXP58sC",
                desc: "Captivating designs.",
              },
            ].map((cat, idx) => (
              <Link to="/collection" key={idx} className="group text-center">
                <div className="relative overflow-hidden bg-white dark:bg-surface-dark mb-8 aspect-[4/5] flex items-center justify-center shadow-sm hover:shadow-xl transition-all duration-500 rounded-sm">
                  <img
                    src={cat.image}
                    alt={cat.title}
                    className="w-3/4 object-contain transition-transform group-hover:scale-110"
                  />
                </div>
                <h3 className="text-2xl font-serif mb-2">{cat.title}</h3>
                <p className="text-text-muted-light dark:text-text-muted-dark text-sm font-light">
                  {cat.desc}
                </p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 md:py-28 bg-[#F5F2EE] dark:bg-[#1a1a1a]">
        <div className="max-w-7xl mx-auto px-6 flex flex-col lg:flex-row gap-16 lg:gap-24 items-start">
          <div className="w-full lg:w-5/12 sticky top-28">
            <div className="relative">
              <div className="absolute -top-6 -left-6 w-24 h-24 border-t border-l border-primary/50"></div>
              <img
                alt="Jewelry Services"
                className="w-full h-auto object-cover shadow-xl"
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuDZTAhAvNpttkKYkJlJfryS344gRgqpcl4SLVrDbSlj2-9QLYUJgg-ZiYFNMdljkwuXsGQEFM9f3vbRpEGUqVmiZrFyLbcJuWwni2lz_mghpCcUnjroQ8en2SNSEDvkwf-H9YQlhDEV1bc4m8TOVZ_a6c36AoY2qAkmGor3LRAZORdWX35GX45zq6f6zqxU1vNO1WkCt9QlPfW-w9kE_6mf5SnHtDxjfCkpUGlfSLedBgshb5iq6OWB7L7vvMtJZ30yYEi3EMzZQqH9"
              />
              <div className="absolute bottom-8 right-8 bg-white dark:bg-surface-dark p-8 shadow-xl max-w-xs hidden md:block">
                <p className="font-serif italic text-xl leading-relaxed">
                  "Preserving the legacy of your most cherished pieces."
                </p>
              </div>
            </div>
          </div>
          <div className="w-full lg:w-7/12">
            <span className="text-primary text-xs font-bold tracking-[0.2em] uppercase block mb-3">
              At Your Service
            </span>
            <h2 className="text-4xl md:text-5xl font-serif mb-8">
              Comprehensive Care
            </h2>
            <div className="space-y-4">
              {[
                {
                  icon: "edit",
                  title: "Bespoke Design",
                  text: "Bring your dream jewelry to life with our master jewelers.",
                },
                {
                  icon: "build",
                  title: "Repairs & Restoration",
                  text: "Resizing, stone resetting, and restoring historical pieces.",
                },
                {
                  icon: "diamond",
                  title: "Professional Cleaning",
                  text: "Ultrasonic and steam cleaning to ensure perfection.",
                },
                {
                  icon: "support_agent",
                  title: "Virtual Consultations",
                  text: "Expert styling advice from the comfort of your home.",
                },
              ].map((service, idx) => (
                <div
                  key={idx}
                  className="bg-white dark:bg-surface-dark border-l-2 border-transparent hover:border-primary p-6 shadow-sm flex items-center gap-6 cursor-pointer transition-all"
                >
                  <span className="material-icons-outlined text-primary text-2xl">
                    {service.icon}
                  </span>
                  <div>
                    <h4 className="font-serif text-xl tracking-wide">
                      {service.title}
                    </h4>
                    <p className="text-text-muted-light dark:text-text-muted-dark text-sm font-light">
                      {service.text}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Services;
