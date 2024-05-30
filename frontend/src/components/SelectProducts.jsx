import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

export const SelectProducts = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    setProducts([{ id: 1 }, { id: 2 }, { id: 3 }, { id: 4 }, { id: 5 }]);
  }, []);

  return (
    <>
      <div>
        <button>
          <Link to="/host/createproduct">+</Link>
        </button>
        <p>新しいゲーム</p>
      </div>
      {products.map((elem, index) => (
        <div key={index}>{elem.id}</div>
      ))}
    </>
  );
};
