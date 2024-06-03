import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { Input, Button, Stack, Box } from "@mantine/core";

export const CreateProduct = () => {
  const [title, setTitle] = useState("");
  const navigate = useNavigate();

  return (
    <div style={{ height: "90vh" }}>
      <Stack
        bg="var(--mantine-color-body)"
        justify="space-between"
        style={{ width: "100%", height: "100%" }}
      >
        <h2 align="center">ゲームタイトルを入力</h2>
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
            color="indigo"
            variant="filled"
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
              navigate(
                `/host/products/${targetId[0].product_id}/problemdetail`
              );
              console.log("targetId: ", targetId[0].product_id);
            }}
            radius="md"
          >
            ゲームを作る
          </Button>
          <Button fullWidth variant="default" radius="md">
            <Link to="/host/allproducts">キャンセル</Link>
          </Button>
        </Stack>
      </Stack>
    </div>
  );
};
