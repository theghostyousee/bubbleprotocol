import React from "react";
import { Row, Col, Container } from "react-bootstrap";
import "../../MainLayout/Tiles/Tiles.css";
import {
  APY,
  INTEREST_RATE,
  REWARD_YIELD,
  TOKEN_NAME,
} from "../../../Global/constants";
import { formatNumber } from "../../../Global/functions";

function Account(props) {
  return (
    <Container
      className="mt-5"
      style={{ height: "75%", minHeight: "410px", paddingTop: "20px" }}
    >
      <Row className="tile" style={{ marginLeft: -5, marginRight: -5 }}>
        <Col className="d-flex align-items-center justify-content-center">
          <div className="text-center">
            <span>
              <b className="gray">{TOKEN_NAME} Balance</b>
              <br />
              <h4 className="black">
                {formatNumber(0).format(props.userAPHRBalance)} ($
                {formatNumber(2).format(props.userAPHRBalance * props.price)})
              </h4>
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
      </Row>
      <Row>
        <Col className="tile d-flex align-items-center justify-content-center">
          <div className="text-center">
            <b className="gray">Current APY</b>
            <br />
            <h4 className="black">{APY}%</h4>
          </div>
        </Col>
        <Col className="tile d-flex align-items-center justify-content-center">
          <div className="text-center">
            <b className="gray">Next Rebase</b>
            <br />
            <h4 className="black">
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
            <b className="gray">Next Reward Yield</b>
            <br />
            <h4 className="black">{REWARD_YIELD}%</h4>
          </div>
        </Col>
        <Col className="tile d-flex align-items-center justify-content-center">
          <div className="text-center">
            <b className="gray">Next Reward Value</b>
            <br />
            <h4 className="black">
              {formatNumber(2).format(INTEREST_RATE * props.userAPHRBalance)} ($
              {formatNumber(2).format(
                INTEREST_RATE * props.userAPHRBalance * props.price
              )}
              )
            </h4>
          </div>
        </Col>
        <Col className="tile d-flex align-items-center justify-content-center">
          <div className="text-center">
            <b className="gray">Your Earnings/5 Days</b>
            <br />
            <h4 className="black">
              {formatNumber(2).format(
                Math.pow(1 + INTEREST_RATE, 48 * 5) * props.userAPHRBalance -
                  props.userAPHRBalance
              )}{" "}
              ($
              {formatNumber(2).format(
                Math.pow(1 + INTEREST_RATE, 48 * 5) *
                  props.userAPHRBalance *
                  props.price -
                  props.userAPHRBalance * props.price
              )}
              )
            </h4>
          </div>
        </Col>
      </Row>
    </Container>
  );
}

export default Account;
