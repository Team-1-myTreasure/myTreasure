/* eslint-disable no-unused-vars */
import { useState, useEffect } from "react";
import "@mantine/core/styles.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { MantineProvider } from "@mantine/core";
import { CreateGest } from "./pages/CreateGest";
import { AllProducts } from "./pages/AllProducts";
import { CreateProduct } from "./pages/CreateProduct";
import { ProblemDetail } from "./pages/ProblemDetail";
import { ShareUrl } from "./pages/ShareUrl";
import { SignupPage } from "./pages/SignupPage";
import { SigninPage } from "./pages/SigninPage";
import { Destination } from "./pages/Destination";
import { GestQuestion } from "./pages/GestQuestion";
import "./App.css";

function App() {
  return (
    <BrowserRouter>
      <MantineProvider>
        <Routes>
          <Route path="host">
            <Route
              path="products/:productId/problemdetail"
              element={<ProblemDetail />}
            />
            <Route path="products/:productId/shareurl" element={<ShareUrl />} />
            <Route path="signupPage" element={<SignupPage />} />
            <Route path="signinPage" element={<SigninPage />} />
            <Route path=":userName/allproducts" element={<AllProducts />} />
            <Route path=":userName/createproduct" element={<CreateProduct />} />
          </Route>
          <Route path="gest">
            <Route path="products/:productId" element={<CreateGest />} />
            <Route
              path="products/:productId/user/:userName/goToDestination"
              element={<Destination />}
            />
            <Route
              path="products/:productId/user/:userName/question"
              element={<GestQuestion />}
            />
          </Route>
        </Routes>
      </MantineProvider>
    </BrowserRouter>
  );
}

export default App;
