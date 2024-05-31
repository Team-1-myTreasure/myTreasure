import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

export const SelectProducts = () => {
  const [products, setProducts] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    setProducts([{ id: 1 }, { id: 2 }, { id: 3 }, { id: 4 }, { id: 5 }]);
  }, []);

  return (
    <>
      <div>
        <button onClick={() => navigate("/host/createproduct")}>+</button>
        <p>新しいゲーム</p>
      </div>
      {products.map((elem, index) => (
        <div key={index}>{elem.id}</div>
      ))}
    </>
  );
};
