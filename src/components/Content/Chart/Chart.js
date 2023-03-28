import React from "react";
import { Container } from "react-bootstrap";
import "./Chart.css";

function Chart() {
  return (
    <Container className="chart-container mt-4">
      <div id="dexscreener-embed">
        <iframe
          src="https://dexscreener.com/arbitrum/?embed=1&theme=dark"
          className="w-100 h-100 chart-iframe"
          title="dexscreener"
        ></iframe>
      </div>
    </Container>
  );
}

export default Chart;
