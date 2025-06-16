"use client";

import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import CheckoutForm from "@/components/homePage/checkoutForm/CheckoutForm";

// import Navbar from "../../components/Navbar";
// import Footer from "../../components/Footer";
// import Container from "../../components/Container";

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

const stripePromise = loadStripe(process.env.NEXT_PAYMENT_KEY || "");
console.log(stripePromise);

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
      <div className="min-h-screen bg-gray-100">
        {/* <Navbar />
        <Container> */}
        <h1 className="mt-20 text-center text-4xl font-bold uppercase text-red-600">
          Invalid Plan Selected
        </h1>
        {/* </Container>
        <Footer /> */}
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100">
      {/* <Navbar />
      <Container> */}
      <h1 className="mt-20 text-center text-4xl font-bold uppercase">
        Payment
      </h1>
      <div className="mt-8 text-center">
        <p className="text-xl font-bold my-5">Price: ${selectedPlan.price}</p>
        <p className="text-xl font-bold my-5">Plan: {selectedPlan.name}</p>
        <div className="max-w-md mx-auto">
          <h2 className="text-lg font-semibold mb-4">
            {selectedPlan.description}
          </h2>
          <ul className="text-left list-disc pl-5">
            {selectedPlan.benefits.map((benefit, index) => (
              <li key={index} className="mb-2">
                {benefit}
              </li>
            ))}
          </ul>
        </div>
      </div>
      <div className="mt-12 max-w-sm mx-auto">
        <Elements stripe={stripePromise}>
          <CheckoutForm
            price={selectedPlan.price}
            package_name={selectedPlan.name}
            badge_image={selectedPlan.badge_image}
          />
        </Elements>
      </div>
      {/* </Container>
      <Footer /> */}
    </div>
  );
};

export default CheckoutPage;
