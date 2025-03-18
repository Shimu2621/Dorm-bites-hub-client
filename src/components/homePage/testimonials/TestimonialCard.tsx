import { Card, CardDescription, CardHeader } from "@/components/ui/card";
import { Rating } from "@smastrom/react-rating";
import { Quote } from "lucide-react";
import Image from "next/image";
import React from "react";

// Define the type for testimonial prop
interface TestimonialProps {
  testimonial: {
    id: number;
    name: string;
    designation: string;
    image: string;
    feedback: string;
    rating?: number; // Make rating optional if not in static data
  };
}

const TestimonialCard: React.FC<TestimonialProps> = ({ testimonial }) => {
  return (
    <Card className="px-4 py-10 rounded-sm border-none shadow-lg">
      <CardHeader className="mt-4 px-4">
        <div className="flex items-start gap-6">
          <div>
            <Image
              src={testimonial?.image}
              alt="Testimonial Image"
              width={80}
              height={80}
              className="w-18 h-18 rounded-full object-cover"
            />
          </div>
          <div>
            <h2 className="text-primary font-bold italic text-lg">
              {testimonial?.name}
            </h2>
            <p className="text-gray-color">{testimonial?.designation}</p>
            <Rating
              style={{ maxWidth: 120 }}
              value={testimonial.rating || 5} // Default rating to 5 if missing
              readOnly
              halfFillMode="svg"
            />
          </div>
        </div>
      </CardHeader>
      {/* Feedback with blue quotation marks */}
      <CardDescription className="relative text-gray-600 text-md mt-4 italic px-7">
        <Quote className="text-blue-500 w-5 h-5 absolute right-48 -bottom-3 " />
        {testimonial?.feedback}
        <Quote className="text-blue-500 w-5 h-5 absolute left-0 -top-3 rotate-180" />
      </CardDescription>
    </Card>
  );
};

export default TestimonialCard;
