import { ConnectButton } from '@rainbow-me/rainbowkit';
import type { NextPage } from 'next';
import Head from 'next/head';
import Layout from '../components/Layout';
import styles from '../styles/Home.module.css';
import { GetDesignInfos, GetContractInfos, CheckContractIdByAddress } from './transactions';

const Home: NextPage = () => {
  return (
    <Layout>
      <div className={styles.container}>
        <Head>
          <title>블록체인 기반 NFT 저작권 등록 시스템</title>
          <meta content="Generated by @rainbow-me/create-rainbowkit" name="description" />
          <link href="/favicon.ico" rel="icon" />
        </Head>

        <main className={styles.main}>
          <ConnectButton />

          <h3 className={styles.title}>
          블록체인 기반 NFT 저작권 등록 시스템
          </h3>

          <h4>
          저작권 번호는 해당 플랫폼에서 부여한 고유의 아이디 값 입니다.
          </h4>

          <h1 className={styles.description}>
          🔎 지갑 주소로 보유한 저작권 번호 찾기
          <CheckContractIdByAddress />
          </h1>

          <h1 className={styles.description}>
          🔎  저작권 번호로 특허내용 블록체인에서 가져오기
          </h1>
          <GetContractInfos />

        </main>
        <>
        </>
        <footer className={styles.footer}>
          <a href="https://rainbow.me" rel="noopener noreferrer" target="_blank">
            서강대학교 조현기, 신은경 제작
          </a>
        </footer>
      </div>
    </Layout>
  );
};

export default Home;