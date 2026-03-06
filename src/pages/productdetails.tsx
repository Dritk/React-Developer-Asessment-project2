import { useEffect, useState } from "react";
import type { Product } from "../types/products";
import axios from "axios";
import { useParams } from "react-router-dom";

const ProducDetails = () => {
  const { id } = useParams<{ id: string }>();
  const [productDetails, setProductDetails] = useState<Product>();
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
  console.log(productDetails);
  return (
    <div>
      <img
        src={productDetails?.images[0] || "/vite.svg"}
        alt="Product images"
        className="w-56 h-56"
      />
      <RowDetails
        label="Full Description"
        value={productDetails?.description || ""}
      />
      <RowDetails label="Brand" value={productDetails?.brand || ""} />
      <RowDetails label="Stock" value={productDetails?.stock || 0} />

      <p>Reviews</p>
      {productDetails?.reviews.map((value, index) => (
        <div key={index}>
          <RowDetails label="Date" value={value?.date || ""} />
          <RowDetails label="Reviewer Name" value={value?.reviewerName || ""} />
          <RowDetails label="Email" value={value?.reviewerEmail || ""} />
          <RowDetails label="Rating" value={value?.comment || ""} />
          <RowDetails label="Comment" value={value?.comment || ""} />
        </div>
      ))}
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
