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
import { Rating } from "@smastrom/react-rating";
import "@smastrom/react-rating/style.css";
import Link from "next/link";

const MealsCard = ({ meal }: { meal: IMealTypes }) => {
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
        <CardTitle className="text-light-gray font-bold text-lg line-clamp-1">
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
      <CardFooter className="flex justify-between  px-3  border-b border-gray-300 pb-6">
        <Link href={`/meals/${meal._id}`}>
          <Button className="bg-primary px-2 text-default-white font-bold hover:bg-background hover:border-2 hover:border-primary hover:text-primary">
            View details
          </Button>
        </Link>
        <Button className="bg-pink-600 text-default-white font-bold hover:bg-background hover:border-2 hover:border-pink-600 hover:text-pink-600">
          ${meal.price}
        </Button>
      </CardFooter>
    </Card>
  );
};

export default MealsCard;
