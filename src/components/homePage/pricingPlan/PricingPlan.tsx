import plans from "@/staticData/pricingPlan";
import React from "react";
import PricingCard from "./PricingCard";
import Container from "@/utils/container/Container";

const PricingPlan = () => {
  return (
    <Container>
      <div className="container mx-auto px-4 py-10">
        <div className="text-center mx-auto">
          <h2 className="text-4xl font-bold text-primary italic mb-2">
            Choose Your Meal Plan
          </h2>
          <p className="text-gray-color mb-10">
            Choose the perfect meal plan tailored to your lifestyle. Whether
            you&#39;re looking for a<br /> budget-friendly option, a balanced
            plan, or a premium experience, we have you covered.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {plans.map((plan) => (
            <PricingCard key={plan.plan} {...plan} />
          ))}
        </div>
      </div>
    </Container>
  );
};

export default PricingPlan;
