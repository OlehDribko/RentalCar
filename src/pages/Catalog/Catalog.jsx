import FilteredForm from "../../components/FilteredForm/FilteredForm";
import Header from "../../components/Header/Header";
import ListCar from "../../components/ListCar/ListCar.jsx";

export default function Catalog() {
  return (
    <>
      <Header />
      <FilteredForm />
      <ListCar />
    </>
  );
}
