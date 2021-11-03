pragma solidity ^0.8.9;

contract Lottery {
    address public manager;

    address[] public playerList;

    constructor() {
        //global msg variable
        manager = msg.sender;
    }

    function enter() public payable {
        require(msg.value > .01 ether);
        //msg
        //.sender address
        playerList.push(msg.sender);
    }

    function random() private view restricted returns (uint256) {
        return
            uint256(
                keccak256(
                    abi.encodePacked(
                        block.difficulty,
                        block.timestamp,
                        playerList
                    )
                )
            );
    }

    function pickWinner() public restricted {
        uint256 index = uint256(random() % playerList.length);

        payable(playerList[index]).transfer(address(this).balance);

        playerList = new address[](0);
    }

    modifier restricted() {
        require(msg.sender == manager);
        _;
    }

    function getPlayers() public view returns (address[] memory) {
        return playerList;
    }
}
