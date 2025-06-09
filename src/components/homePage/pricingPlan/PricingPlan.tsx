"use client";

import plans from "@/staticData/pricingPlan";
import React, { useEffect } from "react";
import PricingCard from "./PricingCard";
import Container from "@/utils/container/Container";
import AOS from "aos";
import "aos/dist/aos.css";

const PricingPlan = () => {
  useEffect(() => {
    AOS.init({ duration: 1000, once: true });
  }, []);

  return (
    <Container>
      <div className="container mx-auto px-4 py-10">
        <div
          className="text-center mx-auto"
          data-aos="fade-down"
          data-aos-delay="100"
        >
          <h2 className="text-2xl lg:text-4xl font-bold text-primary italic mb-2">
            Choose Your Meal Plan
          </h2>
          <p className="text-gray-color mb-10">
            Choose the perfect meal plan tailored to your lifestyle. Whether
            you&#39;re looking for a<br className="hidden md:block" />{" "}
            budget-friendly option, a balanced plan, or a premium experience, we
            have you covered.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {plans.map((plan, index) => {
            let animationType = "fade-right";
            if (index === 1) animationType = "zoom-in";
            else if (index === 2) animationType = "fade-left";

            return (
              <div
                key={plan.name}
                data-aos={animationType}
                data-aos-delay={index * 100}
              >
                <PricingCard {...plan} badge_name={plan.name} />
              </div>
            );
          })}
        </div>
      </div>
    </Container>
  );
};

export default PricingPlan;
