import { Link, useNavigate, useParams } from "react-router-dom";
import { useState } from "react";
import { Input, Button, Stack } from "@mantine/core";

export const CreateProduct = () => {
  const [title, setTitle] = useState("");
  const navigate = useNavigate();
  const { userName } = useParams();
  return (
    <div style={{ height: "90vh" }}>
      <Stack
        bg="var(--mantine-color-body)"
        justify="space-between"
        style={{ width: "100%", height: "100%" }}
      >
        <h2>ゲームタイトルを入力</h2>
        <Input
          style={{ width: "100%" }}
          placeholder="タイトルを入力"
          onChange={(e) => {
            setTitle(e.target.value);
          }}
        />
        <Stack
          bg="var(--mantine-color-body)"
          align="stretch"
          justify="center"
          gap="md"
        >
          <Button
            fullWidth
            color="#00492B"
            variant="filled"
            onClick={async () => {
              const res = await fetch("/api/product", {
                method: "POST",
                headers: {
                  "Content-Type": "application/json",
                },
                body: JSON.stringify({
                  hostName: userName,
                  productName: title,
                }),
              });
              const targetId = await res.json();
              // TODO:本来は/host/{userName}/products/{productId}/problemdetail
              navigate(
                `/host/products/${targetId[0].product_id}/problemdetail`
              );
              console.log("targetId: ", targetId[0].product_id);
            }}
            radius="md"
          >
            ゲームを作る
          </Button>
          <Button fullWidth variant="default" radius="md" color="#00492B">
            <Link to={`/host/${userName}/allproducts`}>キャンセル</Link>
          </Button>
        </Stack>
      </Stack>
    </div>
  );
};
