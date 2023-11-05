import React from "react";
import axios from "axios";
import { Alert, Button } from "@mantine/core";
import { IoIosCreate } from "react-icons/io";
import { ImCancelCircle } from "react-icons/im";
import { useMoralis, useWeb3Contract } from "react-moralis";
import { ethers } from "ethers";
import { fadeInUp, routeAnimation, stagger } from "../utils/animations";
import { motion } from "framer-motion";
import { useNotification } from "web3uikit";
import Link from "next/link";
import UtilityTokenABI from "../constants/UtitlityTokenMintABI.json";
import ERC20ABI from "../constants/ERC20_ABI.json";
const underlyingTokenFaucetAddress =
  "0x853Ec3E1976Dc7eA7B478d1c1dEB1974B319Fd3c";

const USDCAddress = "0x73778d5569E3798360C0F557CeB549092759A029";
const WETHAddress = "0x31bF40f5642BCC6d41f28cccB2ADFB735722Bb30";
const WBTCAddress = "0x7FA0D30b30aF032bd1d8453603D7Df948021eA60";
const WFTMAddress = "0xeF35e201aaBEFe47Ff3e01c87ef6D35878588B0C";
const AAVEAddress = "0x415cE4e20bD34F9620a926db1B6a9ca08424FCdb";
const MintUnderlying = () => {
  const dispatch = useNotification();
  const { runContractFunction } = useWeb3Contract();
  const { enableWeb3, authenticate, chainId, account, isWeb3Enabled } =
    useMoralis();

  const successNotification = msg => {
    dispatch({
      type: "success",
      message: `${msg} Successfully`,
      title: `${msg}`,
      position: "bottomR",
    });
  };
  const failureNotification = msg => {
    dispatch({
      type: "error",
      message: `${msg} ( View console for more info )`,
      title: `${msg}`,
      position: "bottomR",
    });
  };
  const mintUtilityTokens = async () => {
    const Web3 = await enableWeb3();
    runContractFunction({
      params: {
        abi: UtilityTokenABI,
        contractAddress: underlyingTokenFaucetAddress, // specify the networkId
        functionName: "mintAllTokens",
        params: {},
      },
      onError: error => {
        failureNotification(error.message);
        console.log(error);
      },
      onSuccess: data => {
        console.log(data);
        successNotification("Utility Tokens Minted");
      },
    });
  };
  return (
    <>
      <div className="bg-container">
        <div className="circle circle1"></div>
        <div className="circle circle2"></div>
        <div className="circle circle3"></div>
        <div className="circle circle4"></div>
      </div>
      <div className="index-token--container">
        <fieldset>
          <legend>Mint Utility Tokens</legend>
          <h3>✨ Mint Utility Tokens and use them to issue the index tokens</h3>
          <br />
          <h4>
            {" "}
            The utility token represents mock tokens for USDC, WETH, WBTC, WFTM,
            AAVE
          </h4>
        </fieldset>
        <fieldset>
          <legend>Utility Tokens</legend>
          <div
            className="index-token"
            style={{
              textAlign: "center",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              flexDirection: "column",
            }}
          >
            <div className="token-addresses">
              <span
                style={{
                  fontWeight: "bold",
                }}
              >
                Import the mock tokens from the contracts below
              </span>
              <br />
              <span>USDC - {USDCAddress}</span> <br />
              <span>WETH - {WETHAddress}</span> <br />
              <span>WTBC - {WBTCAddress}</span> <br />
              <span>WFTM - {WFTMAddress}</span> <br />
              <span>AAVE - {AAVEAddress}</span> <br />
            </div>
            <Button variant="light" color="indigo" onClick={mintUtilityTokens}>
              <span
                className="create-token--btn"
                style={{
                  fontSize: "1.5rem",
                  textDecoration: "none !important",
                  display: "flex",
                  alignItems: "center",
                }}
              >
                <IoIosCreate></IoIosCreate>
                <span
                  style={{
                    marginRight: "10px",
                  }}
                ></span>
                Mint Utility Tokens
              </span>
            </Button>
          </div>
        </fieldset>
      </div>
    </>
  );
};

export default MintUnderlying;
