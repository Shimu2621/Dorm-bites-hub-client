import React from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const RegisterPage = () => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <Card className="w-full max-w-md p-6">
        <CardHeader>
          <CardTitle className="text-center text-xl">Register</CardTitle>
        </CardHeader>
        <CardContent>
          <form className="space-y-4">
            {/* Name Field */}
            <div>
              <label className="block text-sm font-medium">Name</label>
              <Input type="text" placeholder="Enter your name" />
            </div>

            {/* Email Field */}
            <div>
              <label className="block text-sm font-medium">Email</label>
              <Input placeholder="Enter your email" type="email" />
            </div>

            {/* Password Field */}
            <div>
              <label className="block text-sm font-medium">Password</label>
              <Input placeholder="Enter password" type="password" />
            </div>

            {/* Submit Button */}
            <Button type="submit" className="w-full">
              Sign Up
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default RegisterPage;
