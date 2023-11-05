import React, { useState, useEffect } from "react";
import axios from "axios";
import { Alert, Button } from "@mantine/core";
import { IoIosCreate } from "react-icons/io";
import { ImCancelCircle } from "react-icons/im";
import { AiOutlineUpload } from "react-icons/ai";
import { useMoralis, useWeb3Contract } from "react-moralis";
import { ethers } from "ethers";
import { PumpkinAddress } from "../constants/PumpkinAddress";
import ERC20_ABI from "../constants/ERC20_ABI";
import PUMPKIN_ABI from "../constants/PUMPKIN_ABI.json";
import { fadeInUp, routeAnimation, stagger } from "../utils/animations";
import { motion } from "framer-motion";

const COINGECKO_PRICE_FEED_URL =
  "https://api.coingecko.com/api/v3/simple/price?ids=aave,wrapped-fantom,dai,usd-coin,tether,binance-usd,wrapped-bitcoin,chainlink,true-usd,frax&vs_currencies=usd";

const USDCAddress = "0x73778d5569E3798360C0F557CeB549092759A029";
const WETHAddress = "0x31bF40f5642BCC6d41f28cccB2ADFB735722Bb30";
const WBTCAddress = "0x7FA0D30b30aF032bd1d8453603D7Df948021eA60";
const WFTMAddress = "0xeF35e201aaBEFe47Ff3e01c87ef6D35878588B0C";
const AAVEAddress = "0x415cE4e20bD34F9620a926db1B6a9ca08424FCdb";
const Modal = ({ modal, setModal }) => {
  const [coinPriceData, setCoinPriceData] = useState({});
  const [timestamp, setTimestamp] = useState(Date.now());
  const [approxTokenPrice, setApproxTokenPrice] = useState(0);
  const [dai, setDai] = useState(0);
  const [usdc, setUsdc] = useState(0);
  const [usdt, setUsdt] = useState(0);
  const [busd, setBusd] = useState(0);
  const [wbtc, setWbtc] = useState(0);
  const [link, setLink] = useState(0);
  const [wftm, setWftm] = useState(0);
  const [aave, setAave] = useState(0);
  const [tusd, setTusd] = useState(0);
  const [frax, setFrax] = useState(0);

  const [tokenAmount, setTokenAmount] = useState(1);
  const [underlyingTokens, setUnderlyingTokens] = useState([]);
  const [tokenRatios, setTokenRatios] = useState([]);
  const { runContractFunction } = useWeb3Contract();
  const [tokenAddress, setTokenAddress] = useState("");

  const calculateIndexTokenPrice = () => {
    const price =
      (dai / 100) * parseFloat(coinPriceData[tokenSymbolAddress.dai.id].usd) +
      (usdc / 100) * parseFloat(coinPriceData[tokenSymbolAddress.usdc.id].usd) +
      (usdt / 100) * parseFloat(coinPriceData[tokenSymbolAddress.usdt.id].usd) +
      (busd / 100) * parseFloat(coinPriceData[tokenSymbolAddress.busd.id].usd) +
      (wbtc / 100) * parseFloat(coinPriceData[tokenSymbolAddress.wbtc.id].usd) +
      (link / 100) * parseFloat(coinPriceData[tokenSymbolAddress.link.id].usd) +
      (wftm / 100) * parseFloat(coinPriceData[tokenSymbolAddress.wftm.id].usd) +
      (aave / 100) * parseFloat(coinPriceData[tokenSymbolAddress.aave.id].usd) +
      (tusd / 100) * parseFloat(coinPriceData[tokenSymbolAddress.tusd.id].usd) +
      (frax / 100) * parseFloat(coinPriceData[tokenSymbolAddress.frax.id].usd);

    setApproxTokenPrice(price);
  };
  const tokenSymbolAddress = {
    dai: {
      symbol: "dai",
      id: "dai",
    },
    usdc: {
      symbol: "usdc",
      id: "usd-coin",
    },
    usdt: {
      symbol: "usdt",
      id: "tether",
    },
    busd: {
      symbol: "busd",
      id: "binance-usd",
    },
    wbtc: {
      symbol: "wbtc",
      id: "wrapped-bitcoin",
    },
    link: {
      symbol: "link",
      id: "chainlink",
    },
    wftm: {
      symbol: "wftm",
      id: "wrapped-fantom",
    },
    aave: {
      symbol: "aave",
      id: "aave",
    },
    tusd: {
      symbol: "tusd",
      id: "true-usd",
    },
    frax: {
      symbol: "frax",
      id: "frax",
    },
  };

  function updateTokenState(element) {
    if (element.id == "dai") {
      setDai(element.value);
    }
    if (element.id == "usdc") {
      setUsdc(element.value);
    }
    if (element.id == "usdt") {
      setUsdt(element.value);
    }
    if (element.id == "busd") {
      setBusd(element.value);
    }
    if (element.id == "wbtc") {
      setWbtc(element.value);
    }
    if (element.id == "chain-link") {
      setLink(element.value);
    }
    if (element.id == "wftm") {
      setWftm(element.value);
    }
    if (element.id == "aave") {
      setAave(element.value);
    }
    if (element.id == "tusd") {
      setTusd(element.value);
    }
    if (element.id == "frax") {
      setFrax(element.value);
    }
  }
  async function getPriceFeedData() {
    try {
      const data = await axios.get(COINGECKO_PRICE_FEED_URL);
      setCoinPriceData(data.data);
      return true;
    } catch (err) {
      alert(err.message);
    }
  }
  async function handleChange(e) {
    if (Date.now() - timestamp > 5000 * 60) {
      console.log("Refreshing Price feeds after 5 minutes");
      getPriceFeedData();
      setTimestamp(Date.now());
    }
    let depends = document.querySelectorAll(".depend");
    updateTokenState(e.target);
    function c(current) {
      let input = current.value;
      let max = 100;
      let delta = max - parseInt(input);
      let sum = 0;
      let partial = 0;
      let siblings = [];

      // Sum of all siblings
      [].forEach.call(depends, function (depend) {
        if (current != depend) {
          siblings.push(depend); // Register as sibling
          sum += +depend.value;
        }
      });

      // Update all the siblings
      siblings.forEach(function (sibling, i) {
        let val = +sibling.value;
        let fraction = 0;

        // Calculate fraction
        if (sum <= 0) {
          fraction = 1 / (depends.length - 1);
        } else {
          fraction = val / sum;
        }

        // The last element will correct rounding errors
        if (i >= depends.length - 1) {
          val = max - partial;
        } else {
          val = Math.round(delta * fraction);
          partial += val;
        }

        // Check if total of all range is greater than max value
        let total = partial + parseInt(input);

        if (total > max) {
          let diff = total - max; // Calculate the difference
          val = val - diff; // Update the value
          partial = partial - diff;
        }

        s(sibling, val);
      });
    }

    function s(el, value) {
      let label = document.getElementById(el.id + "_percentage");

      label.innerHTML = value;
      el.value = value;
      updateTokenState(el);
    }

    s(e.target, e.target.value);
    c(e.target);
    calculateIndexTokenPrice();
  }
  useEffect(() => {
    try {
      axios.get(COINGECKO_PRICE_FEED_URL).then(res => {
        const data = res.data;
        setCoinPriceData(data);
      });
      console.log(coinPriceData);
    } catch (err) {
      alert(err.message);
    }
  }, []);

  const getUnderlyingTokens = async () => {
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
  const getUnderlyingTokenRatios = async () => {
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
        console.log(data);
        // do something
        // set the array with bignumber value directly, while using the percentage convert it in the if else
        data.map(item => {
          console.log(
            ethers.utils
              .parseUnits(
                parseFloat(
                  ethers.utils.formatEther(parseInt(item._hex).toString()) *
                    tokenAmount
                ).toString(),
                "ether"
              )
              .toString()
          );
          console.log(
            ethers.BigNumber.from(
              parseFloat(
                ethers.utils.formatEther(parseInt(item._hex).toString()) *
                  tokenAmount
              ).toString()
            )
          );
        });
        setTokenRatios(data);
      },
    });
  };
  /*ethers.utils
            .parseUnits(
              parseFloat(
                ethers.utils.formatEther(
                  parseInt(tokenRatios._hex).toString()
                ) * tokenAmount
              ).toString(),
              "ether"
            )
            .toString()
            */

  return (
    <>
      {modal && (
        <motion.div
          className="modal-container"
          variants={routeAnimation}
          initial="initial"
          animate="animate"
          exit="exit"
        >
          <div className="index-token--container">
            {/* ------------------Get Token Address ------------------*/}
            <fieldset>
              <legend>Rebalance</legend>
              <h3>🍱 Change portions of each asset</h3>
              <br />
              <div className="index-token">
                <div className="token-label--container">
                  <label className="token-name--label">Token Address - </label>
                </div>
                <div className="token-slider">
                  <input
                    required
                    type="text"
                    className="token-name"
                    id="token-name"
                    placeholder="0x..."
                    onChange={e => {
                      setTokenAddress(e.target.value);
                    }}
                  />
                </div>
                <Button
                  variant="light"
                  color="red"
                  onClick={e => {
                    getUnderlyingTokens();
                    getUnderlyingTokenRatios();
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
                    <AiOutlineUpload></AiOutlineUpload>
                    <span
                      style={{
                        marginRight: "10px",
                      }}
                    ></span>
                    Load
                  </span>
                </Button>
              </div>
            </fieldset>
            <fieldset>
              <legend>Index Composition</legend>
              <div>
                <h3> Tokens </h3> <br />
                {underlyingTokens.join("\r\n")}
              </div>
              <br />
              <div>
                <h3>Token Ratios</h3> <br />
                {tokenRatios.toString()}
              </div>
              <div></div>
              <br />
            </fieldset>
            <fieldset>
              <legend> Amounts </legend>
              <div>
                <div className="index-token">
                  <div className="token-label--container">
                    <label className="token-name--label">
                      Asset to Sell - ⬆️{" "}
                    </label>
                  </div>
                  <div className="token-slider">
                    <input
                      required
                      type="text"
                      className="token-count--address"
                      id="token-name"
                      placeholder="0x..."
                      onChange={e => {
                        // setTokenAddress(e.target.value);
                      }}
                    />
                  </div>
                </div>
              </div>
              <div>
                <div className="index-token">
                  <div className="token-label--container">
                    <label className="token-name--label">
                      Amount to sell -{" "}
                    </label>
                  </div>
                  <div className="token-slider">
                    <input
                      required
                      type="text"
                      className="token-count--address"
                      id="token-name"
                      placeholder="0"
                      onChange={e => {
                        // setTokenAddress(e.target.value);
                      }}
                    />
                  </div>
                </div>
              </div>
              <div>
                <div className="index-token">
                  <div className="token-label--container">
                    <label className="token-name--label">
                      Asset to buy - ⬇️
                    </label>
                  </div>
                  <div className="token-slider">
                    <input
                      required
                      type="text"
                      className="token-count--address"
                      id="token-name"
                      placeholder="0x..."
                      onChange={e => {
                        // setTokenAddress(e.target.value);
                      }}
                    />
                  </div>
                </div>
              </div>
              Integrated with SpookySwap{" "}
              <img
                src="https://styles.redditmedia.com/t5_49ct3d/styles/communityIcon_kwspuvye8at61.png"
                className="spookyswap_icon"
              />
              <br />
              <br />
            </fieldset>

            <fieldset>
              <legend> Actions </legend>
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
              </div>
              <span
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-evenly",
                }}
              >
                <Button variant="light" color="indigo">
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
                    Update Token
                  </span>
                </Button>

                <Button
                  variant="light"
                  color="red"
                  onClick={e => {
                    setModal(false);
                    setDai(0);
                    setUsdc(0);
                    setUsdt(0);
                    setBusd(0);
                    setWbtc(0);
                    setLink(0);
                    setWftm(0);
                    setAave(0);
                    setTusd(0);
                    setFrax(0);
                    setApproxTokenPrice(0);
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
        </motion.div>
      )}
    </>
  );
};

export default Modal;
