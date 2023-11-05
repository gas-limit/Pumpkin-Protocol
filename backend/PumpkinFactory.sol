// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "./IndexTokenNew.sol";

contract PumpkinFactory {

    mapping(address => mapping(uint => address)) public addressToTokens;
    mapping(address => uint) tokenCount;

    //STATE CHANGES

    function createToken(address[] memory _tokens, uint[] memory  _percentages, string memory _name, string memory _symbol) public {

        //create new index token
        IndexTokenNew newToken = new IndexTokenNew(msg.sender, _tokens, _percentages, _name, _symbol);
        ++tokenCount[msg.sender];
        //map msg.sender's tokenCounter to new token to msg.sender
        addressToTokens[msg.sender][tokenCount[msg.sender]] = address(newToken);   
    }

    /// @notice mint/issue tokens in existing Index Token
    /// @param _tokenAddress = address of Index Token
    /// @param amount = amount of tokens to issue
    function issueToken(address _tokenAddress, uint amount) public {
        IndexTokenNew(_tokenAddress).mint(amount);
    }

    /// @notice redeem token, burn index token, receive underlying assets
    /// @param _tokenAddress = address of Index Token
    /// @param amount = amount of Index Token to burn
    function redeemToken(address _tokenAddress, uint amount) public {
        IndexTokenNew(_tokenAddress).redeem(amount);
    }

    /// @notice rebalance, maybe give index of underlying asset to sell,receieve, and amount of token sold
    /// @param _tokenAddress = address of index token
    /// @param _underlyingSell = index of index token's underlying assets array to sell
    /// @param _underlyingBuy = index of index token's underlying assets array to buy
    /// @param _amtToSell = amount of underlying token to sell
    function rebalance(address _tokenAddress, uint _underlyingSell, uint _underlyingBuy, uint _amtToSell) public {
        IndexTokenNew(_tokenAddress).rebalance(_underlyingSell, _underlyingBuy, _amtToSell);
    }

    /// @notice sends 1% of all index tokens to token creator
    /// @param _indexAddress = index token to withdraw from, requires msg.sender is owner
    function collectFee(address _indexAddress) public {
        IndexTokenNew(_indexAddress).streamingFee();
    }

    //GETTERS

    /// @notice returns the amount of index tokens a user has created
    /// @param _creator = address of user
    function getAmountOfIndexTokens(address _creator) public view returns (uint) {
        return tokenCount[_creator];
    }

    /// @notice return array of tokens per address
    /// @param _creator = address of user
    function getAllTokenAddresses(address _creator) public view returns (address[] memory) {
        uint numTokens = tokenCount[_creator];
        address[] memory tokenAddresses = new address[](numTokens); 
        for(uint i = 0; i < numTokens; i++ ) {
            tokenAddresses[i] = addressToTokens[_creator][i+1];  
        }
        return tokenAddresses;
    }

    /// @notice Same as above, but returns address of a single index token by entering owner address, and index of the token
    /// @param  _creator = address of user
    /// @param  index = index of user's created Index token
    function getSingleTokenAddress(address _creator, uint index) public view returns (address) {
        return addressToTokens[_creator][index];
    }

    /// @notice get array of all underlying assets of an index token
    /// @param _indexAddress = address of index token
    function getAllUnderlying(address _indexAddress) public view returns (address[] memory) {
        return IndexTokenNew(_indexAddress).getTokens();
    }

    /// @notice Same as above, but returns address of a single underlying token of a index token
    /// @param _indexAddress = address of index token
    /// @param underlyingIndex = index of Index token's array of underlying assets
    function getSingleUnderlying(address _indexAddress, uint underlyingIndex) public view returns (address) {
        return IndexTokenNew(_indexAddress).getSingleToken(underlyingIndex);
    }

    /// @notice get array of all percentages for a token
    /// @param _indexAddress = address of index token
    function getAllPercentages(address _indexAddress) public view returns (uint[] memory) {
        return IndexTokenNew(_indexAddress).getAllPercentages();
    }

    /// @notice same as above, but get percentage for a specific underlying asset
    /// @param _indexAddress = address of index token
    /// @param underlyingIndex = index of index token's underlying assets array
    function getSinglePercentage(address _indexAddress, uint underlyingIndex) public view returns (uint) {
        return IndexTokenNew(_indexAddress).getSinglePercentage(underlyingIndex);
    }

    /// @notice return array of all token balances in an index
    /// @param _indexAddress = address of index token
    function getAllAmounts(address _indexAddress) public view returns (uint[] memory) {
        uint numOfTokens = IndexTokenNew(_indexAddress).getNumOfTokens();
        uint[] memory tokenAmounts = new uint[](numOfTokens); 
        for(uint i; i < numOfTokens; i++ ) {
            uint tokenAmount = getSingleAmount(_indexAddress, i);
            tokenAmounts[i] = tokenAmount;
        }
        return tokenAmounts;
        
    }


    /// @notice get balance of a single token balance in an index
    /// @param _indexAddress = address of index token
    /// @param underlyingIndex = index of Index token's underlying assets array
    function getSingleAmount(address _indexAddress, uint underlyingIndex) public view returns (uint) {
        address underlyingToken = getSingleUnderlying(_indexAddress, underlyingIndex);
        return IERC20(underlyingToken).balanceOf(_indexAddress);
    }

    function getName(address _indexAddress) public view returns (string memory) {
        return IndexTokenNew(_indexAddress).getName();
    }

    function getSymbol(address _indexAddress) public view returns (string memory) {
        return IndexTokenNew(_indexAddress).getSymbol();
    }

    function getAllNames(address _creator) public view returns (string[] memory) {
        uint numTokens = getAmountOfIndexTokens(_creator);
        string[] memory tokenNames = new string[](numTokens);
        for(uint i; i < numTokens; i++) {
            tokenNames[i] = getName(addressToTokens[_creator][i+1]);
        }
        return tokenNames;
    }

    function getAllSymbols(address _creator) public view returns (string[] memory) {
        uint numTokens = getAmountOfIndexTokens(_creator); //number of tokens a user has created
        string[] memory tokenSymbols = new string[](numTokens);   //memory array to store all symbols temporarily
        for(uint i; i < numTokens; i++) {
            tokenSymbols[i] = getSymbol(addressToTokens[_creator][i+1]); //assign 
        }
        
        return tokenSymbols;
    }

    
}
