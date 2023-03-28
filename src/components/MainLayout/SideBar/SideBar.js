import React, { useEffect } from "react";
import logo from "../../../assets/Logo.svg";
import $ from "jquery";
import "./SideBar.scss";
import {
  DISCORD_LINK,
  TELEGRAM_LINK,
  TWITTER_LINK,
} from "../../../Global/constants";

function SideBar() {
  useEffect(() => {
    let route = "dapp";
    if (window.location.href.split("/")[3] !== "") {
      route = window.location.href.split("/")[3];
    }
    $("." + route).addClass("selected");
  }, []);

  return (
    <div>
      <nav className="nav__cont">
        <ul className="nav">
          <img className="header__logo " src={logo} alt={"logo"} />
          <li className="nav__items">
            <i
              className="fa fa-tachometer menubar__icon"
              aria-hidden="true"
            ></i>
            <a className="nav__title dapp" href="/">
              Dashboard
            </a>
          </li>

          <li className="nav__items">
            <i className="fa fa-user menubar__icon" aria-hidden="true"></i>
            <a className="nav__title account" href="/account">
              Account
            </a>
          </li>

          {/*<li className="nav__items">*/}
          {/*  <i className="fa fa fa-usd menubar__icon" aria-hidden="true"></i>*/}
          {/*  <a className="nav__title presale" href="/">*/}
          {/*    Presale*/}
          {/*  </a>*/}
          {/*</li>*/}

          <li className="nav__items">
            <i
              className="fa fa-calculator menubar__icon"
              aria-hidden="true"
            ></i>
            <a className="nav__title calculator" href="/calculator">
              Calculator
            </a>
          </li>

          <li className="nav__items">
            <i className="fa fa-exchange menubar__icon" aria-hidden="true"></i>
            <a className="nav__title swap" href="/bond">
              Bond
            </a>
          </li>

          <li className="nav__items">
            <i className="fa fa-exchange menubar__icon" aria-hidden="true"></i>
            <a className="nav__title swap" href="/staking">
              Staking
            </a>
          </li>


          <li className="nav__items">
            <i
              className="fa fa-line-chart menubar__icon"
              aria-hidden="true"
            ></i>
            <a className="nav__title chart" href="/chart">
              Chart
            </a>
          </li>

          <div className="social">
            <a href={TELEGRAM_LINK} rel="noreferrer" target="_blank">
              <i className="fa fa-telegram"></i>
            </a>
            <a href={TWITTER_LINK} rel="noreferrer" target="_blank">
              <i className="fa fa-twitter"></i>
            </a>
          </div>
        </ul>
      </nav>
    </div>
  );
}

export default SideBar;
