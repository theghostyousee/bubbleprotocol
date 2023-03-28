import React, { useEffect, useState } from "react";
import { Box, Flex } from "rebass";
import Header from "./Header/Header";
import { ethers } from "ethers";
import Content from "../Content/Content";
import Footer from "./Footer/Footer";
import SideBar from "./SideBar/SideBar";
import { isMobile } from "react-device-detect";
import {
  CHAIN_ID,
  CONTRACT_ABI,
  CONTRACT_ADDRESS,
  NETWORK_ID,
  NETWORK_INFOS,
} from "../../Global/constants";
import { millisToMinutesAndSeconds } from "../../Global/functions";

function Layout() {
  const [width, setWidth] = useState(window.innerWidth);

  const [rebase, setRebase] = useState("0");
  const [price, setPrice] = useState("0");
  const [selectedAddress, setSelectedAddress] = useState(undefined);
  const [userAPHRBalance, setUserAPHRBalance] = useState(0);
  const [currentChainId, setCurrentChainId] = useState(undefined);

  useEffect(() => {
    resizeWindow();
    window.addEventListener("resize", resizeWindow);
    return () => window.removeEventListener("resize", resizeWindow);
  }, []);

  useEffect(() => {
    if (window.ethereum) {
      window.ethereum.on("accountsChanged", (accounts) => {
        setSelectedAddress(accounts[0]);
        //Si l'utilisateur ne s'est pas déconnecté
        if (accounts[0] !== undefined) {
          setSelectedAddress(accounts[0]);
          checkBalance(accounts[0]);
        } else {
          setUserAPHRBalance(0);
        }
      });

      window.ethereum.on("chainChanged", (chainId) => {
        setCurrentChainId(chainId);
        if (chainId !== CHAIN_ID) {
          setUserAPHRBalance(0);
        }
      });
    }
  }, []);

  const resizeWindow = () => {
    setWidth(window.innerWidth);
  };

  const metamaskSwitchNetwork = async () => {
    if (window.ethereum) {
      const accounts = await window.ethereum.request({
        method: "eth_requestAccounts",
      });
      const chainId = await window.ethereum.request({
        method: "net_version",
      });
      setCurrentChainId(chainId);
      if (chainId === NETWORK_ID.toString()) {
        return {
          connected: true,
          status: null,
          account: accounts[0],
          chainId: chainId,
          contract: null,
        };
      } else {
        //there we switch chainId
        console.log("Switching to the Andromeda blockchain.");
        await window.ethereum.request(NETWORK_INFOS);
        const chainId = await window.ethereum.request({
          method: "net_version",
        });
        return {
          connected: true,
          status: null,
          account: accounts[0],
          chainId: chainId,
          contract: null,
        };
      }
    } else {
      console.log("You need metamask");
      return {
        connected: false,
        status: null,
        account: null,
        chainId: null,
        contract: null,
      };
    }
  };

  const checkBalance = async (addr) => {
    const networkId = await window.ethereum.request({
      method: "net_version",
    });

    const provider = new ethers.providers.Web3Provider(window.ethereum);

    if (networkId === NETWORK_ID.toString()) {
      const aphroditeContract = new ethers.Contract(
        CONTRACT_ADDRESS,
        CONTRACT_ABI,
        provider
      );

      if (addr !== undefined) {
        // Retrieve Wallet Balance in APHR
        const userAPHRbalance = await aphroditeContract.balanceOf(
          addr.toString()
        );
        let aphrAmount =
          parseInt(userAPHRbalance["_hex"], 16) / Math.pow(10, 18);
        setUserAPHRBalance(aphrAmount);
      }
    }
  };

  const initialize = (userAddress) => {
    setSelectedAddress(userAddress);
    checkBalance(userAddress);
  };

  async function connectWallet() {
    if (window.ethereum) {
      const userAddress = await window.ethereum.request({
        method: "eth_requestAccounts",
      });
      const networkId = await window.ethereum.request({
        method: "net_version",
      });
      const provider = new ethers.providers.Web3Provider(window.ethereum);

      console.log(
        "Connected as address: " + userAddress + "\nnetworkId: " + networkId
      );
      setSelectedAddress(userAddress);
      setCurrentChainId(networkId);
      if (networkId === NETWORK_ID.toString()) {
        if (selectedAddress === undefined) {
          initialize(userAddress);
        }
        const aphroditeContract = new ethers.Contract(
          CONTRACT_ADDRESS,
          CONTRACT_ABI,
          provider
        );

        // Retrieve Wallet Balance in $APHR
        const userAPHRbalance = await aphroditeContract.balanceOf(
          userAddress.toString()
        );
        let aphrAmount =
          parseInt(userAPHRbalance["_hex"], 16) / Math.pow(10, 18);
        setUserAPHRBalance(aphrAmount);
      } else {
        let logs = await metamaskSwitchNetwork();
        if (logs.connected) {
          console.log("Network successfully switched to Andromeda !");
          const provider = new ethers.providers.Web3Provider(window.ethereum);
          const aphroditeContract = new ethers.Contract(
            CONTRACT_ADDRESS,
            CONTRACT_ABI,
            provider
          );

          // Retrieve Wallet Balance in APHR
          const userAPHRbalance = await aphroditeContract.balanceOf(
            userAddress.toString()
          );
          let aphrAmount =
            parseInt(userAPHRbalance["_hex"], 16) / Math.pow(10, 18);
          setUserAPHRBalance(aphrAmount);
          setSelectedAddress(logs.account);
          setCurrentChainId(logs.chainId);
          setUserAPHRBalance(aphrAmount);
        }
      }
    } else {
      console.log("You need metamask");
    }
  }

  async function fetchRebase() {
    if (typeof window.ethereum !== "undefined") {
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const { chainId } = await provider.getNetwork();
      if (String(chainId) === String(NETWORK_ID)) {
        const contract = new ethers.Contract(
          CONTRACT_ADDRESS,
          CONTRACT_ABI,
          provider
        );

        try {
          //rebase
          setInterval(async function () {
            const nextRebase = await contract.nextRebase();
            const difftime = nextRebase.toNumber() * 1000 - Date.now();
            const displaytime = millisToMinutesAndSeconds(difftime);

            setRebase(displaytime);
          }, 1000);
        } catch (error) {
          console.error(error);
          setRebase("0");
        }
      }
    }
  }

  useEffect(() => {
    fetchRebase().then(() => console.log("Succesfully fetched Rebase"));
  }, []);

  async function fetchPrice() {
    const price = {};
    try {
      //Get price
      const priceCall = await fetch(
        "https://api.dexscreener.io/latest/dex/pairs/metis/0x79Ba0f03517e81264ABA7031316a8c66Fe68c6fd"
      );
      let res = await priceCall.json();
      price.float = parseFloat(res.pair.priceUsd).toFixed(4); // Convert to float, 4 decimals
      price.string = price.float.toString(); // Convert to string
      setPrice(price.string);
    } catch (error) {
      console.error(error);
      setPrice("0");
    }
  }

  useEffect(() => {
    fetchPrice().then(console.log("Succesfully fetched price"));
  }, []);

  return (
    <Flex
      sx={{
        flexDirection: "column",
        minHeight: "100vh",
      }}
    >
      <Box>
        <Header
          connectWallet={connectWallet}
          selectedAddress={selectedAddress}
          currentChainId={currentChainId}
          userAPHRBalance={userAPHRBalance}
          width={width}
        />
      </Box>
      <Flex
        sx={{
          flex: 1,
          flexDirection: ["column", "row"],
        }}
      >
        <Box
          sx={{
            flex: 1,
            minWidth: 0,
          }}
        >
          <Content
            userAPHRBalance={userAPHRBalance}
            rebase={rebase}
            price={price}
          />
        </Box>
        {isMobile || width < 640 ? (
          <Box />
        ) : (
          <Box
            sx={{
              flexBasis: ["auto", 200],
              order: -1,
            }}
          >
            <SideBar />
          </Box>
        )}
      </Flex>
      <Box>
        <Footer />
      </Box>
    </Flex>
  );
}

export default Layout;
