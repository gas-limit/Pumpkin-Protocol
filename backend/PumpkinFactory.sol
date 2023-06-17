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

    
}
