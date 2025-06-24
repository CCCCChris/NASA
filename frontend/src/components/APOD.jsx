import React, { useState, useEffect } from 'react';
import axios from 'axios';

function formatDate(date) {
  return date.toISOString().split('T')[0];
}

const Skeleton = () => (
  <div>
    <div style={{ height: 28, backgroundColor: '#eee', borderRadius: 4, margin: '16px 0' }} />
    <div style={{ height: 450, backgroundColor: '#eee', borderRadius: 8 }} />
    <div style={{ height: 16, backgroundColor: '#eee', borderRadius: 4, marginTop: 16 }} />
    <div style={{ height: 16, width: '75%', backgroundColor: '#eee', borderRadius: 4, marginTop: 8 }} />
  </div>
);

const APOD = () => {
  const [date, setDate] = useState(formatDate(new Date()));
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchAPOD = async (selectedDate) => {
    setLoading(true);
    setError(null);
    try {
      const res = await axios.get(`/api/apod?date=${selectedDate}`);
      setData(res.data);
    } catch (err) {
      setError('Failed to fetch APOD');
      setData(null);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAPOD(date);
  }, [date]);

  return (
    <div style={{ maxWidth: 600, margin: '2rem auto', padding: 24, background: '#fff', borderRadius: 12, boxShadow: '0 2px 16px rgba(0,0,0,0.08)' }}>
      <h2 style={{ textAlign: 'center', marginBottom: 16 }}>🌌 NASA Astronomy Picture of the Day</h2>
      <div style={{ textAlign: 'center', margin: '1rem 0' }}>
        <input
          type="date"
          value={date}
          max={formatDate(new Date())}
          onChange={e => setDate(e.target.value)}
          style={{ padding: 6, borderRadius: 4, border: '1px solid #ccc' }}
        />
      </div>
      {loading && <Skeleton />}
      {error && <div style={{ color: 'red', textAlign: 'center' }}>{error}. Please try another date.</div>}
      {data && !loading && (
        <div>
          <h3 style={{ textAlign: 'center', margin: '16px 0' }}>{data.title}</h3>
          {data.media_type === 'image' ? (
            <img src={data.url} alt={data.title} style={{ width: '100%', borderRadius: 8, boxShadow: '0 1px 8px rgba(0,0,0,0.08)' }} />
          ) : (
            <iframe title="apod-video" src={data.url} frameBorder="0" allowFullScreen style={{ width: '100%', minHeight: 400, borderRadius: 8 }} />
          )}
          <p style={{ marginTop: 16, lineHeight: 1.6 }}>{data.explanation}</p>
          <p style={{ fontSize: 12, color: '#888', textAlign: 'right' }}>© {data.copyright || 'NASA'}</p>
        </div>
      )}
    </div>
  );
};

export default APOD; 