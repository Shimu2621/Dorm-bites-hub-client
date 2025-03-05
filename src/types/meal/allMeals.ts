export interface IMealTypes {
  _id: string;
  adminName: string;
  admin_Email: string;
  mealTitle: string;
  mealType: string;
  mealImage: string;
  description: string;
  ingredients: string[];
  price: number;
  rating: number;
  reviews: number;
  likes: number; // Total number of likes
  liked: (boolean | string)[]; // Includes boolean and emails
  timeDate: string; // ISO date string
}
