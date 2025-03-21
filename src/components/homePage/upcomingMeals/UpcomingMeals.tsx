import React from "react";
import UpcomingMealsCard from "./UpcomingMealsCard";
import Container from "@/utils/container/Container";
import Image from "next/image";

interface Meal {
  _id: string;
  mealImage: string;
  mealTitle: string;
  mealType: string;
  price: number;
  rating: number;
  reviews: number;
  likes: number;
  liked: string[];
}

interface UpcomingMealsProps {
  data: Meal[];
}

const UpcomingMeals: React.FC<UpcomingMealsProps> = ({ data }) => {
  if (!data || data.length === 0) {
    return <p>No upcoming meals available.</p>;
  }

  return (
    <div className="bg-background pt-20">
      {/* Banner Section */}
      <div className="relative w-full h-[30vh] md:h-[40vh] ">
        <Image
          src="https://media.istockphoto.com/id/666908954/photo/handsome-chef-pouring-olive-oil-on-meal.jpg?s=612x612&w=0&k=20&c=2dU_sMyn3GM2N81m-tMWQ4y5frBp87GQCflUtauJM4k="
          alt="Banner Image"
          layout="fill"
          objectFit="cover"
          quality={100}
          priority
          className="w-full h-full"
        />

        {/* opacity for shade */}
        <div className="absolute inset-0 bg-black/70 ">
          {/* text */}
          <div className="relative mt-20 text-white flex flex-col items-center justify-center">
            <h2 className="text-2xl md:text-5xl font-bold mb-4">
              {" "}
              Discover Up Coming Meals!
            </h2>
            <p className="md:text-xl text-lg text-center font-bold px-4">
              Discover a variety of mouth-watering meals with fresh ingredients
              and rich flavors. Whether you&apos;re craving <br /> a hearty
              breakfast, a nutritious lunch, or a delightful dinner, explore our
              collection of meals!
            </p>
          </div>
        </div>
      </div>
      <Container>
        <div className="text-center mx-auto mt-20">
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
        <div className="grid grid-cols-4 gap-4 pt-4 pb-20">
          {data.map((meal, index) => (
            <UpcomingMealsCard key={index} meal={meal} />
          ))}
        </div>
      </Container>
    </div>
  );
};

export default UpcomingMeals;
