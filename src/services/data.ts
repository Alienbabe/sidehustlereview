import { SideHustle, Review, Category, FilterTag } from '../types';

// Mock side hustle data
export const sideHustles: SideHustle[] = [
  {
    id: '1',
    title: 'Freelance Writing',
    description: 'Create content for blogs, websites, and publications on various topics.',
    categories: ['Low Energy Days', 'Work From Home', 'Flexible Hours'],
    tags: ['Real Income', 'Still Using'],
    averageRatings: {
      money: 3.5,
      effort: 2.8,
      satisfaction: 4.2,
    },
    reviewCount: 24,
  },
  {
    id: '2',
    title: 'Food Delivery Driver',
    description: 'Deliver food orders from restaurants to customers using your own vehicle.',
    categories: ['Best for Beginners', 'No Investment Needed', 'Flexible Hours'],
    tags: ['Real Income', 'Quick Start'],
    averageRatings: {
      money: 3.2,
      effort: 3.5,
      satisfaction: 2.8,
    },
    reviewCount: 36,
  },
  {
    id: '3',
    title: 'Graphic Design',
    description: 'Create visual content for businesses including logos, marketing materials, and more.',
    categories: ['Creative Skills', 'Work From Home', 'Flexible Hours'],
    tags: ['Real Income', 'Still Using'],
    averageRatings: {
      money: 4.1,
      effort: 3.8,
      satisfaction: 4.5,
    },
    reviewCount: 18,
  },
  {
    id: '4',
    title: 'Virtual Assistant',
    description: 'Provide administrative support remotely for businesses and entrepreneurs.',
    categories: ['Best for Beginners', 'Work From Home', 'Low Energy Days'],
    tags: ['Real Income', 'Still Using', 'Quick Start'],
    averageRatings: {
      money: 3.8,
      effort: 2.5,
      satisfaction: 4.0,
    },
    reviewCount: 29,
  },
  {
    id: '5',
    title: 'Web Development',
    description: 'Build and maintain websites for clients using coding skills.',
    categories: ['Tech Skills Required', 'High Income Potential', 'Work From Home'],
    tags: ['Real Income', 'Still Using', 'Too Complicated'],
    averageRatings: {
      money: 4.7,
      effort: 4.5,
      satisfaction: 4.2,
    },
    reviewCount: 31,
  },
  {
    id: '6',
    title: 'Online Tutoring',
    description: 'Teach students remotely in subjects you are knowledgeable about.',
    categories: ['Flexible Hours', 'Work From Home', 'No Investment Needed'],
    tags: ['Real Income', 'Still Using'],
    averageRatings: {
      money: 3.6,
      effort: 3.1,
      satisfaction: 4.4,
    },
    reviewCount: 22,
  },
  {
    id: '7',
    title: 'Social Media Management',
    description: 'Manage social media accounts and create content strategies for businesses.',
    categories: ['Tech Skills Required', 'Work From Home', 'Flexible Hours'],
    tags: ['Real Income', 'Still Using'],
    averageRatings: {
      money: 3.9,
      effort: 3.4,
      satisfaction: 3.7,
    },
    reviewCount: 27,
  },
  {
    id: '8',
    title: 'Dog Walking',
    description: 'Walk dogs for pet owners in your neighborhood.',
    categories: ['Best for Beginners', 'Low Energy Days', 'No Investment Needed'],
    tags: ['Quick Start', 'Real Income'],
    averageRatings: {
      money: 2.8,
      effort: 2.2,
      satisfaction: 4.3,
    },
    reviewCount: 15,
  }
];

// Mock reviews data
export const reviews: Review[] = [
  {
    id: '101',
    sideHustleId: '1',
    userId: 'user1',
    userName: 'Alex T.',
    date: '2025-04-10',
    comment: 'I tried it for 3 months and got regular clients. Perfect for my schedule.',
    ratings: {
      money: 4,
      effort: 3,
      satisfaction: 5,
    },
    tags: ['Real Income', 'Still Using'],
  },
  {
    id: '102',
    sideHustleId: '1',
    userId: 'user2',
    userName: 'Jamie L.',
    date: '2025-03-28',
    comment: 'Getting started was slow, but now I have steady work. Definitely worth it!',
    ratings: {
      money: 3,
      effort: 3,
      satisfaction: 4,
    },
    tags: ['Real Income', 'Still Using'],
  },
  {
    id: '103',
    sideHustleId: '2',
    userId: 'user3',
    userName: 'Sam R.',
    date: '2025-04-15',
    comment: 'Easy to start but the pay isn\'t great when you factor in gas and car maintenance.',
    ratings: {
      money: 2,
      effort: 4,
      satisfaction: 3,
    },
    tags: ['Real Income', 'Gave Up'],
  },
  {
    id: '104',
    sideHustleId: '3',
    userId: 'user4',
    userName: 'Morgan W.',
    date: '2025-04-02',
    comment: 'I love being creative and getting paid for it! Finding clients is the hardest part.',
    ratings: {
      money: 4,
      effort: 4,
      satisfaction: 5,
    },
    tags: ['Real Income', 'Still Using'],
  },
  {
    id: '105',
    sideHustleId: '4',
    userId: 'user5',
    userName: 'Taylor B.',
    date: '2025-03-22',
    comment: 'Perfect flexible gig that pays well once you have a few regular clients.',
    ratings: {
      money: 4,
      effort: 2,
      satisfaction: 4,
    },
    tags: ['Real Income', 'Still Using', 'Quick Start'],
  }
];

// Available categories
export const categories: Category[] = [
  "Best for Beginners",
  "Low Energy Days",
  "Tech Skills Required",
  "Creative Skills",
  "No Investment Needed",
  "High Income Potential",
  "Work From Home",
  "Flexible Hours"
];

// Available filter tags
export const filterTags: FilterTag[] = [
  "Real Income",
  "Too Complicated",
  "Still Using",
  "Quick Start",
  "Gave Up"
];

// Get side hustle by ID
export const getSideHustleById = (id: string): SideHustle | undefined => {
  return sideHustles.find(hustle => hustle.id === id);
};

// Get reviews for a side hustle
export const getReviewsForSideHustle = (sideHustleId: string): Review[] => {
  return reviews.filter(review => review.sideHustleId === sideHustleId);
};

// Filter side hustles by category
export const filterByCategory = (category: Category): SideHustle[] => {
  return sideHustles.filter(hustle => hustle.categories.includes(category));
};

// Filter side hustles by tag
export const filterByTag = (tag: FilterTag): SideHustle[] => {
  return sideHustles.filter(hustle => hustle.tags.includes(tag));
};

// Search side hustles by title or description
export const searchSideHustles = (query: string): SideHustle[] => {
  const lowercaseQuery = query.toLowerCase();
  return sideHustles.filter(
    hustle => 
      hustle.title.toLowerCase().includes(lowercaseQuery) || 
      hustle.description.toLowerCase().includes(lowercaseQuery)
  );
};