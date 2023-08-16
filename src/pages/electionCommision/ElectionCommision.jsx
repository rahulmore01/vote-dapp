import { useContext, useState } from "react";
import Navigation from "../../components/navigation/Navigation";
import PropTypes from "prop-types";
import { WalletContext } from "../../components/Wallet";
import "./ElectionCommision.css";
import { toast } from "react-hot-toast";

const ElectionCommision = ({ account }) => {
  const [winner, setWinner] = useState("No Winner Yet");
  const { contract } = useContext(WalletContext);
  const votingTime = async (event) => {
    event.preventDefault();
    const startTime = document.querySelector("#start").value;
    const endTime = document.querySelector("#end").value;
    try {
      await contract.methods
        .voteTime(startTime, endTime)
        .send({ from: account, gas: 480000 });
      toast.success("Voting Started");
    } catch (error) {
      console.error(error);
    }
  };
  const emergency = async () => {
    try {
      await contract.methods.emergency().send({ from: account, gas: 480000 });
      // alert("Emergency Declared");
      toast("Emergency Declared", {
        icon: "🚨",
      });
    } catch (error) {
      console.error(error);
    }
  };
  const result = async () => {
    try {
      await contract.methods.result().send({ from: account, gas: 480000 });
      const winCandidate = await contract.methods.winner().call();
      setWinner(winCandidate);
      toast.success("Result Out");
      // alert("Result Out");
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <>
      <div>
        <Navigation account={account} />

        <div className="election-wrapper">
          <h2>
            Winner is: <br /> {winner}{" "}
          </h2>
          <form className="election-form" onSubmit={votingTime}>
            <label htmlFor="start">Start Time</label>
            <input type="text" id="start"></input>

            <label htmlFor="end">End Time</label>
            <input type="text" id="end"></input>

            <button className="regBtn" type="submit">
              Voting Start
            </button>
          </form>
        </div>
        <div className="admin-actions">
          <button className="emerBtn" onClick={emergency}>
            Emergency
          </button>
          <button className="resultBtn" onClick={result}>
            Result
          </button>
        </div>
      </div>
    </>
  );
};
ElectionCommision.propTypes = {
  account: PropTypes.node.isRequired,
};
export default ElectionCommision;
