export interface SideHustle {
  id: string;
  title: string;
  description: string;
  categories: string[];
  tags: string[];
  averageRatings: {
    money: number;
    effort: number;
    satisfaction: number;
  };
  reviewCount: number;
}

export interface Review {
  id: string;
  sideHustleId: string;
  userId: string;
  userName: string;
  date: string;
  comment: string;
  ratings: {
    money: number;
    effort: number;
    satisfaction: number;
  };
  tags: string[];
}

export type Category = 
  | "Best for Beginners"
  | "Low Energy Days"
  | "Tech Skills Required"
  | "Creative Skills"
  | "No Investment Needed"
  | "High Income Potential"
  | "Work From Home"
  | "Flexible Hours";

export type FilterTag = 
  | "Real Income"
  | "Too Complicated"
  | "Still Using"
  | "Quick Start"
  | "Gave Up";

export interface User {
  id: string;
  name: string;
  reviews: string[];
  savedSideHustles: string[];
}