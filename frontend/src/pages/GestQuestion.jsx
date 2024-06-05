import { useState } from "react";
import { Card, Text, Button } from "@mantine/core";
import { useParams } from "react-router-dom";
import useSWR from "swr";
import axios from "axios";

const fetcher = (url) => axios.get(url).then((res) => res.data);

const QuestionResult = ({ correct }) => {
  return (
    <>{correct === true ? <Text>正解です</Text> : <Text>不正解です</Text>}</>
  );
};

export const GestQuestion = () => {
  const [correct, setCorrect] = useState(undefined);
  const { productId } = useParams();
  const { data, isLoading } = useSWR(`/api/products/${productId}`, fetcher);

  return (
    <Card shadow="sm" padding="lg" radius="md" withBorder>
      <Text>問題</Text>
      {correct !== undefined ? <QuestionResult correct={correct} /> : null}
      {isLoading === false && correct == undefined && (
        <>
          <Text size="xl">{data.question}</Text>
          {Math.floor(Math.random() * 101) % 2 === 0 ? (
            <>
              {" "}
              <Button
                variant="filled"
                color="#00492B"
                onClick={() => setCorrect(true)}
              >
                {data.correctAnswer}
              </Button>
              <Button
                variant="light"
                color="#00492B"
                onClick={() => setCorrect(false)}
              >
                {data.incorrectAnswer}
              </Button>
            </>
          ) : (
            <>
              {" "}
              <Button
                variant="filled"
                color="#00492B"
                onClick={() => setCorrect(false)}
              >
                {data.incorrectAnswer}
              </Button>
              <Button
                variant="light"
                color="#00492B"
                onClick={() => setCorrect(true)}
              >
                {data.correctAnswer}
              </Button>
            </>
          )}
        </>
      )}
    </Card>
  );
};
