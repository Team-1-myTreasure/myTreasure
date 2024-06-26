/* eslint-disable no-unused-vars */
import { useParams, useNavigate } from "react-router-dom";
import { useState } from "react";
import { Map } from "../components/Map";
import { ProblemForm } from "../components/ProblemForm";
import { Text } from "@mantine/core";

export const ProblemDetail = () => {
  // const location = useLocation();
  // const productId = location.state.productId;
  const navigate = useNavigate();
  const { productId } = useParams();
  const [problems, setProblems] = useState([]);
  const [markerPosition, setMarkerPosition] = useState([]);
  return (
    <>
      <div>
        <Text>目的地を選択</Text>
        <Map onChangeMarker={(position) => setMarkerPosition(position)} />
      </div>
      <ProblemForm
        onSubmit={(value) => {
          const problem = {
            distination_name: "目的地",
            distination_latitude: markerPosition[0],
            distination_longtitude: markerPosition[1],
            question: value.problem,
            correct_answer: value.correctAnswer,
            incorrect_answer: value.incorrectAnswer,
            next_distination_hint: value.hint,
            question_number: 1,
            product_id: productId,
          };
          fetch("/api/problem", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(problem),
          });
          navigate(`/host/products/${productId}/shareurl`, {
            replace: true,
          });
        }}
      />
    </>
  );
};
