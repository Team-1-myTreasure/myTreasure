import axios from "axios";
import useSWR from "swr";
import { Stack, Button } from "@mantine/core";
import { useNavigate } from "react-router-dom";

export const SelectProducts = (props) => {
  const navigate = useNavigate();
  const { userName } = props;

  const productsInit = async (url) => {
    const response = await axios.get(url);
    return response;
  };

  const { data, error, isLoading } = useSWR(
    `/users/${userName}/product`,
    productsInit
  );

  if (isLoading) return <div>loading...</div>;

  if (error) {
    return <div>サーバーエラー</div>;
  } else {
    return (
      <>
        <div
          style={{
            position: "absolute",
            top: "150px",
            width: "80%",
            left: "10%",
            overflow: "scroll",
          }}
        >
          <Stack>
            {data.data.map((product, index) => (
              <Button variant="default" key={index} disabled={true}>
                {product.product_name}
              </Button>
            ))}
          </Stack>
          <Button
            color="indigo"
            onClick={() => navigate(`/host/${userName}/createproduct/`)}
            style={{
              position: "fixed",
              bottom: "10px",
              width: "80%",
              left: "10%",
              zIndex: "9",
            }}
          >
            + 新しいゲーム
          </Button>
          <div
            style={{
              height: "20px",
              position: "fixed",
              bottom: "0px",
              width: "80%",
              background: "white",
              zIndex: "8",
            }}
          ></div>
        </div>
      </>
    );
  }
};
