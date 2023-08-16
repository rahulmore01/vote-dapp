import { useState, useEffect, useContext } from "react";
import { WalletContext } from "../Wallet";
import "./CandidateDisplay.css";
const CandidateDisplay = () => {
  const { contract } = useContext(WalletContext);
  const [candidates, setCandidates] = useState([]);
  useEffect(() => {
    const candidateInfo = async () => {
      const candidates = await contract.methods.candidateList().call();
      setCandidates(candidates);
    };
    contract && candidateInfo();
  }, [contract]);
  return (
    <div className="table-container">
      <table className="voter-table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Party</th>
            <th>Votes</th>
          </tr>
        </thead>
        <tbody>
          {candidates.map((candidate) => (
            <tr key={candidate.party}>
              <td>{candidate.name}</td>
              <td>{candidate.party}</td>
              <td>{candidate.votes}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
export default CandidateDisplay;
