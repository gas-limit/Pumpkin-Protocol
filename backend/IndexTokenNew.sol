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
    uint8 constant public decimals = 18;

    //Index token constants
    address immutable owner;
    mapping(address => uint256) public holderToId;
    mapping(uint256 => address) public IdToHolder;

    uint256 IdCount;

    address[] public tokens;
    uint[] public percentages;

    address constant spookySwapAddress = 0xF491e7B69E4244ad4002BC14e878a34207E38c29;
    IUniswapV2Router02 constant spookySwap = IUniswapV2Router02(spookySwapAddress);
    address constant wFTMAddr = 0x21be370D5312f44cB42ce377BC9b8a0cEF1A4C83;


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
            bool success = IERC20(_token).transferFrom(msg.sender,address(this), transferAmount);
            require(success, "transfer failed");
        }
        //add to holders array if they do not have an id
        if(holderToId[msg.sender] == 0){
        IdCount++;
        holderToId[msg.sender] = IdCount;
        IdToHolder[IdCount] = msg.sender;
        }
        
        _mint(amount);
    }

    

    function redeem(uint amount) public {
        //get number of tokens using length
        require(amount <= balanceOf[msg.sender] );

        uint numOfTokens = tokens.length;
        address[] memory _tokens = tokens;

        //loop through all tokens
        for (uint i; i < numOfTokens; i++) {
            address _token = _tokens[i];

            uint transferAmount = getMinToken(i, amount);
            IERC20(_token).approve(msg.sender, transferAmount);
            bool success = IERC20(_token).transfer(msg.sender, transferAmount);
            require(success, "transfer failed");
        }

        burn(msg.sender,amount); 
    }




    //owner withdraw streaming fee
    function streamingFee() public  {
        require(msg.sender == owner, "Not owner!");

        uint feeCounter;
     
        //rebase / reduce supply by 1%
        for (uint i = 1; i < IdCount; i++){
            address account = IdToHolder[i];
            if (balanceOf[account] > 0){
            uint amtToBurn = (balanceOf[account]) / 99;
            
            burn(account, amtToBurn);
            feeCounter += amtToBurn;
            }
        }

        _mint(feeCounter);

    
    }

    function rebalancePercentages() internal {  

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
        balanceOf[msg.sender] -= amount;
        balanceOf[recipient] += amount;

        //add to holders 
        if(holderToId[recipient] == 0){
        IdCount++;
        holderToId[recipient] = IdCount;
        IdToHolder[IdCount] = recipient;
        }
        

        emit Transfer(msg.sender, recipient, amount);
        return true;
    }

    function approve(address spender, uint amount) external returns (bool) {
        allowance[msg.sender][spender] = amount;
        emit Approval(msg.sender, spender, amount);
        return true;
    }

    function transferFrom(
        address sender,
        address recipient,
        uint amount
    ) external returns (bool) {
        allowance[sender][msg.sender] -= amount;
        balanceOf[sender] -= amount;
        balanceOf[recipient] += amount;

        //add to holders 
        if(holderToId[recipient] == 0){
        IdCount++;
        holderToId[recipient] = IdCount;
        IdToHolder[IdCount] = recipient;
        }


        emit Transfer(sender, recipient, amount);
        return true;
    }

    function _mint(uint amount) internal {
        balanceOf[msg.sender] += amount;
        totalSupply += amount;

        emit Transfer(address(0), msg.sender, amount);
    }

    function burn(address burnee, uint amount) internal {
        balanceOf[burnee] -= amount;
        totalSupply -= amount;
        emit Transfer(msg.sender, address(0), amount);
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
