import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Button, Group, TextInput } from "@mantine/core";
import { useForm } from "@mantine/form";

export const Signup = () => {
  const navigate = useNavigate();
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
    await axios.post("/signup", values);
    return navigate("/signin");
  };

  return (
    <form onSubmit={form.onSubmit(handleOnSubmit)}>
      <TextInput
        withAsterisk
        label="ユーザー名"
        placeholder="ユーザー名を入力"
        key={form.key("name")}
        {...form.getInputProps("name")}
      />

      <TextInput
        withAsterisk
        label="Password"
        placeholder="パスワードを入力"
        key={form.key("password")}
        {...form.getInputProps("password")}
      />

      <Group justify="flex-end" mt="md">
        <Button type="submit">Submit</Button>
      </Group>
    </form>
  );
};
