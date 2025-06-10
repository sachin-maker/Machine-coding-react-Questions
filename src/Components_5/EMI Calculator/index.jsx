import React, { useEffect, useState } from "react";
import "./style.css";
import { tenureData } from "./utils/constant";
import { numberWithCommas } from "./utils/config";
import TextInput from "./components/TextInput";
import SliderInput from "./components/SliderInput";

const EmiCalculator = () => {
  const [cost, setCost] = useState(0);
  const [interest, setInterest] = useState(10);
  const [fee, setFee] = useState(1);
  const [downPayment, setDownPayment] = useState(0);
  const [tenure, setTenure] = useState(12);
  const [emi, setEmi] = useState(0);

  const calculateEMI = (downpayment) => {
    if (!cost) return 0;

    const loanAmt = cost - downpayment;
    const monthlyInterestRate = interest / 100 / 12;
    const numOfMonths = tenure;

    if (monthlyInterestRate === 0) return loanAmt / numOfMonths;

    const EMI =
      (loanAmt * monthlyInterestRate * Math.pow(1 + monthlyInterestRate, numOfMonths)) /
      (Math.pow(1 + monthlyInterestRate, numOfMonths) - 1);

    return Number(EMI).toFixed(0);
  };

  const calculateDP = (emiValue) => {
    if (!cost) return 0;

    const baseEMI = calculateEMI(0);
    const dpPercent = 100 - (emiValue / baseEMI) * 100;
    return Number((dpPercent / 100) * cost).toFixed(0);
  };

  useEffect(() => {
    if (!(cost > 0)) {
      setDownPayment(0);
      setEmi(0);
      return;
    }

    const newEmi = calculateEMI(downPayment);
    setEmi(newEmi);
  }, [cost, tenure, interest, downPayment]);

  const updateEMI = (e) => {
    if (!cost) return;

    const dp = parseInt(e.target.value);
    setDownPayment(dp);

    const newEmi = calculateEMI(dp);
    setEmi(newEmi);
  };

  const updateDownPayment = (e) => {
    if (!cost) return;

    const emiVal = parseInt(e.target.value);
    setEmi(emiVal);

    const dp = calculateDP(emiVal);
    setDownPayment(dp);
  };

  const totalDownPayment = () => {
    return numberWithCommas(
      (Number(downPayment) + (cost - downPayment) * (fee / 100)).toFixed(0)
    );
  };

  const totalEMI = () => {
    return numberWithCommas((emi * tenure).toFixed(0));
  };

  return (
    <div className="App">
      <span className="title" style={{ fontSize: 30, marginTop: 10 }}>
        EMI Calculator
      </span>

      <TextInput title="Total Cost of Asset" state={cost} setState={setCost} />
      <TextInput title="Interest Rate (in %)" state={interest} setState={setInterest} />
      <TextInput title="Processing Fee (in %)" state={fee} setState={setFee} />

      <SliderInput
        title="Down Payment"
        underlineTitle={`Total Down Payment - ${totalDownPayment()}`}
        onChange={updateEMI}
        state={downPayment}
        min={0}
        max={cost}
        labelMin="0%"
        labelMax="100%"
      />

      <SliderInput
        title="Loan per Month"
        underlineTitle={`Total Loan Amount - ${totalEMI()}`}
        onChange={updateDownPayment}
        state={emi}
        min={calculateEMI(cost)}
        max={calculateEMI(0)}
      />

      <span className="title">Tenure</span>
      <div className="tenureContainer">
        {tenureData.map((t) => (
          <button
            key={t}
            className={`tenure ${tenure === t ? "selected" : ""}`}
            onClick={() => setTenure(t)}
          >
            {t} months
          </button>
        ))}
      </div>
    </div>
  );
};

export default EmiCalculator;
