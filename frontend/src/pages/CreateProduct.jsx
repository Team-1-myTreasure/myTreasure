import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";

export const CreateProduct = () => {
  const [title, setTitle] = useState("");
  const navigate = useNavigate();

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
          const res = await fetch("/api/product", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ host_id: 1, product_name: title }),
          });
          const targetId = await res.json();
          // TODO:本来は/host/{userName}/products/{productId}/problemdetail
          navigate(`/host/products/${targetId[0].product_id}/problemdetail`);
          console.log("targetId: ", targetId[0].product_id);
        }}
      >
        {/* <Link to="/host/problemdetail" state={{ productId: productId }}>
          ゲームを作る
        </Link> */}
        ゲームを作る
      </button>
      <button>
        <Link to="/host/allproducts">キャンセル</Link>
      </button>
    </>
  );
};
