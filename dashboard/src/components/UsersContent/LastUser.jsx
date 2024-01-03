import { useState, useEffect } from "react";
import "./LastUser.css";
export default function LastProduct() {
  const [user, setUser] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("http://localhost:3333/api/users");
        const result = await response.json();
        const users = result.users;
        const user = users[users.length - 1];
        const idResponse = await fetch(`http://localhost:3333${user.detail}`);
        const idResult = await idResponse.json();
        let lastUser = "";
        if (idResult.user.name) {
          lastUser = idResult.user;
        } else {
          idResult.user.name = idResult.user.businessName;
          delete idResult.user.businessName;
          lastUser = idResult.user;
        }
        setUser(lastUser);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, []);
  return (
    <section className="lastUser">
      <h2>Last User</h2>
      <p>ID: {user.id}</p>
      {user.lastName ? (
        <p>
          Name: {user.name} {user.lastName}
        </p>
      ) : (
        <p>Name: {user.name}</p>
      )}
      <p>Email: {user.email}</p>
      <p>
        Image:{" "}
        <a
          href={`http://localhost:3333/img/users/${user.image}`}
        >{`http://localhost:3333/img/users/${user.image}`}</a>
      </p>
    </section>
  );
}
