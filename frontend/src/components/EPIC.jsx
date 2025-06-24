import React, { useState, useEffect } from 'react';
import axios from 'axios';

function formatDate(date) {
  return date.toISOString().split('T')[0];
}

const EPICCardSkeleton = () => (
  <div style={{ background: '#f4f6fa', borderRadius: 8, padding: 12 }}>
    <div style={{ height: 300, backgroundColor: '#eee', borderRadius: 6, marginBottom: 12 }} />
    <div style={{ height: 14, backgroundColor: '#eee', borderRadius: 4, width: '80%', marginBottom: 8 }} />
    <div style={{ height: 14, backgroundColor: '#eee', borderRadius: 4, width: '60%', marginBottom: 8 }} />
    <div style={{ height: 13, backgroundColor: '#eee', borderRadius: 4, width: '70%' }} />
  </div>
);

const EPIC = () => {
  const [date, setDate] = useState(formatDate(new Date()));
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchEPIC = async (selectedDate) => {
    setLoading(true);
    setError(null);
    try {
      const res = await axios.get(`/api/epic?date=${selectedDate}`);
      setImages(res.data || []);
    } catch (err) {
      setError('Failed to fetch EPIC images');
      setImages([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchEPIC(date);
  }, [date]);

  return (
    <div style={{ maxWidth: 900, margin: '2rem auto', padding: 24, background: '#fff', borderRadius: 12, boxShadow: '0 2px 16px rgba(0,0,0,0.08)' }}>
      <h2 style={{ textAlign: 'center', marginBottom: 16 }}>🌍 Earth from Space (EPIC)</h2>
      <p style={{ textAlign: 'center', color: '#666', marginBottom: 24 }}>
        Daily images of Earth from NASA's EPIC camera aboard the DSCOVR satellite
      </p>
      <div style={{ textAlign: 'center', margin: '1rem 0' }}>
        <input
          type="date"
          value={date}
          max={formatDate(new Date())}
          onChange={e => setDate(e.target.value)}
          style={{ padding: 6, borderRadius: 4, border: '1px solid #ccc' }}
        />
      </div>
      {loading && (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: 20, marginTop: 24 }}>
          {Array.from({ length: 4 }).map((_, i) => <EPICCardSkeleton key={i} />)}
        </div>
      )}
      {error && <div style={{ color: 'red', textAlign: 'center' }}>{error}. Please try another date.</div>}
      {!loading && !error && images.length === 0 && (
        <div style={{ textAlign: 'center', color: '#888' }}>No images found for this date. Please try another day.</div>
      )}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: 20, marginTop: 24 }}>
        {images.map((image, index) => (
          <div key={index} style={{ background: '#f4f6fa', borderRadius: 8, padding: 12, boxShadow: '0 1px 8px rgba(0,0,0,0.05)' }}>
            <img 
              src={`https://epic.gsfc.nasa.gov/archive/natural/${date.replace(/-/g, '/')}/png/${image.image}.png`}
              alt={`Earth from space on ${date}`}
              style={{ width: '100%', borderRadius: 6, marginBottom: 12 }}
            />
            <div style={{ fontSize: 14, marginBottom: 8 }}>
              <strong>Date:</strong> {image.date}
            </div>
            <div style={{ fontSize: 14, marginBottom: 8 }}>
              <strong>Time:</strong> {image.caption}
            </div>
            <div style={{ fontSize: 13, color: '#666' }}>
              <strong>Distance:</strong> {image.centroid_coordinates ? 
                `${Math.round(image.centroid_coordinates.lat)}°N, ${Math.round(image.centroid_coordinates.lon)}°E` : 
                'N/A'
              }
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default EPIC; 