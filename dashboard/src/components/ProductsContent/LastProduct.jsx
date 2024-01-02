import { useState, useEffect } from "react";
import "./LastProductUser.css";
export default function LastProduct() {
  const [product, setProduct] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("http://localhost:3333/api/products");
        const result = await response.json();
        const products = result.products;
        const product = products[products.length - 1];
        const idResponse = await fetch(
          `http://localhost:3333/api/products/${product.id}`
        );
        const idResult = await idResponse.json();
        setProduct(idResult);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, []);
  return (
    <section className="lastProduct">
      <h2>Last Product</h2>
      <p>ID: {product.id}</p>
      <p>Name: {product.shortName}</p>
      <div className="column">
        <p className="price">Retail price: ${product.retailPrice}</p>
        <p>Discount: {product.discountCf}%</p>
      </div>
      <div className="column">
        <p className="price">Whole sale price: ${product.wholesalePrice}</p>
        <p>Discount: {product.discountM}%</p>
      </div>
      <p className="stock">Stock: {product.stock}</p>
      <p>Image: {product.urlImage}</p>
    </section>
  );
}
