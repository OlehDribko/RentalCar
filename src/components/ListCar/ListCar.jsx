import clsx from "clsx";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchCars } from "../../redux/operations";

import {
  toggleFavorite,
  selectFavoriteIds,
} from "../../redux/favoriteSlice.js";
import css from "./ListCar.module.css";
import { extractCityAndCountry } from "../../utils/extractCityAndCountry.js";

export default function ListCar() {
  const dispatch = useDispatch();
  const favIds = useSelector(selectFavoriteIds);

  const { isLoading, error, totalPages, page } = useSelector(
    (state) => state.cars || {}
  );
  const items = useSelector((state) => state.cars?.items) ?? [];
  const filters = useSelector((state) => state.filters);

  const filteredCars = items.filter((car) => {
    const { brand, price, minMileage, maxMileage } = filters;

    const matchesBrand = !brand || car.brand === brand;

    const carPrice = Number(String(car.rentalPrice).replace(/[^\d]/g, ""));
    const matchesPrice = !price || carPrice <= Number(price);

    const mileage = Number(car.mileage);
    const matchesMin = !minMileage || mileage >= Number(minMileage);
    const matchesMax = !maxMileage || mileage <= Number(maxMileage);

    return matchesBrand && matchesPrice && matchesMin && matchesMax;
  });

  useEffect(() => {
    dispatch(fetchCars({ params: { page: 1 } }));
  }, [dispatch]);

  if (isLoading) return <p>Завантаження авто...</p>;
  if (error) return <p>Помилка: {error}</p>;

  return (
    <div className={css.carsListSectionContainer}>
      <ul className={css.carsConatiner}>
        {filteredCars.map((car) => {
          const isFavorite = favIds.includes(car.id);

          const { city, country } = extractCityAndCountry(car.address);
          return (
            <li className={css.carsCard} key={car.id}>
              <img src={car.img} alt={car.model} width={276} />
              <h3 className={css.tileCarCardContainer}>
                <span>
                  {car.brand} <span className={css.carModel}>{car.model}</span>
                </span>
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
              <button
                type="button"
                className={css.favoriteIconBtn}
                aria-pressed={isFavorite}
                title={isFavorite ? "В обраному" : "Додати в обране"}
                onClick={() => dispatch(toggleFavorite(car.id))}
              >
                <svg
                  className={css.favoriteIcon}
                  width="16"
                  height="16"
                  viewBox="0 0 16 16"
                  fill="none"
                  aria-hidden="true"
                >
                  {isFavorite ? (
                    // ЗАПОВНЕНЕ СЕРЦЕ (улюблене)
                    <path
                      fillRule="evenodd"
                      clipRule="evenodd"
                      d="M7.99978 1.31405C12.4378 -3.24795 23.5338 4.73505 7.99978 15.0001C-7.53422 4.73605 3.56178 -3.24795 7.99978 1.31405Z"
                      fill="#3470FF"
                    />
                  ) : (
                    // КОНТУР (не улюблене)
                    <path
                      d="M7.9999 2.74805L7.2829 2.01105C5.5999 0.281049 2.5139 0.878049 1.39989 3.05305C0.876895 4.07605 0.758895 5.55305 1.71389 7.43805C2.63389 9.25305 4.5479 11.427 7.9999 13.795C11.4519 11.427 13.3649 9.25305 14.2859 7.43805C15.2409 5.55205 15.1239 4.07605 14.5999 3.05305C13.4859 0.878049 10.3999 0.280049 8.7169 2.01005L7.9999 2.74805ZM7.9999 15C-7.33311 4.86805 3.27889 -3.03995 7.82389 1.14305C7.88389 1.19838 7.94256 1.25538 7.9999 1.31405C8.05623 1.25501 8.11494 1.1983 8.17589 1.14405C12.7199 -3.04195 23.3329 4.86705 7.9999 15Z"
                      fill="#F2F4F7"
                    />
                  )}
                </svg>
              </button>
            </li>
          );
        })}
      </ul>

      {page < totalPages && (
        <button
          className={css.loadMoreBtn}
          onClick={() => dispatch(fetchCars({ params: { page: page + 1 } }))}
        >
          Load more
        </button>
      )}
    </div>
  );
}
