import React from "react";
import UpcomingMealsCard from "./UpcomingMealsCard";
import Container from "@/utils/container/Container";

interface Meal {
  mealImage: string;
  mealTitle: string;
  mealType: string;
  price: number;
  rating: number;
  reviews: number;
}

interface UpcomingMealsProps {
  data: Meal[];
}

const UpcomingMeals: React.FC<UpcomingMealsProps> = ({ data }) => {
  if (!data || data.length === 0) {
    return <p>No upcoming meals available.</p>;
  }

  return (
    <Container>
      <div className="bg-background pt-20">
        <div className="text-center mx-auto">
          <h1 className="text-primary font-bold italic text-4xl">
            Up Coming Meals
          </h1>
          <p className="text-gray-color pt-2 pb-8">
            Effortlessly find meals that match your cravings with the Meal By
            Category section. Whether you&apos;re in the mood for
            <br /> breakfast, lunch, dinner, this section organizes meals into
            intuitive categories.
          </p>
        </div>
        <div className="grid grid-cols-4 gap-4 pt-20 pb-20">
          {data.map((meal, index) => (
            <UpcomingMealsCard key={index} meal={meal} />
          ))}
        </div>
      </div>
    </Container>
  );
};

export default UpcomingMeals;
