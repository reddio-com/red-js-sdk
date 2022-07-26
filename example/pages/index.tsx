import type { NextPage } from 'next'
import Head from 'next/head'
import Link from 'next/link'
import {Button, Text, Spacer} from '@nextui-org/react';
import styles from '../styles/Home.module.css'
import {ethers} from "ethers";
import { useState, useEffect } from "react";
import {reddio} from "../utils/config";
import Layout from '../components/layout';

const Home: NextPage = () => {
  const [account, setAccount] = useState('');
  const [keys, setKeys] = useState({
    privateKey: '',
    publicKey: '',
  });

  useEffect(() => {
    getAccount()
  })

  const getAccount = async () => {
    try {
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = await provider.getSigner();
      const account = await signer.getAddress();
      setAccount(account)
    } catch (e) {
      console.log(e);
    }
  }

  const connect = async () => {
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    await provider.send('eth_requestAccounts', [])
    getAccount()
  }

  const generate = async () => {
    const res = await reddio.keypair.generateFromEthSignature('Sign')
    setKeys(res)
  }

  return (
      <Layout>
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
            <Button onClick={generate}>获取 starkKey</Button>
            <Spacer y={1} />
            <Text>stark key: {keys.publicKey}</Text>
            <Spacer y={1} />
            <Text>private key: {keys.privateKey}</Text>
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

              <Link href="/process3">
                <a className={styles.card}>
                  <h2>流程 3 &rarr;</h2>
                  <p>Deposit/Transfer/Withdraw ERC721 between L1 and L2.</p>
                </a>
              </Link>

              {/*<Link href="/process4">*/}
              {/*  <a className={styles.card}>*/}
              {/*    <h2>流程 4 &rarr;</h2>*/}
              {/*    <p>Mint ERC721 on L2, Transfer between L2, Withdraw to L1, then Deposit to L2.</p>*/}
              {/*  </a>*/}
              {/*</Link>*/}
            </div>
          </main>
        </div>
      </Layout>

  )
}

export default Home
