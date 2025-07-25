import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import Header from "./components/Header/Header.jsx";
import Hero from "./components/Hero/Hero.jsx";
import FilteredForm from "./components/FilteredForm/FilteredForm.jsx";

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <div className="main-container">
        <Header />
        <FilteredForm />
        <Hero />
      </div>
    </>
  );
}

export default App;
