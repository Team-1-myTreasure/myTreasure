/* eslint-disable no-unused-vars */
import { AllProducts } from "./AllProducts";
import { CreateProduct } from "./CreateProduct";
import { useState, useEffect, createContext } from "react";

export const ScreenContext = createContext();

export const Host = () => {
  const [screen, setScreen] = useState("AllProducts"); //表示スクリーンを管理

  return (
    <>
      {(() => {
        if (screen === "AllProducts") {
          return (
            <ScreenContext.Provider value={[screen, setScreen]}>
              <AllProducts />
            </ScreenContext.Provider>
          );
        } else if (screen === "CreateProduct") {
          return <CreateProduct />;
        } else {
          return "login";
        }
      })()}
    </>
  );
};
