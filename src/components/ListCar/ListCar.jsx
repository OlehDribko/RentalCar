import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchCars } from "../../redux/operations";

import css from "./ListCar.module.css";

export default function ListCar() {
  const dispatch = useDispatch();
  const { items, isLoading, error, totalCars, totalPages, page } = useSelector(
    (state) => state.cars
  );

  useEffect(() => {
    dispatch(fetchCars({ page: 1 }));
  }, [dispatch]);

  if (isLoading) return <p>Завантаження авто...</p>;
  if (error) return <p>Помилка: {error}</p>;

  return (
    <div>
      <ul className={css.carsConatiner}>
        {items.map((car) => (
          <li className={css.carsCard} key={car.id}>
            <h3>
              {car.brand} {car.model}
            </h3>
            <img src={car.img} alt={car.model} width={300} />
            <p>
              {car.type} • {car.rentalPrice}$/день
            </p>
            <button className={css.btnMore}>Read more</button>
          </li>
        ))}
      </ul>
      <button>Load more</button>
      <p>
        Усього авто: {totalCars} | Сторінка {page} з {totalPages}
      </p>
    </div>
  );
}
