import React from 'react';
import {
	Program,
	AnchorProvider,
	web3,
	utils,
	BN,
} from "@project-serum/anchor";
import './CampaignItem.css';

const CampaignItem = ({ campaign, onDonate, onWithdraw }) => (
  <div className="campaign-item">
    <h3>{campaign.name}</h3>
    <p>Campaign ID: {campaign.pubkey.toString()}</p>
    <p>Balance: {(campaign.amountDonated / web3.LAMPORTS_PER_SOL).toFixed(2)} SOL</p>
    <p>{campaign.description}</p>
    <button onClick={() => onDonate(campaign.pubkey)}>Donate</button>
  </div>
);

export default CampaignItem;