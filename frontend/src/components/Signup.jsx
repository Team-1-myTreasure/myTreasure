import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Anchor, Stack, Text, Button, Group, TextInput } from "@mantine/core";
import { useForm } from "@mantine/form";
import { useState } from "react";

export const Signup = () => {
  const navigate = useNavigate();
  const [isNameDuplicate, setIsNameDuplicate] = useState(false);

  const form = useForm({
    mode: "uncontrolled",
    initialValues: {
      name: "",
      password: "",
    },
    validate: {
      name: (value) => (value.length < 1 ? "名前を入力してください。" : null),
      password: (value) =>
        value.length < 6 ? "パスワードは6文字以上で入力してください。" : null,
    },
  });
  const handleOnSubmit = async (values) => {
    try {
      const response = await axios.post("/api/signup", values);
      setIsNameDuplicate(false);
      const userName = response.data["name"];
      return navigate(`/host/${userName}/allproducts/`);
    } catch (error) {
      console.log(error);
      if (error.response.status === 409) {
        setIsNameDuplicate(true);
      } else {
        console.log(error);
      }
    }
  };

  return (
    <form onSubmit={form.onSubmit(handleOnSubmit)}>
      <Stack gap="lg">
        <Text
          size="xl"
          fw={900}
          variant="gradient"
          gradient={{ from: "blue", to: "cyan", deg: 90 }}
        >
          Welcome to my Treasure!
        </Text>

        <TextInput
          withAsterisk
          label="ユーザー名"
          size="md"
          placeholder="ユーザー名を入力"
          key={form.key("name")}
          {...form.getInputProps("name")}
        />

        <TextInput
          withAsterisk
          label="Password"
          size="md"
          placeholder="パスワードを入力"
          key={form.key("password")}
          {...form.getInputProps("password")}
        />

        <Text c="white" bg="red">
          {isNameDuplicate && "ユーザー名が重複しています"}
        </Text>

        <Group justify="flex-start" mt="md">
          <Button type="submit" fullWidth size="lg" color="indigo">
            サインアップ
          </Button>
          <Anchor href="/host/signinPage" underline="always">
            サインイン画面へ
          </Anchor>
        </Group>
      </Stack>
    </form>
  );
};
