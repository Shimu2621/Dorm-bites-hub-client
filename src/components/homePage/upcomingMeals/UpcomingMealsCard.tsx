import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Image from "next/image";
import { Star } from "lucide-react";
import { Rating } from "@smastrom/react-rating";

interface Meal {
  mealImage: string;
  mealTitle: string;
  mealType: string;
  price: number;
  rating: number;
  reviews: number;
}

interface MealCardProps {
  meal: Meal;
}

const UpcomingMealsCard: React.FC<MealCardProps> = ({ meal }) => {
  return (
    <Card className="border-none shadow-none">
      <CardContent>
        <div className="relative group overflow-hidden rounded-sm">
          <Image
            src={meal?.mealImage}
            alt={meal?.mealType}
            width={500}
            height={400}
            className=" w-[300px] h-[250px]  rounded-sm object-cover transition-transform duration-300 group-hover:scale-120"
            unoptimized={true}
          />
          <Button className="bg-amber-600 absolute top-0 hover:border-amber-600 hover:text-black">
            {meal.mealType}
          </Button>
        </div>
      </CardContent>
      <CardHeader className="px-3 pt-0">
        <CardTitle className="text-gray-600 font-bold text-lg line-clamp-1">
          {meal.mealTitle}
        </CardTitle>
        <CardDescription>
          <Rating
            style={{ maxWidth: 120 }}
            value={meal?.rating}
            readOnly
            halfFillMode="svg"
          />
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex justify-between items-center mb-2">
          <p className="text-lg font-semibold text-yellow-600">${meal.price}</p>
          <div className="flex items-center gap-1">
            <Star className="w-4 h-4 text-yellow-500" />
            <span className="text-sm font-medium">
              {meal.rating} ({meal.reviews} reviews)
            </span>
          </div>
        </div>
        <Button className="w-full bg-blue-500 hover:bg-blue-600 text-white">
          Order Now
        </Button>
      </CardContent>
    </Card>
  );
};

export default UpcomingMealsCard;
