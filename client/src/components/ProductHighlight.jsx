import ProductCard from "./ProductCard";
import axios from "axios";
import { useState, useEffect } from "react";

function ProductHighlight() {
  const [products, setProducts] = useState([]);
  const [searchText, setSearchText] = useState("");

  const getProducts = async () => {
    try {
      const response = await axios.get(
        `http://localhost:4000/products?search=${searchText}`
      );
      setProducts(response.data);
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };

  useEffect(() => {
    getProducts();
  }, []);

  return (
    <section className="bg-gray-200 py-8">
      <div className="container mx-auto">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-semibold">Featured Products</h2>
          <input
            type="text"
            placeholder="Search products..."
            className="p-2 border border-gray-400 rounded"
            value={searchText}
            onChange={(event) => {
              setSearchText(event.target.value);
            }}
          />
          <button
            onClick={getProducts}
            className="p-2 bg-blue-500 text-white rounded ml-2"
          >
            Search
          </button>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {products.map((item) => {
            return (
              <ProductCard
                key={item.id}
                imgSrc={item.image}
                productName={item.name}
                productPrice={item.price}
              />
            );
          })}
        </div>
      </div>
    </section>
  );
}

export default ProductHighlight;
