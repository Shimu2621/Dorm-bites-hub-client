"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import Image from "next/image";
import { ThumbsUp, ThumbsDown, AlertCircle } from "lucide-react";
import { Rating } from "@smastrom/react-rating";
import { useState } from "react";
import axios from "axios";
import useAuth from "@/hooks/useAuth";
import toast from "react-hot-toast";
import "@smastrom/react-rating/style.css"; // Import the styles for proper rating display

interface Meal {
  _id: string;
  mealImage: string;
  mealTitle: string;
  mealType: string;
  price: number;
  rating: number;
  reviews: number;
  likes: number;
  liked: string[];
}

interface MealCardProps {
  meal: Meal;
}

const UpcomingMealsCard: React.FC<MealCardProps> = ({ meal }) => {
  const { user } = useAuth();
  const [mealData, setMealData] = useState<Meal>(meal);
  const [loading, setLoading] = useState(false);
  const [showUnlikeModal, setShowUnlikeModal] = useState(false);

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
        `https://dorm-dine-hub-server.vercel.app/upcoming-meals/${mealData._id}`,
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

  return (
    <Card className="border-none shadow-none">
      <CardContent>
        <div className="relative group overflow-hidden rounded-sm">
          <Image
            src={mealData.mealImage}
            alt={mealData.mealType}
            width={500}
            height={400}
            className="w-[300px] h-[250px] rounded-sm object-cover transition-transform duration-300 group-hover:scale-110"
            unoptimized={true}
          />
          <Button className="bg-amber-600 absolute top-0 hover:border-amber-600 hover:text-black">
            {mealData.mealType}
          </Button>
        </div>
      </CardContent>
      <CardHeader className="px-3 pt-0">
        <CardTitle className="text-light-gray font-bold text-lg line-clamp-1">
          {mealData.mealTitle}
        </CardTitle>
        <CardDescription>
          <div
            className="rating-container"
            style={{ maxWidth: "120px", margin: "0" }}
          >
            <Rating value={mealData.rating} readOnly halfFillMode="svg" />
          </div>
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex justify-between items-center mb-2">
          <Button className="bg-primary px-3 text-default-white font-bold hover:bg-background hover:border-2 hover:border-primary hover:text-primary">
            ${mealData.price}
          </Button>
          <div className="flex items-center gap-2">
            <Button
              onClick={handleLike}
              disabled={loading}
              className={`flex items-center gap-2 ${
                hasUserLiked
                  ? "bg-red-500 hover:bg-red-600"
                  : "bg-pink-500 hover:bg-pink-600"
              } text-white px-4 py-2 rounded`}
            >
              {hasUserLiked ? <ThumbsDown size={18} /> : <ThumbsUp size={18} />}
              <span>{mealData.likes}</span>
            </Button>
          </div>
        </div>
      </CardContent>

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
            <p className="text-gray-700">
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
              className="bg-red-500 hover:bg-red-600 text-white"
            >
              Unlike
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </Card>
  );
};

export default UpcomingMealsCard;
