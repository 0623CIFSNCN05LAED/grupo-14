import { useState, useEffect } from "react";
import { BsFillArchiveFill, BsFillGrid3X3GapFill, BsPeopleFill } from "react-icons/bs";
import Card from "./HomeContent/Card";
import TableCategories from "./HomeContent/Table";

export default function Home() {
  const [products, setProducts] = useState([]);
  console.log(products);
  const [users, setUsers] = useState([]);
  console.log(users);
  const [categoriesCount, setCategoriesCount] = useState(0);
  useEffect(() => {
    console.log("se monto el componente");

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
      <div>
        <TableCategories />
      </div>
    </main>
  );
}
