import { useState, useEffect } from "react";
import "./App.css";

function App() {
  const [host, setHost] = useState([]);

  useEffect(() => {
    fetch("/host")
      .then((res) => res.json())
      .then((data) => setHost(data));
  }, []);
  // console.log(host);
  return (
    <div>
      <p>{JSON.stringify(host[0])}</p>
    </div>
  );
}

export default App;
