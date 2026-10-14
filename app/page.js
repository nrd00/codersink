import FeatureCategory from "@/components/FeatureCategory";
import FeaturePost from "@/components/FeaturePost";
import Hero from "@/components/Hero";
import Image from "next/image";

export default function Home() {
  return (
    <div>
      <Hero />
      <FeaturePost />
      <FeatureCategory />
    </div>
  );
}
