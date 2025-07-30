import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchCars } from "../../redux/operations";

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
      <ul>
        {items.map((car) => (
          <li key={car.id}>
            <h3>
              {car.brand} {car.model}
            </h3>
            <img src={car.img} alt={car.model} width={300} />
            <p>
              {car.type} • {car.rentalPrice}$/день
            </p>
          </li>
        ))}
      </ul>
      <p>
        Усього авто: {totalCars} | Сторінка {page} з {totalPages}
      </p>
    </div>
  );
}
