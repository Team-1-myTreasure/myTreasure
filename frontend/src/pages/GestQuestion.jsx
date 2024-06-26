import { useState } from "react";
import { Card, Text, Button } from "@mantine/core";
import { useParams } from "react-router-dom";
import useSWR from "swr";
import axios from "axios";
import useWindowSize from "react-use/lib/useWindowSize";
import Confetti from "react-confetti";

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
  const { width, height } = useWindowSize();
  const [impetus, setImpetus] = useState(0);

  return (
    <>
      {impetus === 1 ? (
        <Confetti width={width} height={height} recycle={true} />
      ) : null}

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
                  onClick={() => {
                    setImpetus(1);
                    setCorrect(true);
                  }}
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
                  onClick={() => {
                    setImpetus(1);
                    setCorrect(true);
                  }}
                >
                  {data.correctAnswer}
                </Button>
              </>
            )}
          </>
        )}
      </Card>
    </>
  );
};
