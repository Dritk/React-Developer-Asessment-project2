import axios from "axios";
import { useEffect, useState, type ReactNode } from "react";
import { CategoryContext } from "./categoryContext";

const CategoryProvider = ({ children }: { children: ReactNode }) => {
  const [categories, setCategories] = useState([]);
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get(
          "https://dummyjson.com/products/category-list",
        );
        setCategories(response.data);
        console.log(response);
      } catch (e) {
        console.log(e);
      }
    };
    fetchCategories();
  }, []);

  return (
    <CategoryContext.Provider value={{ categories }}>
      {children}
    </CategoryContext.Provider>
  );
};

export default CategoryProvider;
