import React, { useState } from 'react';
import { useAuth } from '../../hooks/useAuth'; // assuming this exists


const WhatsappMarketing = () => {
  const { user } = useAuth();
  
  const [filters, setFilters] = useState({ doctorId: '', serviceId: '', startDate: '', endDate: '' });
  const [campaign, setCampaign] = useState({ text: '', imageUrl: '', link: '' });
  const [count, setCount] = useState(null);

  const handleFilterChange = (e) => setFilters({ ...filters, [e.target.name]: e.target.value });
  const handleCampaignChange = (e) => setCampaign({ ...campaign, [e.target.name]: e.target.value });

  const getAudienceCount = async () => {
    try {
      const qs = new URLSearchParams(filters).toString();
      const res = await fetch(`/api/whatsapp-marketing/audience-count?${qs}`, {
        headers: { 'Authorization': `Bearer ${user.token}` },
      });
      const data = await res.json();
      setCount(data.count);
    } catch (err) {
      console.error(err);
      alert('Failed to get audience count');
    }
  };

  const sendCampaign = async () => {
    try {
      const res = await fetch(`/api/whatsapp-marketing/send-campaign`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${user.token}`,
        },
        body: JSON.stringify({ ...filters, ...campaign }),
      });
      const data = await res.json();
      alert(data.message || 'Campaign sent!');
    } catch (err) {
      console.error(err);
      alert('Failed to send campaign');
    }
  };

  return (
    <div className="page-wrapper">
      <div className="content">
        <div className="page-header">
          <div className="row">
            <div className="col-sm-12">
              <h3 className="page-title">WhatsApp Marketing</h3>
            </div>
          </div>
        </div>
        
        <div className="row">
          <div className="col-md-6">
            <div className="card">
              <div className="card-header"><h4 className="card-title">Audience Filters</h4></div>
              <div className="card-body">
                <div className="form-group mb-3">
                  <label>Doctor ID</label>
                  <input type="text" className="form-control" name="doctorId" onChange={handleFilterChange} />
                </div>
                <div className="form-group mb-3">
                  <label>Service ID</label>
                  <input type="text" className="form-control" name="serviceId" onChange={handleFilterChange} />
                </div>
                <div className="form-group mb-3">
                  <label>Start Date</label>
                  <input type="date" className="form-control" name="startDate" onChange={handleFilterChange} />
                </div>
                <div className="form-group mb-3">
                  <label>End Date</label>
                  <input type="date" className="form-control" name="endDate" onChange={handleFilterChange} />
                </div>
                <button className="btn btn-primary" onClick={getAudienceCount}>Check Audience Count</button>
                {count !== null && <p className="mt-2">Total Audience: {count}</p>}
              </div>
            </div>
          </div>

          <div className="col-md-6">
            <div className="card">
              <div className="card-header"><h4 className="card-title">Campaign Content</h4></div>
              <div className="card-body">
                <div className="form-group mb-3">
                  <label>Message Text</label>
                  <textarea className="form-control" name="text" onChange={handleCampaignChange} rows="4"></textarea>
                </div>
                <div className="form-group mb-3">
                  <label>Image URL</label>
                  <input type="text" className="form-control" name="imageUrl" onChange={handleCampaignChange} />
                </div>
                <div className="form-group mb-3">
                  <label>Link</label>
                  <input type="text" className="form-control" name="link" onChange={handleCampaignChange} />
                </div>
                <button className="btn btn-success" onClick={sendCampaign}>Send Campaign Message</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WhatsappMarketing;
