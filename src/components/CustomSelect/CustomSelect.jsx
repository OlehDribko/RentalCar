import { useState } from "react";
import css from "./CustomSelect.module.css";
import arrowIcon from "../../assets/chevron.svg";
export default function CustomSelect({
  options,
  placeholder,
  value,
  onChange,
}) {
  const [isOpen, setIsOpen] = useState(false);

  const handleSelect = (option) => {
    onChange(option);
    setIsOpen(false);
  };

  return (
    <div className={css.wrapper}>
      {/* Head */}
      <div className={css.header} onClick={() => setIsOpen((prev) => !prev)}>
        <span>
          {value
            ? `${placeholder.includes("price") ? "To $" + value : value}`
            : placeholder}
        </span>
        <img
          src={arrowIcon}
          alt="arrow"
          className={`${css.arrow} ${isOpen ? css.open : ""}`}
        />
      </div>

      {/* Drop */}
      {isOpen && (
        <ul className={css.list}>
          {options.map((option) => (
            <li
              key={option}
              className={css.item}
              onClick={() => handleSelect(option)}
            >
              {option}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
