import { Link } from "react-router-dom";
import { useState } from "react";

export const CreateProduct = () => {
  const [title, setTitle] = useState("");
  const [productId, setProductId] = useState();

  return (
    <>
      <h1>ゲームタイトルを入力</h1>
      <input
        type="text"
        placeholder="タイトルを入力"
        onChange={(e) => {
          setTitle(e.target.value);
        }}
      />
      <button
        onClick={async () => {
          const res = await fetch("/product", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ host_id: 1, product_name: title }),
          });
          setProductId(res);
        }}
      >
        <Link to="/host/problemdetail" state={{ productId: productId }}></Link>
      </button>
      <button>
        <Link to="/host/allproducts">キャンセル</Link>
      </button>
    </>
  );
};
