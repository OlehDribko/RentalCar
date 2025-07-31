import Layout from "../../components/Layout/Layout.jsx";
import FilteredForm from "../../components/FilteredForm/FilteredForm";
import Header from "../../components/Header/Header";
import ListCar from "../../components/ListCar/ListCar.jsx";
import css from "./Catalog.module.css";

export default function Catalog() {
  return (
    <>
      <div className={css.container}>
        <Header />
        <Layout>
          <FilteredForm />
          <ListCar />
        </Layout>
      </div>
    </>
  );
}
