import axios from "axios";
import useSWR from "swr";
import { Stack, Button } from "@mantine/core";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

export const SelectProducts = (props) => {
  const [products, setProducts] = useState([]);
  const navigate = useNavigate();
  const { userName } = props;

  const productsInit = async (url) => {
    const response = await axios.get(url);
    return response.data.map((product) => product.product_name);
  };

  const { data, error } = useSWR(
    `http://localhost:8080/${userName}/product`,
    productsInit
  );

  useEffect(() => {
    data ? setProducts(data) : null;
  }, [data]);

  // if (isLoading) return <h2>ok</h2>;

  if (error) {
    return <div>サーバーエラー</div>;
  } else {
    return (
      <>
        <Stack>
          {products.map((product, index) => (
            <Button variant="default" key={index} disabled={true}>
              {product}
            </Button>
          ))}
          <Button onClick={() => navigate(`/host/${userName}/createproduct/`)}>
            + 新しいゲーム
          </Button>
        </Stack>
      </>
    );
  }
};
