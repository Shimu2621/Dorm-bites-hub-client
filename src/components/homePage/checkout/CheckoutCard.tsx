import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Check } from "lucide-react";
import React from "react";
import toast from "react-hot-toast";

interface CheckoutCardProps {
  plan: string;
  price: string;
  benefits: string[];
}

const CheckoutCard: React.FC<CheckoutCardProps> = ({
  plan,
  price,
  benefits,
}) => {
  const handlePayment = async () => {
    try {
      const response = await fetch(
        "https://dorm-dine-hub-server.vercel.app/create-payment-intent"
      );
      console.log("Payment Response:", response);
    } catch (error) {
      console.log(error);
      toast.error("Payment failed! Please try again.");
    }
  };

  return (
    <Card className="w-full max-w-lg items-center justify-center p-10 border-none rounded-sm shadow-lg text-center transition-transform duration-300 hover:scale-110">
      <CardHeader>
        <CardTitle className="text-3xl italic font-bold text-primary">
          {plan} Plan
        </CardTitle>
        <p className="text-lg text-gray-color">
          <span className="text-4xl font-bold">{price}</span> /month
        </p>
      </CardHeader>
      <CardContent>
        <ul className="text-left space-y-3">
          {benefits.map((benefit, index) => (
            <li key={index} className="flex items-center gap-2">
              <Check className="w-5 h-5 rounded-sm bg-blue-500 text-white" />{" "}
              {/* ✅ Blue check icon */}
              {benefit}
            </li>
          ))}
        </ul>
      </CardContent>
      <CardFooter>
        <Button
          onClick={handlePayment}
          className="w-full px-16 bg-blue-500 hover:bg-blue-600 text-white hover"
        >
          Procced to Payment
        </Button>
      </CardFooter>
    </Card>
  );
};

export default CheckoutCard;
