"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import useAuth from "@/hooks/useAuth";
import { Rating } from "@smastrom/react-rating";
import "@smastrom/react-rating/style.css";
import axios from "axios";
import { AlertCircle, ThumbsDown, ThumbsUp, User } from "lucide-react";
import Image from "next/image";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import ReviewModal from "./ReviewModal";
import { Card } from "@/components/ui/card";

interface Meal {
  _id: string;
  mealImage: string;
  mealTitle: string;
  mealType: string;
  ingredients: string[];
  description: string;
  price: number;
  rating: number;
  reviews: number;
  adminName: string;
  timeDate: string;
  likes: number;
  liked: string[];
}

interface Review {
  _id: string;
  food_id: string;
  mealTitle: string;
  email: string;
  name: string;
  image?: string;
  user_rating: number;
  comment: string;
  createdAt?: string;
}

interface MealCardProps {
  meal: Meal;
}

const MealsDetails: React.FC<MealCardProps> = ({ meal }) => {
  const { user } = useAuth();
  const [mealData, setMealData] = useState<Meal>(meal);
  const [loading, setLoading] = useState(false);
  const [showUnlikeModal, setShowUnlikeModal] = useState(false);
  const [showRequestModal, setShowRequestModal] = useState(false);
  const [showReviewModal, setShowReviewModal] = useState(false);
  const [requestNote, setRequestNote] = useState("");
  const [reviews, setReviews] = useState<Review[]>([]);
  const [reviewsLoading, setReviewsLoading] = useState(false);

  // Fetch reviews on component mount and when meal ID changes
  useEffect(() => {
    if (mealData._id) {
      // Fetch reviews for this meal
      const fetchReviews = async () => {
        setReviewsLoading(true);
        try {
          const response = await axios.get(
            `https://dorm-dine-hub-server.vercel.app/reviews?id=${mealData._id}`
          );
          if (response.data && response.data.data) {
            setReviews(response.data.data);
          }
        } catch (error) {
          console.error("Error fetching reviews:", error);
          toast.error("Failed to load reviews");
        } finally {
          setReviewsLoading(false);
        }
      };

      fetchReviews();
    }
  }, [mealData._id]);

  // Check if current user has already liked this meal
  const hasUserLiked = user?.email && mealData.liked.includes(user.email);

  // Handle Like action
  const handleLike = async () => {
    if (!user?.email) {
      toast.error("Please log in to like meals");
      return;
    }

    // If user has already liked and tries to unlike, show confirmation modal
    if (hasUserLiked) {
      setShowUnlikeModal(true);
      return;
    }

    // Otherwise process the like action
    setLoading(true);

    try {
      const updatedMeal = {
        liked: [...mealData.liked, user.email],
        likes: mealData.likes + 1,
      };

      const response = await axios.put(
        `https://dorm-dine-hub-server.vercel.app/meals/${mealData._id}`,
        updatedMeal
      );

      if (response.status === 200) {
        // Update local state with server response
        setMealData({
          ...mealData,
          liked: response.data.liked || updatedMeal.liked,
          likes: response.data.likes || updatedMeal.likes,
        });

        // Show success toast
        toast.success("You have liked this meal");
      }
    } catch (error) {
      console.error("Error liking meal:", error);
      toast.error("Failed to like this meal");
    } finally {
      setLoading(false);
    }
  };

  // Handle Unlike action after confirmation
  const handleUnlike = async () => {
    setLoading(true);
    setShowUnlikeModal(false);

    try {
      // Remove user email from liked array and decrement likes
      const updatedLiked = mealData.liked.filter(
        (email) => email !== user?.email
      );
      const updatedLikes = Math.max(0, mealData.likes - 1); // Prevent negative likes

      const updatedMeal = {
        liked: updatedLiked,
        likes: updatedLikes,
      };

      const response = await axios.put(
        `https://dorm-dine-hub-server.vercel.app/upcoming-meals/${mealData._id}`,
        updatedMeal
      );

      if (response.status === 200) {
        // Update local state with server response
        setMealData({
          ...mealData,
          liked: response.data.liked || updatedLiked,
          likes: response.data.likes || updatedLikes,
        });

        // Show success toast
        toast.success("You have unliked this meal");
      }
    } catch (error) {
      console.error("Error unliking meal:", error);
      toast.error("Failed to unlike this meal");
    } finally {
      setLoading(false);
    }
  };

  // Handle Meal Request Submission
  const handleRequestSubmit = async () => {
    if (!user?.email) {
      toast.error("Please log in to make meal requests");
      return;
    }

    setLoading(true);
    try {
      const requestData = {
        mealId: mealData._id,
        mealTitle: mealData.mealTitle,
        mealImage: mealData.mealImage,
        userEmail: user.email,
        userName: user.displayName || "User",
        status: "pending", // initial status
        requestDate: new Date().toISOString(),
        note: requestNote,
      };

      const response = await axios.post(
        "https://dorm-dine-hub-server.vercel.app/request-meals",
        requestData
      );

      if (response.status === 200 || response.status === 201) {
        toast.success("Meal request submitted successfully!");
        setShowRequestModal(false);
        setRequestNote("");
      }
    } catch (error) {
      console.error("Error submitting meal request:", error);
      toast.error("Failed to submit meal request");
    } finally {
      setLoading(false);
    }
  };

  // Handle Review Submission (to be passed to ReviewModal)
  const handleReviewSubmit = async (rating: number, comment: string) => {
    if (!user?.email) {
      toast.error("Please log in to add a review");
      return;
    }

    setLoading(true);
    try {
      // Match the expected payload format from your API
      const reviewData = {
        food_id: mealData._id,
        mealTitle: mealData.mealTitle,
        email: user.email,
        name: user.displayName || "User",
        image: user.photoURL || "",
        user_rating: rating,
        comment: comment,
        likes: mealData.likes,
        reviews: mealData.reviews,
      };

      const response = await axios.post(
        "https://dorm-dine-hub-server.vercel.app/reviews",
        reviewData
      );

      if (response.status === 200 || response.status === 201) {
        // Update the meal's reviews count and rating
        setMealData({
          ...mealData,
          rating: response.data.rating || mealData.rating,
          reviews: response.data.reviews || mealData.reviews + 1,
        });

        toast.success("Review submitted successfully!");
        setShowReviewModal(false);
      }
    } catch (error) {
      console.error("Error submitting review:", error);
      toast.error("Failed to submit review");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-20">
      <div className="max-w-5xl mx-auto px-4">
        <div className="mb-8">
          <h1 className="text-primary text-4xl italic font-bold">
            Meal Details
          </h1>
        </div>
        <div className="flex justify-between ">
          <div>
            <div className="relative group overflow-hidden rounded-sm">
              <Image
                src={meal.mealImage}
                alt={meal.mealTitle}
                width={560}
                height={400}
                className="w-110 h-110 p-2 bg-white border-8 border-gray-500 object-cover rounded-sm shadow-2xs"
                unoptimized={true}
              />
              <Button className="bg-pink-700 text-default-white rounded-sm absolute top-4 left-4">
                {meal.mealType}
              </Button>
            </div>
            <div className="mt-4 flex items-center justify-between gap-4">
              <Button className="text-md text-default-white ">
                Price: ${meal.price}
              </Button>
              <Button
                onClick={handleLike}
                disabled={loading}
                className={`flex items-center gap-2 ${
                  hasUserLiked
                    ? "bg-red-500 hover:bg-red-600"
                    : "bg-pink-500 hover:bg-pink-600"
                } text-default-white px-4 py-2 rounded`}
              >
                {hasUserLiked ? (
                  <ThumbsDown size={18} />
                ) : (
                  <ThumbsUp size={18} />
                )}
                <span>{mealData.likes}</span>
              </Button>
            </div>
          </div>
          <div className="w-1/2">
            <h1 className="text-3xl font-bold text-primary italic mb-4">
              {meal.mealTitle}
            </h1>

            <div className="rating-container">
              <Rating
                value={meal.rating}
                readOnly
                halfFillMode="svg"
                style={{ maxWidth: 120 }}
              />
            </div>

            <p className="text-lg text-light-gray font-semibold">
              <span className="text-yellow-600 font-bold italic text-xl">
                Reviews:
              </span>{" "}
              ({meal.reviews})
            </p>

            <p className="text-lg text-light-gray font-semibold">
              <span className="text-yellow-600 font-bold italic text-xl">
                Posted by:
              </span>{" "}
              ({meal.adminName})
            </p>

            <p className="text-lg text-light-gray font-semibold">
              <span className="text-yellow-600 font-bold italic text-xl">
                Posted date:
              </span>{" "}
              {new Date(meal.timeDate).toLocaleDateString()}
            </p>
            <div className="mt-4">
              <h1 className="text-xl  text-yellow-600 italic font-bold">
                Description:
              </h1>
              <p className="text-light-gray">{meal.description}</p>
            </div>
            <div className="mt-6 ">
              <h1 className="text-xl mb-2 text-yellow-600 italic font-bold ">
                Ingredients:
              </h1>
              <ul className="pl-5  text-light-gray flex flex-wrap gap-x-4 gap-y-2">
                {meal.ingredients.map((ingredient, index) => (
                  <li key={index} className="list-disc flex items-center">
                    <span className="w-2 h-2 bg-light-gray rounded-full mr-2"></span>
                    {ingredient}
                  </li>
                ))}
              </ul>
            </div>
            <div className="w-full mt-10 flex gap-4">
              <Button
                className="flex-1 bg-yellow-600 hover:bg-yellow-700 text-default-white"
                onClick={() => setShowRequestModal(true)}
              >
                Make Meal Request
              </Button>
            </div>
          </div>
        </div>

        {/* Unlike Confirmation Modal */}
        <Dialog open={showUnlikeModal} onOpenChange={setShowUnlikeModal}>
          <DialogContent className="sm:max-w-md">
            <DialogHeader>
              <DialogTitle className="flex items-center gap-2 text-xl">
                <AlertCircle className="text-amber-500" size={24} />
                Confirm Unlike
              </DialogTitle>
            </DialogHeader>
            <div className="py-4">
              <p className="text-light-gray">
                Are you sure you want to unlike{" "}
                <span className="font-semibold">{mealData.mealTitle}</span>?
              </p>
            </div>
            <DialogFooter className="flex flex-row justify-end gap-2 sm:justify-end">
              <Button
                variant="outline"
                onClick={() => setShowUnlikeModal(false)}
                className="border-gray-300"
              >
                Cancel
              </Button>
              <Button
                onClick={handleUnlike}
                className="bg-red-500 hover:bg-red-600 text-default-white"
              >
                Unlike
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>

        {/* Meal Request Modal */}
        <Dialog open={showRequestModal} onOpenChange={setShowRequestModal}>
          <DialogContent className="sm:max-w-md">
            <DialogHeader>
              <DialogTitle className="text-xl">
                Request Meal: {mealData.mealTitle}
              </DialogTitle>
            </DialogHeader>
            <div className="py-4 space-y-4">
              <div>
                <Label htmlFor="requestNote" className="text-gray-700">
                  Additional Notes (optional)
                </Label>
                <Textarea
                  id="requestNote"
                  placeholder="Any special instructions or requests?"
                  value={requestNote}
                  onChange={(e) => setRequestNote(e.target.value)}
                  className="mt-1 w-full"
                />
              </div>
              <div className="text-sm text-gray-500">
                Your request will be submitted for approval. You will be
                notified when your request is processed.
              </div>
            </div>
            <DialogFooter className="flex flex-row justify-end gap-2 sm:justify-end">
              <Button
                variant="outline"
                onClick={() => setShowRequestModal(false)}
                className="border-gray-300"
              >
                Cancel
              </Button>
              <Button
                onClick={handleRequestSubmit}
                disabled={loading}
                className="bg-yellow-600 hover:bg-yellow-700 text-white"
              >
                {loading ? "Submitting..." : "Submit Request"}
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>

        {/* Divider */}
        <div className="relative flex items-center justify-center my-8">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-gray-300"></div>
          </div>
          {/* <div className="relative z-10 bg-[#1a1e23] p-1 rounded-full">
            <X className="w-5 h-5 text-gray-400" />
          </div> */}
        </div>

        {/* Add a review section */}
        <div className="mb-8">
          <div className="relative flex justify-center mb-6">
            <div className="absolute top-1/2 -translate-y-1/2 w-full h-6 bg-gradient-to-r from-amber-600 via-amber-400 to-amber-600"></div>
            <div className="relative transform rotate-[-10deg] bg-gradient-to-r from-amber-600 via-amber-400 to-amber-600 py-6 px-10 text-center">
              <h3 className="text-xl font-bold text-gray-900">
                Add a review !!
              </h3>
            </div>
          </div>

          <div className=" border-3 border-gray-500 w-80 h-30 mx-auto p-6 text-center mb-8">
            <div className="border-3 border-gray-500 w-80 h-30 mx-auto p-6 text-center">
              <Button
                onClick={() => setShowReviewModal(true)}
                className="text-2xl bg-white border-none shadow-none text-amber-600 mt-1 font-bold hover:bg-white hover:border-none hover:shadow-none"
              >
                Add a review
              </Button>
            </div>
          </div>
        </div>

        {/* Reviews Section */}
        <div className="mt-15 flex flex-col items-center">
          <h3 className="text-2xl text-amber-600 font-bold mb-2">
            Customer Reviews
          </h3>

          {reviewsLoading ? (
            <div className="text-center py-8">Loading reviews...</div>
          ) : reviews.length > 0 ? (
            <div className="space-y-4">
              {reviews.map((review) => (
                <Card
                  key={review._id}
                  className="border-3 border-gray-500 w-86 h-30 mx-auto p-6 text-center justify-center rounded-none"
                >
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-full bg-gray-200 flex items-center justify-center overflow-hidden flex-shrink-0 mt-4">
                      {review.image ? (
                        <Image
                          src={review.image || "/placeholder.svg"}
                          alt={review.name}
                          width={46}
                          height={46}
                          className="w-full h-full object-cover"
                          unoptimized={true}
                        />
                      ) : (
                        <User className="w-6 h-6 text-gray-500" />
                      )}
                    </div>
                    <div className="flex-1">
                      <div className="flex justify-center items-center flex-col">
                        <h4 className="font-bold text-gray-800">
                          {review.name}
                        </h4>
                        <p className=" text-gray-700">{review.comment}</p>

                        <Rating
                          value={review.user_rating}
                          readOnly
                          style={{ maxWidth: 100 }}
                        />
                      </div>
                      {review.createdAt && (
                        <span className="text-sm text-gray-500">
                          {review.createdAt
                            ? new Date(review.createdAt).toLocaleDateString()
                            : "Unknown date"}
                        </span>
                      )}
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          ) : (
            <div className="text-center py-8 border border-dashed border-gray-300 rounded-lg">
              <p className="text-gray-500">
                No reviews yet. Be the first to review this meal!
              </p>
            </div>
          )}
        </div>

        {/* Review Modal - Now using the separated component */}
        <ReviewModal
          open={showReviewModal}
          onOpenChange={setShowReviewModal}
          mealTitle={mealData.mealTitle}
          onSubmit={handleReviewSubmit}
          loading={loading}
        />
      </div>
    </div>
  );
};

export default MealsDetails;
