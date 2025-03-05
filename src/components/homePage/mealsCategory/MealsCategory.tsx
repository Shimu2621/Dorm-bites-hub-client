"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import { IMealTypes } from "@/types";
import MealsCard from "./MealsCard";
import Container from "@/utils/container/Container";
import { Button } from "@/components/ui/button";

const MealsCategory = () => {
  const [meals, setMeals] = useState<IMealTypes[]>([]);
  const [loading, setLoading] = useState(false);
  const [category, setCategory] = useState("Breakfast");
  // fetch meals from API
  useEffect(() => {
    setLoading(true);
    const fetchData = async () => {
      const response = await axios.get(
        "https://dorm-dine-hub-server.vercel.app/meals"
      );
      setMeals(response.data);
      setLoading(false);
    };
    fetchData();
  }, []);
  if (loading) return <div>Loading...</div>;

  const filteredMeal = meals.filter((meal) => meal.mealType === category);

  return (
    <Container>
      <div>
        <h1 className="text-2xl font-semibold text-center my-5">
          Dorm Dine Hub - Meals by Category
        </h1>
      </div>
      <div className="flex space-x-3 justify-center my-5">
        <Button onClick={() => setCategory("Breakfast")}> Breakfast</Button>
        <Button onClick={() => setCategory("Lunch")}>Lunch</Button>
        <Button onClick={() => setCategory("Dinner")}>Dinner</Button>
        <Button onClick={() => setCategory("All")}>All</Button>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {category === "All" ? (
          <>
            {meals.slice(0, 8).map((meal) => (
              <MealsCard key={meal._id} meal={meal} />
            ))}
          </>
        ) : (
          <>
            {filteredMeal.slice(0, 8).map((meal) => (
              <MealsCard key={meal._id} meal={meal} />
            ))}
          </>
        )}
      </div>
    </Container>
  );
};

export default MealsCategory;
