import MealsDetails from "@/components/homePage/allMeals/MealsDetails";

import React from "react";

interface Params {
  id: string;
}

const MealsByIdPage = async ({ params }: { params: Params }) => {
  const id = params.id;
  const res = await fetch(
    `https://dorm-dine-hub-server.vercel.app/meals/${id}`
  );
  const meal = await res.json();
  console.log(meal);

  return (
    <div>
      <MealsDetails meal={meal} />
    </div>
  );
};

export default MealsByIdPage;
