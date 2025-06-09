"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import { IMealTypes } from "@/types";
import MealsCard from "./MealsCard";
import Container from "@/utils/container/Container";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import "react-tabs/style/react-tabs.css";
import Image from "next/image";
import AOS from "aos";
import "aos/dist/aos.css";

const MealsByCategory = () => {
  const [meals, setMeals] = useState<IMealTypes[]>([]);
  const [loading, setLoading] = useState(false);
  const [selectedTab, setSelectedTab] = useState(0);

  const categories = [
    { name: "Breakfast", icon: "/icons/breackfast.png" },
    { name: "Lunch", icon: "/icons/lunch-plate.png" },
    { name: "Dinner", icon: "/icons/dish.png" },
    { name: "All", icon: "/icons/table.png" },
  ];

  useEffect(() => {
    AOS.init({ duration: 800, once: true });
  }, []);

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

  if (loading) {
    return (
      <div className="text-center text-lg font-semibold mt-5">Loading...</div>
    );
  }

  return (
    <Container>
      <div className="bg-background h-auto">
        {/* Section Title */}
        <div className="text-center mx-auto" data-aos="fade-up">
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

        {/* Tabs */}
        <Tabs
          selectedIndex={selectedTab}
          onSelect={(index) => setSelectedTab(index)}
        >
          <TabList className="flex flex-wrap justify-center text-center text-sm font-semibold gap-3 my-5 mb-10">
            {categories.map((category, index) => (
              <Tab
                key={index}
                className={`group px-4 py-2 tab-text-color border border-gray-400 rounded-sm cursor-pointer flex flex-col items-center gap-2 hover:scale-105 transition-transform duration-100 
    ${
      selectedTab === index ? "bg-blue-100" : "hover:bg-black hover:text-white"
    }`}
              >
                <Image
                  src={category.icon}
                  alt={category.name}
                  width={40}
                  height={40}
                  className="w-10 h-10 object-contain transition-all duration-300 group-hover:invert"
                />
                {category.name}
              </Tab>
            ))}
          </TabList>

          {/* Meals Grid */}
          {categories.map((category, index) => (
            <TabPanel key={index}>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {(category.name === "All"
                  ? meals.slice(0, 8)
                  : meals
                      .filter((meal) => meal.mealType === category.name)
                      .slice(0, 8)
                ).map((meal, idx) => (
                  <div
                    key={meal._id}
                    data-aos={idx % 4 < 2 ? "fade-right" : "fade-left"}
                    data-aos-delay={idx * 100}
                  >
                    <MealsCard meal={meal} />
                  </div>
                ))}
              </div>
            </TabPanel>
          ))}
        </Tabs>
      </div>
    </Container>
  );
};

export default MealsByCategory;
