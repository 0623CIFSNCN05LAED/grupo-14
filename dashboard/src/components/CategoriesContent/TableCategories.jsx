import { useEffect, useState } from "react";
import "./TableCategories.css";

export default function TableCategories() {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("http://localhost:3333/api/products");
        const result = await response.json();

        const categoriesArray = Object.entries(result.countByCategory).map(
          ([name, quantity]) => ({
            name,
            quantity,
          })
        );

        setCategories(categoriesArray);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <section>
      <h2>Categories</h2>
      <table className="tableCategories">
        <thead>
          <tr>
            <th>#</th>
            <th>Name</th>
            <th>Quantity</th>
          </tr>
        </thead>
        <tbody>
          {categories.map((category, index) => (
            <tr key={index}>
              <th>{index + 1}</th>
              <td>{category.name.toUpperCase()}</td>
              <td>{category.quantity}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </section>
  );
}
