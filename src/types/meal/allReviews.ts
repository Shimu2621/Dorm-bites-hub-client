export interface IReview {
  _id: string;
  email: string;
  name: string;
  mealTitle: string;
  likes: number;
  reviews: number;
  comment: string;
  user_rating: number;
  food_id: string;
  image: string;
}
