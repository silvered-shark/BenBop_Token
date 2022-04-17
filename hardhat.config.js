require("@nomiclabs/hardhat-waffle");

// This is a sample Hardhat task. To learn how to create your own go to
// https://hardhat.org/guides/create-task.html
task("accounts", "Prints the list of accounts", async (taskArgs, hre) => {
  const accounts = await hre.ethers.getSigners();

  for (const account of accounts) {
    console.log(account.address);
  }
});

// You need to export an object to set up your config
// Go to https://hardhat.org/config/ to learn more

/**
 * @type import('hardhat/config').HardhatUserConfig
 */
module.exports = {
  solidity: "0.8.4",
  paths: {
    artifacts: './src/artifacts',
  },
  networks: {
    // for local runs
    hardhat: {
      chainId: 1337
    },
    ropsten: {
      url: "https://ropsten.infura.io/v3/c88506f957994d249069231928dff571",
      accounts: [`0x0d9dbcc1c7e4d6c5087dfbb5211645ed1ed9afab48a59ccc09fb1caf29b86893`] // BenBop
    },
    rinkeby: {
      url: "https://rinkeby.infura.io/v3/c88506f957994d249069231928dff571",
      accounts: [`0x0d9dbcc1c7e4d6c5087dfbb5211645ed1ed9afab48a59ccc09fb1caf29b86893`] // BenBop
    }
  }
};
