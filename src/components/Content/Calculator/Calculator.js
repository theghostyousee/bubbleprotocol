import React, { useState, useLayoutEffect } from "react";
import { Col, Container, Row } from "react-bootstrap";
import Slider from "@mui/material/Slider";
import "./Calculator.css";
import { APY, INTEREST_RATE, TOKEN_NAME } from "../../../Global/constants";
import { formatNumber } from "../../../Global/functions";

function Calculator(props) {
  const [aphrAmount, setAphrAmount] = useState(props.userAPHRBalance);

  const [pricePurchase, setPricePurchase] = useState(props.price);
  const [priceFuture, setPriceFuture] = useState(props.price);
  const [predictionPeriod, setPredictionPeriod] = useState(30);

  const [initInvest, setInitInvest] = useState(
    props.price * props.userAPHRBalance
  );
  const [wealth, setWealth] = useState(props.price * props.userAPHRBalance);
  const [rewards, setRewards] = useState(props.price * props.userAPHRBalance);
  const [returns, setReturns] = useState(props.price * props.userAPHRBalance);

  const updateInitInvestments = () => {
    setInitInvest(parseFloat(aphrAmount * props.price).toFixed(2));
    setWealth(parseFloat(aphrAmount * props.price).toFixed(2));
    let rew = parseFloat(
      Math.pow(1 + INTEREST_RATE, 48 * predictionPeriod) * aphrAmount -
        aphrAmount
    ).toFixed(2);
    setRewards(
      parseFloat(
        Math.pow(1 + INTEREST_RATE, 48 * predictionPeriod) * aphrAmount -
          aphrAmount
      ).toFixed(2)
    );
    setReturns(
      parseFloat(
        Math.max(rew * props.price, 0) + aphrAmount * props.price
      ).toFixed(2)
    );
  };

  const updateInvestments = () => {
    setInitInvest(parseFloat(aphrAmount * pricePurchase).toFixed(2));
    setWealth(parseFloat(aphrAmount * props.price).toFixed(2));
    setRewards(
      parseFloat(
        Math.pow(1 + INTEREST_RATE, 48 * predictionPeriod) * aphrAmount -
          aphrAmount
      ).toFixed(2)
    );
    setReturns(
      parseFloat(
        Math.max(rewards * priceFuture, 0) + aphrAmount * pricePurchase
      ).toFixed(2)
    );
  };

  const handleChange = (event, newValue) => {
    setPredictionPeriod(newValue);
    updateInvestments();
  };

  const handleInputChange = (evt) => {
    const id = evt.target.getAttribute("id");
    switch (id) {
      case "aphramount":
        const newAphrAmount = evt.target.validity.valid
          ? evt.target.value
          : aphrAmount;
        setAphrAmount(newAphrAmount);
        break;
      case "purchase":
        const newPurchase = evt.target.validity.valid
          ? evt.target.value
          : pricePurchase;
        setPricePurchase(newPurchase);
        break;
      case "future":
        const newFuture = evt.target.validity.valid
          ? evt.target.value
          : priceFuture;
        setPriceFuture(newFuture);
        break;
      default:
        break;
    }
    updateInvestments();
  };

  const handleMAX = () => {
    setAphrAmount(props.userAPHRBalance);
    updateInvestments();
  };

  const handleCurrentPurchase = () => {
    setPricePurchase(props.price);
    updateInvestments();
  };

  const handleCurrentFuture = () => {
    setPriceFuture(props.price);
    updateInvestments();
  };

  async function firstRender() {
    setAphrAmount(props.userAPHRBalance);
    setPricePurchase(props.price);
    setPriceFuture(props.price);
  }

  useLayoutEffect(() => {
    firstRender().then(() => {
      updateInitInvestments();
    });
    // eslint-disable-next-line
  }, [props.price, props.userAPHRBalance]);

  return (
    <Container className="mt-5" style={{ height: "75%", minHeight: "410px" }}>
      <div className="tile-nomargin pl-5 pr-5">
        <Row className="mb-4">
          <b className="pal-white">Calculator</b>
        </Row>
        <Row className="mb-4" style={{ marginLeft: -5, marginRight: -5 }}>
          <Col className="d-flex align-items-center justify-content-center">
            <div className="text-center">
              <span>
                <div>
                  <b className="pal-white">{TOKEN_NAME} Price</b>
                  <br />
                  <h4 className="main-pal-color" id="price">
                    ${props.price}
                  </h4>
                </div>
              </span>
            </div>
          </Col>
          <Col className="d-flex align-items-center justify-content-center">
            <div className="text-center">
              <span>
                <div>
                  <b className="pal-white">APY</b>
                  <br />
                  <h4 className="main-pal-color">{APY} %</h4>
                </div>
              </span>
            </div>
          </Col>
          <Col className="d-flex align-items-center justify-content-center">
            <div className="text-center">
              <span>
                <div>
                  <b className="pal-white">My {TOKEN_NAME} Balance</b>
                  <br />
                  <h4 className="main-pal-color">
                    {formatNumber(0).format(props.userAPHRBalance)} {TOKEN_NAME}
                  </h4>
                </div>
              </span>
            </div>
          </Col>
        </Row>
        <Row>
          <Col>
            <p>
              <b className="pal-white">{TOKEN_NAME} Amount</b>
            </p>
            <div className="input-group mb-3">
              <input
                type="number"
                step="any"
                className="form-control pal-input pl-3"
                onInput={handleInputChange.bind(this)}
                value={aphrAmount}
                id="aphramount"
                placeholder="0"
                aria-label="0"
                aria-describedby="basic-addon2"
              />
              <div className="input-group-append">
                <button
                  className="btn btn-outline-secondary pal-white pal-calc-button"
                  id="maxBtn"
                  onClick={() => handleMAX()}
                  type="button"
                >
                  <b>MAX</b>
                </button>
              </div>
            </div>
          </Col>
          <Col>
            <div className="mb-3">
              <p>
                <b className="pal-white">APY (%)</b>
              </p>
              <input
                type="number"
                set="any"
                className="form-control pal-input pl-3 pal-calc-button pal-white"
                onInput={handleInputChange.bind(this)}
                id="apy"
                placeholder={APY}
                aria-describedby="basic-addon2"
                disabled
              />
            </div>
          </Col>
        </Row>
        <Row className="mb-4">
          <Col>
            <p>
              <b className="pal-white">Price at purchase ($)</b>
            </p>
            <div className="input-group mb-3">
              <input
                type="number"
                step="any"
                className="form-control pal-input pl-3"
                onInput={handleInputChange.bind(this)}
                value={pricePurchase}
                id="purchase"
                placeholder="0.0000010089"
                aria-label="0.0000010089"
                aria-describedby="basic-addon2"
              />
              <div className="input-group-append">
                <button
                  className="btn btn-outline-secondary pal-white pal-calc-button"
                  type="button"
                  id="purchaseBtn"
                  onClick={() => handleCurrentPurchase()}
                >
                  <b>Current</b>
                </button>
              </div>
            </div>
          </Col>
          <Col>
            <p>
              <b className="pal-white">Future {TOKEN_NAME} price ($)</b>
            </p>
            <div className="input-group mb-3">
              <input
                type="number"
                step="any"
                className="form-control pal-input pl-3"
                onInput={handleInputChange.bind(this)}
                value={priceFuture}
                id="future"
                placeholder="0.000035289"
                aria-label="0.000035289"
                aria-describedby="basic-addon2"
              />
              <div className="input-group-append">
                <button
                  className="btn btn-outline-secondary pal-white pal-calc-button"
                  type="button"
                  id="futureBtn"
                  onClick={() => handleCurrentFuture()}
                >
                  <b>Current</b>
                </button>
              </div>
            </div>
          </Col>
        </Row>
        <Row className="mb-4">
          <Col xs={12} sm={12} lg={12}>
            <div className="w-100">
              <h5 className="black">{predictionPeriod} days</h5>
              <Slider
                color={"secondary"}
                min={0}
                max={365}
                sx={{
                  width: "100%",
                }}
                value={predictionPeriod}
                defaultValue={30}
                onChange={handleChange}
              />
            </div>
          </Col>
        </Row>
        <Row className="d-flex justify-content-between pal-white mb-3">
          <Col>Your initial investment</Col>
          <Col className="d-flex justify-content-end">${initInvest}</Col>
        </Row>
        <Row className="d-flex justify-content-between pal-white mb-3">
          <Col>Current wealth</Col>
          <Col className="d-flex justify-content-end">${wealth}</Col>
        </Row>
        <Row className="d-flex justify-content-between pal-white mb-3">
          <Col>{TOKEN_NAME} rewards estimation</Col>
          <Col className="d-flex justify-content-end">
            {rewards} {TOKEN_NAME}
          </Col>
        </Row>
        <Row className="d-flex justify-content-between pal-white mb-3">
          <Col>Potential return</Col>
          <Col className="d-flex justify-content-end">${returns}</Col>
        </Row>
      </div>
    </Container>
  );
}

export default Calculator;
