import React, { useState, useEffect } from "react";
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
    <section>
      <h2>Last Product</h2>
      <p>id: {product.id}</p>
      <p>name: {product.shortName}</p>
      <p>retail price: {product.retailPrice}</p>
      <p>discount: {product.discountCf}</p>
      <p>whole sale price: {product.wholesalePrice}</p>
      <p>discount: {product.discountM}</p>
      <p>stock: {product.stock}</p>
      <p>image: {product.urlImage}</p>
    </section>
  );
}
