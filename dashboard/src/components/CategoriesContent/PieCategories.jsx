import { useEffect, useState } from "react";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Pie } from "react-chartjs-2";

ChartJS.register(ArcElement, Tooltip, Legend);

export default function TableCategories() {
  const [categories, setCategories] = useState([]);
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("http://localhost:3333/api/products");
        const result = await response.json();

        setProducts(result);

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

  const names = categories.map((category) => category.name.toUpperCase());
  const percentages = categories.map((category) =>
    ((category.quantity / products.count) * 100).toFixed(2)
  );

  const data = {
    labels: names,
    datasets: [
      {
        data: percentages,
        backgroundColor: "#1d2634",
        hoverBackgroundColor: "#9e9ea4",
        borderColor: "#9e9ea4",
        borderWidth: 2,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
  };

  return (
    <section className="pie">
      <Pie
        data={data}
        options={options}
      />
    </section>
  );
}
