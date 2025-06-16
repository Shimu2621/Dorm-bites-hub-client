"use client";

import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import CheckoutForm from "@/components/homePage/checkoutForm/CheckoutForm";
import Image from "next/image";

interface Plan {
  name: string;
  price: number;
  badge_image: string;
  description: string;
  benefits: string[];
}

const plans: Plan[] = [
  {
    name: "Silver",
    price: 100,
    badge_image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRattoapBWAvkV7VLrrL2l9s_gDd8ALFkDumEDXjCc0eIv8XOPxZnb5QAzabcFBI7cYQSc&usqp=CAU",
    description:
      "A budget-friendly meal plan with essential nutrition and delicious flavors.",
    benefits: [
      "10 meals per week",
      "Standard portion size",
      "Limited menu selection",
      "Flexible meal scheduling",
      "Delivery to your doorstep",
      "Pause or cancel anytime",
      "No customization options",
    ],
  },
  {
    name: "Gold",
    price: 150,
    badge_image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSWnLe0z2q5Ox_Foo3TfJKt2eLn7zifrqqowPV3PY2nfUK2MksDU7Gc5qccJJYfIvhnTt4&usqp=CAU",
    description:
      "A well-balanced meal plan with more variety and customization options.",
    benefits: [
      "15 meals per week",
      "Larger portion sizes",
      "Wide menu selection",
      "Dietitian-approved meals",
      "High-protein & low-carb options",
      "Includes breakfast, lunch & dinner",
      "Limited customization options",
    ],
  },
  {
    name: "Platinum",
    price: 200,
    badge_image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTqdNXlg0UstP2mFr9ArwyD3tAeZVYDF74QtJ-StKdj4wvMQNVPxzW61Aa9tMGj9AgwPw4&usqp=CAU",
    description:
      "A premium meal plan with gourmet dishes and full customization options.",
    benefits: [
      "21 meals per week",
      "Exclusive seasonal dishes",
      "Special discounts on add-ons",
      "Extra-large portion sizes",
      "Exclusive menu options",
      "Full customization available",
      "Access to premium recipes & cooking tips",
    ],
  },
];

const stripeKey = process.env.NEXT_PUBLIC_PAYMENT_KEY;
if (!stripeKey) {
  throw new Error(
    "Stripe publishable key (NEXT_PUBLIC_PAYMENT_KEY) is not defined in environment variables."
  );
}
const stripePromise = loadStripe(stripeKey);
console.log("stripePromise", stripePromise);

const CheckoutPage: React.FC = () => {
  const searchParams = useSearchParams();
  const planName = searchParams.get("plan");
  const [selectedPlan, setSelectedPlan] = useState<Plan | null>(null);

  useEffect(() => {
    if (planName) {
      const plan = plans.find((p) => p.name === planName);
      setSelectedPlan(plan || null);
    }
  }, [planName]);

  if (!selectedPlan) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center">
        <div className="bg-white rounded-lg shadow-lg p-8 max-w-md w-full mx-4">
          <div className="text-center">
            <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg
                className="w-8 h-8 text-red-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z"
                />
              </svg>
            </div>
            <h1 className="text-2xl font-bold text-gray-900 mb-2">
              Invalid Plan Selected
            </h1>
            <p className="text-gray-600">
              Please select a valid meal plan to continue.
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-12 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">
            Complete Your Payment
          </h1>
          <p className="text-gray-600">Secure checkout powered by Stripe</p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Plan Summary */}
          <div className="bg-white rounded-xl shadow-lg p-6">
            <div className="flex items-center mb-6">
              <Image
                width={36}
                height={36}
                src={selectedPlan.badge_image}
                alt={`${selectedPlan.name} plan`}
                className="w-12 h-12 rounded-full mr-4"
              />
              <div>
                <h2 className="text-2xl font-bold text-gray-900">
                  {selectedPlan.name} Plan
                </h2>
                <p className="text-3xl font-bold text-indigo-600">
                  ${selectedPlan.price}
                </p>
              </div>
            </div>

            <div className="mb-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-3">
                Plan Details
              </h3>
              <p className="text-gray-600 mb-4">{selectedPlan.description}</p>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-3">
                What&rsquo;s Included
              </h3>
              <ul className="space-y-2">
                {selectedPlan.benefits.map((benefit, index) => (
                  <li key={index} className="flex items-start">
                    <svg
                      className="w-5 h-5 text-green-500 mr-2 mt-0.5 flex-shrink-0"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                    <span className="text-gray-700">{benefit}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Order Summary */}
            <div className="mt-6 pt-6 border-t border-gray-200">
              <div className="flex justify-between items-center mb-2">
                <span className="text-gray-600">Subtotal</span>
                <span className="text-gray-900">${selectedPlan.price}</span>
              </div>
              <div className="flex justify-between items-center mb-2">
                <span className="text-gray-600">Processing Fee</span>
                <span className="text-gray-900">$0</span>
              </div>
              <div className="border-t border-gray-200 pt-2">
                <div className="flex justify-between items-center">
                  <span className="text-lg font-semibold text-gray-900">
                    Total
                  </span>
                  <span className="text-2xl font-bold text-indigo-600">
                    ${selectedPlan.price}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Payment Form */}
          <div className="bg-white rounded-xl shadow-lg p-6">
            <h3 className="text-xl font-semibold text-gray-900 mb-6">
              Payment Information
            </h3>
            <Elements stripe={stripePromise}>
              <CheckoutForm
                price={selectedPlan.price}
                package_name={selectedPlan.name}
                badge_image={selectedPlan.badge_image}
              />
            </Elements>
          </div>
        </div>

        {/* Security Notice */}
        <div className="mt-8 text-center">
          <div className="inline-flex items-center text-sm text-gray-500">
            <svg
              className="w-4 h-4 mr-2"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
              />
            </svg>
            Your payment information is secure and encrypted
          </div>
        </div>
      </div>
    </div>
  );
};

export default CheckoutPage;
