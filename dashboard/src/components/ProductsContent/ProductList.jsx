import { useEffect, useState } from "react";
import "./Tables.css";

export default function ProductList() {
  const [productsList, setProductsList] = useState([]);

  useEffect(() => {
    fetch("http://localhost:3333/api/products")
      .then((response) => response.json())
      .then((data) => {
        setProductsList(data.products);
      })
      .catch((error) => console.log(error));
  }, []);

  return (
    <section>
      <h2>Product List</h2>
      <table className="tableProducts">
        <thead>
          <tr>
            <th>#</th>
            <th>Name</th>
            <th>Retail price</th>
            <th>Discount</th>
            <th>Whole sale price</th>
            <th>Discount</th>
            <th>Stock</th>
          </tr>
        </thead>
        <tbody>
          {productsList.map((product, index) => (
            <tr key={product.id}>
              <th>{index + 1}</th>
              <td>{product.shortName}</td>
              <td>${product.retailPrice}</td>
              <td>{product.discountCf}%</td>
              <td>${product.wholesalePrice}</td>
              <td>{product.discountM}%</td>
              <td>{product.stock}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </section>
  );
}
