import axios from "axios";
import { useEffect, useState } from "react";
import Loader from "../components/loader";
import ProductCard from "../components/productCard";
import type { Product } from "../types/products";
import useDebounce from "../hooks/useDebounce";
import Button from "../components/button";
import SearchBar from "../components/searchbar";

const Products = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [skip, setSkip] = useState(0);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [filter, setFilter] = useState("");

  const debouncedSearch = useDebounce(search, 1500);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        setError("");
        let url = "";
        if (debouncedSearch) {
          url = `https://dummyjson.com/products/search?q=${debouncedSearch}`;
        } else if (filter) {
          console.log("check");
          url = `https://dummyjson.com/products/filter?key=category&value=${filter}`;
        } else {
          url = `https://dummyjson.com/products?skip=${skip}&limit=12`;
        }

        const data = await axios.get(url);
        setProducts(data.data.products);
      } catch (e) {
        setError(e instanceof Error ? e.message : "Something went wrong");
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [skip, debouncedSearch, filter]);
  const onNext = () => {
    setSkip(skip + 10);

    console.log(skip);
  };

  const onPrevious = () => {
    setSkip(skip - 10);
  };

  const onCheck = (
    event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => {
    setFilter(event.target.value);
    setSkip(0);
  };
  return (
    <div className="flex flex-col items-center =">
      <h1 className="text-3xl font-bold mt-6 ">Products</h1>
      <p className="text-gray-500 mb-6">Search and filter products</p>

      <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6 mb-6">
        <SearchBar
          onChange={(e) => {
            setSkip(0);
            setSearch(e.target.value);
          }}
        />
        <select
          className="border border-gray-400 p-2 rounded"
          onChange={onCheck}
        >
          <option value="">All</option>
          <option value="male">Fragrance</option>
        </select>
      </div>

      {loading && (
        <div className="flex justify-center my-10">
          <Loader />
        </div>
      )}

      {error && (
        <div className="text-red-500 font-semibold text-center my-10">
          {error}
        </div>
      )}

      {!loading && !error && (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 p-6">
          {products.map((product) => (
            <ProductCard
              key={product.id}
              imgSrc={product.thumbnail}
              title={product.title}
              price={product.price}
              rating={product.rating}
              discount={product.discountPercentage}
            />
          ))}
        </div>
      )}

      <div className="flex items-center gap-2">
        <Button label="Prev" onClick={onPrevious} disabled={skip === 0} />
        <Button label="Next" onClick={onNext} />
      </div>
    </div>
  );
};

export default Products;
