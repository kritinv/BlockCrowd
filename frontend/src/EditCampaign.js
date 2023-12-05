import React, { useState } from 'react';
import "./EditCampaign.css";

const EditCampaign = ({ campaign, onSaveEdit, onCancel }) => {
  const [name, setName] = useState(campaign.name);
  const [description, setDescription] = useState(campaign.description);

  const handleSubmit = (e) => {
    e.preventDefault();
    onSaveEdit(campaign.pubkey, name, description);
  };

  return (
    <div className="edit-campaign">
      <h2>Edit Campaign</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="name">Campaign Name:</label>
          <input
            type="text"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="description">Description:</label>
          <textarea
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          />
        </div>
        <div className="form-actions">
          <button type="submit" className="save-button">Save Changes</button>
          <button type="button" className="cancel-button" onClick={onCancel}>Cancel</button>
        </div>
      </form>
    </div>
  );
};

export default EditCampaign;