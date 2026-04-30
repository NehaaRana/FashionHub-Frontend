import NavBar from "../components/NavBar";
import PromoBar from "../components/PromoBar";
import HeroSection from "../components/HeroSection";  
import CategoryGrid from "../components/CategoryGrid";
import FeaturedProducts from "../components/FeaturedProduct";
import SpecialOffer from "../components/SpecialOffer";
import Footer from "../components/Footer";

const Index = () => {
  return (
    <div>
      {/* <PromoBar />
      <NavBar /> */}
      <HeroSection />
      <CategoryGrid />
      <FeaturedProducts />
      <SpecialOffer />
      {/* <Footer /> */}
    </div>
  );
};

export default Index;