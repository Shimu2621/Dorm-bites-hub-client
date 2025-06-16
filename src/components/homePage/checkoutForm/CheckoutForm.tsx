import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
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
        });
    }
  }, [price]);

  const [singleUser, isLoading] = useUser();

  if (isLoading) {
    return <p>Loading...</p>;
  }

  const objUser = { ...singleUser.data[0] };
  const { _id } = objUser;

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!stripe || !elements) return;

    const card = elements.getElement(CardElement);
    if (!card) return;

    const { error: cardError } = await stripe.createPaymentMethod({
      type: "card",
      card,
    });

    if (cardError) {
      console.error("Payment Method Error:", cardError);
      setError(cardError.message || "Something went wrong.");
      return;
    } else {
      setError("");
    }

    const { paymentIntent, error: confirmError } =
      await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card,
          billing_details: {
            email: user?.email || "anonymous",
            name: user?.displayName || "anonymous",
          },
        },
      });

    if (confirmError) {
      console.error("Confirm Payment Error:", confirmError);
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
        if (res.data.modifiedCount > 0) {
          toast.success("Thank you for your purchase!");
        }
      } catch (error) {
        console.error("Error updating user:", error);
      }
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <CardElement
        options={{
          style: {
            base: {
              fontSize: "16px",
              color: "#424770",
              "::placeholder": {
                color: "#aab7c4",
              },
            },
            invalid: {
              color: "#9e2146",
            },
          },
        }}
      />
      <div className="max-w-xs mx-auto">
        <Button
          className="btn w-full  mt-8"
          type="submit"
          disabled={!stripe || !clientSecret}
        >
          Pay
        </Button>
      </div>
      <p className="mt-12 text-center text-3xl text-red-600">{error}</p>
      {transactionId && (
        <p className="text-green-600">Your transaction id: {transactionId}</p>
      )}
    </form>
  );
};

export default CheckoutForm;
