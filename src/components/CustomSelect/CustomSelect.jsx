import { useState } from "react";
import css from "./CustomSelect.module.css";
import arrowIcon from "../../assets/chevron.svg";

export default function CustomSelect({
  id,
  options = [],
  placeholder,
  value,
  onChange,
  onBlur,
  ariaLabelledby,
}) {
  const [isOpen, setIsOpen] = useState(false);

  const handleSelect = (option) => {
    onChange(option);
    setIsOpen(false);
    onBlur && onBlur();
  };

  return (
    <div className={css.wrapper}>
      <button
        id={id}
        type="button"
        className={css.header}
        onClick={() => setIsOpen((prev) => !prev)}
      >
        <span>
          {value
            ? placeholder?.toLowerCase().includes("price")
              ? `To $${value}`
              : value
            : placeholder}
        </span>
        <img
          src={arrowIcon}
          alt="arrow"
          className={`${css.arrow} ${isOpen ? css.open : ""}`}
        />
      </button>

      {/* Дропдаун */}
      {isOpen && (
        <ul className={css.list}>
          {options.map((option) => (
            <li
              key={String(option)}
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
