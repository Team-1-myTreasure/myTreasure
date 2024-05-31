import { Button, Group, TextInput, Stack } from "@mantine/core";
import { useForm } from "@mantine/form";
import { useNavigate } from "react-router-dom";


export const ProblemForm = (props) => {
  const { onSubmit } = props;
  const navigate = useNavigate();
  const form = useForm({
    mode: "uncontrolled",
    initialValues: {
      hint: "",
      problem: "",
      correctAnswer: "",
      incorrectAnswer: "",
    },

    validate: {},
  });

  return (
    <form onSubmit={form.onSubmit(onSubmit)}>
      <TextInput
        withAsterisk
        label="この目的地のヒント"
        placeholder="この目的地のヒント"
        key={form.key("hint")}
        {...form.getInputProps("hint")}
      />

      <Stack>
        <TextInput
          withAsterisk
          label="この目的地に着いた時の表示される2択の問題を設定"
          placeholder="問題文"
          key={form.key("problem")}
          {...form.getInputProps("problem")}
        />
        <Group>
          <TextInput
            withAsterisk
            placeholder="正解を入力"
            key={form.key("correctAnswer")}
            {...form.getInputProps("correctAnswer")}
          />
          <TextInput
            withAsterisk
            placeholder="不正解を入力"
            key={form.key("incorrectAnswer")}
            {...form.getInputProps("incorrectAnswer")}
          />
        </Group>
      </Stack>

      <Group justify="flex-end" mt="md">
        <Button type="submit" fullWidth variant="outline" color="indigo" onClick={() => navigate("/host/shareurl")}>
          問題設定を終了
        </Button>
      </Group>
    </form>
  );
};
