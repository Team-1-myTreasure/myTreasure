import { AllProducts } from "./AllProducts";
import { CreateProduct } from "./CreateProduct";
import { useState, useEffect, createContext } from "react";

export const ScreenContext = createContext();

export const Host = () => {
  const [screen, setScreen] = useState("AllProducts"); //表示スクリーンを管理

  return (
    <>
      {/* {(() => {
        if (screen === 'AllProducts') {
          return (
            <ScreenContext.Provider value={[screen, setScreen]}>
              <AllProducts />
            </ScreenContext.Provider>
          );
        } else if (screen === 'CreateProduct') {
          return <CreateProduct />;
        } else {
          return 'login';
        }
      })()} */}

      <h1>Sign up</h1>

      <div>
        <h2>sign up</h2>
        <form action="/api/signup" method="post">
          <input type="submit" value="LOGOUT" />
        </form>
        <hr />

        <form action="/api/signup" method="post">
          <input type="text" name="username" />
          <input type="password" name="password" />
          <input type="submit" value="Try Auth" />
        </form>
      </div>
    </>
  );
};
