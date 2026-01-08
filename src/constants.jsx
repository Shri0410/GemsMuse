import React from "react";

// Mock types (you would normally import these)
const Product = {};
const Booking = {};

export const COLORS = {
  primary: "#C5A065",
  primaryHover: "#b08d55",
};

export const MOCK_PRODUCTS = [
  // KOI COLLECTION
  {
    id: "1",
    name: "Koi Earrings",
    category: "Earrings",
    collection: "koi",
    price: 1290,
    material: "18K Gold & Ruby",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuClB3689FLlPF7M3O8nXHd721WOkrjrHIVygOZhCoKulF3crRcMYnjCUVxjl6w9hp3GdMpvc7VSlgmNAy25DELz38xs5xMDoqzEuH2UZvAOBCreWa_qxckr1w5-gxRxtS_DNp53w1H8xlKh2erSi_HzUtjOquxQO_Gx0F-IYXFZPGK6egn9mxCe4IOSbddBzhOE_ljWJk5Ka976G8C-ZeI146JStEqst5it3YbWS2SD4a1G_pZhZQj1d_ucw6yNSFnwdscFNAXP58sC",
    description: "Fluid designs inspired by Japanese artistry.",
  },
  {
    id: "k2",
    name: "Koi Silk Pendant",
    category: "Necklaces",
    collection: "koi",
    price: 2400,
    material: "18K Rose Gold",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuDukxcd8Ejhy3YefoVjo0Qbm33LM4U_ETtt5UwJXLK8hdMqnKobhYmi5S5KuzKnIdHMbvI1ghh89DJL0kc-UpZ3HLt8r-gZpIMdi8ZLL97IyuoI5dgiwCsb1UE9VB4aj74lFyWb9TzS60bMt1un_6_wtwhZumCM6ndlOK2VtrxeuYyf5seI5uBFqjuyUmo-MmFf7_NBoNLIaEFJCi91oeVvJ9qr2whukQvYM_tYY72KzyvYWVOUFFVmFt200Os0cA3zPjS-61KE0Mpu",
    description:
      "A delicate necklace capturing the graceful movement of Koi swimming.",
  },
  {
    id: "k3",
    name: "Koi Bravery Ring",
    category: "Rings",
    collection: "koi",
    price: 1850,
    material: "18K Gold & Sapphire",
    isBestSeller: true,
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuDq5SW83WjWBZfz0rkOUkKTMx9NFRIjpr6Zbo1zToJ5UbrD4SmkFtkeoG-7JclGWZmyNeenmmgSwRTIIfmEekgtHB4gIt1luzcnQejPDFxFiKwkvBnPVQp0MpvrnxvDqZznMibxkN1tZ7poUXF3Tdo6Zxo3zp_4qA4b37G-XJWbfYksDEVu1GPpI0lljEmoLjLfrt9CzgWgPkxeUBqlYSnjeoTa4_oREKWz4MYfKaz53ktBN5RKkET-4djZBDhp6HfjXgp2DLrj_4h-",
    description:
      "Bold textures meet refined craftsmanship in this signature ring.",
  },

  // ARC COLLECTION
  {
    id: "5",
    name: "Spectrum Sapphire Ring",
    category: "Rings",
    collection: "arc",
    price: 3150,
    material: "18K Rose Gold",
    isNew: true,
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuA8upGw2GjwEvqLetBhms9zKBgEapcZlvJ9_hYIyDc9eL990hwONLNdy3RkLQjgIpKGusXZ3OhhJhGvKR1Dr39eIsjmo4iz5XGtYS2bhXSnpY0WG_GEj9wqSd-Z36fzfezZX45MxoWR3ioocx_AA8U8PBebgzvNjpF7YyivvVq2D5X-SzApYKuDJLlF18OZyvfuXugVNNX8q74hwgcUyhP9hRPAiM8ltFdTj0eqUqNcSBaauCvUhYJ4XVvplQwjH4HuJfX7Lb_R2Agj",
    description: "A vibrant arc of naturally colored sapphires.",
  },
  {
    id: "2",
    name: "Silver ARC Ring",
    category: "Rings",
    collection: "arc",
    price: 850,
    material: "Sterling Silver",
    isNew: true,
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuDq5SW83WjWBZfz0rkOUkKTMx9NFRIjpr6Zbo1zToJ5UbrD4SmkFtkeoG-7JclGWZmyNeenmmgSwRTIIfmEekgtHB4gIt1luzcnQejPDFxFiKwkvBnPVQp0MpvrnxvDqZznMibxkN1tZ7poUXF3Tdo6Zxo3zp_4qA4b37G-XJWbfYksDEVu1GPpI0lljEmoLjLfrt9CzgWgPkxeUBqlYSnjeoTa4_oREKWz4MYfKaz53ktBN5RKkET-4djZBDhp6HfjXgp2DLrj_4h-",
    description: "A spectrum of colors in harmonious compositions.",
  },

  // MAA COLLECTION
  {
    id: "3",
    name: "Maa Emerald Necklace",
    category: "Necklaces",
    collection: "maa",
    price: 4200,
    material: "Gold & Emeralds",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuCfCSU1KzwU-olDeVOj_GuAGOk-0cB5clAwz-JkZd-8GcKpNa2BokXMG2rDpzUgImmAlp7XeY1jzNdNGqYbcRYHWI4cgtvcknyJjDtID8fsXnLbwyPfO4WiGD8adDmqDDgshIW3SoxRhTFheSsVoinIGZHVCMO3vmO0FUlc4QoBb-9Wq55YTdZbAhzlROWBWlRtiBaS7PCH30t8-qVyitPBa-zutAA4t6EsNAZlkJBqhHlMk2J2_phuKTWZmtPvpWzCwFsRsEBr1ZtZ",
    description: "Traditional craftsmanship with modern sensibility.",
  },

  // CUDDLE KIDS
  {
    id: "4",
    name: "Cuddle Kids Heart",
    category: "Necklaces",
    collection: "cuddle",
    price: 380,
    material: "Silver Heart",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuDukxcd8Ejhy3YefoVjo0Qbm33LM4U_ETtt5UwJXLK8hdMqnKobhYmi5S5KuzKnIdHMbvI1ghh89DJL0kc-UpZ3HLt8r-gZpIMdi8ZLL97IyuoI5dgiwCsb1UE9VB4aj74lFyWb9TzS60bMt1un_6_wtwhZumCM6ndlOK2VtrxeuYyf5seI5uBFqjuyUmo-MmFf7_NBoNLIaEFJCi91oeVvJ9qr2whukQvYM_tYY72KzyvYWVOUFFVmFt200Os0cA3zPjS-61KE0Mpu",
    description: "Playful and charming pieces for the young at heart.",
  },

  // LUNAR AURA
  {
    id: "7",
    name: "Lunar Aura Necklace",
    category: "Necklaces",
    collection: "lunar",
    price: 2600,
    material: "Platinum & Diamonds",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuCfCSU1KzwU-olDeVOj_GuAGOk-0cB5clAwz-JkZd-8GcKpNa2BokXMG2rDpzUgImmAlp7XeY1jzNdNGqYbcRYHWI4cgtvcknyJjDtID8fsXnLbwyPfO4WiGD8adDmqDDgshIW3SoxRhTFheSsVoinIGZHVCMO3vmO0FUlc4QoBb-9Wq55YTdZbAhzlROWBWlRtiBaS7PCH30t8-qVyitPBa-zutAA4t6EsNAZlkJBqhHlMk2J2_phuKTWZmtPvpWzCwFsRsEBr1ZtZ",
    description: "Inspired by the celestial glow of the moon.",
  },

  // ZEN MINIMALIST
  {
    id: "8",
    name: "Zen Arch Ring",
    category: "Rings",
    collection: "zen",
    price: 980,
    material: "18K Yellow Gold",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuDq5SW83WjWBZfz0rkOUkKTMx9NFRIjpr6Zbo1zToJ5UbrD4SmkFtkeoG-7JclGWZmyNeenmmgSwRTIIfmEekgtHB4gIt1luzcnQejPDFxFiKwkvBnPVQp0MpvrnxvDqZznMibxkN1tZ7poUXF3Tdo6Zxo3zp_4qA4b37G-XJWbfYksDEVu1GPpI0lljEmoLjLfrt9CzgWgPkxeUBqlYSnjeoTa4_oREKWz4MYfKaz53ktBN5RKkET-4djZBDhp6HfjXgp2DLrj_4h-",
    description: "Simplicity and balance in architectural gold.",
  },

  // S-ORBIT
  {
    id: "9",
    name: "Orbital Studs",
    category: "Earrings",
    collection: "orbit",
    price: 750,
    material: "14K Gold",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuClB3689FLlPF7M3O8nXHd721WOkrjrHIVygOZhCoKulF3crRcMYnjCUVxjl6w9hp3GdMpvc7VSlgmNAy25DELz38xs5xMDoqzEuH2UZvAOBCreWa_qxckr1w5-gxRxtS_DNp53w1H8xlKh2erSi_HzUtjOquxQO_Gx0F-IYXFZPGK6egn9mxCe4IOSbddBzhOE_ljWJk5Ka976G8C-ZeI146JStEqst5it3YbWS2SD4a1G_pZhZQj1d_ucw6yNSFnwdscFNAXP58sC",
    description: "Perfect circles of polished gold.",
  },

  // HERITAGE
  {
    id: "10",
    name: "Vintage Heirloom Ring",
    category: "Rings",
    collection: "heritage",
    price: 5500,
    material: "18K Gold & Old Mine Diamond",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuDq5SW83WjWBZfz0rkOUkKTMx9NFRIjpr6Zbo1zToJ5UbrD4SmkFtkeoG-7JclGWZmyNeenmmgSwRTIIfmEekgtHB4gIt1luzcnQejPDFxFiKwkvBnPVQp0MpvrnxvDqZznMibxkN1tZ7poUXF3Tdo6Zxo3zp_4qA4b37G-XJWbfYksDEVu1GPpI0lljEmoLjLfrt9CzgWgPkxeUBqlYSnjeoTa4_oREKWz4MYfKaz53ktBN5RKkET-4djZBDhp6HfjXgp2DLrj_4h-",
    description: "A piece of history reimagined for today.",
  },
];

export const MOCK_BOOKINGS = [
  {
    id: "b1",
    date: "Oct 24",
    time: "10:00 AM",
    type: "Bespoke Ring Consultation",
    status: "Confirmed",
    description:
      "Initial discussion for a vintage-inspired sapphire engagement ring.",
  },
];

// Optional: You can create a JSX component to display this data
const JewelryDataDisplay = () => {
  return (
    <div>
      <h2>Product Count: {MOCK_PRODUCTS.length}</h2>
      <h2>Booking Count: {MOCK_BOOKINGS.length}</h2>
      <div style={{ color: COLORS.primary }}>
        Primary Color: {COLORS.primary}
      </div>
    </div>
  );
};

export default JewelryDataDisplay;
