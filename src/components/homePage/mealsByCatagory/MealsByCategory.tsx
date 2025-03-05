import Container from "@/utils/container/Container";
import React from "react";
import MealsCard from "./MealsCard";
import { MealTypes } from "@/types/meal/allMeals";

// const categories = [
//   {
//     id: "allMeals",
//     name: "All Meals",
//     image: "https://cdn-icons-png.flaticon.com/512/6122/6122447.png",
//   },
//   {
//     id: "breakfast",
//     name: "Breakfast",
//     image:
//       "https://cdn.icon-icons.com/icons2/1646/PNG/512/recipedessertcakeicon_109876.png",
//   },
//   {
//     id: "lunch",
//     name: "Lunch",
//     image: "https://img.icons8.com/color/96/000000/salad.png",
//   },
//   {
//     id: "dinner",
//     name: "Dinner",
//     image:
//       "https://static.vecteezy.com/system/resources/thumbnails/036/397/392/small/ai-generated-grilled-fish-braised-fish-food-isolated-on-transparent-background-png.png",
//   },
// ];

const MealsByCategory = ({ meals }: { meals: MealTypes[] }) => {
  console.log(meals);

  return (
    <div className="bg-background pt-20">
      <Container>
        <div className="text-center mx-auto">
          <h2 className="text-4xl text-blue-500 font-bold italic">
            Meals By Category
          </h2>
          <p className="text-gray-500">
            {" "}
            Discover the newest culinary creations! Explore mouthwatering
            recipes crafted to inspire your delicious meal.
          </p>
        </div>

        <div className="grid grid-cols-4 gap-4 pt-20">
          {meals?.map((meal: MealTypes, index: number) => (
            <MealsCard key={index} meal={meal} />
          ))}
        </div>
      </Container>
    </div>
  );
};

export default MealsByCategory;
