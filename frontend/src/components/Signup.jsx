import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Text, Button, Group, TextInput } from "@mantine/core";
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
  // 名前が重複してたらエラー出したい
  const handleOnSubmit = async (values) => {
    try {
      const response = await axios.post("/api/signup", values);
      setIsNameDuplicate(false);
      const userId = response.data["id"];
      //   return navigate(`/host/allproducts/${userId}`);
      return navigate(`/host/allproducts/`);
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
      <TextInput
        withAsterisk
        label="ユーザー名"
        placeholder="ユーザー名を入力"
        key={form.key("name")}
        {...form.getInputProps("name")}
      />
      <Text c="white" bg="red">
        {isNameDuplicate && "ユーザー名が重複しています"}
      </Text>

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
