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
import Lottie from "lottie-react";
import loginAnimation from "../../../../public/signupanimation.json";

interface LoginForm {
  email: string;
  password: string;
}
const LoginPage: React.FC = () => {
  const router = useRouter();
  const { signIn } = useAuth();

  const [loginData, setLoginData] = useState<LoginForm>({
    email: "",
    password: "",
  });

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>): void => {
    const { name, value } = e.target;
    setLoginData({
      ...loginData,
      [name]: value,
    });
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>): Promise<void> => {
    e.preventDefault();

    try {
      // Fetch user data from API
      const response = await axios.get(
        "https://dorm-dine-hub-server.vercel.app/users"
      );
      const users = response.data;
      const userExists = users.find(
        (user: any) => user.email === loginData.email
      );

      if (!userExists) {
        toast.error("User not found. Please register first.");
        return;
      }

      // Authenticate with Firebase
      await signIn(loginData.email, loginData.password);
      toast.success("Login Successful");

      router.push("/"); // Redirect to homepage after login
    } catch (error) {
      console.log(error);
      toast.error("Invalid email or password");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="flex flex-col md:flex-row w-full max-w-4xl bg-white shadow-lg rounded-lg overflow-hidden"
      >
        {/* Left Side - Lottie Animation */}
        <div className="w-full md:w-1/2 p-4 flex items-center justify-center bg-gray-200">
          <Lottie animationData={loginAnimation} loop />
        </div>

        {/* Right Side - Login Form */}
        <div className="w-full md:w-1/2 p-6">
          <Card className="shadow-none border-none">
            <CardHeader>
              <CardTitle className="text-center text-2xl font-semibold">
                Login
              </CardTitle>
            </CardHeader>
            <CardContent>
              <form className="space-y-4" onSubmit={handleSubmit}>
                {/* Email Field */}
                <div>
                  <label className="block text-sm font-medium mb-1">
                    Email
                  </label>
                  <Input
                    type="email"
                    name="email"
                    value={loginData.email}
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
                    value={loginData.password}
                    onChange={handleInputChange}
                    placeholder="Enter your password"
                    className="w-full"
                    required
                  />
                </div>

                {/* Submit Button */}
                <Button
                  type="submit"
                  className="w-full bg-pink-500 hover:bg-pink-600 text-white"
                >
                  Login
                </Button>
              </form>

              {/* Footer or Links */}
              <div className="mt-4 text-center">
                <p className="text-sm">
                  Don&rsquo;t have an account?{" "}
                  <Link
                    href="/register"
                    className="text-blue-500 hover:underline"
                  >
                    Sign Up
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

export default LoginPage;
