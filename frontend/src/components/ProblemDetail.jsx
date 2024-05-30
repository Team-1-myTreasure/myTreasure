import { useLocation } from "react-router-dom";

export const ProblemDetail = () => {
  const location = useLocation();
  return (
    <>
      <div>
        {JSON.stringify(location)}
        <p>problemdetail</p>
      </div>
    </>
  );
};
