import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Anchor, Text, Stack, Button, Group, TextInput } from "@mantine/core";
import { useForm } from "@mantine/form";
import { useState } from "react";

export const Signin = () => {
  const navigate = useNavigate();
  const [isPassIncorrect, setIsPassIncorrect] = useState(false);

  const form = useForm({
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
      await axios.post("/signIn", values);
      setIsPassIncorrect(false);
      return navigate("/allproducts");
    } catch (error) {
      if (error.response.status === 401) {
        setIsPassIncorrect(true);
      } else {
        console.log(error);
      }
    }
  };
  return (
    <form onSubmit={form.onSubmit(handleOnSubmit)}>
      <Stack gap="lg" p="20px">
        <TextInput
          withAsterisk
          label="Email"
          size="md"
          placeholder="your@email.com"
          key={form.key("email")}
          {...form.getInputProps("email")}
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
          {isPassIncorrect && "メールアドレスもしくはパスワードが不一致"}
        </Text>

        <Group justify="flex-start" mt="md">
          <Button type="submit" fullWidth size="lg" color="indigo">
            ログイン
          </Button>
          <Anchor href="/signup" underline="always">
            アカウントの新規作成
          </Anchor>
        </Group>
      </Stack>
    </form>
  );
};
