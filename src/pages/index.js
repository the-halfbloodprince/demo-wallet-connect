import Head from 'next/head'
import { useState, useEffect, use } from 'react'
import { Contract, providers } from 'ethers'

import styles from '@/styles/Home.module.css'

export default function Home() {

  const [metamaskInstalled, setMetamaskInstalled] = useState(false)
  const [account, setAccount] = useState(null)

  useEffect(() => {

    // MetaMask injects a global API into websites visited by its users at window.ethereum
    if (window.ethereum) {
      console.log('metamask installed')
      setMetamaskInstalled(true)
    } else {
      console.log('metamask not installed')
    }

  }, [])

  const connectWallet = async () => {

    // This API allows websites to request users' Ethereum accounts, read data from blockchains the user is connected to, and suggest that the user sign messages and transactions.
    // The function connectWallet simply does a remote procedure call to Ethereum via MetaMask. It returns a Promise that resolves to the result of the method call.
    window.ethereum
        .request({
          method: 'eth_requestAccounts',
        })
        .then((accounts) => {
          setAccount(accounts[0])
        })
        .catch((err) => {
          alert('something went wrong!')
        })

  }

  return (
    <>
      <main className={styles.main}>
        
        {/* {metamaskInstalled ? <h1 class="good">Metamask installed</h1> : <h1 class="bad">Metamask not installed</h1>} */}

        {
          (account === null) ?
            metamaskInstalled ? 
              <button className={styles.button} onClick={connectWallet}>Connect Wallet</button> :
              <a href="https://youtu.be/StyzK6C7l1E" target="_blank" className={styles.install}>Install metamask</a>
          : <p className={styles.account}><span className={styles.dim}>Connected as:</span> <br /> <span className={styles.accountAddr}>{account}</span></p>

        }

      </main>
    </>
  )
}
