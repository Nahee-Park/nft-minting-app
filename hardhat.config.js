require('@nomiclabs/hardhat-waffle');
require('dotenv').config({ path: '.env' });

module.exports = {
  solidity: '0.8.4',
  networks: {
    kovan: {
      url: process.env.ALCHEMY_API_KEY_URL,
      accounts: [process.env.ROPSTEN_PRIVATE_KEY],
    },
    rinkeby: {
      url: process.env.ALCHEMY_API_KEY_URL_2,
      accounts: [process.env.RINKEBY_PRIVATE_KEY],
    },
  },
};
