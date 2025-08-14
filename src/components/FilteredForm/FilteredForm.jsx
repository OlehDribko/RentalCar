import { Formik, Form, Field, useField } from "formik";
import { useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import css from "./FilteredForm.module.css";
import api from "../../api/axiosInstance.js";
import CustomSelect from "../CustomSelect/CustomSelect.jsx";
import { formatNumber } from "../../utils/formatNumber.js";
import { setFilters } from "../../redux/filterSlice";

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
  const dispatch = useDispatch();
  const [cars, setCars] = useState([]);

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
        dispatch(setFilters(values));
      }}
    >
      <Form className={css.form}>
        <div>
          <label id="brand-label" htmlFor="brand" className={css.inupOtions}>
            Car brand
          </label>
          <Field name="brand">
            {({ field, form }) => (
              <CustomSelect
                id="brand"
                options={uniqueBrands}
                placeholder="Choose a brand"
                value={field.value}
                onChange={(value) => form.setFieldValue("brand", value)}
              />
            )}
          </Field>
        </div>

        <div>
          <label id="price" htmlFor="price" className={css.inupOtions}>
            Price/ 1 hour Choose a price
          </label>
          <Field name="price">
            {({ field, form }) => (
              <CustomSelect
                id="price"
                options={uniquePrices}
                placeholder="Choose a price"
                value={field.value}
                onChange={(value) => form.setFieldValue("price", value)}
              />
            )}
          </Field>
        </div>

        <div>
          <p className={css.inupOtions}>Сar mileage / km</p>
          <div className={css.mileageBox}>
            <FormattedNumberField name="minMileage" label="From" />
            <FormattedNumberField name="maxMileage" label="To" />
          </div>
        </div>
        <div className={css.searchBtnCont}>
          <p className={css.inupOtions} style={{ visibility: "hidden" }}>
            Button
          </p>
          <button className={css.searchBtn} type="submit">
            Search
          </button>
        </div>
      </Form>
    </Formik>
  );
}
