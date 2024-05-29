import { useState, useEffect, useContext } from 'react';
import { ScreenContext } from './Host';

export const SelectProducts = () => {
  const [products, setProducts] = useState([]);
  const [screen, setScreen] = useContext(ScreenContext);

  useEffect(() => {
    setProducts([{ id: 1 }, { id: 2 }, { id: 3 }, { id: 4 }, { id: 5 }]);
  }, []);

  return (
    <>
      <div>
        <button onClick={() => setScreen('CreateProduct')}>+</button>
        <p>新しいゲーム</p>
      </div>
      {products.map((elem, index) => (
        <div key={index}>{elem.id}</div>
      ))}
    </>
  );
};
