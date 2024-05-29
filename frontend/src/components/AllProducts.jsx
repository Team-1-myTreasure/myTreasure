import { useEffect } from 'react';
import { SelectProducts } from './SelectProducts';

export const AllProducts = () => {
  useEffect(() => {}, []);

  return (
    <>
      <h1>ゲーム一覧</h1>
      <div>
        <SelectProducts />
      </div>
    </>
  );
};
