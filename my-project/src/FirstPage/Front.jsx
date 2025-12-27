import React from "react";
import Header from "../Components/Head/Header";
import Slider from "../Components/Mid/Slider";
import Footer from "../Components/Foot/Footer";
import T from "../../Trailing";
import Trendings from "../Trending/Trendings";

function Front() {
  return (
    <>
      <Header />
      {/* <T /> */}
      <Slider />
      <Trendings />
      <Footer />
    </>
  );
}

export default Front;
