import Banner from "@/components/homePage/bannerSection/Banner";
import Choose from "@/components/homePage/chooseSection/Choose";
import MealsByCategory from "@/components/homePage/mealsByCategory/MealsByCategory";
import PricingPlan from "@/components/homePage/pricingPlan/PricingPlan";

import Services from "@/components/homePage/serviceSection/Services";
import Testimonials from "@/components/homePage/testimonials/Testimonials";
import Footer from "@/components/shared/footer/Footer";

export default function Home() {
  return (
    <div>
      <Banner />
      <Services />
      <MealsByCategory />
      <Choose />
      <PricingPlan />
      <Testimonials />
      <Footer />
    </div>
  );
}
