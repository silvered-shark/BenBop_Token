import './App.css'
import { useState } from 'react'
import { ethers } from 'ethers'
import BBToken from './artifacts/contracts/BBToken.sol/BBToken.json'

// Update with the contract address logged out to the CLI when it was deployed 
const bbTokenAddress = "0x57585e0b7619762242db2B998Ac22a6c473E41Ac"

function App() {
  // storing amount in local state
  // use setAmount to set amount
  const [amount, setAmount] = useState()
  const [toAddress, setToAddress] = useState()
  let BBTbalances = ""
  let mint = ""
  // request access to the user's MetaMask account
  async function requestAccount() {
    await window.ethereum.request({ method: 'eth_requestAccounts' })
  }

  // call the BBToken smart contract
  // read the balance of the current user
  async function fetchBalances() {
    if(typeof window.ethereum !== 'undefined'){
      const [account] = await window.ethereum.request({ method: 'eth_requestAccounts' })
      const provider = new ethers.providers.Web3Provider(window.ethereum)
      const BBTcontract = new ethers.Contract(bbTokenAddress, BBToken.abi, provider)
      const BBTbalance = await BBTcontract.balanceOf(account) /   10 ** 18
      BBTbalances = "You have: ".concat(BBTbalance.toString().replace("000", ",000").replace("000000", "000,000 "), " BBT")
      document.getElementById("balances").innerHTML=BBTbalances
    }
  }

  async function faucet() {
    if(typeof window.ethereum !== 'underfined'){
      await requestAccount()
      const provider = new ethers.providers.Web3Provider(window.ethereum)
      const signer = provider.getSigner()
      const contract = new ethers.Contract(bbTokenAddress, BBToken.abi, signer)
      const transaction = await contract.faucet(amount)
      await transaction.wait()
      mint = amount.concat(" BBT was just transferred to your account.")
      document.getElementById("mint").innerHTML=mint
      fetchBalances()
    }
  }

  async function transferTo() {
    if(typeof window.ethereum !== 'undefined'){
      await requestAccount()
      const provider = new ethers.providers.Web3Provider(window.ethereum)
      const signer = provider.getSigner()
      const contract = new ethers.Contract(bbTokenAddress, BBToken.abi, signer)
      const transaction = await contract.transfer(toAddress, amount)
      await transaction.wait()
      let to = amount.concat(" BBT was just transferred to ", toAddress)
      document.getElementById("to").innerHTML=to
      fetchBalances()
    }
  }

  let html = 
    <div className="App">
      <header className="App-header">
        <button onClick={fetchBalances}>Check Your Balances</button>
        <a id="balances"></a>
        <button onClick={faucet}>Send Yourself BenBop Tokens (BBT)</button>
        <input onChange={e => setAmount(e.target.value)} placeholder="Amount"/>
        <a id="mint"></a>
        <button onClick={transferTo}>Send BenBop Tokens (BBT) to</button>
        <input onChange={e => setAmount(e.target.value)} placeholder="Amount"/>
        <input onChange={e => setToAddress(e.target.value)} placeholder="Address"/>
      </header>
    </div>

  return html
}

export default App;
