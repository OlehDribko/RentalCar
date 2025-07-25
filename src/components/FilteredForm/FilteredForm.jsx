import { Formik, Form, Field } from "formik";
import { useEffect, useState } from "react";
import css from "./FilteredForm.module.css";
import api from "../../api/axiosInstance.js";

export default function FilteredForm() {
  const [cars, setCars] = useState([]);
  const [loading, setLoading] = useState(true);

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

  return (
    <Formik initialValues={{}} onSubmit={() => {}}>
      <Form>
        <Field as="select" name="brand">
          <option value="">Choose a brand</option>
          {cars.map((car) => (
            <option key={car.id} value={car.brand}>
              {car.brand}
            </option>
          ))}
        </Field>
        <Field as="select" name="price">
          <option value="">Choose a price</option>
          {cars.map((car) => (
            <option key={car.id} value={car.rentalPrice}>
              {car.rentalPrice}
            </option>
          ))}
        </Field>
        <Field name="From"></Field>
        <button type="submit">Search</button>
      </Form>
    </Formik>
  );
}
