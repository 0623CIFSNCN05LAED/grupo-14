import React, { useState, useEffect } from "react";
import {
  BsFillArchiveFill,
  BsFillGrid3X3GapFill,
  BsPeopleFill,
} from "react-icons/bs";
import Card from "./HomeContent/Card";
import LastProduct from "./HomeContent/LastProduct";
import LastUser from "./HomeContent/LastUser";
import ProductList from "./HomeContent/ProductList";
import TableCategories from "./HomeContent/TableCategories";
import PieCategories from "./HomeContent/PieCategories";

export default function Home() {
  const [products, setProducts] = useState([]);
  const [users, setUsers] = useState([]);
  const [categoriesCount, setCategoriesCount] = useState(0);

  useEffect(() => {
    fetch("http://localhost:3333/api/users")
      .then((response) => response.json())
      .then((data) => {
        setUsers(data.users);
      })
      .catch((error) => console.log(error));

    fetch("http://localhost:3333/api/products")
      .then((response) => response.json())
      .then((data) => {
        setProducts(data.products);
        setCategoriesCount(Object.keys(data.countByCategory).length);
      })
      .catch((error) => console.log(error));
  }, []);

  return (
    <main className="mainContainer">
      <div className="mainTitle">
        <h3>DASHBOARD</h3>
      </div>
      <div className="mainCards">
        <Card
          title="PRODUCTS"
          quantity={products.length}
          icon={<BsFillArchiveFill />}
        />
        <Card
          title="CATEGORIES"
          quantity={categoriesCount}
          icon={<BsFillGrid3X3GapFill />}
        />
        <Card title="USERS" quantity={users.length} icon={<BsPeopleFill />} />
      </div>

      <LastProduct />

      <LastUser />

      <ProductList />
      <div className="side">
        <TableCategories />
        <PieCategories />
      </div>
    </main>
  );
}
