import "./Footer.css";
import React from "react";
import {
  APP_NAME,
  AUDIT_LINK,
  DISCORD_LINK,
  GITBOOK_LINK,
  MEDIUM_LINK,
  TELEGRAM_LINK,
  TOKEN_NAME,
  TRADE_LINK,
  TWITTER_LINK,
} from "../../../Global/constants";

function Footer() {
  return (
    <div className="footer-dark">
      <footer>
        <div className="container">
          <div className="row">
            <div className="col-sm-6 col-md-3 item">
              <h3>Socials</h3>
              <ul>
                <li>
                  <a href={TELEGRAM_LINK} rel="noreferrer" target="_blank">
                    Telegram
                  </a>
                </li>
                <li>
                  <a href={TWITTER_LINK} rel="noreferrer" target="_blank">
                    Twitter
                  </a>
                </li>
              </ul>
            </div>
            <div className="col-sm-6 col-md-3 item">
              <h3>Products</h3>
              <ul>
                <li>
                  <a href="/">NFT (coming...)</a>
                </li>
                <li>
                  <a href="/">DAO (coming...)</a>
                </li>
              </ul>
            </div>
            <div className="col-sm-6 col-md-3 item">
              <button className="bn632-hover bn25">
                <a
                  href={TRADE_LINK}
                  rel="noreferrer"
                  target={"_blank"}
                  style={{ color: "#656565" }}
                >
                  Buy {TOKEN_NAME}
                </a>
              </button>
            </div>
          </div>
          <p className="copyright">{APP_NAME} © 2023</p>
        </div>
      </footer>
    </div>
  );
}

export default Footer;
