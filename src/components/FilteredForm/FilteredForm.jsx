import { Formik, Form, useField } from "formik";
import { useEffect, useState } from "react";
import css from "./FilteredForm.module.css";
import api from "../../api/axiosInstance.js";
import CustomSelect from "../CustomSelect/CustomSelect.jsx";
import { formatNumber } from "../../utils/formatNumber.js";

// КАСТОМНИЙ ІНПУТ З ФОРМАТУВАННЯМ
function FormattedNumberField({ label, ...props }) {
  const [field, , helpers] = useField(props);

  const handleChange = (e) => {
    const rawValue = e.target.value.replace(/,/g, "");
    const numericValue = rawValue.replace(/[^\d]/g, "");
    helpers.setValue(numericValue);
  };

  return (
    <div className={css.mileageItem}>
      <span className={css.label}>{label}</span>
      <input
        {...field}
        {...props}
        value={formatNumber(field.value)}
        onChange={handleChange}
        className={css.input}
        inputMode="numeric"
        min="0"
      />
    </div>
  );
}

export default function FilteredForm() {
  const [cars, setCars] = useState([]);
  const [brand, setBrand] = useState("");
  const [price, setPrice] = useState("");

  useEffect(() => {
    async function fetchCars() {
      try {
        const response = await api.get("/cars");
        setCars(response.data.cars);
      } catch (error) {
        console.log(error.message);
      }
    }
    fetchCars();
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
      onSubmit={(values) => {
        console.log(values);
      }}
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
          <FormattedNumberField name="minMileage" label="From" />
          <FormattedNumberField name="maxMileage" label="To" />
        </div>

        <button className={css.searchBtn} type="submit">
          Search
        </button>
      </Form>
    </Formik>
  );
}
