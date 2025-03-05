import { MealTypes } from "@/types/meal/allMeals";
import Image from "next/image";
import { Rating } from "@smastrom/react-rating";
import "@smastrom/react-rating/style.css";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const MealsCard = ({ meal }: { meal: MealTypes }) => {
  console.log("Meals:", meal);

  return (
    <Card className="w-full max-w-sm h-auto shadow-md border border-gray-200 rounded-lg transition-transform duration-300 hover:scale-105">
      <div className="relative w-full h-[25vh]">
        <Image
          src={meal?.mealImage}
          alt="Meal image"
          layout="fill"
          objectFit="cover"
          className="rounded-t-lg"
        />
      </div>
      <CardHeader className="p-4 text-center">
        <CardTitle className="text-gray-800 font-bold text-lg">
          {meal?.mealTitle}
        </CardTitle>
      </CardHeader>
      <CardContent className="flex flex-col items-center gap-2">
        <Rating
          style={{ maxWidth: 120 }}
          value={meal?.rating}
          readOnly
          halfFillMode="svg"
        />
        <h2 className="text-lg font-semibold text-gray-700">${meal.price}</h2>
      </CardContent>
      <CardFooter className="p-4 flex justify-center">
        <Button className="px-4 py-2 bg-gradient-to-r from-blue-500 to-purple-500 text-white font-semibold rounded-md shadow-md hover:shadow-lg hover:from-blue-600 hover:to-purple-600 transition-all">
          View Details
        </Button>
      </CardFooter>
    </Card>
  );
};

export default MealsCard;
