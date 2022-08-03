import type { NextPage } from 'next'
import Head from 'next/head'
import { useRouter } from 'next/router'
import {Button, Text, Spacer} from '@nextui-org/react';
import styles from '../styles/Home.module.css'
import {ethers} from "ethers";
import {useState, useEffect, useCallback} from "react";
import Layout from '../components/layout';
import gen from "../utils/gen";

const Home: NextPage = () => {
  const router = useRouter();
  const [account, setAccount] = useState('');
  const [keys, setKeys] = useState({
    privateKey: '',
    publicKey: '',
  });

  useEffect(() => {
    connect()
  }, [])

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
    await getAccount()
  }

  const generate = useCallback(async () => {
    if (keys.publicKey) return
    const res = await gen()
    setKeys(res)
  }, [keys])

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

            { account ? <Button disabled>{account}</Button> : <Button onPress={connect}>connect</Button> }
            <Spacer y={1} />
            <Button onClick={generate}>get starkKey</Button>
            <Spacer y={1} />
            <Text>stark key: {keys.publicKey}</Text>
            <Spacer y={1} />
            <Text>private key: {keys.privateKey}</Text>
            <Spacer y={1} />

            <div className={styles.grid}>
                <a className={styles.card} onClick={() => {
                  if (keys.publicKey) {
                    router.push('/process1')
                  } else {
                    alert('please generate stark key first')
                  }
                }}>
                  <h2>Process 1 &rarr;</h2>
                  <p>Deposit/Transfer/Withdraw ETH between L1 and L2.</p>
                </a>

              <a className={styles.card} onClick={() => {
                if (keys.publicKey) {
                  router.push('/process2')
                } else {
                  alert('please generate stark key first')
                }
              }}>
                <h2>Process 2 &rarr;</h2>
                <p>Deposit/Transfer/Withdraw ERC20 between L1 and L2.</p>
              </a>

              <a className={styles.card} onClick={() => {
                if (keys.publicKey) {
                  router.push('/process3')
                } else {
                  alert('please generate stark key first')
                }
              }}>
                <h2>Process 3 &rarr;</h2>
                <p>Deposit/Transfer/Withdraw ERC721 between L1 and L2.</p>
              </a>

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
