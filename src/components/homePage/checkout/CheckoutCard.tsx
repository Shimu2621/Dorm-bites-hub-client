/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Check } from "lucide-react";
import { useRouter } from "next/navigation";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Loader2 } from "lucide-react";

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
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [paymentDetails, setPaymentDetails] = useState({
    cardNumber: "",
    expiryDate: "",
    cvv: "",
    name: "",
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setPaymentDetails((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleProceedToPayment = () => {
    setShowPaymentModal(true);
  };

  const handlePayment = async () => {
    setLoading(true);
    setError(null);

    try {
      // Basic validation
      if (
        !paymentDetails.cardNumber.trim() ||
        !paymentDetails.expiryDate.trim() ||
        !paymentDetails.cvv.trim() ||
        !paymentDetails.name.trim()
      ) {
        throw new Error("Please fill in all payment details");
      }

      const response = await fetch(
        "https://dorm-dine-hub-server.vercel.app/create-payment-intent",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            planType: plan,
            amount: parseInt(price) * 100, // Convert to cents for the payment API
            currency: "usd",
            description: `${plan} meal plan subscription`,
          }),
        }
      );

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Payment processing failed");
      }

      const data = await response.json();
      console.log("Payment Response:", data);

      // On successful payment
      setSuccess(true);
      setShowPaymentModal(false);

      // Redirect to success page after 2 seconds
      setTimeout(() => {
        router.push(`/payment-success?plan=${plan}&price=${price}`);
      }, 2000);
    } catch (error: any) {
      console.error("Payment error:", error);
      setError(error.message || "Payment failed! Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Card className="w-full max-w-lg items-center justify-center p-10 border-none rounded-sm shadow-lg text-center transition-transform duration-300 hover:scale-110">
        <CardHeader>
          <CardTitle className="text-3xl italic font-bold text-primary">
            {plan} Plan
          </CardTitle>
          <p className="text-lg text-gray-color">
            <span className="text-4xl font-bold">${price}</span> /month
          </p>
        </CardHeader>
        <CardContent>
          <ul className="text-left space-y-3">
            {benefits.map((benefit, index) => (
              <li key={index} className="flex items-center gap-2">
                <Check className="w-5 h-5 rounded-sm bg-blue-500 text-white" />
                {benefit}
              </li>
            ))}
          </ul>
        </CardContent>
        <CardFooter className="flex flex-col w-full gap-4">
          {error && (
            <Alert variant="destructive" className="mb-4">
              <AlertTitle>Error</AlertTitle>
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}

          {success && (
            <Alert className="mb-4 bg-green-50 border-green-200">
              <AlertTitle>Payment Successful!</AlertTitle>
              <AlertDescription>
                Thank you for subscribing to our {plan} plan. Redirecting you to
                the confirmation page...
              </AlertDescription>
            </Alert>
          )}

          <Button
            onClick={handleProceedToPayment}
            className="w-full px-16 bg-blue-500 hover:bg-blue-600 text-white"
            disabled={loading || success}
          >
            {loading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Processing
              </>
            ) : (
              "Proceed to Payment"
            )}
          </Button>
        </CardFooter>
      </Card>

      <Dialog open={showPaymentModal} onOpenChange={setShowPaymentModal}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Payment Details</DialogTitle>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="name">Cardholder Name</Label>
              <Input
                id="name"
                name="name"
                placeholder="John Doe"
                value={paymentDetails.name}
                onChange={handleInputChange}
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="cardNumber">Card Number</Label>
              <Input
                id="cardNumber"
                name="cardNumber"
                placeholder="4242 4242 4242 4242"
                value={paymentDetails.cardNumber}
                onChange={handleInputChange}
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="grid gap-2">
                <Label htmlFor="expiryDate">Expiry Date</Label>
                <Input
                  id="expiryDate"
                  name="expiryDate"
                  placeholder="MM/YY"
                  value={paymentDetails.expiryDate}
                  onChange={handleInputChange}
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="cvv">CVV</Label>
                <Input
                  id="cvv"
                  name="cvv"
                  placeholder="123"
                  value={paymentDetails.cvv}
                  onChange={handleInputChange}
                />
              </div>
            </div>
          </div>
          <DialogFooter className="flex flex-col-reverse sm:flex-row sm:justify-end gap-2">
            <Button
              variant="outline"
              onClick={() => setShowPaymentModal(false)}
            >
              Cancel
            </Button>
            <Button
              onClick={handlePayment}
              className="bg-blue-500 hover:bg-blue-600 text-white"
              disabled={loading}
            >
              {loading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Processing
                </>
              ) : (
                `Pay $${price}`
              )}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default CheckoutCard;
