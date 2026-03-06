import { Routes, Route } from "react-router-dom";
import Products from "./pages/products";
import CategoryProvider from "./context/categoryProvider";
import ProducDetails from "./pages/productdetails";
import Cart from "./pages/cart";

function App() {
  return (
    <div>
      <CategoryProvider>
        <Routes>
          <Route path="/" element={<Products />} />
          <Route path="/:id" element={<ProducDetails />} />
          <Route path="/cart" element={<Cart />} />
        </Routes>
      </CategoryProvider>
    </div>
  );
}

export default App;
