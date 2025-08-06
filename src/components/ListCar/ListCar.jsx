import clsx from "clsx";

import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchCars } from "../../redux/operations";

import css from "./ListCar.module.css";
import { extractCityAndCountry } from "../../utils/extractCityAndCountry.js";

export default function ListCar() {
  const dispatch = useDispatch();
  const { items, isLoading, error, totalCars, totalPages, page } = useSelector(
    (state) => state.cars
  );
  const filters = useSelector((state) => state.filters);
  const filteredCars = items.filter((car) => {
    const { brand, price, minMileage, maxMileage } = filters;
    const matchesBrand = !brand || car.brand === brand;
    const matchesPrice = !price || car.rentalPrice === price;

    const mileage = Number(car.mileage);
    const matchesMin = !minMileage || mileage >= Number(minMileage);
    const matchesMax = !maxMileage || mileage <= Number(maxMileage);

    return matchesBrand && matchesPrice && matchesMin && matchesMax;
  });
  useEffect(() => {
    dispatch(fetchCars({ page: 1 }));
  }, [dispatch]);

  if (isLoading) return <p>Завантаження авто...</p>;
  if (error) return <p>Помилка: {error}</p>;

  return (
    <div className={css.carsListSectionContainer}>
      <ul className={css.carsConatiner}>
        {filteredCars.map((car) => {
          const { city, country } = extractCityAndCountry(car.address);
          return (
            <li className={css.carsCard} key={car.id}>
              <img src={car.img} alt={car.model} width={276} />
              <h3 className={css.tileCarCardContainer}>
                <div>
                  {car.brand} <span className={css.carModel}>{car.model}</span>
                </div>
                ${car.rentalPrice}
              </h3>
              <div className={css.optionsListwraper}>
                <ul className={clsx(css.optionsContainer, css.optionswraper)}>
                  <li className={css.options}>{city}</li>
                  <li className={css.options}>{country}</li>
                  <li className={css.options}>{car.rentalCompany}</li>
                </ul>

                <ul className={css.optionsContainer}>
                  <li className={css.options}>{car.type}</li>
                  <li className={css.optionsLastElement}>{car.mileage}km</li>
                </ul>
              </div>
              <button className={css.btnMore}>Read more</button>
            </li>
          );
        })}
      </ul>
      <button className={css.loadMoreBtn}>Load more</button>
    </div>
  );
}
