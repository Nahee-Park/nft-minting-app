import styled from '@emotion/styled';
import twitterLogo from '@src/assets/twitter-logo.svg';
import type { NextPage } from 'next';
import Head from 'next/head';
import Image from 'next/image';
import React, { useEffect, useState } from 'react';
const TWITTER_HANDLE = '_buildspace';
const TWITTER_LINK = `https://twitter.com/${TWITTER_HANDLE}`;

import { ethers } from 'ethers';

import MyEpicNFT from '../../artifacts/contracts/MyEpicNFT.sol/MyEpicNFT.json';
const Home: NextPage = () => {
  const [currentAccount, setCurrentAccount] = useState('');

  const checkIfWalletIsConnected = async () => {
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
    /*
     * Check if we're authorized to access the user's wallet
     */
    const accounts: any = await ethereum.request({ method: 'eth_accounts' });

    /*
     * User can have multiple authorized accounts, we grab the first one if its there!
     */
    if (accounts.length !== 0) {
      const account = accounts[0];

      console.log('Found an authorized account:', account);
      setCurrentAccount(account);
    } else {
      console.log('No authorized account found');
    }
  };

  /*
   * Implement your connectWallet method here
   */
  const connectWallet = async () => {
    try {
      const { ethereum } = window;

      if (!ethereum) {
        alert('Get MetaMask!');

        return;
      }

      /*
       * Fancy method to request access to account.
       */
      const accounts: any = await ethereum.request({ method: 'eth_requestAccounts' });

      /*
       * Boom! This should print out public address once we authorize Metamask.
       */
      console.log('Connected', accounts[0]);
      setCurrentAccount(accounts[0]);
    } catch (error) {
      console.log(error);
    }
  };

  const askContractToMintNft = async () => {
    const CONTRACT_ADDRESS = '0xa79489bb4a97151110aC30EfD2278927193EE007';

    try {
      const { ethereum } = window;

      if (ethereum) {
        const provider = new ethers.providers.Web3Provider(ethereum);
        const signer = provider.getSigner();
        const connectedContract = new ethers.Contract(CONTRACT_ADDRESS, MyEpicNFT.abi, signer);

        console.log('Going to pop wallet now to pay gas...');
        const nftTxn = await connectedContract.makeAnEpicNFT();

        console.log('Mining...please wait.');
        await nftTxn.wait();

        console.log(`Mined, see transaction: https://rinkeby.etherscan.io/tx/${nftTxn.hash}`);
      } else {
        // eslint-disable-next-line prettier/prettier
        console.log('Ethereum object doesn\'t exist!');
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    checkIfWalletIsConnected();
  }, []);

  const renderNotConnectedContainer = () => (
    <button onClick={connectWallet} className="cta-button connect-wallet-button">
      Connect to Wallet
    </button>
  );

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
          {currentAccount === '' ? (
            renderNotConnectedContainer()
          ) : (
            <button onClick={askContractToMintNft} className="cta-button connect-wallet-button">
              Mint NFT
            </button>
          )}
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
    justify-content: space-between;
    height: 100vh;
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
      margin-bottom: 5%;
      font-size: 50px;
      font-weight: bold;
    }

    .sub-text {
      margin-bottom: 5%;
      color: white;
      font-size: 25px;
    }

    .gradient-text {
      background: -webkit-linear-gradient(left, #60c657 30%, #35aee2 60%);
      background-clip: text;
      -webkit-text-fill-color: transparent;
    }

    .connect-wallet-button {
      background: -webkit-linear-gradient(left, #60c657, #35aee2);
      background-size: 200% 200%;
      animation: gradient-animation 4s ease infinite;
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

    .mint-button {
      margin-right: 15px;
      background: -webkit-linear-gradient(left, #a200d6, #ff6fdf);
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
