import { Routes, Route, NavLink, Link } from "react-router-dom";
import css from "./Header.module.css";
import logo from "../../assets/LogoRentalCar.svg";

export default function Header() {
  return (
    <header className={css.header}>
      <div className={css.headerContainer}>
        <Link to="/">
          <img src={logo} alt="RentCar logo" />
        </Link>
        <nav className={css.navigation}>
          <NavLink
            className={({ isActive }) =>
              isActive ? `${css.link} ${css.isActive}` : css.link
            }
            to="/home"
          >
            Home
          </NavLink>
          <NavLink
            className={({ isActive }) =>
              isActive ? `${css.link} ${css.isActive}` : css.link
            }
            to="/catalog"
          >
            Catalog
          </NavLink>
        </nav>
      </div>
    </header>
  );
}
