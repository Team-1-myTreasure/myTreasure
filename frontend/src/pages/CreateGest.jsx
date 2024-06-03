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
    <Stack gap={10} miw={120}>
      <Text>ユーザー名を入力してください</Text>
      <form
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
        <Button type="submit" bg={"indigo"} fullWidth>
          アカウント作成
        </Button>
      </form>
    </Stack>
  );
};
