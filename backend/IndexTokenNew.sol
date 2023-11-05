// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "./interfaces/IERC20.sol";
import "./interfaces/IUniswapV2Router/IUniswapV2Router.sol";
import "@openzeppelin/contracts/utils/math/SafeMath.sol";

contract IndexTokenNew is IERC20 {
    using SafeMath for uint256;
    uint public totalSupply;
    mapping(address => uint) public balanceOf;
    mapping(address => mapping(address => uint)) public allowance;
    string public name;
    string public symbol;
    uint8 public decimals = 18;

    //Index token constants
    address immutable owner;
    address[] public holders;

    address[] public tokens;
    uint[] public percentages;

    address spookySwapAddress = 0xF491e7B69E4244ad4002BC14e878a34207E38c29;
    IUniswapV2Router02 spookySwap = IUniswapV2Router02(spookySwapAddress);
    address wFTMAddr = 0x21be370D5312f44cB42ce377BC9b8a0cEF1A4C83;


    constructor(address _owner, address[] memory _tokens, uint[] memory  _percentages, string memory _name, string memory _symbol) {
        //check percentages
        uint numOfTokens = _percentages.length;
        uint percentageCounter;
        uint _decimalFactor = 10**16;

        for(uint i; i < numOfTokens; i++) {
            percentageCounter += _percentages[i];
        }

        //multiply to correct decimals
        for(uint i; i < numOfTokens; i++){
            _percentages[i] = _percentages[i] * _decimalFactor;
        }

        require(percentageCounter <= 100, "percentages do not add up to 100");
        owner = _owner;
        tokens = _tokens;
        percentages = _percentages;
        name = _name;
        symbol = _symbol;



    }

    function getMinToken(uint token,uint amount) public view returns (uint256 result){
        uint _decimalFactor = 10**18;
        uint percentage = percentages[token];
        result = percentage.mul(amount).div(_decimalFactor);
    }

    //Index token mint
    function mint(uint amount) public {
        //get number of tokens using length
        uint numOfTokens = tokens.length;
    
        //loop through all tokens
        for(uint i; i < numOfTokens; i++){
            address _token = tokens[i];

            uint transferAmount = getMinToken(i, amount);
            bool success = IERC20(_token).transferFrom(tx.origin,address(this), transferAmount);
            require(success, "transfer failed");
        }
        //add to holders array
        holders.push(tx.origin);

        _mint(amount);
    }



    function redeem(uint amount) public {
        //get number of tokens using length
        require(amount <= balanceOf[tx.origin] );

        uint numOfTokens = tokens.length;
        address[] memory _tokens = tokens;

        //loop through all tokens
        for (uint i; i < numOfTokens; i++) {
            address _token = _tokens[i];

            uint transferAmount = getMinToken(i, amount);
            IERC20(_token).approve(tx.origin, transferAmount);
            bool success = IERC20(_token).transfer(tx.origin, transferAmount);
            require(success, "transfer failed");
        }

        burn(tx.origin,amount); 
    }


    //owner withdraw streaming fee
    function streamingFee() public  {
        require(tx.origin == owner, "Not owner!");

        address[] memory _holders = holders;

        uint feeCounter;
     


    // REMOVE DUPLICATE HOLDERS IN ARRAY
    // use nested for loop to find the duplicate elements in array 
    uint x;
    uint y;
    uint z;
    uint size = holders.length;
    for ( x = 0; x < size; x ++)  
    {  
        for ( y = x + 1; y < size; y++)  
        {  
            // use if statement to check duplicate element  
            if ( _holders[x] == _holders[y])  
            {  
                // delete the current position of the duplicate element  
                for ( z = y; z < size - 1; z++)  
                {  
                    _holders[z] = _holders[z + 1];  
                }  
                // decrease the size of array after removing duplicate element  
                size--;  
                  
            // if the position of the elements is changes, don't increase the index j  
                y--;      
            }  
        }  
    }

        //rebase / reduce supply by 1%
        uint numHolders = _holders.length;
        for (uint i; i < numHolders; i++){
            if (balanceOf[_holders[i]] > 0){
            uint amtToBurn = (balanceOf[_holders[i]]) / 99;
            
            burn(_holders[i], amtToBurn);
            feeCounter += amtToBurn;
            }
        }

        _mint(feeCounter);

    
    }

    function rebalancePercentages() public {  
        require(tx.origin == owner); 
        uint numOfTokens = tokens.length;

        uint total;
        uint _decimalFactor = 10**18;

        //find balance of all tokens
        for (uint i; i < numOfTokens; i++) {

            total += IERC20(tokens[i]).balanceOf(address(this));

        }

        //change percentage values in storage
        for (uint i; i < numOfTokens; i++) {
            percentages[i] = IERC20(tokens[i]).balanceOf(address(this)) * _decimalFactor / total;
        }
        
    }


    function rebalance(uint tokenOut, uint tokenIn, uint _amount) public {
        address[] memory path = new address[](2);
        //path[0] = tokens[tokenOut]; 
        //path[1] = tokens[tokenIn];
        //better rates:
        path[0] = tokens[tokenOut];
        path[1] = wFTMAddr; 
        path[1] = tokens[tokenIn];

        
        IERC20(tokens[tokenOut]).approve(spookySwapAddress,_amount);

        spookySwap.swapExactTokensForTokens(_amount, 0, path, address(this), block.timestamp + 15);

        rebalancePercentages();
        
    }

    function getName() public view returns (string memory) {
        return name;
    }

    function getSymbol() public view returns (string memory) {
        return symbol;
    }

    function getPercentages(uint i) public view returns (uint) {
        return percentages[i];
    }


    function getTotalSupply() public view returns (uint256){
        return totalSupply;
    }


    function transfer(address recipient, uint amount) external returns (bool) {
        balanceOf[tx.origin] -= amount;
        balanceOf[recipient] += amount;

        //add to holders array
        holders.push(recipient);

        emit Transfer(tx.origin, recipient, amount);
        return true;
    }

    function approve(address spender, uint amount) external returns (bool) {
        allowance[tx.origin][spender] = amount;
        emit Approval(tx.origin, spender, amount);
        return true;
    }

    function transferFrom(
        address sender,
        address recipient,
        uint amount
    ) external returns (bool) {
        allowance[sender][tx.origin] -= amount;
        balanceOf[sender] -= amount;
        balanceOf[recipient] += amount;


        //add to holders array
        holders.push(recipient);


        emit Transfer(sender, recipient, amount);
        return true;
    }

    function _mint(uint amount) internal {
        balanceOf[tx.origin] += amount;
        totalSupply += amount;

        emit Transfer(address(0), tx.origin, amount);
    }

    function burn(address burnee, uint amount) internal {
        balanceOf[burnee] -= amount;
        totalSupply -= amount;
        emit Transfer(tx.origin, address(0), amount);
    }


    //some getter helpers
    function getTokens() public view returns (address[] memory){
        return tokens;
    }

    function getSingleToken(uint _index) public view returns (address) {
        return tokens[_index];
    }

    function getAllPercentages() public view returns (uint[] memory) {
        return percentages;
    }

    function getSinglePercentage(uint _index) public view returns (uint) {
        return percentages[_index];
    }

    function getNumOfTokens() public view returns (uint) {
        return tokens.length;
    }


}
