import { Navbar } from "../components/ui/Navbar";
import { HeroSection } from "../components/ui/HeroSection";
import { AIVisionSection } from "../components/ui/AIVisionSection";
import { FeaturesGrid } from "../components/ui/FeaturesGrid";
import { ProductShowcase } from "../components/ui/ProductShowcase";
import { UseCasesSection } from "../components/ui/UseCasesSection";
import { SocialMediaUseCases } from "../components/ui/SocialMediaUseCases";
import { PricingSection } from "../components/ui/PricingSection";
import { Footer } from "../components/ui/Footer";

export default function Page() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      <Navbar />
      <HeroSection />
      <AIVisionSection />
      <FeaturesGrid />
      <ProductShowcase />
      <SocialMediaUseCases />
      <UseCasesSection />
      <PricingSection />
      <Footer />
    </div>
  );
}
