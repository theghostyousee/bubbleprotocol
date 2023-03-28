import React from "react";
import "./Menu.scss";

function Menu() {
  return (
    <header>
      <input type="checkbox" id="toggle" style={{ display: "none" }} />
      <label className="toggle-btn toggle-btn__cross" htmlFor="toggle">
        <div className="bar"></div>
        <div className="bar"></div>
        <div className="bar"></div>
      </label>
      <nav>
        <ul>
          <li>
            <a href="/">Dashboard</a>
          </li>
          <li>
            <a href="/account">Account</a>
          </li>
          {/*<li>*/}
          {/*  <a href="/">Presale</a>*/}
          {/*</li>*/}
          <li>
            <a href="/calculator">Calculator</a>
          </li>
          <li>
            <a href="/swap">Swap</a>
          </li>
          <li>
            <a href="/chart">Chart</a>
          </li>
        </ul>
      </nav>
    </header>
  );
}

export default Menu;
