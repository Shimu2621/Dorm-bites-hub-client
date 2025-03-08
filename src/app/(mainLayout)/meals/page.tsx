// import MealsByCategory from "@/components/homePage/mealsByCatagory/MealsByCategory";
import AllMeals from "@/components/homePage/allMeals/AllMeals";
import React from "react";

const MealsPage = async () => {
  const res = await fetch("https://dorm-dine-hub-server.vercel.app/meals");
  const data = await res.json();
  console.log("Fetched Meals:", data);

  if (!data) {
    return <div>...Loading</div>;
  }

  return (
    <div>
      <AllMeals meals={data} />
    </div>
  );
};

export default MealsPage;
