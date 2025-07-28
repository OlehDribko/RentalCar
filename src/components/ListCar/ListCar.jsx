import css from "./ListCar.module.css";

export default function ListCar(params) {
  return (
    <>
      <ul className={css.listContainer}>
        <li className={css.cardOfList}></li>
      </ul>
    </>
  );
}
