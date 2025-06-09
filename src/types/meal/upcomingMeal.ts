export interface IUpcomingMeal {
  _id: string;
  mealTitle: string;
  mealType: string;
  mealImage: string;
  ingredients: string[];
  description: string;
  price: number;
  rating: number;
  timeDate: string;
  likes: number;
  reviews: number;
  adminName: string;
  admin_Email: string;
  liked?: string[];
}
