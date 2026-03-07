import { useEffect, useState } from "react";
import { type CartResponse } from "../types/cart";
import Button from "../components/button";
import { useNavigate } from "react-router-dom";

const Cart = () => {
  const navigate = useNavigate();
  const [cart, setCart] = useState<CartResponse | null>(() => {
    const data = localStorage.getItem("cart");
    return data ? JSON.parse(data) : null;
  });

  useEffect(() => {
    if (cart) {
      localStorage.setItem("cart", JSON.stringify(cart));
    }
  }, [cart]);

  const updateQuantity = (id: number, change: number) => {
    if (change < 1) return;
    setCart((prev) => {
      if (!prev) return prev;
      return {
        ...prev,
        products: prev.products.map((p) =>
          p.id === id ? { ...p, quantity: change } : p,
        ),
      };
    });
  };

  const remove = (id: number) => {
    setCart((prev) => {
      if (!prev) return prev;
      return {
        ...prev,
        products: prev.products.filter((p) => p.id !== id),
      };
    });
  };
  const subtotal =
    cart?.products.reduce((sum, item) => sum + item.price * item.quantity, 0) ||
    0;

  const taxRate = 0.1;
  const tax = subtotal * taxRate;
  const total = subtotal + tax;
  console.log({ cart });
  return (
    <div className="flex flex-col gap-2 max-w-6xl mx-auto p-6">
      <h2 className=" flex text-3xl font-bold mb-6 justify-center">
        Shopping Cart
      </h2>
      <div className="flex justify-end ">
        <Button
          label="Continue Shopping"
          onClick={() => navigate("/")}
          className="px-4 py-2 w-fit bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg  "
        />
      </div>
      <div className="grid md:grid-cols-3 gap-6">
        <div className="md:col-span-2 space-y-4">
          {cart?.products.map((p) => (
            <div
              key={p.id}
              className="flex gap-4 items-center border rounded-xl p-4 shadow-sm "
            >
              <img
                src={p.thumbnail || "/vite.svg"}
                alt={p.title}
                className="w-28 h-28 object-cover rounded-lg"
              />

              <div className="flex flex-col">
                <h3 className="text-lg font-semibold">{p.title}</h3>

                <p className="text-gray-600 mt-1">Price: ${p.price}</p>

                <div className="flex items-center gap-2 mt-1">
                  <Button
                    label="-"
                    className="font-semibold "
                    onClick={() => updateQuantity(p.id, p.quantity - 1)}
                  />
                  <span>{p.quantity}</span>
                  <Button
                    label="+"
                    className="font-semibold "
                    onClick={() => updateQuantity(p.id, p.quantity + 1)}
                  />
                </div>

                <p className="text-blue-600 font-semibold mt-1">
                  Item Total: ${(p.price * p.quantity).toFixed(2)}
                </p>

                <button
                  onClick={() => remove(p.id)}
                  className="mt-2 p-2 w-fit text-sm font-medium text-white bg-red-500 hover:bg-red-600 rounded-lg "
                >
                  Remove
                </button>
              </div>
            </div>
          ))}
        </div>

        <div className="border rounded-xl p-6 shadow-sm  h-fit">
          <h3 className="text-xl font-semibold mb-4">Order Summary</h3>

          <div className="space-y-2 text-gray-700">
            <div className="flex justify-between">
              <span>Subtotal</span>
              <span>${subtotal.toFixed(2)}</span>
            </div>

            <div className="flex justify-between">
              <span>Tax (10%)</span>
              <span>${tax.toFixed(2)}</span>
            </div>

            <div className="flex justify-between text-lg font-bold">
              <span>Total</span>
              <span>${total.toFixed(2)}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Cart;
