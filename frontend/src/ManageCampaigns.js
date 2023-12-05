import React from 'react';
import "./ManageCampaigns.css";
import EditCampaign from './EditCampaign';

const ManageCampaigns = ({ campaigns, onEdit, onDelete, onWithdraw }) => {
  return (
    <div className="manage-campaigns-container">
      {campaigns.map(campaign => (
        <div className="campaign-item-manage-campaign" key={campaign.pubkey.toString()}>
          <h3>{campaign.name}</h3>
          <p>{campaign.description}</p>
          <div className="campaign-actions">
            <button className="edit" onClick={() => onEdit(campaign.pubkey)}>Edit</button>
            <button className="delete" onClick={() => onDelete(campaign.pubkey)}>Delete</button>
            <button onClick={() => onWithdraw(campaign.pubkey)}>Withdraw</button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ManageCampaigns;