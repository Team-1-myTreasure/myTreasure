import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { SelectProducts } from "../components/SelectProducts";

export const AllProducts = () => {
  const { userName } = useParams();
  useEffect(() => {}, []);
  return (
    <>
      <h1>ゲーム一覧</h1>
      <div>
        <SelectProducts userName={userName} />
      </div>
    </>
  );
};
