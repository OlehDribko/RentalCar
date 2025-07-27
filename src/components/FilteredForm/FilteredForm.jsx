import { Formik, Form, Field } from "formik";
import { useEffect, useState } from "react";
import css from "./FilteredForm.module.css";
import api from "../../api/axiosInstance.js";
import CustomSelect from "../CustomSelect/CustomSelect.jsx";

export default function FilteredForm() {
  const [cars, setCars] = useState([]);
  const [loading, setLoading] = useState(true);
  const [brand, setBrand] = useState("");
  const [price, setPrice] = useState("");
  useEffect(() => {
    async function facthCars() {
      try {
        const response = await api.get("/cars");
        setCars(response.data.cars);
      } catch (error) {
        console.log(error.massage);
      }
    }
    facthCars();
  }, []);

  const uniqueBrands = [...new Set(cars.map((car) => car.brand))];
  const uniquePrices = [...new Set(cars.map((car) => car.rentalPrice))];

  return (
    <Formik
      initialValues={{
        brand: "",
        price: "",
        minMileage: "",
        maxMileage: "",
      }}
      onSubmit={() => {}}
    >
      <Form className={css.form}>
        <CustomSelect
          options={uniqueBrands}
          placeholder="Choose a brand"
          value={brand}
          onChange={setBrand}
        />
        <CustomSelect
          options={uniquePrices}
          placeholder="Choose a price"
          value={price}
          onChange={setPrice}
        />
        <div className={css.mileageBox}>
          <div className={css.mileageItem}>
            <span className={css.label}>From</span>
            <Field
              type="number"
              name="minMileage"
              min="0"
              className={css.input}
            />
          </div>
          <div className={css.mileageItem}>
            <span className={css.label}>To</span>
            <Field
              type="number"
              name="maxMileage"
              min="0"
              className={css.input}
            />
          </div>
        </div>

        <button className={css.searchBtn} type="submit">
          Search
        </button>
      </Form>
    </Formik>
  );
}
