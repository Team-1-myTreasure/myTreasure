import { useLocation } from "react-router-dom";
import { useState } from "react";
import { Map } from "./Map";
import { createContext } from "react";

export const locationContext = createContext();

export const ProblemDetail = () => {
  const location = useLocation();
  const productId = location.state.productId;
  const [problems, setProblems] = useState([]);
  const [latlng, setLatlng] = useState([]);

  return (
    <>
      <div>{problems.length + 1}</div>
      <div>
        <p>目的地を選択</p>
        <div>
          <locationContext.Provider value={[latlng, setLatlng]}>
            <Map />
          </locationContext.Provider>
          {console.log({ latlng })}
        </div>
      </div>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          const hint = e.target["hint"].value;
          const question = e.target["question"].value;
          const correct = e.target["correct"].value;
          const incorrect = e.target["incorrect"].value;
          setProblems([
            ...problems,
            {
              distination_name: "ラグーナ蒲郡",
              distination_latitude: latlng[0],
              distination_longtitude: latlng[1],
              question: question,
              correct_answer: correct,
              incorrect_answer: incorrect,
              next_distination_hint: hint,
              question_number: problems.length + 1,
              product_id: productId,
            },
          ]);
        }}
      >
        <div>
          <p>この目的地のヒント</p>
          <input name="hint" type="text" placeholder="目的地のヒントを入力" />
        </div>
        <div>
          <p>この目的地についた時に表示される問題</p>
          <input name="question" type="text" placeholder="問題文" />
          <input name="correct" type="text" placeholder="正解" />
          <input name="incorrect" type="text" placeholder="不正解" />
        </div>
        <button>次の目的地を設定</button>
      </form>
      <button
        onClick={() => {
          fetch("/api/problem", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(problems),
          });
        }}
      >
        問題設定を終了
      </button>
      <div>{JSON.stringify(problems)}</div>
    </>
  );
};
