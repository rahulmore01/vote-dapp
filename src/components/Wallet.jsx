import { useState, useEffect, createContext } from "react";
import PropTypes from "prop-types";
import Web3 from "web3";
import ABI from "./ABI.json";

const WalletContext = createContext();

const Wallet = ({ children }) => {
  const [state, setState] = useState({
    web3: null,
    contract: null,
  });

  useEffect(() => {
    const init = async () => {
      const web3 = new Web3("HTTP://127.0.0.1:7545");
      const contractAddress = "0x325E0Be380037F56F36B2E6DA885e47dd149c9d3";
      //to create contract instance - abi and contract address
      const contract = new web3.eth.Contract(ABI, contractAddress);
      setState({ web3: web3, contract: contract });
    };
    init();
  }, []);

  return (
    <WalletContext.Provider value={state}>{children}</WalletContext.Provider>
  );
};

Wallet.propTypes = {
  children: PropTypes.node.isRequired,
};
export { WalletContext };
export default Wallet;
