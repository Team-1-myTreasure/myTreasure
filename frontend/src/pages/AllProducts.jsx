import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { SelectProducts } from "../components/SelectProducts";

export const AllProducts = () => {
  const { userName } = useParams();
  useEffect(() => {}, []);
  return (
    <div style={{ height: "100vh" }}>
      <h1
        style={{
          marginTop: "0px",
          paddingTop: "50px",
          position: "fixed",
          zIndex: "10",
          background: "white",
          width: "100%",
          backgroundColor: "#eaebc4",
        }}
      >
        ゲーム一覧
      </h1>
      <div>
        <SelectProducts userName={userName} />
      </div>
    </div>
  );
};
