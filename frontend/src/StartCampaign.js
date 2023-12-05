// StartCampaign.js

import React, { useState } from 'react';
import "./StartCampaign.css"

const StartCampaign = ({ onCreateCampaign }) => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    onCreateCampaign(name, description);
  };

  return (
    <div className="start-campaign">
      <h2>Start a New Campaign</h2>
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
        <button type="submit">Create Campaign</button>
      </form>
    </div>
  );
};

export default StartCampaign;