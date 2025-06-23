"use client";

import React, { useState, ChangeEvent, FormEvent } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useRouter } from "next/navigation";
import useAuth from "@/hooks/useAuth";
import axios from "axios";
import toast from "react-hot-toast";
import Link from "next/link";
import { motion } from "framer-motion";
import signupanimation from "../../../../public/signupanimation.json";
import dynamic from "next/dynamic";

const Lottie = dynamic(() => import('lottie-react'), { ssr: false });


// TypeScript interface for form data
interface FormData {
  name: string;
  image: string;
  email: string;
  password: string;
}

const RegisterPage: React.FC = () => {
  const router = useRouter();
  const { createUser, updateUserProfile, logOut } = useAuth();

  // State to manage form input values with type
  const [formData, setFormData] = useState<FormData>({
    name: "",
    image: "",
    email: "",
    password: "",
  });

  // Handle input changes with typed event
  const handleInputChange = (e: ChangeEvent<HTMLInputElement>): void => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  // Handle form submission with typed event
  const handleSubmit = async (e: FormEvent<HTMLFormElement>): Promise<void> => {
    e.preventDefault();

    try {
      // Create user with Firebase
      const result = await createUser(formData.email, formData.password);
      const user = result.user;
      console.log("User:", user);
      toast.success("Registration Successful");

      // Update user profile
      await updateUserProfile(formData.name, formData.image);
      toast.success("User Created Successfully");

      // Save user to your database
      const newUser = {
        name: formData.name,
        email: formData.email,
        image: formData.image,
        badge: "Bronze",
        badge_image:
          "https://i.ibb.co/TrN8dFr/bronze-badge-removebg-preview.png",
      };

      await axios.post(
        "https://dorm-dine-hub-server.vercel.app/users",
        newUser
      );

      // Logout and redirect to login
      await logOut();
      router.push("/login");
    } catch (error) {
      toast.error(`${error}`);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="flex flex-col md:flex-row w-full max-w-5xl bg-white shadow-lg rounded-lg overflow-hidden"
      >
        {/* Left Side - Lottie Animation */}
        <div className="w-full md:w-1/2 p-4 flex items-center justify-center bg-gray-200">
          <Lottie animationData={signupanimation} loop />
        </div>

        {/* Right Side - Sign Up Form */}
        <div className="w-full md:w-1/2 p-6">
          <Card className="shadow-none border-none">
            <CardHeader>
              <CardTitle className="text-center text-2xl font-semibold">
                Sign Up
              </CardTitle>
            </CardHeader>
            <CardContent>
              <form className="space-y-4" onSubmit={handleSubmit}>
                {/* Name Field */}
                <div>
                  <label className="block text-sm font-medium mb-1">
                    Full Name
                  </label>
                  <Input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    placeholder="Enter your full name"
                    className="w-full"
                    required
                  />
                </div>

                {/* Photo URL */}
                <div>
                  <label className="block text-sm font-medium mb-1">
                    Photo URL
                  </label>
                  <Input
                    type="text"
                    name="image"
                    value={formData.image}
                    onChange={handleInputChange}
                    placeholder="Enter your photo URL"
                    className="w-full"
                    required
                  />
                </div>

                {/* Email Field */}
                <div>
                  <label className="block text-sm font-medium mb-1">
                    Email
                  </label>
                  <Input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    placeholder="Enter your email"
                    className="w-full"
                    required
                  />
                </div>

                {/* Password Field */}
                <div>
                  <label className="block text-sm font-medium mb-1">
                    Password
                  </label>
                  <Input
                    type="password"
                    name="password"
                    value={formData.password}
                    onChange={handleInputChange}
                    placeholder="Enter password (min 6 characters)"
                    className="w-full"
                    minLength={6}
                    required
                  />
                </div>

                {/* Submit Button */}
                <Button
                  type="submit"
                  className="w-full cursor-pointer bg-pink-500 hover:bg-pink-600 text-white"
                >
                  Sign Up
                </Button>
              </form>

              {/* Footer or Links */}
              <div className="mt-4 text-center">
                <p className="text-sm">
                  Already have an account?{" "}
                  <Link href="/login" className="text-blue-500 hover:underline">
                    Login
                  </Link>
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </motion.div>
    </div>
  );
};

export default RegisterPage;
