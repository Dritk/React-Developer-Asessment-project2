import { useEffect, useState } from "react";
import type { Product } from "../types/products";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import Button from "../components/button";

const ProducDetails = () => {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const [productDetails, setProductDetails] = useState<Product>();
  const [formData, setFormData] = useState({
    userId: 1,
    products: [
      {
        id: id,
        quantity: 1,
      },
    ],
  });
  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await axios.get(`https://dummyjson.com/products/${id}`);
        setProductDetails(data.data);
      } catch (e) {
        console.log(e);
      }
    };
    fetchData();
  }, [id]);

  const onsubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const response = await axios.post(
      `https://dummyjson.com/carts/add`,
      formData,
    );
    if (response.status == 201) {
      const storedCart = localStorage.getItem("cart");
      const cart = storedCart ? JSON.parse(storedCart) : { products: [] };

      const newProduct = response.data.products[0];

      const existing = cart.products.find((p: any) => p.id === newProduct.id);

      if (existing) {
        existing.quantity += newProduct.quantity;
      } else {
        cart.products.push(newProduct);
      }

      localStorage.setItem("cart", JSON.stringify(cart));
      alert("Added to cart");
      navigate("/cart");
    }
  };
  return (
    <div className="flex flex-col max-w-6xl mx-auto p-6">
      <div className="flex justify-between items-center ">
        <h2 className="text-3xl font-bold mb-6">Product Details</h2>
        <Button
          label="Continue Shopping"
          onClick={() => navigate("/")}
          className="px-4 py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg "
        />
      </div>

      <form
        className="flex justify-end items-center gap-4 my-6"
        onSubmit={onsubmit}
      >
        <p className="text-md font-bold">Quantity</p>
        <input
          placeholder="Quantity"
          className="w-24 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          value={formData.products[0].quantity}
          onChange={(e) =>
            setFormData({
              ...formData,
              products: [
                {
                  ...formData.products[0],
                  quantity: Number(e.target.value),
                },
              ],
            })
          }
        />
        <button
          type="submit"
          className="px-4 py-2 bg-green-600 hover:bg-green-800 text-white font-semibold rounded-lg "
        >
          Add to Cart
        </button>
      </form>

      <div className="grid md:grid-cols-2 gap-10 bg-gray-100 rounded-xl p-6">
        <div className="flex justify-center">
          <img
            src={productDetails?.images[0] || "/vite.svg"}
            alt="Product"
            className="w-full max-w-md h-86 object-cover rounded-lg"
          />
        </div>

        <div>
          <h1 className="text-3xl font-bold mb-4">{productDetails?.title}</h1>
          <RowDetails
            label="Description"
            value={productDetails?.description || ""}
          />
          <RowDetails label="Brand" value={productDetails?.brand || ""} />
          <RowDetails label="Stock" value={productDetails?.stock || 0} />
          <RowDetails label="Price" value={`$${productDetails?.price || ""}`} />
        </div>
      </div>
      <div className="mt-10">
        <h2 className="text-2xl font-bold mb-6">Customer Reviews</h2>

        <div className="grid md:grid-cols-2 gap-6">
          {productDetails?.reviews.map((review, index) => (
            <div
              key={index + 1}
              className="border rounded-lg p-4 shadow-sm bg-gray-100"
            >
              <RowDetails label="Reviewer" value={review?.reviewerName || ""} />
              <RowDetails label="Email" value={review?.reviewerEmail || ""} />
              <RowDetails label="Rating" value={review?.rating || 0} />
              <RowDetails label="Date" value={review?.date || ""} />
              <RowDetails label="Comment" value={review?.comment || ""} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProducDetails;

const RowDetails = ({
  label,
  value,
}: {
  label: string;
  value: string | number;
}) => {
  return (
    <div className="grid grid-cols-[35%_65%] p-2  text-md border-b ">
      <p className="font-bold">{label}</p>
      <p>{value}</p>
    </div>
  );
};
