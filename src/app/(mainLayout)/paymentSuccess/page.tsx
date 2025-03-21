// app/payment-success/page.tsx
"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { CheckCircle } from "lucide-react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";

const PaymentSuccessPage = () => {
  const searchParams = useSearchParams();
  const plan = searchParams.get("plan") || "Basic";
  const price = searchParams.get("price") || "100";

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100 p-6">
      <Card className="w-full max-w-lg border-none shadow-lg text-center">
        <CardHeader>
          <div className="flex justify-center mb-4">
            <CheckCircle className="h-16 w-16 text-green-500" />
          </div>
          <CardTitle className="text-3xl font-bold text-green-600">
            Payment Successful!
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-lg">
            Thank you for subscribing to our{" "}
            <span className="font-bold">{plan}</span> plan.
          </p>
          <div className="bg-gray-50 p-4 rounded-md">
            <h3 className="font-medium text-gray-700 mb-2">Order Summary</h3>
            <div className="flex justify-between">
              <span>Plan:</span>
              <span className="font-medium">{plan}</span>
            </div>
            <div className="flex justify-between">
              <span>Price:</span>
              <span className="font-medium">${price}/month</span>
            </div>
            <div className="flex justify-between">
              <span>Status:</span>
              <span className="text-green-600 font-medium">Paid</span>
            </div>
          </div>
          <p className="text-sm text-gray-500 mt-6">
            Your subscription will begin immediately. A receipt has been sent to
            your email.
          </p>
        </CardContent>
        <CardFooter className="flex justify-center space-x-4">
          <Link href="/dashboard">
            <Button className="bg-blue-500 hover:bg-blue-600 text-white">
              Go to Dashboard
            </Button>
          </Link>
          <Link href="/">
            <Button variant="outline">Return to Home</Button>
          </Link>
        </CardFooter>
      </Card>
    </div>
  );
};

export default PaymentSuccessPage;
