import React, { useState } from 'react';
import { web3 } from "@project-serum/anchor";
import './CampaignItem.css';

const CampaignItem = ({ campaign, onDonate, onWithdraw }) => {
  const [donationAmount, setDonationAmount] = useState('');

  const handleDonate = () => {
    const lamports = parseFloat(donationAmount) * web3.LAMPORTS_PER_SOL;
    if (!isNaN(lamports) && lamports > 0) {
      onDonate(campaign.pubkey, lamports);
    } else {
      alert("Please enter a valid donation amount");
    }
  };

  return (
    <div className="campaign-item">
      <h3>{campaign.name}</h3>
      <p>Campaign ID: {campaign.pubkey.toString()}</p>
      <p>Balance: {(campaign.amountDonated / web3.LAMPORTS_PER_SOL).toFixed(2)} SOL</p>
      <p>{campaign.description}</p>
      <input
        type="number"
        value={donationAmount}
        onChange={(e) => setDonationAmount(e.target.value)}
        placeholder="Amount in SOL"
      />
      <button onClick={handleDonate}>Donate</button>
    </div>
  );
};

export default CampaignItem;