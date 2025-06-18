"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Check } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React from "react";
import { toast } from "react-hot-toast"; // Add this import

interface PricingCardProps {
  badge_name: string;
  price: number;
  badge_image: string;
  description: string;
  benefits: string[];
}

const PricingCard: React.FC<PricingCardProps> = ({
  badge_name,
  price,
  badge_image,
  description,
  benefits,
}) => {
  const router = useRouter();

  const handleBuyNow = () => {
    // Check if user is logged in
    // Replace this with your actual authentication check
    const isLoggedIn = localStorage.getItem("access-token");
    // Alternative: const token = localStorage.getItem('authToken');
    // Alternative: const user = getCurrentUser(); // your auth function

    console.log(isLoggedIn);

    if (!isLoggedIn) {
      // Show toast message
      toast.error("Please login first to access the next page", {
        duration: 4000,
        position: "top-center",
      });

      // Navigate to login page
      router.push("/login");
      return;
    }

    // User is authenticated, proceed to checkout
    router.push(`/checkout?plan=${badge_name}`);
  };

  return (
    <Card className="p-5 bg-accent border border-accent rounded-sm  text-center transition-transform duration-300 hover:scale-110">
      <CardHeader>
        <CardTitle className="text-2xl text-primary italic font-bold">
          {badge_name}{" "}
        </CardTitle>
        <p className="text-lg flex flex-col text-gray-color">
          <span className="font-bold text-5xl text-gray-700">${price}</span> /
          month
        </p>
      </CardHeader>
      <CardContent>
        <Image
          src={badge_image}
          alt="Badge-img"
          width={128}
          height={128}
          className="rounded-full w-20 h-20 object-contain mx-auto"
        />
        <p className="text-gray-700 mb-4">{description}</p>
        <ul className="text-center space-y-3">
          {benefits.map((benefit, index) => (
            <li key={index} className="flex items-center gap-2">
              <Check className="w-4 h-4  rounded-full bg-blue-500 text-white" />
              {benefit}
            </li>
          ))}
        </ul>
      </CardContent>
      <CardFooter className="pt-10">
        <Button
          onClick={handleBuyNow}
          className="w-full bg-blue-500 hover:bg-blue-600 text-white hover"
        >
          Buy Now
        </Button>
      </CardFooter>
    </Card>
  );
};

export default PricingCard;
