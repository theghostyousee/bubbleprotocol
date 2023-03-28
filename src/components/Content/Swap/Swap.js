import React from "react";
import { Container } from "react-bootstrap";
import "./Swap.css";

function Swap() {
  return (
    <Container className="d-flex justify-content-center">
      {/* <iframe
        id="swap"
        className="embedded_swap"
        src="https://app.sushi.com/swap?inputCurrency=0x49D5c2BdFfac6CE2BFdB6640F4F80f226bc10bAB&outputCurrency=0x539bdE0d7Dbd336b79148AA742883198BBF60342&chainId=43114"
        width="500"
        height="780"
        frameBorder="0"
        style={{ border: 0, margin: "50px 0px" }}
        allowFullScreen=""
        aria-hidden="false"
        tabIndex="0"
        title={"Sushi Swap"}
      ></iframe> */}
    </Container>
  );
}

export default Swap;
