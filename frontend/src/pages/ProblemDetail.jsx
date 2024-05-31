/* eslint-disable no-unused-vars */
import { useLocation } from "react-router-dom";
import { useState } from "react";
import { Map } from "../components/Map";
import { createContext } from "react";
import { ProblemForm } from "../components/ProblemForm";

export const locationContext = createContext();

export const ProblemDetail = () => {
  const location = useLocation();
  const productId = location.state.productId;
  const [problems, setProblems] = useState([]);
  const [markerPosition, setMarkerPosition] = useState([]);
  return (
    <>
      <div>{problems.length + 1}</div>
      <div>
        <p>目的地を選択</p>
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
        }}
      />
    </>
  );
};
