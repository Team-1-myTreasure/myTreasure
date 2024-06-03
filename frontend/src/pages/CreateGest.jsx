import { Stack, Text, TextInput, Button } from "@mantine/core";
import { useParams, useNavigate } from "react-router-dom";
import { useForm } from "@mantine/form";
import axios from "axios";
import { useState } from "react";

export const CreateGest = () => {
  const { productId } = useParams();
  const [isDuplicateName, setIsDuplicateName] = useState(false);
  const navigate = useNavigate();
  const form = useForm({
    initialValues: {
      userName: "",
    },

    validate: {
      userName: (value) =>
        value.length > 0 ? null : "ユーザ名を入力してください",
    },
  });
  return (
    <Stack justify="space-between" style={{ height: "90vh" }}>
      <Text>ユーザー名を入力してください</Text>
      <form
        style={{ height: "50vh" }}
        onSubmit={form.onSubmit(async (values) => {
          try {
            const response = await axios.post(
              `/api/gest/products/${productId}`,
              {
                playerName: values.userName,
              }
            );
            const userName = response.data.playerName;
            navigate(`user/${userName}/goToDestination`, {
              replace: false,
            });
          } catch (err) {
            if (err.response.status === 409) {
              setIsDuplicateName(true);
            }
            throw err;
          }
        })}
      >
        <Stack justify="space-between" style={{ height: "100%" }}>
          <Stack>
            <TextInput
              withAsterisk
              placeholder="ユーザー名"
              key={form.key("userName")}
              {...form.getInputProps("userName")}
            />
            {isDuplicateName && (
              <Text size="md" c="red">
                すでに存在しているユーザ名です
              </Text>
            )}
          </Stack>

          <Button type="submit" bg={"indigo"} fullWidth>
            アカウント作成
          </Button>
        </Stack>
      </form>
    </Stack>
  );
};
