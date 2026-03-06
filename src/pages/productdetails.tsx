import { useEffect, useState } from "react";
import type { Product } from "../types/products";
import axios from "axios";
import { useParams } from "react-router-dom";

const ProducDetails = () => {
  const { id } = useParams<{ id: string }>();
  const [productDetails, setProductDetails] = useState<Product>();
  const [formData, setFormData] = useState({ id: id, quantity: "" });
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
  console.log(formData);
  return (
    <div className="max-w-6xl mx-auto p-6">
      <div>
        <form className="flex gap-4 mb-6">
          <input
            placeholder="Quantity"
            value={formData.quantity}
            onChange={(e) =>
              setFormData({ ...formData, quantity: e.target.value })
            }
          />
          <button className="bg-blue-500" type="submit">
            Add To Cart
          </button>
        </form>
      </div>

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
