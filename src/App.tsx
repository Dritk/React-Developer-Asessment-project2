import { Routes, Route } from "react-router-dom";
import Products from "./pages/products";
import CategoryProvider from "./context/categoryProvider";
import ProducDetails from "./pages/productdetails";

function App() {
  return (
    <div>
      <CategoryProvider>
        <Routes>
          <Route path="/" element={<Products />} />
          <Route path="/:id" element={<ProducDetails />} />
        </Routes>
      </CategoryProvider>
    </div>
  );
}

export default App;
