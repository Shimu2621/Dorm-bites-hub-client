import UpcomingMeals from "@/components/homePage/upcomingMeals/UpcomingMeals";
import React from "react";

const UpComingMealsPage = async () => {
  try {
    const res = await fetch(
      "https://dorm-dine-hub-server.vercel.app/upcoming-meals",
      {
        cache: "no-store", // Ensures fresh data fetch
      }
    );

    if (!res.ok) {
      throw new Error(`Failed to fetch. Status: ${res.status}`);
    }

    const data = await res.json();
    console.log("Fetched Upcoming Meals Data:", data);

    if (!data || data.length === 0) {
      return <div>No upcoming meals available.</div>;
    }

    return (
      <div>
        <UpcomingMeals data={data} />
      </div>
    );
  } catch (error) {
    console.error("Error fetching upcoming meals:", error);
    return <div>Error fetching meals.</div>;
  }
};

export default UpComingMealsPage;
