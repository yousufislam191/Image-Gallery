import { BrowserRouter, Routes, Route } from "react-router-dom";
import React from "react";
import NotFound from "../components/NotFound";
import ImageGallery from "../pages/ImageGallery";

const RouterPath = () => {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route exact path="/" element={<ImageGallery />} />
          <Route exact path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </>
  );
};

export default RouterPath;
