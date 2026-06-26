import FeaturedLawyersPage from "@/components/home/FeaturedLawyersPage";
import Hero from "@/components/home/Hero";
import LegalCategories from "@/components/home/LegalCategories";
import TopExperts from "@/components/home/TopExperts";


export default function Home() {
  return (
    <div>
      <Hero/>
      <FeaturedLawyersPage/>
      <LegalCategories/>
      <TopExperts/>
    </div>
  );
}
