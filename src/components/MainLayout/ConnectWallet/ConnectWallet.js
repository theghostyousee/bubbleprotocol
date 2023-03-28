import React from "react";
import "./ConnectWallet.scss";
import { CHAIN_ID, NETWORK_ID } from "../../../Global/constants";

export function ConnectWallet({
  connectWallet,
  selectedAddress,
  currentChainId,
}) {
  return (
    <div>
      {selectedAddress === undefined || selectedAddress.length === 0 ? (
        <button className="bn632-hover bn25" onClick={() => connectWallet()}>
          Connect Wallet
        </button>
      ) : currentChainId === NETWORK_ID.toString() ||
        currentChainId === CHAIN_ID.toString() ? (
        <button className="bn632-hover bn25" onClick={() => connectWallet()}>
          {`${selectedAddress.toString().substring(0, 6)}...${selectedAddress
            .toString()
            .substring(39)}`}
        </button>
      ) : (
        <button className="bn632-hover bn25" onClick={() => connectWallet()}>
          Switch Network
        </button>
      )}
    </div>
  );
}

export default ConnectWallet;
