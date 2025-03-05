import Banner from "@/components/homePage/bannerSection/Banner";
import Choose from "@/components/homePage/chooseSection/Choose";
import Services from "@/components/homePage/serviceSection/Services";
import Footer from "@/components/shared/footer/Footer";
import Navbar from "@/components/shared/header/Navbar";

export default function Home() {
  return (
    <div>
      <Navbar />
      <Banner />
      <Services />
      <Choose />
      <Footer />
    </div>
  );
}
