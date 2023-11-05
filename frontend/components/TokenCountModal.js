import React, { useEffect, useState } from "react";
import { Button } from "@mantine/core";
import { MdCreate } from "react-icons/md";
import { ImCancelCircle } from "react-icons/im";
import { IoIosCreate } from "react-icons/io";
import { useMoralis, useWeb3Contract } from "react-moralis";
import { ethers } from "ethers";
import { PumpkinAddress } from "../constants/PumpkinAddress";
import ERC20_ABI from "../constants/ERC20_ABI";
import PUMPKIN_ABI from "../constants/PUMPKIN_ABI.json";
import { fadeInUp, routeAnimation, stagger } from "../utils/animations";
import { motion } from "framer-motion";
import { useNotification } from "web3uikit";
const TokenCountModal = ({ tokenCountModal, setTokenCountModal }) => {
  const dispatch = useNotification();
  const [tokenAddress, setTokenAddress] = useState("");
  const [tokenAmount, setTokenAmount] = useState(1);
  const [underlyingTokens, setUnderlyingTokens] = useState([]);
  const [tokenRatios, setTokenRatios] = useState([]);
  const { runContractFunction } = useWeb3Contract();
  const { enableWeb3 } = useMoralis();
  const USDCAddress = "0x73778d5569E3798360C0F557CeB549092759A029";
  const WETHAddress = "0x31bF40f5642BCC6d41f28cccB2ADFB735722Bb30";
  const WBTCAddress = "0x7FA0D30b30aF032bd1d8453603D7Df948021eA60";
  const WFTMAddress = "0xeF35e201aaBEFe47Ff3e01c87ef6D35878588B0C";
  const AAVEAddress = "0x415cE4e20bD34F9620a926db1B6a9ca08424FCdb";

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
  const contractFunctionIssueToken = async () => {
    const Web3 = await enableWeb3();
    runContractFunction({
      params: {
        abi: PUMPKIN_ABI,
        contractAddress: PumpkinAddress, // specify the networkId
        functionName: "issueToken",
        params: {
          _tokenAddress: tokenAddress,
          amount: ethers.utils.parseEther(tokenAmount.toString()),
        },
      },
      onError: error => {
        failureNotification(error.message);
        console.log(error);
      },
      onSuccess: data => {
        console.log(data);
        successNotification("Token Issued!");
      },
    });
  };
  const getUnderlyingTokens = () => {
    runContractFunction({
      params: {
        abi: PUMPKIN_ABI,
        contractAddress: PumpkinAddress, // specify the networkId
        functionName: "getAllUnderlying",
        params: {
          _indexAddress: tokenAddress,
        },
      },
      onError: error => console.log(error),
      onSuccess: data => {
        console.log(data); //heRe
        setUnderlyingTokens(data);
      },
    });
  };
  const getUnderlyingTokenRatios = () => {
    runContractFunction({
      params: {
        abi: PUMPKIN_ABI,
        contractAddress: PumpkinAddress, // specify the networkId
        functionName: "getAllPercentages",
        params: {
          _indexAddress: tokenAddress,
        },
      },
      onError: error => console.log(error),
      onSuccess: data => {
        setTokenRatios(data);
        console.log(data);
      },
    });
  };
  const approveTokens = async () => {
    try {
      await window.ethereum.enable();
      await getUnderlyingTokenRatios();
      await getUnderlyingTokens();

      const provider = new ethers.providers.Web3Provider(
        window.ethereum,
        "any"
      );
      await provider.send("eth_requestAccounts", []);
      const signer = provider.getSigner();

      const WETH = new ethers.Contract(WETHAddress, ERC20_ABI, provider);
      const USDC = new ethers.Contract(USDCAddress, ERC20_ABI, provider);
      const WBTC = new ethers.Contract(WBTCAddress, ERC20_ABI, provider);
      const WFTM = new ethers.Contract(WFTMAddress, ERC20_ABI, provider);
      const AAVE = new ethers.Contract(AAVEAddress, ERC20_ABI, provider);
      const tokenArrayLength = tokenRatios.length;
      console.log(tokenArrayLength);
      if (tokenArrayLength >= 1 && underlyingTokens[0] == USDCAddress) {
        const USDCWithSigner = USDC.connect(signer);
        await USDCWithSigner.approve(
          tokenAddress,
          ethers.utils
            .parseUnits(
              parseFloat(
                ethers.utils.formatEther(
                  parseInt(tokenRatios[0]._hex).toString()
                ) * tokenAmount
              ).toString(),
              "ether"
            )
            .toString()
        );
      }
      if (tokenArrayLength >= 2 && underlyingTokens[1] == USDCAddress) {
        const USDCWithSigner = USDC.connect(signer);
        await USDCWithSigner.approve(
          tokenAddress,
          ethers.utils
            .parseUnits(
              parseFloat(
                ethers.utils.formatEther(
                  parseInt(tokenRatios[1]._hex).toString()
                ) * tokenAmount
              ).toString(),
              "ether"
            )
            .toString()
        );
      }
      if (tokenArrayLength >= 3 && underlyingTokens[2] == USDCAddress) {
        const USDCWithSigner = USDC.connect(signer);
        await USDCWithSigner.approve(
          tokenAddress,
          ethers.utils
            .parseUnits(
              parseFloat(
                ethers.utils.formatEther(
                  parseInt(tokenRatios[2]._hex).toString()
                ) * tokenAmount
              ).toString(),
              "ether"
            )
            .toString()
        );
      }
      if (tokenArrayLength >= 4 && underlyingTokens[3] == USDCAddress) {
        const USDCWithSigner = USDC.connect(signer);
        await USDCWithSigner.approve(
          tokenAddress,
          ethers.utils
            .parseUnits(
              parseFloat(
                ethers.utils.formatEther(
                  parseInt(tokenRatios[3]._hex).toString()
                ) * tokenAmount
              ).toString(),
              "ether"
            )
            .toString()
        );
      }
      if (tokenArrayLength >= 5 && underlyingTokens[4] == USDCAddress) {
        const USDCWithSigner = USDC.connect(signer);
        await USDCWithSigner.approve(
          tokenAddress,
          ethers.utils
            .parseUnits(
              parseFloat(
                ethers.utils.formatEther(
                  parseInt(tokenRatios[4]._hex).toString()
                ) * tokenAmount
              ).toString(),
              "ether"
            )
            .toString()
        );
      }

      if (tokenArrayLength >= 1 && underlyingTokens[0] == WETHAddress) {
        const WETHWithSigner = WETH.connect(signer);
        await WETHWithSigner.approve(
          tokenAddress,
          ethers.utils
            .parseUnits(
              parseFloat(
                ethers.utils.formatEther(
                  parseInt(tokenRatios[0]._hex).toString()
                ) * tokenAmount
              ).toString(),
              "ether"
            )
            .toString()
        );
      }
      if (tokenArrayLength >= 2 && underlyingTokens[1] == WETHAddress) {
        const WETHWithSigner = WETH.connect(signer);
        await WETHWithSigner.approve(
          tokenAddress,
          ethers.utils
            .parseUnits(
              parseFloat(
                ethers.utils.formatEther(
                  parseInt(tokenRatios[1]._hex).toString()
                ) * tokenAmount
              ).toString(),
              "ether"
            )
            .toString()
        );
      }
      if (tokenArrayLength >= 3 && underlyingTokens[2] == WETHAddress) {
        const WETHWithSigner = WETH.connect(signer);
        await WETHWithSigner.approve(
          tokenAddress,
          ethers.utils
            .parseUnits(
              parseFloat(
                ethers.utils.formatEther(
                  parseInt(tokenRatios[2]._hex).toString()
                ) * tokenAmount
              ).toString(),
              "ether"
            )
            .toString()
        );
      }
      if (tokenArrayLength >= 4 && underlyingTokens[3] == WETHAddress) {
        const WETHWithSigner = WETH.connect(signer);
        await WETHWithSigner.approve(
          tokenAddress,
          ethers.utils
            .parseUnits(
              parseFloat(
                ethers.utils.formatEther(
                  parseInt(tokenRatios[3]._hex).toString()
                ) * tokenAmount
              ).toString(),
              "ether"
            )
            .toString()
        );
      }
      if (tokenArrayLength >= 5 && underlyingTokens[4] == WETHAddress) {
        const WETHWithSigner = WETH.connect(signer);
        await WETHWithSigner.approve(
          tokenAddress,
          ethers.utils
            .parseUnits(
              parseFloat(
                ethers.utils.formatEther(
                  parseInt(tokenRatios[4]._hex).toString()
                ) * tokenAmount
              ).toString(),
              "ether"
            )
            .toString()
        );
      }

      if (tokenArrayLength >= 1 && underlyingTokens[0] == WBTCAddress) {
        const WBTCWithSigner = WBTC.connect(signer);
        await WBTCWithSigner.approve(
          tokenAddress,
          ethers.utils
            .parseUnits(
              parseFloat(
                ethers.utils.formatEther(
                  parseInt(tokenRatios[0]._hex).toString()
                ) * tokenAmount
              ).toString(),
              "ether"
            )
            .toString()
        );
      }
      if (tokenArrayLength >= 2 && underlyingTokens[1] == WBTCAddress) {
        const WBTCWithSigner = WBTC.connect(signer);
        await WBTCWithSigner.approve(
          tokenAddress,
          ethers.utils
            .parseUnits(
              parseFloat(
                ethers.utils.formatEther(
                  parseInt(tokenRatios[1]._hex).toString()
                ) * tokenAmount
              ).toString(),
              "ether"
            )
            .toString()
        );
      }
      if (tokenArrayLength >= 3 && underlyingTokens[2] == WBTCAddress) {
        const WBTCWithSigner = WBTC.connect(signer);
        await WBTCWithSigner.approve(
          tokenAddress,
          ethers.utils
            .parseUnits(
              parseFloat(
                ethers.utils.formatEther(
                  parseInt(tokenRatios[2]._hex).toString()
                ) * tokenAmount
              ).toString(),
              "ether"
            )
            .toString()
        );
      }
      if (tokenArrayLength >= 4 && underlyingTokens[3] == WBTCAddress) {
        const WBTCWithSigner = WBTC.connect(signer);
        await WBTCWithSigner.approve(
          tokenAddress,
          ethers.utils
            .parseUnits(
              parseFloat(
                ethers.utils.formatEther(
                  parseInt(tokenRatios[3]._hex).toString()
                ) * tokenAmount
              ).toString(),
              "ether"
            )
            .toString()
        );
      }
      if (tokenArrayLength >= 5 && underlyingTokens[4] == WBTCAddress) {
        const WBTCWithSigner = WBTC.connect(signer);
        await WBTCWithSigner.approve(
          tokenAddress,
          ethers.utils
            .parseUnits(
              parseFloat(
                ethers.utils.formatEther(
                  parseInt(tokenRatios[4]._hex).toString()
                ) * tokenAmount
              ).toString(),
              "ether"
            )
            .toString()
        );
      }

      if (tokenArrayLength >= 1 && underlyingTokens[0] == WFTMAddress) {
        const WFTMWithSigner = WFTM.connect(signer);
        await WFTMWithSigner.approve(
          tokenAddress,
          ethers.utils
            .parseUnits(
              parseFloat(
                ethers.utils.formatEther(
                  parseInt(tokenRatios[0]._hex).toString()
                ) * tokenAmount
              ).toString(),
              "ether"
            )
            .toString()
        );
      }
      if (tokenArrayLength >= 2 && underlyingTokens[1] == WFTMAddress) {
        const WFTMWithSigner = WFTM.connect(signer);
        await WFTMWithSigner.approve(
          tokenAddress,
          ethers.utils
            .parseUnits(
              parseFloat(
                ethers.utils.formatEther(
                  parseInt(tokenRatios[1]._hex).toString()
                ) * tokenAmount
              ).toString(),
              "ether"
            )
            .toString()
        );
      }
      if (tokenArrayLength >= 3 && underlyingTokens[2] == WFTMAddress) {
        const WFTMWithSigner = WFTM.connect(signer);
        await WFTMWithSigner.approve(
          tokenAddress,
          ethers.utils
            .parseUnits(
              parseFloat(
                ethers.utils.formatEther(
                  parseInt(tokenRatios[2]._hex).toString()
                ) * tokenAmount
              ).toString(),
              "ether"
            )
            .toString()
        );
      }
      if (tokenArrayLength >= 4 && underlyingTokens[3] == WFTMAddress) {
        const WFTMWithSigner = WFTM.connect(signer);
        await WFTMWithSigner.approve(
          tokenAddress,
          ethers.utils
            .parseUnits(
              parseFloat(
                ethers.utils.formatEther(
                  parseInt(tokenRatios[3]._hex).toString()
                ) * tokenAmount
              ).toString(),
              "ether"
            )
            .toString()
        );
      }
      if (tokenArrayLength >= 5 && underlyingTokens[4] == WFTMAddress) {
        const WFTMWithSigner = WFTM.connect(signer);
        await WFTMWithSigner.approve(
          tokenAddress,
          ethers.utils
            .parseUnits(
              parseFloat(
                ethers.utils.formatEther(
                  parseInt(tokenRatios[4]._hex).toString()
                ) * tokenAmount
              ).toString(),
              "ether"
            )
            .toString()
        );
      }

      if (tokenArrayLength >= 1 && underlyingTokens[0] == AAVEAddress) {
        const AAVEWithSigner = AAVE.connect(signer);
        await AAVEWithSigner.approve(
          tokenAddress,
          ethers.utils
            .parseUnits(
              parseFloat(
                ethers.utils.formatEther(
                  parseInt(tokenRatios[0]._hex).toString()
                ) * tokenAmount
              ).toString(),
              "ether"
            )
            .toString()
        );
      }
      if (tokenArrayLength >= 2 && underlyingTokens[1] == AAVEAddress) {
        const AAVEWithSigner = AAVE.connect(signer);
        await AAVEWithSigner.approve(
          tokenAddress,
          ethers.utils
            .parseUnits(
              parseFloat(
                ethers.utils.formatEther(
                  parseInt(tokenRatios[1]._hex).toString()
                ) * tokenAmount
              ).toString(),
              "ether"
            )
            .toString()
        );
      }
      if (tokenArrayLength >= 3 && underlyingTokens[2] == AAVEAddress) {
        const AAVEWithSigner = AAVE.connect(signer);
        await AAVEWithSigner.approve(
          tokenAddress,
          ethers.utils
            .parseUnits(
              parseFloat(
                ethers.utils.formatEther(
                  parseInt(tokenRatios[2]._hex).toString()
                ) * tokenAmount
              ).toString(),
              "ether"
            )
            .toString()
        );
      }
      if (tokenArrayLength >= 4 && underlyingTokens[3] == AAVEAddress) {
        const AAVEWithSigner = AAVE.connect(signer);
        await AAVEWithSigner.approve(
          tokenAddress,
          ethers.utils
            .parseUnits(
              parseFloat(
                ethers.utils.formatEther(
                  parseInt(tokenRatios[3]._hex).toString()
                ) * tokenAmount
              ).toString(),
              "ether"
            )
            .toString()
        );
      }
      if (tokenArrayLength >= 5 && underlyingTokens[4] == AAVEAddress) {
        const AAVEWithSigner = AAVE.connect(signer);
        await AAVEWithSigner.approve(
          tokenAddress,
          ethers.utils
            .parseUnits(
              parseFloat(
                ethers.utils.formatEther(
                  parseInt(tokenRatios[4]._hex).toString()
                ) * tokenAmount
              ).toString(),
              "ether"
            )
            .toString()
        );
      }
    } catch (err) {
      //   window.alert(err);
      failureNotification(err.message);
    }
  };

  return (
    <>
      {tokenCountModal && (
        <motion.div
          className="modal-container"
          variants={routeAnimation}
          initial="initial"
          animate="animate"
          exit="exit"
        >
          <div className="index-token--container">
            <fieldset>
              <legend>Issue</legend>

              <h3>📒 Mint new index tokens</h3>
              <br />
              <h4>
                <u>
                  {" "}
                  NOTE : Mint the utility tokens at /mint-underlying for the
                  issue token to work
                </u>
              </h4>
              <br />
              <h4>1. Approve all tokens for transfer</h4>
              <h4>2. Mint index tokens!</h4>
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
                  <label className="token-name--label">Token Amount - </label>
                </div>
                <div className="token-slider">
                  <input
                    required
                    type="number"
                    className="token-name"
                    id="token-name"
                    placeholder="Amount in ETH"
                    onChange={e => {
                      setTokenAmount(e.target.value);
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
                  flexWrap: "wrap",
                }}
              >
                <Button variant="light" color="indigo" onClick={approveTokens}>
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
                    Approve Tokens
                  </span>
                </Button>
                <br />
                <Button color="indigo" onClick={contractFunctionIssueToken}>
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
                    Mint Tokens
                  </span>
                </Button>
                <br />

                <Button
                  variant="light"
                  color="red"
                  onClick={e => {
                    setTokenCountModal(false);
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

export default TokenCountModal;
