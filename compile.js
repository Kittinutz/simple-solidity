const path = require('path');
const fs = require('fs');
const solc = require('solc');

const inboxPath = path.resolve(__dirname, 'contracts', 'Inbox.sol');
const lotteryPath = path.resolve(__dirname, 'contracts', 'Lottery.sol');
const sourceInbox = fs.readFileSync(inboxPath, 'utf8');
const sourceLotterty = fs.readFileSync(lotteryPath, 'utf8');

const input = {
  language: 'Solidity',
  sources: {
    'Inbox.sol': {
      content: sourceInbox,
    },
  },
  settings: {
    outputSelection: {
      '*': {
        '*': ['*'],
      },
    },
  },
};


const lottery = {
  language: 'Solidity',
  sources: {
    'Lottery.sol': {
      content: sourceLotterty,
    },
  },
  settings: {
    outputSelection: {
      '*': {
        '*': ['*'],
      },
    },
  },
};


module.exports = {
  Inbox: JSON.parse(solc.compile(JSON.stringify(input))).contracts[
    'Inbox.sol'
  ].Inbox,
  Lottery: JSON.parse(solc.compile(JSON.stringify(lottery))).contracts[
    'Lottery.sol'
  ].Lottery
}