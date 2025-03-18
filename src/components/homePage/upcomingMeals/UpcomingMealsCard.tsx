"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Image from "next/image";
import { ThumbsUp, ThumbsDown, CheckCircle } from "lucide-react"; // Icons for Like/Unlike
import { Rating } from "@smastrom/react-rating";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useState } from "react";
import axios from "axios";

interface Meal {
  _id: string;
  mealImage: string;
  mealTitle: string;
  mealType: string;
  price: number;
  rating: number;
  reviews: number;
  likes: number; // This field for tracking likes
  liked: string[]; // Array of users who liked the meal
}

interface MealCardProps {
  meal: Meal;
  userEmail: string; // Pass the logged-in user's email
}

const UpcomingMealsCard: React.FC<MealCardProps> = ({ meal, userEmail }) => {
  const [likes, setLikes] = useState(meal.likes || 0);
  const [liked, setLiked] = useState(meal.liked.includes(userEmail));
  const [showModal, setShowModal] = useState(false);
  const [modalMessage, setModalMessage] = useState("");
  const [loading, setLoading] = useState(false);

  // Handle Like/Unlike action
  const handleLike = async () => {
    setLoading(true);

    try {
      const response = await axios.patch(
        `https://dorm-dine-hub-server.vercel.app/upcoming-meals/${meal._id}`,
        { userEmail }
      );
      console.log("Response Data:", response.data);

      if (response.status === 200) {
        const updatedMeal = response.data;
        setLikes(updatedMeal.likes);
        setLiked(updatedMeal.liked.includes(userEmail));

        // Set success message dynamically
        setModalMessage(
          updatedMeal.liked.includes(userEmail)
            ? "You have liked this meal."
            : "You have unliked this meal!"
        );
        setShowModal(true);
        console.log("Modal Opened:", showModal);
      }
    } catch (error) {
      console.error("Error updating like:", error);
      setLoading(false);
    }
  };

  if (loading) {
    return <p>Loading...</p>;
  }

  return (
    <Card className="border-none shadow-none">
      <CardContent>
        <div className="relative group overflow-hidden rounded-sm">
          <Image
            src={meal?.mealImage}
            alt={meal?.mealType}
            width={500}
            height={400}
            className=" w-[300px] h-[250px]  rounded-sm object-cover transition-transform duration-300 group-hover:scale-120"
            unoptimized={true}
          />
          <Button className="bg-amber-600 absolute top-0 hover:border-amber-600 hover:text-black">
            {meal.mealType}
          </Button>
        </div>
      </CardContent>
      <CardHeader className="px-3 pt-0">
        <CardTitle className="text-gray-600 font-bold text-lg line-clamp-1">
          {meal.mealTitle}
        </CardTitle>
        <CardDescription>
          <Rating
            style={{ maxWidth: 120 }}
            value={meal?.rating}
            readOnly
            halfFillMode="svg"
          />
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex justify-between items-center mb-2">
          <Button className="bg-primary px-3 text-default-white font-bold hover:bg-background hover:border-2 hover:border-primary hover:text-primary">
            ${meal.price}
          </Button>
          <div className="flex items-center gap-2">
            {/* Like Button */}
            <Button
              onClick={handleLike}
              className={`flex items-center gap-2 ${
                liked
                  ? "bg-red-500 hover:bg-red-600"
                  : "bg-pink-500 hover:bg-pink-600"
              } text-white px-4 py-2 rounded`}
            >
              {liked ? <ThumbsDown size={18} /> : <ThumbsUp size={18} />}
              <span>{likes}</span>
            </Button>
          </div>
        </div>
      </CardContent>

      {/* Unlike Confirmation Modal */}
      <Dialog open={showModal} onOpenChange={(open) => setShowModal(open)}>
        <DialogContent>
          <DialogHeader className="flex items-center gap-2">
            <CheckCircle className="text-green-500" size={30} />
            <DialogTitle>{modalMessage}</DialogTitle>
          </DialogHeader>
          <p>Are you sure you want to unlike this meal?</p>
          <DialogFooter>
            {/* <Button onClick={() => setShowModal(false)} className="bg-gray-400">
              Cancel
            </Button>
            <Button onClick={confirmUnlike} className="bg-red-500">
              Unlike
            </Button> */}
            <Button onClick={() => setShowModal(false)} className="bg-primary">
              OK
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </Card>
  );
};

export default UpcomingMealsCard;
