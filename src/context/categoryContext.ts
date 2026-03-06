import { createContext } from "react";

interface CategoryContextType {
  categories: string[];
}

export const CategoryContext = createContext<CategoryContextType>({
  categories: [],
});