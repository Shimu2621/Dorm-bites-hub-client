import Banner from "@/components/homePage/bannerSection/Banner";
import Choose from "@/components/homePage/chooseSection/Choose";
import MealsByCategory from "@/components/homePage/mealsByCategory/MealsByCategory";

import Services from "@/components/homePage/serviceSection/Services";

export default function Home() {
  return (
    <div>
      <Banner />
      <Services />
      <MealsByCategory />
      <Choose />
    </div>
  );
}
