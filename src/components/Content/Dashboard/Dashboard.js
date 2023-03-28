import React, { useEffect, useState } from "react";
import { Row, Col, Container } from "react-bootstrap";
import {
  APP_NAME,
  APY,
  TOKEN_NAME,
  treasuryData,
  WEI,
} from "../../../Global/constants";
import { formatNumber } from "../../../Global/functions";

function Dashboard(props) {
  const [metisLiquidity, setMetisLiquidity] = useState(0);
  const [, setTreasury] = useState(0);
  const [RFV, setRFV] = useState(0);
  const [marketCap, setMarketCap] = useState(0);

  // Lifetime
  const date1 = new Date("04/01/2022");
  const today = new Date().toDateString();
  const date2 = new Date(today);
  const Difference_In_Time = date2.getTime() - date1.getTime();
  const Difference_In_Days = formatNumber(0).format(
    Difference_In_Time / (1000 * 3600 * 24)
  );

  useEffect(() => {
    async function fetchTreasury() {
      try {
        //Get treasury assets
        const priceCall = await fetch(
          "https://andromeda-explorer.metis.io/api?module=account&action=balance&address=" +
            treasuryData.TREASURY_ADDRESS
        );
        let res = await priceCall.json();
        res = parseFloat(res.result);
        setTreasury(res * WEI);
      } catch (error) {
        console.error(error);
        setTreasury("0");
      }

      try {
        //Get RFV
        const priceCall = await fetch(
          "https://andromeda-explorer.metis.io/api?module=account&action=balance&address=" +
            treasuryData.RFV_ADDRESS
        );
        let res = await priceCall.json();
        res = parseFloat(res.result);
        setRFV(res * WEI);
      } catch (error) {
        console.error(error);
        setRFV(0);
      }

      try {
        //Get Liquidity
        const priceCall = await fetch(
          "https://andromeda-explorer.metis.io/api?module=account&action=&address=" +
            treasuryData.METIS_LIQUIDITY_VALUE_ADDRESS
        );
        let res = await priceCall.json();
        res = parseFloat(res.result);
        setMetisLiquidity(res * WEI);
      } catch (error) {
        console.error(error);
        setMetisLiquidity(0);
      }
    }
    fetchTreasury().then(console.log("Succesfully fetched treasury"));
  }, []);

  useEffect(() => {
    async function fetchMarketCap() {
      try {
        //Get FDV
        const priceCall = await fetch(
          "https://api.dexscreener.io/latest/dex/pairs/metis/0x79Ba0f03517e81264ABA7031316a8c66Fe68c6fd"
        );
        let fdv = await priceCall.json();
        fdv = parseFloat(fdv.pair.fdv);

        try {
          //Get Owner Balance
          const ownerBalanceCall = await fetch(
            "https://andromeda-explorer.metis.io/api?module=account&action=tokenbalance&contractaddress=0x3B842D166a6D59d0B25a4F2246E5DE6D8C2b9475&address=0xE75B4447Eb1d5FE0cE3533c33e8351C6565B0851"
          );
          let ownerBalance = await ownerBalanceCall.json();
          ownerBalance = parseFloat(ownerBalance.result);
          if (parseFloat(props.price) !== 0) {
            setMarketCap(fdv - ownerBalance * WEI * props.price);
          }
        } catch (error) {
          setMarketCap(0);
          console.error(error);
        }
      } catch (error) {
        console.error(error);
        setMarketCap(0);
      }
    }
    fetchMarketCap().then(console.log("Succesfully fetched market cap"));
  }, [props.price]);

  return (
    <Container
      className="mt-5"
      style={{ height: "75%", minHeight: "410px", paddingTop: "20px" }}
    >
      <Row className="tile" style={{ marginLeft: -5, marginRight: -5 }}>
        <Col className="d-flex align-items-center justify-content-center">
          <div>
            <span>
              <b className="gray">Market Cap</b>
              <br />
              <h4 className="black">$0</h4>
            </span>
          </div>
        </Col>
        <Col className="d-flex align-items-center justify-content-center">
          <div className="text-center">
            <span>
              <b className="gray">{TOKEN_NAME} Price</b>
              <br />
              <h4 className="black">${props.price}</h4>
            </span>
          </div>
        </Col>
        <Col className="d-flex align-items-center justify-content-center">
          <div className="text-center">
            <span>
              <b className="gray">{APP_NAME} Lifetime</b>
              <br />
              <h4 className="black">{Difference_In_Days} Days</h4>
            </span>
          </div>
        </Col>
      </Row>

      <Row>
        <Col className="tile d-flex align-items-center justify-content-center">
          <div className="text-center">
            <b className="gray">Current APY</b>
            <br />
            <h4 className="black accentuate">{APY}%</h4>
          </div>
        </Col>
        <Col className="tile d-flex align-items-center justify-content-center">
          <div className="text-center">
            <b className="gray">Next Rebase</b>
            <br />
            <h4 className="black accentuate">
              {props.rebase === 0
                ? "..."
                : props.rebase.split("")[0] >= 0
                ? props.rebase
                : "Rebasing..."}
            </h4>
          </div>
        </Col>
      </Row>

      <Row>
        <Col className="tile d-flex align-items-center justify-content-center">
          <div className="text-center">
            <b className="gray">ETH Liquidity Value</b>
            <br />
            <h4 className="black">
              {formatNumber(0).format(metisLiquidity)} $ETH
            </h4>
          </div>
        </Col>
        <Col className="tile d-flex align-items-center justify-content-center">
          <div className="text-center">
            <b className="gray">Treasury Assets</b>
            <br />
            <h4 className="black">
              0 $ETH
              {/*{formatNumber(0).format(treasury)} $METIS*/}
            </h4>
          </div>
        </Col>
        <Col className="tile d-flex align-items-center justify-content-center">
          <div className="text-center">
            <b className="gray">RFV Market Value</b>
            <br />
            <h4 className="black">{formatNumber(0).format(RFV)} $ETH</h4>
          </div>
        </Col>
      </Row>
    </Container>
  );
}

export default Dashboard;
