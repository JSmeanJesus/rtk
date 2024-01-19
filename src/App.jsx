import "./App.css";
import {
  useGetGoodsQuery,
  useAddProductMutation,
  useDeleteProductMutation,
} from "../redux/goodsApi";
import { useState } from "react";

function App() {
  const [count, setCount] = useState("");
  const [newProduct, setNewProduct] = useState("");
  const { data = [], isLoading } = useGetGoodsQuery(count);
  const [addProduct, { isError }] = useAddProductMutation();
  const [deleteProduct] = useDeleteProductMutation();

  const handleAddNewProduct = async () => {
    if (newProduct) {
      await addProduct({
        name: newProduct,
      }).unwrap();
      setNewProduct("");
    }
  };

  const handleDeleteNewProduct = async (id) => {
    await deleteProduct(id).unwrap();
  };

  return (
    <>
      {isLoading && <div>loading..</div>}

      <input
        type="text"
        value={newProduct}
        onChange={(e) => setNewProduct(e.target.value)}
      />
      <button onClick={handleAddNewProduct}>Add </button>

      <select value={count} onChange={(e) => setCount(e.target.value)}>
        <option value="">all</option>
        <option value="1">1</option>
        <option value="2">2</option>
        <option value="3">3</option>
      </select>
      <ul>
        {data.map((item) => (
          <li onClick={() => handleDeleteNewProduct(item.id)} key={item.id}>
            {item.name}
          </li>
        ))}
      </ul>
    </>
  );
}

export default App;
