import css from "./Hero.module.css";

export default function Hero() {
  return (
    <section
      className={css.hero}
      style={{
        backgroundImage: `linear-gradient(
      0deg,
      rgba(0, 0, 0, 0.2) 0%,
      rgba(0, 0, 0, 0.2) 100%
    ),url('./images/Img_main_car.jpg')`,
        backgroundSize: "cover",
        width: "100%",

        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    >
      <div className={css.heroBox}>
        <div className={css.contentBox}>
          <h1>Find your perfect rental car</h1>
          <h2>Reliable and budget-friendly rentals for any journey</h2>
        </div>
        <button className={css.heroBtn} type="button">
          View Catalog
        </button>
      </div>
    </section>
  );
}
