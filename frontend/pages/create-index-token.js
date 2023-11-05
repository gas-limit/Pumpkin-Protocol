import React, { useEffect, useState } from "react";
import axios from "axios";
import { Alert, Button } from "@mantine/core";
import { IoIosCreate } from "react-icons/io";
import { ethers } from "ethers";
import ERC20_ABI from "../constants/ERC20_ABI";
import PUMPKIN_ABI from "../constants/PUMPKIN_ABI";
import { useMoralis, useWeb3Contract } from "react-moralis";
import { PumpkinAddress } from "../constants/PumpkinAddress";
import { useNotification } from "web3uikit";
import { useRouter } from "next/router";

const COINGECKO_PRICE_FEED_URL =
  "https://api.coingecko.com/api/v3/simple/price?ids=weth,aave,wrapped-fantom,dai,usd-coin,tether,binance-usd,wrapped-bitcoin,chainlink,true-usd,frax&vs_currencies=usd";

const CreateIndexToken = () => {
  const router = useRouter();
  const dispatch = useNotification();
  const { runContractFunction } = useWeb3Contract();
  const { enableWeb3, authenticate, chainId, account, isWeb3Enabled } =
    useMoralis();
  const [coinPriceData, setCoinPriceData] = useState({});
  const [timestamp, setTimestamp] = useState(Date.now());
  //   const [approxTokenPrice, setApproxTokenPrice] = useState(0);

  const [usdc, setUsdc] = useState(20);
  const [wbtc, setWbtc] = useState(20);
  const [weth, setWeth] = useState(20);
  const [wftm, setWftm] = useState(20);
  const [aave, setAave] = useState(20);

  const [tokenName, setTokenName] = useState("");
  const [tokenSymbol, setTokenSymbol] = useState("");

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
  const checkTokenRatio = () => {
    const sum = usdc + weth + wbtc + wftm + aave;
    console.log(sum);
    if (sum != 100) {
      window.alert("Token ratios should total upto 100 %", "Ratio is:", sum);
      return false;
    }
    return true;
  };

  // WEB3
  const createTokenWeb3 = async () => {
    await enableWeb3();
    await authenticate();
    const utilityTokenAddress = [];
    const utilityTokenRatios = [];
    if (!checkTokenRatio()) return;
    if (weth > 0) {
      utilityTokenAddress.push(WETHAddress);
      utilityTokenRatios.push(weth);
    }
    if (usdc > 0) {
      utilityTokenAddress.push(USDCAddress);
      utilityTokenRatios.push(usdc);
    }
    if (aave > 0) {
      utilityTokenAddress.push(AAVEAddress);
      utilityTokenRatios.push(aave);
    }
    if (wbtc > 0) {
      utilityTokenAddress.push(WBTCAddress);
      utilityTokenRatios.push(wbtc);
    }
    if (wftm > 0) {
      utilityTokenAddress.push(WFTMAddress);
      utilityTokenRatios.push(wftm);
    }
    if (tokenName.length == 0 || tokenSymbol.length == 0) {
      window.alert("Token Name and Symbol cannot be empty");
      return;
    }

    runContractFunction({
      params: {
        abi: PUMPKIN_ABI,
        contractAddress: PumpkinAddress, // specify the networkId
        functionName: "createToken",
        params: {
          _tokens: utilityTokenAddress,
          _percentages: utilityTokenRatios,
          _name: tokenName,
          _symbol: tokenSymbol,
        },
      },
      onError: error => {
        failureNotification(error.message);
        console.log(error);
      },
      onSuccess: data => {
        console.log(data);
        successNotification(`Index Token Created`);
        router.push("/view-tokens");
      },
    });
  };

  const calculateIndexTokenPrice = () => {
    const price =
      (usdc / 100) *
        parseFloat(coinPriceData[tokenSymbolAddress.usdc.id]?.usd) +
      (wbtc / 100) *
        parseFloat(coinPriceData[tokenSymbolAddress.wbtc.id]?.usd) +
      (weth / 100) *
        parseFloat(coinPriceData[tokenSymbolAddress.weth.id]?.usd) +
      (wftm / 100) *
        parseFloat(coinPriceData[tokenSymbolAddress.wftm.id]?.usd) +
      (aave / 100) * parseFloat(coinPriceData[tokenSymbolAddress.aave.id]?.usd);
    // console.log(price);

    return price;
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
    weth: {
      symbol: "weth",
      id: "weth",
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
    if (element.id == "usdc") {
      setUsdc(+element.value);
    }
    if (element.id == "wbtc") {
      setWbtc(+element.value);
    }
    if (element.id == "weth") {
      setWeth(+element.value);
    }
    if (element.id == "wftm") {
      setWftm(+element.value);
    }
    if (element.id == "aave") {
      setAave(+element.value);
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
      await getPriceFeedData();
      setTimestamp(Date.now());
    }

    let depends = document.querySelectorAll(".depend");
    updateTokenState(e.target);
    async function c(current) {
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
      siblings.forEach(async function (sibling, i) {
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

    async function s(el, value) {
      let label = document.getElementById(el.id + "_percentage");
      label.innerHTML = value;
      el.value = value;
      updateTokenState(el);
    }

    await s(e.target, e.target.value);
    await c(e.target);
  }
  useEffect(() => {
    try {
      axios.get(COINGECKO_PRICE_FEED_URL).then(res => {
        const data = res.data;
        setCoinPriceData(data);
      });
      //   console.log(coinPriceData);
    } catch (err) {
      alert(err.message);
    }
  }, []);

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
          <legend>Create an Index Token</legend>
          <h3>
            ✨ Create your own index token. Define its name, the symbol, and
            percentages of each asset.
          </h3>
          <br />
        </fieldset>
        <fieldset>
          <legend>Token Info</legend>
          <div className="index-token">
            <div className="token-label--container">
              <label className="token-name--label">Token Name - </label>
            </div>
            <div className="token-slider">
              <input
                required
                type="text"
                className="token-name"
                id="token-name"
                placeholder="Awesome Index"
                onChange={e => {
                  setTokenName(e.target.value);
                }}
              />
            </div>
          </div>
          <div className="index-token">
            <div className="token-label--container">
              <label className="token-name--label">Token Symbol - </label>
            </div>
            <div className="token-slider">
              <input
                required
                type="text"
                className="token-symbol"
                id="token-name"
                placeholder="AWSM"
                onChange={e => {
                  setTokenSymbol(e.target.value);
                }}
              />
            </div>
          </div>
        </fieldset>
        <fieldset>
          <legend>Index Token Percentage</legend>

          {/* USDC */}
          <div className="underlying-token">
            <div className="token-label--container">
              <label className="token-label">
                <img
                  src="https://seeklogo.com/images/U/usd-coin-usdc-logo-CB4C5B1C51-seeklogo.com.png"
                  className="crypto_icon"
                />
                USDC
              </label>
            </div>
            <div className="token-slider">
              <input
                required
                type="range"
                className="depend"
                min="0"
                max="100"
                value={usdc}
                step="1"
                onChange={handleChange}
                id="usdc"
              />
              <label id="usdc_percentage">{usdc}</label>%
            </div>
          </div>
          <br />
          {/* WBTC */}
          <div className="underlying-token">
            <div className="token-label--container">
              <label className="token-label">
                {" "}
                <img
                  src="https://cryptologos.cc/logos/wrapped-bitcoin-wbtc-logo.png"
                  className="crypto_icon"
                />
                WBTC
              </label>
            </div>
            <div className="token-slider">
              <input
                required
                type="range"
                className="depend"
                min="0"
                max="100"
                value={wbtc}
                step="1"
                onChange={handleChange}
                id="wbtc"
              />
              <label id="wbtc_percentage">{wbtc}</label>%
            </div>
          </div>
          <br />
          {/* WETH */}
          <div className="underlying-token">
            <div className="token-label--container">
              <label className="token-label">
                {" "}
                <img
                  src="https://www.pngall.com/wp-content/uploads/10/Ethereum-Logo-PNG.png"
                  className="crypto_icon"
                />
                WETH
              </label>
            </div>
            <div className="token-slider">
              <input
                required
                type="range"
                className="depend"
                min="0"
                max="100"
                value={weth}
                step="1"
                onChange={handleChange}
                id="weth"
              />
              <label id="weth_percentage">{weth}</label>%
            </div>
          </div>
          <br />
          {/* WFTM */}
          <div className="underlying-token">
            <div className="token-label--container">
              <label className="token-label">
                {" "}
                <img
                  src="https://cryptologos.cc/logos/fantom-ftm-logo.png"
                  className="crypto_icon"
                />
                WFTM
              </label>
            </div>
            <div className="token-slider">
              <input
                required
                type="range"
                className="depend"
                min="0"
                max="100"
                value={wftm}
                step="1"
                onChange={handleChange}
                id="wftm"
              />
              <label id="wftm_percentage">{wftm}</label>%
            </div>
          </div>
          <br />
          {/* AAVE */}
          <div className="underlying-token">
            <div className="token-label--container">
              <label className="token-label">
                {" "}
                <img
                  src="https://cryptologos.cc/logos/aave-aave-logo.png"
                  className="crypto_icon"
                />
                AAVE
              </label>
            </div>
            <div className="token-slider">
              <input
                required
                type="range"
                className="depend"
                min="0"
                max="100"
                value={aave}
                step="1"
                onChange={handleChange}
                id="aave"
              />
              <label id="aave_percentage">{aave}</label>%
            </div>
          </div>
          <br />

          <br />
        </fieldset>

        <fieldset>
          <legend>Token Action</legend>

          <div className="approx-token-price--container">
            <div className="underlying-token--price">
              <div className="token-label--container">
                <label className="token-label">
                  {" "}
                  <img
                    src="https://seeklogo.com/images/U/usd-coin-usdc-logo-CB4C5B1C51-seeklogo.com.png"
                    className="crypto_icon"
                  />
                </label>
                USDC <span className="approx-symbol">~</span>
              </div>
              <span className="token-ratio--price">
                $
                {(
                  (usdc / 100) *
                  parseFloat(coinPriceData[tokenSymbolAddress.usdc.id]?.usd)
                ).toFixed(2)}
              </span>
            </div>
            <div className="underlying-token--price">
              <div className="token-label--container">
                <label className="token-label">
                  {" "}
                  <img
                    src="https://cryptologos.cc/logos/wrapped-bitcoin-wbtc-logo.png"
                    className="crypto_icon"
                  />
                </label>
                WBTC <span className="approx-symbol">~</span>
              </div>
              <span className="token-ratio--price">
                $
                {(
                  (wbtc / 100) *
                  parseFloat(coinPriceData[tokenSymbolAddress.wbtc.id]?.usd)
                ).toFixed(2)}
              </span>
            </div>
            <div className="underlying-token--price">
              <div className="token-label--container">
                <label className="token-label">
                  {" "}
                  <img
                    src="https://www.pngall.com/wp-content/uploads/10/Ethereum-Logo-PNG.png"
                    className="crypto_icon"
                  />
                </label>
                WETH <span className="approx-symbol">~</span>
              </div>
              <span className="token-ratio--price">
                $
                {(
                  (weth / 100) *
                  parseFloat(coinPriceData[tokenSymbolAddress.weth.id]?.usd)
                ).toFixed(2)}
              </span>
            </div>
            <div className="underlying-token--price">
              <div className="token-label--container">
                <label className="token-label">
                  {" "}
                  <img
                    src="https://cryptologos.cc/logos/fantom-ftm-logo.png"
                    className="crypto_icon"
                  />
                </label>
                WFTM <span className="approx-symbol">~</span>
              </div>
              <span className="token-ratio--price">
                $
                {(
                  (wftm / 100) *
                  parseFloat(coinPriceData[tokenSymbolAddress.wftm.id]?.usd)
                ).toFixed(2)}
              </span>
            </div>
            <div className="underlying-token--price">
              <div className="token-label--container">
                <label className="token-label">
                  {" "}
                  <img
                    src="https://cryptologos.cc/logos/aave-aave-logo.png"
                    className="crypto_icon"
                  />
                </label>
                AAVE <span className="approx-symbol">~</span>
              </div>
              <span className="token-ratio--price">
                $
                {(
                  (aave / 100) *
                  parseFloat(coinPriceData[tokenSymbolAddress.aave.id]?.usd)
                ).toFixed(2)}
              </span>
            </div>
            <br />
            Approx Value in USD ~{" "}
            <span>${calculateIndexTokenPrice().toFixed(2)}</span>
            <br />
            <Button variant="light" color="indigo" onClick={createTokenWeb3}>
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
                Create Token
              </span>
            </Button>
            <br />
          </div>
          <br />
        </fieldset>
      </div>
    </>
  );
};

export default CreateIndexToken;
