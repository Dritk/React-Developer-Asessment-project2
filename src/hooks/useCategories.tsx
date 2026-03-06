import { useContext } from "react";
import { CategoryContext } from "../context/categoryContext";

export const UseCategories = () => {
  const context = useContext(CategoryContext);
  if (!context) {
    throw new Error("Must use context provider");
  }
  return context;
};
