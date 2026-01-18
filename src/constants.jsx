// constants.js
export const COLORS = {
  primary: "#C5A065",
  primaryHover: "#b08d55",
};

export const MOCK_PRODUCTS = [
  // KOI COLLECTION
  {
    id: '1',
    name: 'Koi Signature Earrings',
    category: 'Earrings',
    collection: 'koi',
    collectionName: 'The Koi Collection',
    price: 1290,
    material: '18K Gold & Ruby',
    sku: 'GM-ER-KOI-001',
    jewelryType: 'Earrings',
    setInfo: 'Part of the Koi Bridal Set',
    metal: 'Yellow Gold',
    purity: '18K (750)',
    metalColor: 'Yellow',
    metalWeight: '8.4g',
    gemStoneCts: '1.20 Cts (Ruby)',
    centerStoneCts: '0.45 Cts Each',
    totalStoneWt: '2.10 Cts',
    totalDiamondWeight: '0.50 Cts',
    size: 'Standard Drop (35mm)',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuClB3689FLlPF7M3O8nXHd721WOkrjrHIVygOZhCoKulF3crRcMYnjCUVxjl6w9hp3GdMpvc7VSlgmNAy25DELz38xs5xMDoqzEuH2UZvAOBCreWa_qxckr1w5-gxRxtS_DNp53w1H8xlKh2erSi_HzUtjOquxQO_Gx0F-IYXFZPGK6egn9mxCe4IOSbddBzhOE_ljWJk5Ka976G8C-ZeI146JStEqst5it3YbWS2SD4a1G_pZhZQj1d_ucw6yNSFnwdscFNAXP58sC',
    images: [
      'https://lh3.googleusercontent.com/aida-public/AB6AXuClB3689FLlPF7M3O8nXHd721WOkrjrHIVygOZhCoKulF3crRcMYnjCUVxjl6w9hp3GdMpvc7VSlgmNAy25DELz38xs5xMDoqzEuH2UZvAOBCreWa_qxckr1w5-gxRxtS_DNp53w1H8xlKh2erSi_HzUtjOquxQO_Gx0F-IYXFZPGK6egn9mxCe4IOSbddBzhOE_ljWJk5Ka976G8C-ZeI146JStEqst5it3YbWS2SD4a1G_pZhZQj1d_ucw6yNSFnwdscFNAXP58sC',
      'https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?q=80&w=1000&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1635767798638-36034e3a4792?q=80&w=1000&auto=format&fit=crop'
    ],
    videoUrl: 'https://www.w3schools.com/html/mov_bbb.mp4',
    description: 'Fluid designs inspired by Japanese artistry. These earrings capture the rhythmic flow of water and the bold presence of the Koi.'
  },
  {
    id: 'k2',
    name: 'Koi Silk Pendant',
    category: 'Necklaces',
    collection: 'koi',
    collectionName: 'The Koi Collection',
    price: 2400,
    material: '18K Rose Gold',
    sku: 'GM-NK-KOI-042',
    jewelryType: 'Necklace',
    setInfo: 'Standalone Piece',
    metal: 'Rose Gold',
    purity: '18K',
    metalColor: 'Rose',
    metalWeight: '12.2g',
    gemStoneCts: '0.85 Cts',
    centerStoneCts: '0.40 Cts',
    totalStoneWt: '1.25 Cts',
    totalDiamondWeight: '0.30 Cts',
    size: '18 Inch (Adjustable)',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDukxcd8Ejhy3YefoVjo0Qbm33LM4U_ETtt5UwJXLK8hdMqnKobhYmi5S5KuzKnIdHMbvI1ghh89DJL0kc-UpZ3HLt8r-gZpIMdi8ZLL97IyuoI5dgiwCsb1UE9VB4aj74lFyWb9TzS60bMt1un_6_wtwhZumCM6ndlOK2VtrxeuYyf5seI5uBFqjuyUmo-MmFf7_NBoNLIaEFJCi91oeVvJ9qr2whukQvYM_tYY72KzyvYWVOUFFVmFt200Os0cA3zPjS-61KE0Mpu',
    images: [
      'https://lh3.googleusercontent.com/aida-public/AB6AXuDukxcd8Ejhy3YefoVjo0Qbm33LM4U_ETtt5UwJXLK8hdMqnKobhYmi5S5KuzKnIdHMbvI1ghh89DJL0kc-UpZ3HLt8r-gZpIMdi8ZLL97IyuoI5dgiwCsb1UE9VB4aj74lFyWb9TzS60bMt1un_6_wtwhZumCM6ndlOK2VtrxeuYyf5seI5uBFqjuyUmo-MmFf7_NBoNLIaEFJCi91oeVvJ9qr2whukQvYM_tYY72KzyvYWVOUFFVmFt200Os0cA3zPjS-61KE0Mpu'
    ],
    description: 'A delicate necklace capturing the graceful movement of Koi swimming.'
  },
  {
    id: 'k3',
    name: 'Koi Bravery Ring',
    category: 'Rings',
    collection: 'koi',
    collectionName: 'The Koi Collection',
    price: 1850,
    material: '18K Gold & Sapphire',
    sku: 'GM-RG-KOI-088',
    jewelryType: 'Ring',
    setInfo: 'Part of the Koi Bridal Set',
    metal: 'Yellow Gold',
    purity: '18K',
    metalColor: 'Yellow',
    metalWeight: '6.5g',
    gemStoneCts: '1.50 Cts (Sapphire)',
    centerStoneCts: '1.00 Cts',
    totalStoneWt: '2.10 Cts',
    totalDiamondWeight: '0.60 Cts',
    size: 'US 6 (Customizable)',
    isBestSeller: true,
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDq5SW83WjWBZfz0rkOUkKTMx9NFRIjpr6Zbo1zToJ5UbrD4SmkFtkeoG-7JclGWZmyNeenmmgSwRTIIfmEekgtHB4gIt1luzcnQejPDFxFiKwkvBnPVQp0MpvrnxvDqZznMibxkN1tZ7poUXF3Tdo6Zxo3zp_4qA4b37G-XJWbfYksDEVu1GPpI0lljEmoLjLfrt9CzgWgPkxeUBqlYSnjeoTa4_oREKWz4MYfKaz53ktBN5RKkET-4djZBDhp6HfjXgp2DLrj_4h-',
    description: 'Bold textures meet refined craftsmanship in this signature ring.'
  },
  {
    id: '5',
    name: 'Spectrum Sapphire Ring',
    category: 'Rings',
    collection: 'arc',
    collectionName: 'Colour ARC',
    price: 3150,
    material: '18K Rose Gold',
    sku: 'GM-RG-ARC-501',
    jewelryType: 'Ring',
    setInfo: 'Spectrum Collection',
    metal: 'Rose Gold',
    purity: '14K',
    metalColor: 'Rose',
    metalWeight: '5.8g',
    gemStoneCts: '3.20 Cts (Mixed Sapphires)',
    centerStoneCts: 'N/A (Multi-stone)',
    totalStoneWt: '3.20 Cts',
    totalDiamondWeight: '0.10 Cts',
    size: 'US 7',
    isNew: true,
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuA8upGw2GjwEvqLetBhms9zKBgEapcZlvJ9_hYIyDc9eL990hwONLNdy3RkLQjgIpKGusXZ3OhhJhGvKR1Dr39eIsjmo4iz5XGtYS2bhXSnpY0WG_GEj9wqSd-Z36fzfezZX45MxoWR3ioocx_AA8U8PBebgzvNjpF7YyivvVq2D5X-SzApYKuDJLlF18OZyvfuXugVNNX8q74hwgcUyhP9hRPAiM8ltFdTj0eqUqNcSBaauCvUhYJ4XVvplQwjH4HuJfX7Lb_R2Agj',
    description: 'A vibrant arc of naturally colored sapphires.'
  }
];

export const MOCK_BOOKINGS = [
  {
    id: 'b1',
    date: 'Oct 24',
    time: '10:00 AM',
    type: 'Bespoke Ring Consultation',
    status: 'Confirmed',
    description: 'Initial discussion for a vintage-inspired sapphire engagement ring.'
  }
];