import Banner from "@/components/homePage/bannerSection/Banner";
import Choose from "@/components/homePage/chooseSection/Choose";
import MealsCategory from "@/components/homePage/mealsCategory/MealsCategory";
import Services from "@/components/homePage/serviceSection/Services";


export default function Home() {
  return (
    <div>
      <Banner />
      <Services />
      <Choose />
      <MealsCategory/>
    </div>
  );
}
