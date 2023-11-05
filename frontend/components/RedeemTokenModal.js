import React, { useState, useEffect } from "react";
import axios from "axios";
import { Alert, Button } from "@mantine/core";
import { IoIosCreate } from "react-icons/io";
import { ImCancelCircle } from "react-icons/im";
import { useMoralis, useWeb3Contract } from "react-moralis";
import PUMPKIN_ABI from "../constants/PUMPKIN_ABI";
import ERC_ABI from "../constants/ERC20_ABI.json";
import { PumpkinAddress } from "../constants/PumpkinAddress";
import { ethers } from "ethers";
import { fadeInUp, routeAnimation, stagger } from "../utils/animations";
import { motion } from "framer-motion";
import { useNotification } from "web3uikit";
const RedeemTokenModal = ({ redeemTokenModal, setRedeemTokenModal }) => {
  const { runContractFunction } = useWeb3Contract();
  const dispatch = useNotification();
  const [tokenAddress, setTokenAddress] = useState("");
  const [tokenRedeemAmount, setTokenRedeemAmount] = useState(0);
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
  const redeemToken = async () => {
    runContractFunction({
      params: {
        abi: PUMPKIN_ABI,
        contractAddress: PumpkinAddress, // specify the networkId
        functionName: "redeemToken",
        params: {
          _tokenAddress: tokenAddress,
          amount: ethers.utils.parseUnits(
            tokenRedeemAmount.toString(),
            "ether"
          ),
        },
      },
      onError: error => {
        failureNotification(error.message);
        console.log(error);
      },
      onSuccess: data => {
        successNotification("Tokens Redeemed");
        console.log(data);
      },
    });
  };
  return (
    <>
      {redeemTokenModal && (
        <motion.div
          variants={routeAnimation}
          initial="initial"
          animate="animate"
          exit="exit"
          className="modal-container"
        >
          <div className="index-token--container">
            <fieldset>
              <legend>Redeem</legend>
              <h3>🔥 Burn index tokens and receive the underlying assets</h3>
              <br />
            </fieldset>

            {/* ------------------Get Token Address ------------------*/}
            <fieldset>
              <legend>Token Info</legend>

              <div className="index-token">
                <div className="token-label--container">
                  <label className="token-name--label">Token Address - </label>
                </div>
                <div className="token-slider">
                  <input
                    required
                    type="text"
                    className="token-count--address"
                    id="token-name"
                    placeholder="0x..."
                    onChange={e => {
                      setTokenAddress(e.target.value);
                    }}
                  />
                </div>
              </div>
              <div className="index-token">
                <div className="token-label--container">
                  <label className="token-name--label">
                    Amount to be redeemed -{" "}
                  </label>
                </div>
                <div className="token-slider">
                  <input
                    required
                    type="number"
                    className="token-name"
                    id="token-name"
                    placeholder="1"
                    onChange={e => {
                      setTokenRedeemAmount(+e.target.value);
                    }}
                  />
                </div>
              </div>

              <br />
              <span
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-evenly",
                }}
              >
                <Button variant="light" color="indigo" onClick={redeemToken}>
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
                    Submit
                  </span>
                </Button>

                <Button
                  variant="light"
                  color="red"
                  onClick={e => {
                    setRedeemTokenModal(false);
                  }}
                >
                  <span
                    className="create-token--btn"
                    style={{
                      fontSize: "1.5rem",
                      textDecoration: "none !important",
                      display: "flex",
                      alignItems: "center",
                    }}
                  >
                    <ImCancelCircle></ImCancelCircle>
                    <span
                      style={{
                        marginRight: "10px",
                      }}
                    ></span>
                    Cancel
                  </span>
                </Button>
              </span>
              <br />
              <br />
            </fieldset>
          </div>
          {/* {ethers.utils.parseUnits(tokenAmount.toString(), "ether").toString()} */}
        </motion.div>
      )}
    </>
  );
};

export default RedeemTokenModal;
