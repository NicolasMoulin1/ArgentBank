import React from "react";
import Features from "../../components/features/Features";
import BannerHome from "../../components/bannerHome/BannerHome";

const Home = () => {
  return (
    <div>
      <div>
        <BannerHome />
        <Features />
      </div>
    </div>
  );
};

export default Home;
