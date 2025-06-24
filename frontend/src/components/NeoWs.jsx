import React, { useState, useEffect } from 'react';
import axios from 'axios';

function formatDate(date) {
  return date.toISOString().split('T')[0];
}

const SkeletonLoader = () => (
  <div style={{ background: '#f4f6fa', borderRadius: 8, padding: 16, marginBottom: 16 }}>
    <div style={{ height: 20, backgroundColor: '#eee', borderRadius: 4, width: '60%', marginBottom: 12 }} />
    <div style={{ height: 14, backgroundColor: '#eee', borderRadius: 4, width: '80%', marginBottom: 8 }} />
    <div style={{ height: 14, backgroundColor: '#eee', borderRadius: 4, width: '70%' }} />
  </div>
);

const NeoWs = () => {
  const [startDate, setStartDate] = useState(formatDate(new Date()));
  const [neos, setNeos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchNeos = async (date) => {
    setLoading(true);
    setError(null);
    const endDate = new Date(date);
    endDate.setDate(endDate.getDate() + 7);
    const formattedEndDate = formatDate(endDate);
    
    try {
      const res = await axios.get(`/api/neos?start_date=${date}&end_date=${formattedEndDate}`);
      const neoData = res.data.near_earth_objects;
      const allNeos = Object.values(neoData).flat().sort((a, b) => new Date(a.close_approach_data[0].close_approach_date_full) - new Date(b.close_approach_data[0].close_approach_date_full));
      setNeos(allNeos);
    } catch (err) {
      setError('Failed to fetch Near Earth Objects');
      setNeos([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchNeos(startDate);
  }, [startDate]);

  return (
    <div style={{ maxWidth: 900, margin: '2rem auto', padding: 24, background: '#fff', borderRadius: 12, boxShadow: '0 2px 16px rgba(0,0,0,0.08)' }}>
      <h2 style={{ textAlign: 'center', marginBottom: 16 }}>☄️ Near Earth Objects (Next 7 Days)</h2>
      <div style={{ textAlign: 'center', margin: '1rem 0' }}>
        <label>Start Date: </label>
        <input
          type="date"
          value={startDate}
          onChange={e => setStartDate(e.target.value)}
          style={{ padding: 6, borderRadius: 4, border: '1px solid #ccc' }}
        />
      </div>
      
      {loading && Array.from({ length: 5 }).map((_, i) => <SkeletonLoader key={i} />)}
      {error && <div style={{ color: 'red', textAlign: 'center' }}>{error}. Please try another date.</div>}
      
      {!loading && !error && neos.length === 0 && (
        <div style={{ textAlign: 'center', color: '#888' }}>No Near Earth Objects found for this period.</div>
      )}

      {!loading && neos.map(neo => (
        <div key={neo.id} style={{ background: neo.is_potentially_hazardous_asteroid ? '#fff0f0' : '#f4f6fa', borderLeft: `5px solid ${neo.is_potentially_hazardous_asteroid ? '#ff4d4f' : '#1890ff'}`, borderRadius: 8, padding: 16, marginBottom: 16, boxShadow: '0 1px 8px rgba(0,0,0,0.05)' }}>
          <h4 style={{ margin: '0 0 10px 0' }}>{neo.name}</h4>
          <p style={{ margin: '4px 0' }}><strong>Closest Approach:</strong> {new Date(neo.close_approach_data[0].close_approach_date_full).toLocaleString()}</p>
          <p style={{ margin: '4px 0' }}><strong>Estimated Diameter:</strong> {Math.round(neo.estimated_diameter.meters.estimated_diameter_min)} - {Math.round(neo.estimated_diameter.meters.estimated_diameter_max)} meters</p>
          <p style={{ margin: '4px 0' }}><strong>Miss Distance:</strong> {parseFloat(neo.close_approach_data[0].miss_distance.kilometers).toLocaleString()} km</p>
          {neo.is_potentially_hazardous_asteroid && <p style={{ color: '#ff4d4f', fontWeight: 'bold', margin: '8px 0 0 0' }}>Potentially Hazardous</p>}
        </div>
      ))}
    </div>
  );
};

export default NeoWs; 