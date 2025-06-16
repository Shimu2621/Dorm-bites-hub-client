import {
  CardNumberElement,
  CardExpiryElement,
  CardCvcElement,
  useElements,
  useStripe,
} from "@stripe/react-stripe-js";
import { FormEvent, useEffect, useState } from "react";
import axios from "axios";
import useAuth from "../../../hooks/useAuth";
import useUser from "../../../hooks/useUser";
import toast from "react-hot-toast";
import { Button } from "@/components/ui/button";

interface CheckoutFormProps {
  price: number;
  package_name: string;
  badge_image: string;
}

const CheckoutForm: React.FC<CheckoutFormProps> = ({
  price,
  package_name,
  badge_image,
}) => {
  const { user } = useAuth();
  const [clientSecret, setClientSecret] = useState<string>("");
  const [transactionId, setTransactionId] = useState<string>("");
  const [isProcessing, setIsProcessing] = useState<boolean>(false);
  const stripe = useStripe();
  const elements = useElements();
  const [error, setError] = useState<string>("");

  useEffect(() => {
    if (price > 0) {
      axios
        .post("https://dorm-dine-hub-server.vercel.app/create-payment-intent", {
          price,
        })
        .then((res) => {
          setClientSecret(res.data.clientSecret);
        })
        .catch((err) => {
          console.error("Error creating payment intent:", err);
          toast.error("Failed to initialize payment. Please try again.");
        });
    }
  }, [price]);

  const [singleUser, isLoading] = useUser();

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-8">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-indigo-600"></div>
        <span className="ml-3 text-gray-600">Loading...</span>
      </div>
    );
  }

  const objUser = { ...singleUser.data[0] };
  const { _id } = objUser;

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!stripe || !elements) {
      toast.error("Payment system not ready. Please refresh the page.");
      return;
    }

    if (isProcessing) return;

    setIsProcessing(true);
    setError("");

    const cardNumber = elements.getElement(CardNumberElement);
    if (!cardNumber) {
      toast.error("Please enter your card details.");
      setIsProcessing(false);
      return;
    }

    // Show processing toast
    const processingToast = toast.loading("Processing your payment...");

    try {
      const { error: cardError } = await stripe.createPaymentMethod({
        type: "card",
        card: cardNumber,
      });

      if (cardError) {
        console.error("Payment Method Error:", cardError);
        setError(cardError.message || "Something went wrong.");
        toast.dismiss(processingToast);
        toast.error(cardError.message || "Payment failed. Please try again.");
        setIsProcessing(false);
        return;
      }

      const { paymentIntent, error: confirmError } =
        await stripe.confirmCardPayment(clientSecret, {
          payment_method: {
            card: cardNumber,
            billing_details: {
              email: user?.email || "anonymous",
              name: user?.displayName || "anonymous",
            },
          },
        });

      if (confirmError) {
        console.error("Confirm Payment Error:", confirmError);
        setError(confirmError.message || "Payment confirmation failed.");
        toast.dismiss(processingToast);
        toast.error(
          confirmError.message || "Payment failed. Please try again."
        );
        setIsProcessing(false);
        return;
      }

      if (paymentIntent?.status === "succeeded") {
        setTransactionId(paymentIntent.id);

        const userBadge = {
          badge: package_name,
          badge_image: badge_image,
        };

        try {
          const res = await axios.put(
            `https://dorm-dine-hub-server.vercel.app/users/${_id}`,
            userBadge
          );

          toast.dismiss(processingToast);

          if (res.data.modifiedCount > 0) {
            toast.success(
              "🎉 Payment successful! Your plan has been activated.",
              {
                duration: 5000,
                style: {
                  background: "#10B981",
                  color: "#fff",
                },
              }
            );
          } else {
            toast.success("Payment completed successfully!", {
              duration: 4000,
            });
          }
        } catch (error) {
          console.error("Error updating user:", error);
          toast.dismiss(processingToast);
          toast.success("Payment successful! (Profile update pending)", {
            duration: 4000,
          });
        }
      }
    } catch (error) {
      console.error("Payment processing error:", error);
      toast.dismiss(processingToast);
      toast.error("An unexpected error occurred. Please try again.");
    } finally {
      setIsProcessing(false);
    }
  };

  const cardElementOptions = {
    style: {
      base: {
        fontSize: "16px",
        color: "#1f2937",
        fontFamily:
          '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
        "::placeholder": {
          color: "#9ca3af",
        },
        iconColor: "#6b7280",
      },
      invalid: {
        color: "#ef4444",
        iconColor: "#ef4444",
      },
    },
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Card Number */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Card Number
        </label>
        <div className="border border-gray-300 rounded-lg p-4 bg-white focus-within:ring-2 focus-within:ring-indigo-500 focus-within:border-indigo-500 transition-colors">
          <CardNumberElement options={cardElementOptions} />
        </div>
      </div>

      {/* Expiry and CVC */}
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Expiry Date
          </label>
          <div className="border border-gray-300 rounded-lg p-4 bg-white focus-within:ring-2 focus-within:ring-indigo-500 focus-within:border-indigo-500 transition-colors">
            <CardExpiryElement options={cardElementOptions} />
          </div>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            CVC
          </label>
          <div className="border border-gray-300 rounded-lg p-4 bg-white focus-within:ring-2 focus-within:ring-indigo-500 focus-within:border-indigo-500 transition-colors">
            <CardCvcElement options={cardElementOptions} />
          </div>
        </div>
      </div>

      {/* Error Message */}
      {error && (
        <div className="bg-red-50 border border-red-200 rounded-lg p-3">
          <div className="flex">
            <svg
              className="w-5 h-5 text-red-400 mr-2 mt-0.5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
            <p className="text-sm text-red-700">{error}</p>
          </div>
        </div>
      )}

      {/* Submit Button */}
      <Button
        type="submit"
        disabled={!stripe || !clientSecret || isProcessing}
        className="w-full bg-indigo-600 hover:bg-indigo-700 disabled:bg-gray-400 disabled:cursor-not-allowed text-white font-semibold py-3 px-4 rounded-lg transition-colors duration-200 flex items-center justify-center"
      >
        {isProcessing ? (
          <>
            <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
            Processing...
          </>
        ) : (
          <>
            <svg
              className="w-5 h-5 mr-2"
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
            Pay ${price}
          </>
        )}
      </Button>

      {/* Transaction Success */}
      {transactionId && (
        <div className="bg-green-50 border border-green-200 rounded-lg p-4">
          <div className="flex items-start">
            <svg
              className="w-5 h-5 text-green-400 mr-2 mt-0.5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
            <div>
              <h4 className="text-sm font-medium text-green-800 mb-1">
                Payment Successful!
              </h4>
              <p className="text-sm text-green-700">
                Transaction ID:{" "}
                <span className="font-mono text-xs bg-green-100 px-2 py-1 rounded">
                  {transactionId}
                </span>
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Security Notice */}
      <div className="text-xs text-gray-500 text-center">
        <div className="flex items-center justify-center">
          <svg
            className="w-4 h-4 mr-1"
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
          Secured by Stripe • Your information is encrypted and secure
        </div>
      </div>
    </form>
  );
};

export default CheckoutForm;
