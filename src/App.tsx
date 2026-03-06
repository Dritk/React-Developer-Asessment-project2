import { Routes, Route } from "react-router-dom";
import Products from "./pages/products";

function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Products />} />
      </Routes>
    </div>
  );
}

export default App;
