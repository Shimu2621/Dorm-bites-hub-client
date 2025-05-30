"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import { IMealTypes } from "@/types";
import MealsCard from "./MealsCard";
import Container from "@/utils/container/Container";
// import { Button } from "@/components/ui/button";
// React tab for category
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import "react-tabs/style/react-tabs.css";
import Image from "next/image";

const MealsByCategory = () => {
  const [meals, setMeals] = useState<IMealTypes[]>([]);
  const [loading, setLoading] = useState(false);
  const [selectedTab, setSelectedTab] = useState(0); // Track selected tab

  // Meal categories with FlatIcons
  const categories = [
    { name: "Breakfast", icon: "/icons/breakfast.png" },
    { name: "Lunch", icon: "/icons/lunch.png" },
    { name: "Dinner", icon: "/icons/dinner.png" },
    { name: "All", icon: "/icons/all.png" },
  ];

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

  // const filteredMeal = meals.filter((meal) => meal.mealType === category);

  return (
    <Container>
      <div className="bg-background h-auto">
        <div className="text-center mx-auto">
          <h1 className="text-primary font-bold italic text-4xl">
            Meal by Category
          </h1>
          <p className="text-gray-color pt-2 pb-8">
            Effortlessly find meals that match your cravings with the Meal By
            Category section. Whether you&apos;re in the mood for
            <br /> breakfast, lunch, dinner, this section organizes meals into
            intuitive categories.
          </p>
        </div>
        {/* ====================Tab section===================== */}
        <Tabs
          selectedIndex={selectedTab}
          onSelect={(index) => setSelectedTab(index)}
        >
          <TabList className="flex justify-center text-center font-bold space-x-3 my-5 mb-10">
            {categories.map((category, index) => (
              <Tab
                key={index}
                className={`px-4 py-2 border border-gray-400 rounded-sm  cursor-pointer flex flex-col items-center gap-2 hover:scale-105 transition-transform duration-100 
              ${
                selectedTab === index
                  ? "bg-blue-100 text-gray-color"
                  : "text-gray-600 hover:bg-blue-100 "
              }`}
              >
                <Image
                  src={category.icon}
                  alt={category.name}
                  width={48}
                  height={48}
                  className="w-10 h-10 object-contain text-gray-color "
                />
                {category.name}
              </Tab>
            ))}
          </TabList>

          {categories.map((category, index) => (
            <TabPanel key={index}>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {category.name === "All"
                  ? meals
                      .slice(0, 8)
                      .map((meal) => <MealsCard key={meal._id} meal={meal} />)
                  : meals
                      .filter((meal) => meal.mealType === category.name)
                      .slice(0, 8)
                      .map((meal) => <MealsCard key={meal._id} meal={meal} />)}
              </div>
            </TabPanel>
          ))}
        </Tabs>
      </div>
    </Container>
  );
};

export default MealsByCategory;
