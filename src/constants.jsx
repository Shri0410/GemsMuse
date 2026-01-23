// constants.js
import image from "../src/assets/koi.jpg";
import image2 from "../src/assets/colorarc.jpg";
import image3 from "../src/assets/s-orbit.JPG";
import image4 from "../src/assets/ruby.JPG";
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

export const MOCK_JOURNAL_ENTRIES = [
  {
    id: 1,
    title: "The Art of Layering: A Guide to Modern Elegance",
    excerpt: "Discover the secrets to styling your favorite pieces together. From mixing metals to balancing proportions, elevate your everyday look with our comprehensive guide to layering jewelry.",
    date: "January 15, 2026",
    category: "Style Guide",
    author: "Elena Rossi",
    image: image,
    readTime: "5 min read",
    content: [
      {
        type: "paragraph",
        text: "Jewelry has the power to transform an outfit, but mastering the art of layering can take your style to entirely new heights. It's about more than just piling on pieces; it's about telling a story through texture, length, and contrast. Whether you're a minimalist or a maximalist, there is a layering technique that speaks to your unique aesthetic."
      },
      {
        type: "heading",
        text: "Rule 1: Vary Your Lengths"
      },
      {
        type: "paragraph",
        text: "The golden rule of necklace layering is graduation. Start with a shorter piece, perhaps a delicate choker or a 14-inch chain, and build downwards. This ensures each piece gets its moment to shine without tangling or looking cluttered. A 16-inch pendant followed by a longer 20-inch chain creates a classic waterfall effect that elongates the neck."
      },
      {
        type: "heading",
        text: "Rule 2: Mix Your Metals"
      },
      {
        type: "paragraph",
        text: "Gone are the days when you had to choose between silver and gold. Modern elegance embraces the mix. Pairing the warmth of 18K Yellow Gold with the cool tones of Platinum or White Gold adds depth and visual interest. The key is to have one dominant metal and use the others as accents to bridge the gap."
      },
      {
        type: "quote",
        text: "Jewelry is like the perfect spice - it always complements what's already there."
      },
      {
        type: "paragraph",
        text: "Don't be afraid to experiment with textures as well. A hammered gold disc sits beautifully against a smooth serpentine chain. The contrast in finish catches the light differently, adding a dynamic quality to your stack."
      }
    ]
  },
  {
    id: 2,
    title: "Behind the Bench: The Making of the Koi Collection",
    excerpt: "Step into our atelier and witness the craftsmanship behind our signature collection. See how Japanese artistry inspires every fluid curve and gemstone setting.",
    date: "December 28, 2025",
    category: "Craftsmanship",
    author: "Master Artisan Kenji",
    image: image2,
    readTime: "8 min read",
    content: [
      {
        type: "paragraph",
        text: "In the quiet hum of our atelier, creativity takes physical form. The Koi Collection was born not from a sketch, but from a feeling—the serene, hypnotic movement of koi fish gliding through water. Translating this fluidity into solid 18K Gold required a departure from traditional casting methods."
      },
      {
        type: "paragraph",
        text: "Our artisans spent months studying the anatomy of movement. We wanted the gold to feel liquid, to wrap around the finger or wrist as if it were alive. This compelled us to develop a specialized articulation technique, allowing the segments of the 'Koi Silk Pendant' to move independently."
      },
      {
        type: "image",
        url: "https://images.unsplash.com/photo-1617038260897-41a1f14a8ca0?q=80&w=2070&auto=format&fit=crop",
        caption: "Hand-carving the initial wax models."
      },
      {
        type: "heading",
        text: "The Gemstone Selection"
      },
      {
        type: "paragraph",
        text: "Selecting the rubies for the eyes of the Koi was a rigorous process. We needed stones that possessed an inner fire, a spark of life. Only 1 in 50 rubies met our criteria for clarity and color saturation. Each stone is hand-set using a microscope to ensure minimal metal interference, allowing maximum light entry."
      },
      {
        type: "paragraph",
        text: "This collection is a tribute to patience. It reminds us that true beauty cannot be rushed, and that there is strength in grace."
      }
    ]
  },
  {
    id: 3,
    title: "Caring for Your Gems: Maintenance 101",
    excerpt: "Preserve the brilliance of your heirloom pieces. Expert tips on cleaning, storing, and maintaining gold, diamonds, and precious gemstones for generations to come.",
    date: "December 10, 2025",
    category: "Care Guide",
    author: "Sarah Jenkins, Gemologist",
    image: image3,
    readTime: "4 min read",
    content: [
      {
        type: "paragraph",
        text: "Your jewelry is meant to be worn and loved, but daily exposure to elements can dull its shine. Proper care ensures your heirlooms remain as breathtaking as the day you first wore them."
      },
      {
        type: "heading",
        text: "The Gentle Clean"
      },
      {
        type: "paragraph",
        text: "For most gemstone jewelry, simplicity is best. A solution of warm water and mild dish soap is your greatest ally. Soak your pieces for 20-40 minutes and gently brush them with a soft-bristled toothbrush. This dislodges dirt from tight settings without scratching the metal."
      },
      {
        type: "heading",
        text: "Storage Matters"
      },
      {
        type: "paragraph",
        text: "Diamonds are the hardest substance on earth, which means they can scratch everything else—including other diamonds. Always store your diamond pieces individually. Soft fabric pouches or a lined jewelry box with separate compartments are essential investments for your collection's longevity."
      }
    ]
  },
  {
    id: 4,
    title: "Seasonal Trends: The Return of Rose Gold",
    excerpt: "Why this romantic metal is making a major comeback. We explore the versatility of rose gold and how it complements every skin tone and style palette.",
    date: "November 22, 2025",
    category: "Trends",
    author: "Fashion Editor Chloe",
    image: image4,
    readTime: "6 min read",
    content: [
      {
        type: "paragraph",
        text: "Rose gold has a unique ability to feel both vintage and impossibly modern. Its warmth mimics the blush of the skin, making it a universally flattering choice. This season, we saw a resurgence of this romantic alloy on the runways, paired unexpectedly with bold, primary colors."
      },
      {
        type: "paragraph",
        text: "Unlike the brassy tones of costume jewelry, 18K Rose Gold owes its pink hue to copper. The higher the copper content, the deeper the red. Our specific alloy blend aims for a soft, champagne-pink that whispers rather than shouts."
      },
      {
        type: "quote",
        text: "It's the metal of romance, of sunsets, and of soft embraces."
      },
      {
        type: "paragraph",
        text: "We love styling heavyweight rose gold chains with crisp white shirts, or stacking delicate rose gold rings with structural silver pieces for a mixed-metal look that feels fresh and current."
      }
    ]
  }
];