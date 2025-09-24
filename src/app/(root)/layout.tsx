"use client";

import { useEffect } from "react";
import FeatureSection from "./feature-section";
import ShowcaseSection from "./showcase-section";
import TestimonialSection from "./testimonial-section";
import CallToAction from "./call-to-action";
import Footer from "./footer";
import AOS from "aos";
import "aos/dist/aos.css";

export default function Layout({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    AOS.init({
      duration: 500,
    });
  }, []);

  return (
    <>
      {children}
      <FeatureSection />
      <ShowcaseSection />
      <TestimonialSection />
      <CallToAction />
      <Footer />
    </>
  );
}
