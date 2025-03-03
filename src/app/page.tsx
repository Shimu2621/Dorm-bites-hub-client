import AllRecipes from "@/components/homePage/allRecipes/AllRecipes";
import Banner from "@/components/homePage/bannerSection/Banner";
import Services from "@/components/homePage/serviceSection/Services";
import Footer from "@/components/shared/footer/Footer";
import Navbar from "@/components/shared/header/Navbar";

export default function Home() {
  return (
    <div>
      <Navbar />
      <Banner />
      <Services />
      <AllRecipes />
      <Footer />
    </div>
  );
}
