import { useState, useEffect } from "react";
import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";

import { Gest } from "./components/Gest";
import { AllProducts } from "./components/AllProducts";
import { CreateProduct } from "./components/CreateProduct";
import { ProblemDetail } from "./components/ProblemDetail";
import { Host } from "./components/Host";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="host">
          <Route path="allproducts" element={<AllProducts />} />
          <Route path="createproduct" element={<CreateProduct />} />
          <Route path="problemdetail" element={<ProblemDetail />} />
        </Route>
        <Route path="gest" element={<Gest />} />
        <Route path="test" element={<Host />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
