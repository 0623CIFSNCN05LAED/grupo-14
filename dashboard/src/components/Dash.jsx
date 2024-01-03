import Cards from "./DashboardContent/Cards";
import LastProduct from "./ProductsContent/LastProduct";
import LastUser from "./UsersContent/LastUser";
import ProductList from "./ProductsContent/ProductList";
import TableCategories from "./CategoriesContent/TableCategories";
import PieCategories from "./CategoriesContent/PieCategories";

export default function Home() {
  return (
    <main className="mainContainer">
      <section>
        <Cards />
      </section>

      <section className="side">
        <LastProduct />
        <LastUser />
      </section>

      <section className="side">
        <TableCategories />
        <PieCategories />
      </section>

      <section>
        <ProductList />
      </section>
    </main>
  );
}
