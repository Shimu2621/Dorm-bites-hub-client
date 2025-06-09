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
    rating?: number;
  };
}

const TestimonialCard: React.FC<TestimonialProps> = ({ testimonial }) => {
  return (
    <Card className="px-4 py-10 rounded-sm border-none bg-white shadow-md h-full">
      <CardHeader className="mt-4 px-4">
        <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6 text-center sm:text-left">
          {/* Image */}
          <div>
            <Image
              src={testimonial?.image}
              alt="Testimonial Image"
              width={80}
              height={80}
              className="w-20 h-20 rounded-full object-cover mx-auto sm:mx-0"
            />
          </div>

          {/* Details */}
          <div>
            <h2 className="text-primary font-bold italic text-lg">
              {testimonial?.name}
            </h2>
            <p className="text-gray-color">{testimonial?.designation}</p>
            <Rating
              style={{ maxWidth: 120 }}
              value={testimonial.rating || 5}
              readOnly
              halfFillMode="svg"
            />
          </div>
        </div>
      </CardHeader>

      {/* Feedback */}
      <CardDescription className="relative text-gray-600 text-md mt-6 italic px-6 sm:px-10">
        <Quote className="text-blue-500 w-5 h-5 absolute right-8 -bottom-3 hidden sm:block" />
        {testimonial?.feedback}
        <Quote className="text-blue-500 w-5 h-5 absolute left-0 -top-3 rotate-180" />
      </CardDescription>
    </Card>
  );
};

export default TestimonialCard;
