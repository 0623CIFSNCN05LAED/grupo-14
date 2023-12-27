import React, { useState, useEffect } from "react";
export default function LastProduct() {
  const [user, setUser] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("http://localhost:3333/api/users");
        const result = await response.json();
        const users = result.users;
        const user = users[users.length - 1];
        let lastUser = "";
        if (user.name) {
          lastUser = user;
        } else {
          user.name = user.businessName;
          delete user.businessName;
          lastUser = user;
        }
        setUser(lastUser);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, []);
  return (
    <section>
      <h2>Last User</h2>
      <p>id: {user.id}</p>
      <p>nombre: {user.name}</p>
      <p>email: {user.email}</p>
    </section>
  );
}
