# Deployed URL : [LIVE WEBSITE](https://pumpkin-protocol-fantom.vercel.app)

# 🎃Pumpkin Index 🎃

## What is an index token?

##### ❓ An index token is like a basket that holds many different types of cryptocurrencies at once, allowing investors to invest in several cryptocurrencies through one token.

## Inspiration

##### 👻 Fantom network currently does not have any Index Tokens.

##### 🧟 We took inspiration from [TokenSets / Set Protocol](https://www.tokensets.com/) and recreated it without any fees.

## What it does

##### 🎃 Lets users create & manage their own index tokens

##### 🧙 Redeem index tokens for underlying assets

##### 🧛‍♂️ Creators can collect a custom streaming fee from 0 to 1% per year

##### 🍬 Others can buy these tokens on a decentralized exchange

##### 🔪 Adjust/rebalance each portion of underlying tokens in an index token

## How we built it

##### 🕯️ Wrote the solidity smart contract from the ground up

##### ✨ Integrated [SpookySwap](https://spooky.fi/#/) for token rebalancing

##### 🧪 Tested by forking Fantom Mainnet using Hardhat

## What's next for Pumpkin Index

##### 🍂Gas optimization

##### 🐺 Security Auditing

# Try the website on fantom testnet
#### 1. Mint Test Tokens
1. Click "Utility Faucet" to mint test erc20's to interact with pumpkin. <br/>
2. Click the 'Mint Utility Tokens' button to start the transaction. 1000 USDC, WETH, WBTC, WFTM, and AAVE will be sent to your wallet.
#### 2. Try Creating a Token
1. Enter the token name, its symbol, and adjust the sliders according to how you want each asset to be portioned. <br/>
2. Click "Create Token" to create the Index Token's contract.
#### 3. Take a look at your contracts
1. If you are not redirected already, you should be on the "view-tokens" page. If not, you can click "My Tokens". You should see your newly created tokens there, if not try giving your browser a refresh.
#### 4. Try Issuing Tokens
1. Copy your index token contract address, <br/>
2. Click the "Issue Tokens" button to issue new Index Tokens. <br/>
3. Paste the contract address, and then an amount, try around 100 tokens or so <br/>
4. Click "Approve Tokens" to approve all the ERC20's that make up your index token. Accept all transactions (will be 1-5 transactions) <br/>
5. If sucessfully approved, you should be able to click the "Mint Tokens" button to issue new tokens.
#### 5. Try Claiming Streaming Fee
1. Issue an index token on two or more different addresses <br/>
2. Click the "Claim Fee" Button.  <br/>
3. Paste the index token address into the field <br/>
4. Click the "Claim Fee" button to confirm taking the streaming fee. There should be 1% tokens burned from all wallets and 1% minted to the creator's address.
#### 6. Try Redeeming Tokens
1. Click "Redeem Tokens" <br/>
2. Paste the address of the index token you want to redeem in the field. <br/>
3. Enter the amount of tokens you want to burn <br/>
4. Press submit, you should see index tokens being burned, and underlying tokens being sent to you.
#### 7. Rebalancing
since this design is designed for the Fantom mainnet, it will not work on testnet so we have disabled this button.


