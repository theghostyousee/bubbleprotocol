import React, { useState } from "react";
import { Col, Container, Row } from "react-bootstrap";
import "../Calculator/Calculator.css";
import { APY, NETWORK_ID, WEI } from "../../../Global/constants";
import { ethers } from "ethers";
import { formatNumber } from "../../../Global/functions";

function Presale() {
  const PRESALE_CONTRACT_ADDRESS = "0x053d73705B78211FC3955c19f3cD086a48E21350";
  const PRESALE_CONTRACT_ABI =
    '[{"type":"constructor","stateMutability":"nonpayable","inputs":[]},{"type":"function","stateMutability":"view","outputs":[{"type":"bool","name":"","internalType":"bool"}],"name":"IsWhitelisted","inputs":[{"type":"address","name":"_whitelistedAddress","internalType":"address"}]},{"type":"function","stateMutability":"nonpayable","outputs":[],"name":"addMultipleAddresses","inputs":[{"type":"address[]","name":"addAddressList","internalType":"address[]"}]},{"type":"function","stateMutability":"nonpayable","outputs":[],"name":"addwhitelistAddress","inputs":[{"type":"address","name":"_address","internalType":"address"}]},{"type":"function","stateMutability":"nonpayable","outputs":[],"name":"emergency_withdraw","inputs":[]},{"type":"function","stateMutability":"view","outputs":[{"type":"uint256","name":"","internalType":"uint256"}],"name":"getAddressCurrentPayments","inputs":[{"type":"address","name":"_address","internalType":"address"}]},{"type":"function","stateMutability":"view","outputs":[{"type":"uint256","name":"","internalType":"uint256"}],"name":"getCurrentBalance","inputs":[]},{"type":"function","stateMutability":"view","outputs":[{"type":"address","name":"","internalType":"address"}],"name":"getOwner","inputs":[]},{"type":"function","stateMutability":"view","outputs":[{"type":"uint256","name":"","internalType":"uint256"}],"name":"getTotalFund","inputs":[]},{"type":"function","stateMutability":"view","outputs":[{"type":"uint256","name":"","internalType":"uint256"}],"name":"getWhitelistAllocation","inputs":[]},{"type":"function","stateMutability":"view","outputs":[{"type":"uint256","name":"","internalType":"uint256"}],"name":"getWhitelistCount","inputs":[]},{"type":"function","stateMutability":"payable","outputs":[],"name":"payWL","inputs":[]},{"type":"function","stateMutability":"nonpayable","outputs":[],"name":"removeWhitelistAddress","inputs":[{"type":"address","name":"_address","internalType":"address"}]},{"type":"function","stateMutability":"nonpayable","outputs":[],"name":"setwhitelistAllocation","inputs":[{"type":"uint256","name":"_whitelistAllocation","internalType":"uint256"}]},{"type":"function","stateMutability":"nonpayable","outputs":[],"name":"withdraw","inputs":[]}]';

  const [depositedAmount, setDepositedAmount] = useState(0);
  const [isWhitelisted, setIsWhitelisted] = useState(false);
  const [metisAmountToSend, setMetisAmountToSend] = useState(0);
  const [userAddress, setUserAddress] = useState(null);
  const [maxMetisAllocation, setMaxMetisAllocation] = useState(0);

  async function fetchUserInfo() {
    if (typeof window.ethereum !== "undefined") {
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const { chainId } = await provider.getNetwork();
      if (String(chainId) === String(NETWORK_ID)) {
        const presaleContract = new ethers.Contract(
          PRESALE_CONTRACT_ADDRESS,
          PRESALE_CONTRACT_ABI,
          provider
        );

        try {
          // Retrieve User's address
          let userAddressRequest = await window.ethereum.request({
            method: "eth_requestAccounts",
          });
          setUserAddress(userAddressRequest.toString());

          // Retrieve Whitelist
          const whitelist = await presaleContract.IsWhitelisted(userAddress);
          setIsWhitelisted(whitelist);

          // Retrieve Deposited Amount
          const amount = await presaleContract.getAddressCurrentPayments(
            userAddress
          );
          setDepositedAmount(parseFloat(amount) * WEI);

          // Retrieve Max Allocation Amount
          const allocationAmount =
            await presaleContract.getWhitelistAllocation();
          setMaxMetisAllocation(parseFloat(allocationAmount) * WEI);
        } catch (error) {}
      }
    }
  }

  fetchUserInfo();

  const handleMAX = () => {
    if (isWhitelisted) {
      setMetisAmountToSend(
        formatNumber(4).format(maxMetisAllocation - depositedAmount)
      );
    }
  };

  async function sendPresale() {
    if (typeof window.ethereum !== "undefined") {
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner();

      const { chainId } = await provider.getNetwork();
      if (String(chainId) === String(NETWORK_ID)) {
        const presaleContractWithSigner = new ethers.Contract(
          PRESALE_CONTRACT_ADDRESS,
          PRESALE_CONTRACT_ABI,
          signer
        );

        try {
          const pay = await presaleContractWithSigner.payWL({
            value: ethers.utils.parseEther(metisAmountToSend.toString()),
          });
          console.log(pay);
        } catch (error) {
          alert(error.data.message);
        }
      }
    }
  }

  const handleInputChange = (evt) => {
    let newMetisAmountToSend = 0;
    if (isWhitelisted) {
      if (evt.target.validity.valid) {
        if (evt.target.value > maxMetisAllocation) {
          newMetisAmountToSend = maxMetisAllocation;
        } else {
          newMetisAmountToSend = evt.target.value;
        }
      }
    }
    setMetisAmountToSend(newMetisAmountToSend);
  };

  return (
    <Container className="mt-5" style={{ height: "75%", minHeight: "410px" }}>
      <div className="tile-nomargin pl-5 pr-5">
        <Row className="mb-4">
          <b className="pal-white">Presale</b>
        </Row>
        <Row className="mb-4" style={{ marginLeft: -5, marginRight: -5 }}>
          <Col className="d-flex align-items-center justify-content-center">
            <div className="text-center">
              <span>
                <div>
                  <b className="pal-white">Whilelisted</b>
                  <br />
                  <h4 className="main-pal-color" id="price">
                    {isWhitelisted ? "Yes" : "No"}
                  </h4>
                </div>
              </span>
            </div>
          </Col>
          <Col className="d-flex align-items-center justify-content-center">
            <div className="text-center">
              <span>
                <div>
                  <b className="pal-white">Max allocation</b>
                  <br />
                  <h4 className="main-pal-color" id="price">
                    {isWhitelisted
                      ? formatNumber(4).format(maxMetisAllocation)
                      : 0}{" "}
                    $METIS
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
                  <h4 className="main-pal-color">{APY}%</h4>
                </div>
              </span>
            </div>
          </Col>
        </Row>
        <Row>
          <Col>
            <p>
              <b className="pal-white">$METIS Amount</b>
            </p>
            <div className="input-group mb-3">
              <input
                type="number"
                step="any"
                className="form-control pal-input pl-3"
                onInput={handleInputChange.bind(this)}
                value={metisAmountToSend}
                id="metisamount"
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
                  style={{ marginRight: "10vw" }}
                >
                  <b>MAX</b>
                </button>
              </div>
              <button
                className="bn632-hover bn25"
                onClick={() => sendPresale()}
              >
                Send Presale
              </button>
            </div>
          </Col>
        </Row>
        <Row className="d-flex justify-content-between pal-white mb-3">
          <Col>Deposited amount</Col>
          <Col className="d-flex justify-content-end">
            {formatNumber(4).format(depositedAmount)} $METIS
          </Col>
        </Row>
      </div>
    </Container>
  );
}

export default Presale;
