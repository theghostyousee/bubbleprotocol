import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "../MainLayout/Tiles/Tiles.css";

import Swap from "./Swap/Swap";
import Calculator from "./Calculator/Calculator";
import Account from "./Account/Account";
import Chart from "./Chart/Chart";
import Dashboard from "./Dashboard/Dashboard";
import Nothing from "./Nothing/Nothing";
// import Presale from "./Presale/Presale";

function Content(props) {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          exact
          path="/"
          element={<Dashboard rebase={props.rebase} price={props.price} />}
        />
        <Route
          path="/account"
          element={
            <Account
              userAPHRBalance={props.userAPHRBalance}
              rebase={props.rebase}
              price={props.price}
            />
          }
        />
        <Route
          path="/calculator"
          element={
            <Calculator
              price={props.price}
              userAPHRBalance={props.userAPHRBalance}
            />
          }
        />
        {/*<Route path="/presale" element={<Presale />} />*/}
        <Route path="/bond" element={<Swap />} />
        <Route path="/chart" element={<Chart />} />
        <Route path="/staking" element={<Swap />} />
        <Route path="/*" element={<Nothing />} />
      </Routes>
    </BrowserRouter>
  );
}

export default Content;
