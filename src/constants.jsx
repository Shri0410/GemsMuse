import koi from "./assets/collections/koi.jpg";
import maa from "./assets/collections/maa.jpg";
import cuddlecutie from "./assets/collections/cuddlecutie.jpg";
import amore from "./assets/collections/amore.jpg";
import colorarc from "./assets/collections/colorarc.jpg";
import ruby from "./assets/collections/ruby.jpg";
import sorbit from "./assets/collections/sorbit.jpg";
import lab from "./assets/collections/LabLore.JPG";

export const COLORS = {
  primary: "#C5A065",
  primaryHover: "#b08d55",
};

export const MOCK_PRODUCTS = [
  {
    id: "1",
    name: "Koi",
    category: "Earrings",
    price: 1290,
    material: "18K Gold & Ruby",
    image: koi,
    description:
      "Inspired by the grace of koi fish, celebrating love and connection.",
  },
  {
    id: "2",
    name: "Color ARC",
    category: "Rings",
    price: 850,
    material: "Sterling Silver",
    isNew: true,
    image: colorarc,
    description:
      "A symphony of colours capturing the beauty of light and emotion.",
  },
  {
    id: "3",
    name: "Maa",
    category: "Necklaces",
    price: 4200,
    material: "Gold & Emeralds",
    image: maa,
    description: "Honouring the eternal bond of motherhood and nurturing love.",
  },
  {
    id: "4",
    name: "Cuddle – Cutie",
    category: "Necklaces",
    price: 380,
    material: "Plush & Silver Heart",
    image: cuddlecutie,
    description: "Playful designs celebrating innocence and joy.",
  },
  {
    id: "5",
    name: "Ruby Radiance",
    category: "Rings",
    price: 3150,
    material: "18K Rose Gold",
    isNew: true,
    image: ruby,
    description: "A vibrant arc of naturally colored sapphires.",
  },
  {
    id: "6",
    name: "S Orbit",
    category: "Earrings",
    price: 1850,
    material: "18K White Gold",
    isBestSeller: true,
    image: sorbit,
    description: "Elegant movement captured in white gold.",
  },
  {
    id: "7",
    name: "Amore",
    category: "Necklaces",
    price: 2600,
    material: "Platinum & Diamonds",
    image: amore,
    description: "Inspired by the celestial glow of the moon.",
  },
  {
    id: "8",
    name: "Lab Lore- Modern & Classy",
    category: "Rings",
    price: 980,
    material: "18K Yellow Gold",
    image: lab,
    description:
      "14K Gold and lab grown diamonds as well gem stones represent the perfect blend of modern innovation, ethical sourcing, and timeless luxury.",
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
  {
    id: "b2",
    date: "Nov 02",
    time: "02:30 PM",
    type: "Heirloom Redesign",
    status: "Pending",
    description:
      "Repurposing grandmother's diamond necklace into a modern bracelet.",
  },
];
