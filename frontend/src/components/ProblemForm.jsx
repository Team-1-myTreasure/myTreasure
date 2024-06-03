import { Button, Group, TextInput, Flex } from "@mantine/core";
import { useForm } from "@mantine/form";

export const ProblemForm = (props) => {
  const { onSubmit } = props;
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

      <TextInput
        withAsterisk
        label="この目的地に着いた時の表示される2択の問題を設定"
        placeholder="問題文"
        key={form.key("problem")}
        {...form.getInputProps("problem")}
      />
      <Flex>
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
      </Flex>

      <Group justify="flex-end" mt="md">
        <Button
          type="submit"
          fullWidth
          variant="outline"
          color="white"
          bg="indigo"
        >
          問題設定を終了
        </Button>
      </Group>
    </form>
  );
};
