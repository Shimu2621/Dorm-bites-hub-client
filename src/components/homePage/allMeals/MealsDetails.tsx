import { Button } from "@/components/ui/button";
import { IMealTypes } from "@/types";
import Container from "@/utils/container/Container";
import { Rating } from "@smastrom/react-rating";
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
        <div className="flex justify-between gap-10">
          <div>
            <div className="relative group overflow-hidden rounded-sm">
              <Image
                src={meal.mealImage}
                alt={meal.mealTitle}
                width={560}
                height={560}
                className="w-130 h-130 p-2 bg-white border-8 border-gray-500 object-cover rounded-sm shadow-2xs"
                unoptimized={true}
              />
              <Button className="bg-pink-700 rounded-sm absolute top-4 left-4 hover:border-amber-600 hover:text-black">
                {meal.mealType}
              </Button>
            </div>
            <div className="mt-4 flex items-center justify-between gap-4">
              <p className="text-xl text-gray-700 font-bold">
                Price: ${meal.price}
              </p>
              <p className="text-lg text-gray-700">Likes: {meal.likes}</p>
            </div>
          </div>
          <div className="w-1/2">
            <h1 className="text-2xl font-bold text-primary italic">
              {meal.mealTitle}
            </h1>

            <Rating
              style={{ maxWidth: 120 }}
              value={meal?.rating}
              readOnly
              halfFillMode="svg"
            />

            <p className="text-lg text-gray-700">Reviews: {meal.reviews}</p>

            <p className="text-lg text-gray-700">
              Uploaded on: {new Date(meal.timeDate).toLocaleDateString()}
            </p>
            <div className="mt-4">
              <h1 className="text-xl font-bold">Description:</h1>
              <p className="text-gray-600">{meal.description}</p>
            </div>
            <div className="mt-4">
              <h1 className="text-xl font-bold">Ingredients:</h1>
              <ul className="list-disc pl-5 text-gray-600">
                {meal.ingredients.map((ingredient, index) => (
                  <li key={index}>{ingredient}</li>
                ))}
              </ul>
            </div>
            <div className="mt-4">
              <h1 className="text-xl font-bold">Admin Info:</h1>
              <p className="text-gray-600">Name: {meal.adminName}</p>
              <p className="text-gray-600">Email: {meal.admin_Email}</p>
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
};

export default MealsDetails;
