import { Routes, Route } from "react-router-dom";
import CategoryProvider from "./context/categoryProvider";
import { Suspense, lazy } from "react";
import Loader from "./components/loader";

const Products = lazy(() => import("./pages/products"));
const ProductDetails = lazy(() => import("./pages/productdetails"));
const Cart = lazy(() => import("./pages/cart"));

function App() {
  return (
    <div>
      <CategoryProvider>
        <Suspense fallback={<Loader />}>
          <Routes>
            <Route path="/" element={<Products />} />
            <Route path="/:id" element={<ProductDetails />} />
            <Route path="/cart" element={<Cart />} />
          </Routes>
        </Suspense>
      </CategoryProvider>
    </div>
  );
}

export default App;
