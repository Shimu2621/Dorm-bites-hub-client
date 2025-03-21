// app/checkout/page.tsx
"use client";

import CheckoutCard from "@/components/homePage/checkout/CheckoutCard";
import { useSearchParams } from "next/navigation";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import Link from "next/link";

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

const validPlans = ["Basic", "Standard", "Premium"];

const CheckoutPage = () => {
  const searchParams = useSearchParams();
  const plan = searchParams.get("plan") || "Basic";
  const price = searchParams.get("price") || "100";

  // Validate plan parameter
  const isValidPlan = validPlans.includes(plan);

  // Validate price parameter (must be a positive number)
  const isValidPrice = !isNaN(Number(price)) && Number(price) > 0;

  // If either parameter is invalid, show an error message
  if (!isValidPlan || !isValidPrice) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-gray-100 p-6">
        <div className="w-full max-w-lg space-y-6">
          <Alert variant="destructive">
            <AlertTitle>Invalid Parameters</AlertTitle>
            <AlertDescription>
              {!isValidPlan && (
                <p>
                  Invalid plan selected. Please choose from Basic, Standard, or
                  Premium.
                </p>
              )}
              {!isValidPrice && (
                <p>Invalid price parameter. Price must be a positive number.</p>
              )}
            </AlertDescription>
          </Alert>
          <div className="flex justify-center">
            <Link href="/">
              <Button>Return to Home</Button>
            </Link>
          </div>
        </div>
      </div>
    );
  }

  const benefits = benefitsData[plan];

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100 p-6">
      <CheckoutCard plan={plan} price={price} benefits={benefits} />
    </div>
  );
};

export default CheckoutPage;
