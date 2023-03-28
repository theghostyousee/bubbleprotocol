import ConnectWallet from "../ConnectWallet/ConnectWallet";
import React from "react";
import "./Header.css";
import Menu from "../Menu/Menu";
import { isMobile } from "react-device-detect";
import { TOKEN_NAME } from "../../../Global/constants";
import { formatNumber } from "../../../Global/functions";

function Header(props) {
  return (
    <div className="header">
      <div className="header__price">
        {TOKEN_NAME} Balance: {formatNumber(0).format(props.userAPHRBalance)}
      </div>
      <ConnectWallet
        connectWallet={props.connectWallet}
        selectedAddress={props.selectedAddress}
        currentChainId={props.currentChainId}
      />
      {isMobile || props.width < 640 ? <Menu /> : <></>}
    </div>
  );
}

export default Header;
