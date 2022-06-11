import React from "react";
import { Footer } from "./Footer/Footer";
import { Header } from "./Header/Header";
import Visualizer from "./Visualizer/Visualizer";

export const BasePage: React.FC = () => {
  return (
    <React.Fragment>
      <Header />
      <Visualizer />
      <Footer />
    </React.Fragment>
  );
};
