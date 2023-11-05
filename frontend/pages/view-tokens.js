import React, { useState, useEffect } from "react";
import { Button } from "@mantine/core";
import { GiTakeMyMoney } from "react-icons/gi";
import { MdCreate } from "react-icons/md";
import { IoIosCreate } from "react-icons/io";
import { BiPieChartAlt2 } from "react-icons/bi";
import { BiTrophy } from "react-icons/bi";
import Head from "next/head";
import Modal from "../components/Modal";
import TokenCountModal from "../components/TokenCountModal";
import PUMPKIN_ABI from "../constants/PUMPKIN_ABI";
import ERC_ABI from "../constants/ERC20_ABI.json";
import { useMoralis, useWeb3Contract } from "react-moralis";
import { PumpkinAddress } from "../constants/PumpkinAddress";
import { useNotification } from "web3uikit";
import RedeemTokenModal from "../components/RedeemTokenModal";
import FeeClaimModal from "../components/FeeClaimModal";
import { motion } from "framer-motion";
import { fadeInUp, routeAnimation, stagger } from "../utils/animations";
const ViewTokens = () => {
  const dispatch = useNotification();
  const { runContractFunction } = useWeb3Contract();
  const {
    enableWeb3,
    authenticate,
    chainId,
    account,
    isWeb3Enabled,
    isWeb3EnableLoading,
    Moralis,
  } = useMoralis();
  const [modal, setModal] = useState(false);
  const [tokenCountModal, setTokenCountModal] = useState(false);
  const [redeemTokenModal, setRedeemTokenModal] = useState(false);
  const [feeClaimModal, setFeeClaimModal] = useState(false);

  const [tokens, setTokens] = useState([]);
  const [tokenNames, setTokenNames] = useState([]);
  const [tokenSymbols, setTokenSymbols] = useState([]);

  const successNotification = msg => {
    dispatch({
      type: "success",
      message: `${msg} Successfully.
      \n
      (Come Back in a while for newly created tokens)`,
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
  async function getNames() {
    runContractFunction({
      params: {
        abi: PUMPKIN_ABI,
        contractAddress: PumpkinAddress,
        functionName: "getAllNames",
        params: {
          _creator: account,
        },
      },
      onError: error => console.log(error),
      onSuccess: data => {
        setTokenNames(data);
      },
    });
  }

  async function getSymbols() {
    runContractFunction({
      params: {
        abi: PUMPKIN_ABI,
        contractAddress: PumpkinAddress,
        functionName: "getAllSymbols",
        params: {
          _creator: account,
        },
      },
      onError: error => console.log(error),
      onSuccess: data => {
        setTokenSymbols(data);
      },
    });
  }
  const getUserIndexTokens = async function () {
    await enableWeb3();
    // console.log(account);
    if (account) {
      runContractFunction({
        params: {
          abi: PUMPKIN_ABI,
          contractAddress: PumpkinAddress,
          functionName: "getAllTokenAddresses",
          params: {
            _creator: account,
          },
        },
        //
        onError: error => {
          failureNotification(error.message);
          console.log(error);
        },
        onSuccess: data => {
          console.log(data);
          setTokens(data);

          successNotification(`Tokens Fetched`);
          getNames();
          getSymbols();
        },
      });
    }
  };

  useEffect(() => {
    getUserIndexTokens();
  }, [account]);

  return (
    <>
      <Head>
        <title>View Tokens</title>
      </Head>
      <Modal setModal={setModal} modal={modal}></Modal>
      <TokenCountModal
        setTokenCountModal={setTokenCountModal}
        tokenCountModal={tokenCountModal}
      ></TokenCountModal>

      <RedeemTokenModal
        redeemTokenModal={redeemTokenModal}
        setRedeemTokenModal={setRedeemTokenModal}
      ></RedeemTokenModal>

      <FeeClaimModal
        feeClaimModal={feeClaimModal}
        setFeeClaimModal={setFeeClaimModal}
      ></FeeClaimModal>
      <div className="bg-container">
        <div className="circle circle1"></div>
        <div className="circle circle2"></div>
        <div className="circle circle3"></div>
        <div className="circle circle4"></div>
      </div>
      {/* TODO create a update token quantity modal */}
      <motion.div
        variants={fadeInUp}
        initial="initial"
        animate="animate"
        className="view-token--container"
      >
        {/* {account} */}

        {tokens.map(
          (item, index) =>
            !modal && (
              <motion.div
                variants={fadeInUp}
                key={index}
                className="new__content"
              >
                <img src={"/images/ftm-logo.png"} alt="" className="new__img" />
                <h3 className="new__title">{`${tokenNames[index]} - ${tokenSymbols[index]}`}</h3>
                {/* <span className="new__subtitle">Accessory</span> */}

                <div className="new__prices">
                  <span
                    className="new__subtitle index-token--address"
                    title="Copy To Clipboard"
                    onClick={e => {
                      navigator.clipboard.writeText(e.target.innerHTML);
                      successNotification(`Copied To Clipboard`);
                    }}
                  >
                    {item}
                  </span>
                </div>
                <br />
                <div className="view-token--buttons">
                  <Button variant="light" color="indigo">
                    <span
                      className="edit-btn--container"
                      style={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "space-evenly",
                      }}
                      onClick={e => {
                        setRedeemTokenModal(true);
                      }}
                    >
                      <span
                        style={{
                          fontSize: "20px",
                        }}
                      >
                        <GiTakeMyMoney></GiTakeMyMoney>
                      </span>
                      Redeem Tokens
                    </span>
                  </Button>

                  <Button
                    color="green"
                    onClick={e => {
                      setTokenCountModal(true);
                    }}
                  >
                    <span
                      className="edit-btn--container"
                      style={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "space-evenly",
                      }}
                    >
                      <span
                        style={{
                          fontSize: "20px",
                          color: "#fff",
                        }}
                      >
                        <IoIosCreate></IoIosCreate>
                      </span>
                      Issue Tokens
                    </span>
                  </Button>

                  <Button
                    color="indigo"
                    onClick={e => {
                      setModal(true);
                    }}
                  >
                    <span
                      className="edit-btn--container"
                      style={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "space-evenly",
                      }}
                    >
                      <span
                        style={{
                          fontSize: "20px",
                          color: "#fff",
                          width: "90%",
                        }}
                      >
                        <BiPieChartAlt2></BiPieChartAlt2>
                      </span>
                      Rebalance Tokens
                    </span>
                  </Button>

                  <Button
                    color="indigo"
                    onClick={e => {
                      setFeeClaimModal(true);
                    }}
                  >
                    <br />
                    <br />
                    <span
                      className="edit-btn--container"
                      style={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "space-evenly",
                      }}
                    >
                      <span
                        style={{
                          fontSize: "20px",
                          color: "#fff",
                          width: "90%",
                        }}
                      >
                        <BiTrophy></BiTrophy>
                      </span>
                      Claim Fee
                    </span>
                  </Button>
                </div>
              </motion.div>
            )
        )}
      </motion.div>
    </>
  );
};

export default ViewTokens;
