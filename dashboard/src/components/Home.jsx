import { useState, useEffect } from "react";
import {BsFillArchiveFill, BsFillGrid3X3GapFill, BsPeopleFill} from "react-icons/bs"
import Card from "./HomeContent/Card";

export default function Home() {

const [products, setProducts] = useState([])
console.log(products)
const [users, setUsers] = useState([])
console.log(users)

useEffect(()=>{
  console.log("se monto el componente")

  fetch("http://localhost:3333/api/users")
    .then(response => response.json())
    .then(data => {
      setUsers(data.users)
    })
    .catch(error => console.log(error));

  fetch("http://localhost:3333/api/products")
      .then((response) => response.json())
      .then((data) => {
        setProducts(data.products);
      })
      .catch(error => console.log(error));

}, [])




  return (
    <main className="mainContainer">
      <div className="mainTitle">
        <h3>DASHBOARD</h3>
      </div>

      <div className="mainCards">
        <Card title="PRODUCTS" quantity={products.length} icon={<BsFillArchiveFill />} />
        <Card title="CATEGORIES" quantity="12" icon={<BsFillGrid3X3GapFill />}/>
        <Card title="USERS" quantity={users.length} icon={<BsPeopleFill />} />
      </div>
    </main>
  );
}
