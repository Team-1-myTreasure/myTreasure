/* eslint-disable no-unused-vars */
import { useState, useEffect } from "react";
import "@mantine/core/styles.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { MantineProvider } from "@mantine/core";
import { Gest } from "./pages/Gest";
import { AllProducts } from "./pages/AllProducts";
import { CreateProduct } from "./pages/CreateProduct";
import { ProblemDetail } from "./pages/ProblemDetail";
import { SignupPage } from "./pages/SignupPage";
import { SigninPage } from "./pages/SigninPage";

function App() {
  return (
    <BrowserRouter>
      <MantineProvider>
        <Routes>
          <Route path="host">
            <Route path="signup" element={<SignupPage />} />
            <Route path="signin" element={<SigninPage />} />
            <Route path="allproducts" element={<AllProducts />} />
            <Route path="createproduct" element={<CreateProduct />} />
          </Route>
          <Route path="gest" element={<Gest />} />
        </Routes>
      </MantineProvider>
    </BrowserRouter>
  );
}

export default App;
