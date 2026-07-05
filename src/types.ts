export interface Product {
  id: string;
  name: string;
  category: string;
  collectionId: string;
  image: string;
  rentPrice: number;
  retailValue: number;
  availableSizes: string[];
  fabric: string;
  description: string;
  accentDetails: string;
  rating: number;
  isPopular?: boolean;
}

export interface Collection {
  id: string;
  name: string;
  tagline: string;
  description: string;
  coverImage: string;
}

export interface Review {
  id: string;
  name: string;
  role: string;
  text: string;
  rating: number;
  avatar: string;
  date: string;
}

export interface FaqItem {
  id: string;
  question: string;
  answer: string;
}

export interface StylistRequest {
  eventType: string;
  stylePreference: string;
  bodyType: string;
  tone: string;
  customDetail: string;
}

export interface StylistRecommendation {
  recommendationTitle: string;
  description: string;
  outfitType: string;
  recommendedLook: {
    jacket: string;
    trouser: string;
    shirt: string;
    footwear: string;
    accessories: string[];
  };
  stylingTips: string[];
  colorPaletteExplanation: string;
  matchConfidence: string;
}
