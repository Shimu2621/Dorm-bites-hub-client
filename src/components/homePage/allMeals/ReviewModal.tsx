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
import { Rating } from "@smastrom/react-rating";
import "@smastrom/react-rating/style.css";
import { useState, useEffect } from "react";
import { AlertCircle } from "lucide-react";

interface ReviewModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  mealTitle: string;
  onSubmit: (rating: number, comment: string) => Promise<void>;
  loading: boolean;
}

const ReviewModal: React.FC<ReviewModalProps> = ({
  open,
  onOpenChange,
  mealTitle,
  onSubmit,
  loading,
}) => {
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");
  const [error, setError] = useState("");
  const [isSubmitAttempted, setIsSubmitAttempted] = useState(false);

  // Reset error when rating changes after a failed submission attempt
  useEffect(() => {
    if (isSubmitAttempted && rating > 0) {
      setError("");
    }
  }, [rating, isSubmitAttempted]);

  const handleSubmit = async () => {
    // Mark that user has attempted to submit
    setIsSubmitAttempted(true);

    // Clear previous errors
    setError("");

    // Validation with user feedback
    if (rating === 0) {
      setError("Please select a rating before submitting");
      // Add a small vibration or shake effect to the rating component to draw attention
      const ratingElement = document.getElementById("rating");
      if (ratingElement) {
        ratingElement.classList.add("shake-animation");
        setTimeout(() => {
          ratingElement.classList.remove("shake-animation");
        }, 500);
      }
      return;
    }

    try {
      await onSubmit(rating, comment);
      // Reset form after successful submission
      setRating(0);
      setComment("");
      setIsSubmitAttempted(false);
      // Close the dialog on success
      onOpenChange(false);
    } catch (error) {
      console.error("Error submitting review:", error);
      setError("Failed to submit review. Please try again.");
    }
  };

  // Reset form when modal closes
  const handleOpenChange = (newOpen: boolean) => {
    if (!newOpen) {
      setRating(0);
      setComment("");
      setError("");
      setIsSubmitAttempted(false);
    }
    onOpenChange(newOpen);
  };

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="text-xl">Add Review: {mealTitle}</DialogTitle>
        </DialogHeader>
        <div className="py-4 space-y-4">
          {/* Error message display - now more prominent */}
          {error && (
            <div className="flex items-center gap-2 p-3 bg-red-100 text-red-700 rounded border border-red-300 animate-fadeIn">
              <AlertCircle size={18} />
              <span className="font-medium">{error}</span>
            </div>
          )}
          <div
            className={
              isSubmitAttempted && rating === 0
                ? "relative border border-red-300 p-3 rounded-md bg-red-50"
                : ""
            }
          >
            <Label
              htmlFor="rating"
              className={`text-gray-700 block mb-2 ${
                isSubmitAttempted && rating === 0
                  ? "text-red-600 font-medium"
                  : ""
              }`}
            >
              Rating <span className="text-red-500">*</span>
            </Label>
            <Rating
              id="rating"
              value={rating}
              onChange={setRating}
              style={{ maxWidth: 180 }}
              className={
                isSubmitAttempted && rating === 0
                  ? "focus:ring-2 focus:ring-red-500"
                  : ""
              }
            />
            {isSubmitAttempted && rating === 0 && (
              <p className="text-red-600 text-sm mt-1">
                Please select a rating
              </p>
            )}
          </div>
          <div>
            <Label htmlFor="reviewComment" className="text-gray-700">
              Please Make Your Review
            </Label>
            <Textarea
              id="reviewComment"
              placeholder="Share your experience with this meal..."
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              className="mt-1 w-full"
              rows={4}
            />
          </div>
        </div>
        <DialogFooter className="flex flex-row justify-end gap-2 sm:justify-end">
          <Button
            variant="outline"
            onClick={() => onOpenChange(false)}
            className="border-gray-300"
          >
            Cancel
          </Button>
          <Button
            onClick={handleSubmit}
            disabled={loading}
            className="bg-pink-600 hover:bg-pink-700 text-white"
          >
            {loading ? "Submitting..." : "Submit Review"}
          </Button>
        </DialogFooter>
      </DialogContent>

      {/* Add a small CSS for the shake animation */}
      <style jsx global>{`
        @keyframes shake {
          0%,
          100% {
            transform: translateX(0);
          }
          10%,
          30%,
          50%,
          70%,
          90% {
            transform: translateX(-5px);
          }
          20%,
          40%,
          60%,
          80% {
            transform: translateX(5px);
          }
        }
        .shake-animation {
          animation: shake 0.5s cubic-bezier(0.36, 0.07, 0.19, 0.97) both;
        }
        @keyframes fadeIn {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }
        .animate-fadeIn {
          animation: fadeIn 0.3s ease-in;
        }
      `}</style>
    </Dialog>
  );
};

export default ReviewModal;
