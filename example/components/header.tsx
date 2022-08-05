import axios from 'axios';
import { useEffect, useState } from 'react';
import { ethers } from 'ethers';
import { Button, Row, Spacer } from '@nextui-org/react';

export default () => {
  const [address, setAddress] = useState('');

  useEffect(() => {
    getAddress();
  }, []);

  const getAddress = async () => {
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = await provider.getSigner();
    const address = await signer.getAddress();
    setAddress(address);
  };
  const deposit = () => {
    axios.post('https://faucet.reddio.com/api/v1/mint', {
      new_contract: false,
      to: address,
    });
  };
  return (
    <Row
      css={{ height: 60, backgroundColor: 'rgb(236, 238, 240)' }}
      align="center"
    >
      <Row justify="center">
        <Button size="sm" onClick={deposit} ghost>
          deposit 0.01 ETH / 100 ERC20 / 10 ERC721
        </Button>
        <Spacer x={1} />
        <Button
          size="sm"
          onClick={() =>
            window.open(`https://goerli.etherscan.io/address/${address}`)
          }
          ghost
        >
          Etherscan
        </Button>
      </Row>
    </Row>
  );
};
