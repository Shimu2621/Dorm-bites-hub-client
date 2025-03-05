import { IMealTypes } from "@/types";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Image from "next/image";
import { Button } from "@/components/ui/button";

// {
//     "liked": [],
//     "_id": "6564e3124e41a2120f539b1c",
//     "mealTitle": "Egg and Spinach Breakfast Wrap",
//     "mealType": "Breakfast",
//     "mealImage": "https://onebalancedlife.com/wp-content/uploads/2020/08/Breakfast-Wrap-scaled-720x720.jpg",
//     "ingredients": [
//         "Scrambled eggs",
//         "Fresh spinach",
//         "Whole wheat wrap",
//         "Cherry tomatoes",
//         "Cheese",
//         "Salsa"
//     ],
//     "description": "A protein-packed breakfast option featuring fluffy scrambled eggs, fresh spinach, and cherry tomatoes wrapped in a whole wheat tortilla. Topped with melted cheese and salsa for a satisfying morning meal.",
//     "price": 9.49,
//     "rating": 4.6,
//     "timeDate": "2023-11-27T08:30:00.000Z",
//     "likes": 27,
//     "reviews": 15,
//     "adminName": "shohaib",
//     "admin_Email": "mama@mami.com",
//     "__v": 0
// }

const MealsCard = ({ meal }: { meal: IMealTypes }) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>{meal.mealTitle}</CardTitle>
        <CardDescription>{meal.mealType}</CardDescription>
      </CardHeader>
      <CardContent>
        <div>
          <Image
            src={meal.mealImage}
            alt={meal.mealType}
            width={500}
            height={400}
            className="w-[300px] h-[250px] object-cover"
          />
        </div>       
      </CardContent>
      <CardFooter>
        <Button>View details</Button>
      </CardFooter>
    </Card>
  );
};

export default MealsCard;
