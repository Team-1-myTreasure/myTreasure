import { useState, useEffect } from 'react';
import './App.css';

import { Host } from './components/Host';
import { Gest } from './components/Gest';

function App() {
  const [hostOrGest, setHostOrGest] = useState(true);
  // const [host, setHost] = useState([]);
  // useEffect(() => {
  //   fetch('/host')
  //     .then((res) => res.json())
  //     .then((data) => setHost(data));
  // }, []);
  // console.log(host);
  return <div>{hostOrGest ? <Host /> : <Gest />}</div>;
}

export default App;
