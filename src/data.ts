import { Product, Collection, Review, FaqItem } from "./types";

export const COLLECTIONS: Collection[] = [
  {
    id: "blazers",
    name: "Blazers",
    tagline: "Dapper Suits & Evening Fits",
    description: "Sleek velvet tuxedos, checkered plaid blazers, and structured Jodhpuri bandhgalas tailored for reception galas and premium celebrations across Tamil Nadu.",
    coverImage: "/assets/images/navy_tuxedo_1783186805390.jpg",
  },
  {
    id: "sherwani",
    name: "Royal Sherwanis",
    tagline: "Majestic Groom & Festive Attire",
    description: "Exquisite champagne-gold, embroidered, and royal silks woven to perfection for spectacular Tamil weddings, traditional ceremonies, and grand muhurthams.",
    coverImage: "/assets/images/beige_sherwani_1783186848369.jpg",
  }
];

export const PRODUCTS: Product[] = [
  {
    id: "prod-navy-tuxedo",
    name: "The Avenue Royal Navy Tuxedo Blazer",
    category: "Blazers",
    collectionId: "blazers",
    image: "/assets/images/navy_tuxedo_1783186805390.jpg",
    rentPrice: 1200,
    retailValue: 45000,
    availableSizes: ["38", "40", "42", "44", "46"],
    fabric: "Super 140s Italian Merino Wool with Black Silk Shawl Lapels",
    description: "An incredibly sophisticated, slim-fit navy blue tuxedo jacket featuring pure satin silk shawl lapels and silk-covered master buttons. Ideal for a high-end reception gala or evening celebration.",
    accentDetails: "Hand-finished buttonholes, custom lining, black satin trim.",
    rating: 4.9,
    isPopular: true,
  },
  {
    id: "prod-plaid-blazer",
    name: "Sovereign Plaid Checked Blazer",
    category: "Blazers",
    collectionId: "blazers",
    image: "/assets/images/plaid_blazer_1783186819820.jpg",
    rentPrice: 1100,
    retailValue: 35000,
    availableSizes: ["38", "40", "42", "44"],
    fabric: "Premium Plaid Checks & Woolen Blend",
    description: "A distinctive yellow and deep navy plaid checkered blazer with a tailored peak lapel, structural shoulder padding, and modern dark-burnished buttons. Adds a striking contemporary charm to sangeets and cocktail events.",
    accentDetails: "Contrasting lapel stitch, ticket pockets, custom silk-piped interior pocket.",
    rating: 4.8,
    isPopular: false,
  },
  {
    id: "prod-black-bandhgala",
    name: "Obsidian Jodhpuri Bandhgala",
    category: "Blazers",
    collectionId: "blazers",
    image: "/assets/images/black_bandhgala_1783186834600.jpg",
    rentPrice: 1300,
    retailValue: 55000,
    availableSizes: ["38", "40", "42", "44", "46"],
    fabric: "Premium Obsidian Black Cashmere Blend with Subtle Gold Speckles",
    description: "A breathtakingly elegant royal Indian bandhgala blazer featuring a high mandarin collar and bright polished metallic gold buttons. Woven with extremely fine, subtle gold glittery speckles that capture stage lighting beautifully.",
    accentDetails: "High collar embroidery, shiny brass buttons, double rear vents.",
    rating: 4.9,
    isPopular: true,
  },
  {
    id: "prod-beige-sherwani",
    name: "Imperial Tamilnadu Gold-Border Sherwani",
    category: "Sherwani",
    collectionId: "sherwani",
    image: "/assets/images/beige_sherwani_1783186848369.jpg",
    rentPrice: 1500,
    retailValue: 75000,
    availableSizes: ["38", "40", "42", "44"],
    fabric: "Premium Champagne Silk & Gold-Olive Brocade",
    description: "A majestic wedding sherwani designed for a truly royal Tamil groom. Features complex olive green and gold floral threadwork, high hand-tailored mandarin collar, and a gorgeous champagne-beige base that matches beautifully with Kanchipuram silk veshtis.",
    accentDetails: "Groomsmen coordination brooches, hand-embroidered borders, detachable royal button chain.",
    rating: 5.0,
    isPopular: true,
  }
];

export const REVIEWS: Review[] = [
  {
    id: "rev-1",
    name: "Thirunavukkarasu Pillai",
    role: "The Groom (Chennai, Tamilnadu)",
    text: "The Imperial Tamilnadu Gold-Border Sherwani was absolutely spectacular for my Muhurtham. Everyone in Kolathur was asking where I got it. The fit trial in Chennai was perfect, and returning it was completely hassle-free!",
    rating: 5,
    avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=150&h=150&q=80",
    date: "June 25, 2026",
  },
  {
    id: "rev-2",
    name: "Karthik Raja",
    role: "Groom (Coimbatore, Tamilnadu)",
    text: "We rented the Royal Navy Tuxedo and the Obsidian Bandhgala for our reception and Sangeet. Unbelievable luxury fabric at just ₹1,200/rent. The AI Stylist recommended the exact style that fits traditional and modern Tamil tastes perfectly.",
    rating: 5,
    avatar: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=150&h=150&q=80",
    date: "May 18, 2026",
  },
  {
    id: "rev-3",
    name: "Aravind Swamy",
    role: "Bride's Brother (Trichy, Tamilnadu)",
    text: "The Avenue has changed wedding fashion in Tamilnadu. High-end designer outfits worth thousands for just ₹1000-₹1500 rent, with professional dry cleaning included. Brilliant fit trials in Chennai, Kolathur. Highly recommended!",
    rating: 5,
    avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&h=150&q=80",
    date: "April 29, 2026",
  }
];

export const FAQS: FaqItem[] = [
  {
    id: "faq-1",
    question: "Where is your Tamilnadu showroom located for fitting trials?",
    answer: "Our flagship atelier is located at No 3.1st Anjugam Nagar, Kolathur, Chennai 600099, Tamilnadu, India. You can book an exclusive appointment through our website or directly via WhatsApp at 9790778384.",
  },
  {
    id: "faq-2",
    question: "How does the temporary custom fitting process work?",
    answer: "Every suit or sherwani is customized to your exact drape by our master tailors. During your fitting trial in Chennai, we temporarily adjust sleeves, shoulder widths, and trouser lengths so you look absolutely sharp. All alterations are complimentary!",
  },
  {
    id: "faq-3",
    question: "Is professional dry cleaning included in the rental price?",
    answer: "Yes, professional dry cleaning is completely FREE and included in your rent of ₹1000 - ₹1500. We dry-press and clean every garment in-house using premium solvents, so you receive it pristine and ready to wear without any extra charges.",
  },
  {
    id: "faq-4",
    question: "What is your standard rental duration for weddings in Tamilnadu?",
    answer: "Our standard rental is for 3 full days, covering your pre-wedding rituals (like reception or sangeet), the main wedding muhurtham day, and the day after for safe returns. Extended rental periods can also be arranged easily.",
  },
  {
    id: "faq-5",
    question: "How can I contact the showroom for home measurements or inquiries?",
    answer: "You can click on 'Book via WhatsApp' to message us directly on 9790778384, or visit our Google Maps location: https://maps.app.goo.gl/7vEVtwaRkw7WcckFA for easy directions to our Kolathur showroom in Chennai.",
  }
];
