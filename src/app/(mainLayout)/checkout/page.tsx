"use client";

import CheckoutCard from "@/components/homePage/checkout/CheckoutCard";
import { useSearchParams } from "next/navigation";

const benefitsData: { [key: string]: string[] } = {
  Basic: [
    "10 meals per week",
    "Standard portion size",
    "Limited menu selection",
    "Flexible meal scheduling",
    "Delivery to your doorstep",
    "Pause or cancel anytime",
    "No customization options",
  ],
  Standard: [
    "15 meals per week",
    "Larger portion sizes",
    "Wide menu selection",
    "Dietitian-approved meals",
    "High-protein & low-carb options",
    "Includes breakfast, lunch & dinner",
    "Limited customization options",
  ],
  Premium: [
    "21 meals per week",
    "Exclusive seasonal dishes",
    "Special discounts on add-ons",
    "Extra-large portion sizes",
    "Exclusive menu options",
    "Full customization available",
    "Access to premium recipes & cooking tips",
  ],
};

const CheckoutPage = () => {
  const searchParams = useSearchParams();
  const plan = searchParams.get("plan") || "Basic";
  const price = searchParams.get("price") || "100";
  const benefits = benefitsData[plan] || benefitsData["Basic"];
  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100 p-6">
      <CheckoutCard plan={plan} price={price} benefits={benefits} />
    </div>
  );
};

export default CheckoutPage;
