import React from "react";
import { Col, Container } from "react-bootstrap";

function Nothing() {
  return (
    <Container
      className="mt-5"
      style={{ height: "75%", minHeight: "410px", paddingTop: "20px" }}
    >
      <Col className="tile d-flex align-items-center justify-content-center">
        <div className="text-center">
          <p>
            <p>
              <h4 className="black accentuate">Nothing to see here!</h4>
            </p>
          </p>
        </div>
      </Col>
    </Container>
  );
}

export default Nothing;
