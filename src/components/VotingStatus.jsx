import { useState, useEffect, useContext } from "react";
import { WalletContext } from "./Wallet";
const VotingStatus = () => {
  const { contract } = useContext(WalletContext);
  const [voteStatus, setvoteStatus] = useState("");

  useEffect(() => {
    const checkVotingStatus = async () => {
      const status = await contract.methods.votingStatus().call();
      setvoteStatus(status);
    };
    contract && checkVotingStatus();
  }, [contract]);
  console.log("voting status", voteStatus);
  return <div>Vote Status: {voteStatus}</div>;
};
export default VotingStatus;

// import { useState, useEffect, useContext } from "react";
// import { WalletContext } from "./Wallet";

// const VotingStatus = () => {
//   const { contract } = useContext(WalletContext);
//   const [voteStatus, setVoteStatus] = useState("");

//   useEffect(() => {
//     const checkVotingStatus = async () => {
//       const status = await contract.methods.votingStatus().call();
//       setVoteStatus(status);
//     };
//     contract && checkVotingStatus();
//   }, [contract]);
//   console.log("VotingStatus", voteStatus);
//   const statusColor = voteStatus === "Voting in progress" ? "#2DFF2D" : "red";

//   return (
//     <div style={{ display: "flex" }}>
//       Vote Status :
//       <div style={{ color: statusColor }}>
//         {voteStatus === null ? "no status" : voteStatus}
//       </div>
//     </div>
//   );
// };

// export default VotingStatus;
