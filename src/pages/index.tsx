import styled from '@emotion/styled';
import twitterLogo from '@src/assets/twitter-logo.svg';
import type { NextPage } from 'next';
import Head from 'next/head';
import Image from 'next/image';
import React, { useEffect } from 'react';
const TWITTER_HANDLE = '_buildspace';
const TWITTER_LINK = `https://twitter.com/${TWITTER_HANDLE}`;

const Home: NextPage = () => {
  const checkIfWalletIsConnected = () => {
    /*
     * First make sure we have access to window.ethereum
     */
    const { ethereum } = window;

    if (!ethereum) {
      console.log('Make sure you have metamask!');
      alert('Make sure you have metamask!');

      return;
    } else {
      console.log('We have the ethereum object', ethereum);
    }
  };
  const renderNotConnectedContainer = () => (
    <button className="cta-button connect-wallet-button">Connect to Wallet</button>
  );

  useEffect(() => {
    checkIfWalletIsConnected();
  }, []);

  return (
    <div>
      <Head>
        <title>nft-minting-app</title>
        <meta name="description" content="nft-minting-app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Styled.Main>
        <section className="header-container">
          <p className="header gradient-text">My NFT Collection</p>
          <p className="sub-text">Each unique. Each beautiful. Discover your NFT today.</p>
          {renderNotConnectedContainer()}
        </section>
        <section className="footer-container">
          <Image alt="Twitter Logo" className="twitter-logo" src={twitterLogo} />
          <a
            className="footer-text"
            href={TWITTER_LINK}
            target="_blank"
            rel="noreferrer"
          >{`built on @${TWITTER_HANDLE}`}</a>
        </section>
      </Styled.Main>
    </div>
  );
};

export default Home;

const Styled = {
  Main: styled.main`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    overflow: scroll;
    text-align: center;
    .container {
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      background-color: #0d1116;
      height: 100%;
    }

    .header-container {
      padding-top: 30px;
    }

    .header {
      margin: 0;
      font-size: 50px;
      font-weight: bold;
    }

    .sub-text {
      color: white;
      font-size: 25px;
    }

    .gradient-text {
      background: linear-gradient(left, #60c657 30%, #35aee2 60%);
      background-clip: text;
      background-clip: text;
      -webkit-text-fill-color: transparent;
    }

    .cta-button {
      border: 0;
      border-radius: 5px;
      cursor: pointer;
      padding-right: 40px;
      padding-left: 40px;
      width: auto;
      height: 45px;
      color: white;
      font-size: 16px;
      font-weight: bold;
    }

    .connect-wallet-button {
      background: linear-gradient(left, #60c657, #35aee2);
      background-size: 200% 200%;
      animation: gradient-animation 4s ease infinite;
    }

    .mint-button {
      margin-right: 15px;
      background: linear-gradient(left, #a200d6, #ff6fdf);
      background-size: 200% 200%;
      animation: gradient-animation 4s ease infinite;
    }

    .opensea-button {
      background-color: rgb(32, 129, 226);
    }

    .mint-count {
      color: white;
      font-size: 18px;
      font-weight: bold;
    }

    .footer-container {
      display: flex;
      align-items: center;
      justify-content: center;
      padding-bottom: 30px;
    }

    .twitter-logo {
      width: 35px;
      height: 35px;
    }

    .footer-text {
      color: white;
      font-size: 16px;
      font-weight: bold;
    }

    /* KeyFrames */
    @-webkit-keyframes gradient-animation {
      0% {
        background-position: 0% 50%;
      }
      50% {
        background-position: 100% 50%;
      }
      100% {
        background-position: 0% 50%;
      }
    }
    @-moz-keyframes gradient-animation {
      0% {
        background-position: 0% 50%;
      }
      50% {
        background-position: 100% 50%;
      }
      100% {
        background-position: 0% 50%;
      }
    }
    @keyframes gradient-animation {
      0% {
        background-position: 0% 50%;
      }
      50% {
        background-position: 100% 50%;
      }
      100% {
        background-position: 0% 50%;
      }
    }
  `,
};
