import { Routes, Route, NavLink, Link } from "react-router-dom";
import css from "./header.module.css";
import logo from "../../assets/LogoRentalCar.svg";

export default function Header() {
  return (
    <header className={css.header}>
      <div className={css.headerContainer}>
        <Link to="/">
          <img src={logo} alt="RentCar logo" />
        </Link>
        <nav className={css.navigation}>
          <NavLink to="/home">Home</NavLink>
          <NavLink to="/catalog">Catalog</NavLink>
        </nav>
       
      </div>
    </header>
  );
}
