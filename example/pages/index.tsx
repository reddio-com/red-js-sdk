import type { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import Link from 'next/link'
import {Button, Text, Spacer} from '@nextui-org/react';
import styles from '../styles/Home.module.css'
import {ethers} from "ethers";
import { useState, useEffect } from "react";

const Home: NextPage = () => {
  const [account, setAccount] = useState('');

  useEffect(() => {
    getAccount()
  })

  const getAccount = async () => {
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = await provider.getSigner();
    const account = await signer.getAddress();
    setAccount(account)
  }

  const connect = async () => {
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    await provider.send('eth_requestAccounts', [])
    getAccount()
  }

  return (
    <div className={styles.container}>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>
          Welcome to SDK Examples!
        </h1>

        <Text>将私钥「90bd2cc1472d255677a10b98234692c7210ffaaf56feaea99e3fe7b4fa4291f0」导入钱包</Text>
        <Spacer y={1} />
        { account ? <Button disabled>{account}</Button> : <Button onPress={connect}>connect</Button> }
        <Spacer y={1} />

        <div className={styles.grid}>
          <Link href="/process1">
            <a className={styles.card}>
              <h2>流程 1 &rarr;</h2>
              <p>Deposit/Transfer/Withdraw ETH between L1 and L2.</p>
            </a>
          </Link>

          <Link href="/process2">
            <a className={styles.card}>
              <h2>流程 2 &rarr;</h2>
              <p>Deposit/Transfer/Withdraw ERC20 between L1 and L2.</p>
            </a>
          </Link>
        </div>
      </main>

      <footer className={styles.footer}>
        <a
          href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          Powered by{' '}
          <span className={styles.logo}>
            <Image src="/vercel.svg" alt="Vercel Logo" width={72} height={16} />
          </span>
        </a>
      </footer>
    </div>
  )
}

export default Home