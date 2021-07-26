import React from "react";
import Carousel from "../../components/Carousel";
import FirstSection from "../../components/FirstSection";
import Footer from "../../components/Footer";
import Header from "../../components/Header";
import SecondSection from "../../components/SecondeSection";

export default function Home() {
  return (
    <>
      <Header />
      <FirstSection />
      <SecondSection />
      <Carousel />
      <Footer />
    </>
  );
}
