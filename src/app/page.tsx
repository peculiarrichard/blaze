import { Nav } from "@/components/landing-page/Nav";
import { Hero } from "@/components/landing-page/Hero";
import { AllFeatures } from "@/components/landing-page/AllFeatures";
import { GetStarted } from "@/components/landing-page/GetStarted";
import { Footer } from "@/components/landing-page/Footer";

export default function Home() {
  return (
    <main className="">
      <Nav />
      <Hero />
      <AllFeatures />
      <GetStarted />
      <Footer />
    </main>
  );
}
