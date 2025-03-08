import { IMealTypes } from "@/types";
import Container from "@/utils/container/Container";
import Image from "next/image";
import React from "react";

const MealsDetails = ({ meal }: { meal: IMealTypes }) => {
  return (
    <div className="p-20">
      <Container>
        <div className="mb-8">
          <h1 className="text-primary text-4xl italic font-bold">
            Meal Details
          </h1>
        </div>
        <div className=" flex justify-between gap-10">
          <Image
            src={meal.mealImage}
            alt={meal.mealTitle}
            width={560}
            height={560}
            className="w-140 h-140 p-2 bg-white border-8 border-blue-500 object-cover rounded-sm shadow-2xs "
          />

          <div>
            <h1 className="text-2xl font-bold">{meal.mealTitle}</h1>
            <p>Price: ${meal.price}</p>
            <p>{meal.description}</p>
          </div>
        </div>
      </Container>
    </div>
  );
};

export default MealsDetails;
