import axios from "axios";
import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { type CartResponse } from "../types/cart";

const Cart = () => {
  const [searchParams] = useSearchParams();
  const id = searchParams.get("id");
  const quantity = searchParams.get("q");
  const [cart, setCart] = useState<CartResponse>();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await axios.post("https://dummyjson.com/carts/add", {
          userId: 1,
          products: [{ id: Number(id), quantity: Number(quantity) }],
        });
        setCart(data.data);
      } catch (e) {
        console.log(e);
      }
    };
    fetchData();
  }, [id, quantity]);
  console.log({ cart });
  return (
    <div>
      {cart?.products.map((p) => (
        <div key={p.id}>
          <p>{p.title}</p>
          <p>{p.price}</p>
          <p>{p.quantity}</p>
        </div>
      ))}
    </div>
  );
};
export default Cart;
