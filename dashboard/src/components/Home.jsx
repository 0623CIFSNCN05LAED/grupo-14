import React, { useState, useEffect } from "react";
import { BsFillArchiveFill, BsFillGrid3X3GapFill, BsPeopleFill } from "react-icons/bs";
import Card from "./HomeContent/Card";
import TableCategories from "./HomeContent/TableCategories";
import ProductList from "./HomeContent/ProductList";

function LatestDetailPanel({ type }) {
  const [latestDetail, setLatestDetail] = useState(null);

  useEffect(() => {
    fetch(`http://localhost:3333/api/latest${type}`)
      .then((response) => response.json())
      .then((data) => {
        setLatestDetail(data);
      })
      .catch((error) => console.log(error));
  }, [type]);

  return (
    <div className="latest-detail-panel">
      <h2>Latest {type}</h2>
      {latestDetail ? (
        <div>
          <p>ID: {latestDetail.id}</p>
          <p>Name: {latestDetail.name}</p>
          {/* Agrega aquí otros detalles según la estructura del objeto */}
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
}

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
        <Card
          title="USERS"
          quantity={users.length}
          icon={<BsPeopleFill />}
        />
      </div>
      <div className="detail-panels">
        <LatestDetailPanel type="Product" />{" "}
        {/* Muestra el detalle del último producto */}
        <LatestDetailPanel type="User" /> {/* Muestra el detalle del último usuario */}
      </div>

      <ProductList />
      <TableCategories />
    </main>
  );
}
