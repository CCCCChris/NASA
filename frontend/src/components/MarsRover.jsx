import React, { useState, useEffect } from 'react';
import axios from 'axios';

const ROVERS = [
  { name: 'Curiosity', cameras: ['FHAZ', 'RHAZ', 'MAST', 'CHEMCAM', 'MAHLI', 'MARDI', 'NAVCAM'] },
  { name: 'Opportunity', cameras: ['FHAZ', 'RHAZ', 'NAVCAM', 'PANCAM', 'MINITES'] },
  { name: 'Spirit', cameras: ['FHAZ', 'RHAZ', 'NAVCAM', 'PANCAM', 'MINITES'] },
];

function formatDate(date) {
  return date.toISOString().split('T')[0];
}

const PhotoCardSkeleton = () => (
  <div style={{ background: '#f4f6fa', borderRadius: 8, padding: 8 }}>
    <div style={{ height: 180, backgroundColor: '#eee', borderRadius: 6 }} />
    <div style={{ height: 14, backgroundColor: '#eee', borderRadius: 4, marginTop: 10, width: '80%' }} />
    <div style={{ height: 13, backgroundColor: '#eee', borderRadius: 4, marginTop: 6, width: '60%' }} />
  </div>
);

const MarsRover = () => {
  const [rover, setRover] = useState('Curiosity');
  const [date, setDate] = useState('2020-07-01');
  const [camera, setCamera] = useState('FHAZ');
  const [photos, setPhotos] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchPhotos = async () => {
    setLoading(true);
    setError(null);
    setPhotos([]);
    try {
      const res = await axios.get(`/api/mars-photos?rover=${rover}&date=${date}&camera=${camera}`);
      setPhotos(res.data.photos || []);
    } catch (err) {
      setError('Failed to fetch Mars photos');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPhotos();
    // eslint-disable-next-line
  }, [rover, date, camera]);

  return (
    <div style={{ maxWidth: 900, margin: '2rem auto', padding: 24, background: '#fff', borderRadius: 12, boxShadow: '0 2px 16px rgba(0,0,0,0.08)' }}>
      <h2 style={{ textAlign: 'center', marginBottom: 16 }}>🚗 Mars Rover Photos</h2>
      <div style={{ display: 'flex', justifyContent: 'center', gap: 16, marginBottom: 24, flexWrap: 'wrap' }}>
        <select value={rover} onChange={e => { setRover(e.target.value); setCamera(ROVERS.find(r => r.name === e.target.value).cameras[0]); }} style={{ padding: 6, borderRadius: 4, border: '1px solid #ccc' }}>
          {ROVERS.map(r => <option key={r.name} value={r.name}>{r.name}</option>)}
        </select>
        <input type="date" value={date} max={formatDate(new Date())} onChange={e => setDate(e.target.value)} style={{ padding: 6, borderRadius: 4, border: '1px solid #ccc' }} />
        <select value={camera} onChange={e => setCamera(e.target.value)} style={{ padding: 6, borderRadius: 4, border: '1px solid #ccc' }}>
          {ROVERS.find(r => r.name === rover).cameras.map(cam => <option key={cam} value={cam}>{cam}</option>)}
        </select>
      </div>
      {loading && (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: 16 }}>
          {Array.from({ length: 8 }).map((_, i) => <PhotoCardSkeleton key={i} />)}
        </div>
      )}
      {error && <div style={{ color: 'red', textAlign: 'center' }}>{error}. Please try different parameters.</div>}
      {!loading && !error && photos.length === 0 && <div style={{ textAlign: 'center', color: '#888' }}>No photos found for this selection. Try another date or camera.</div>}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: 16 }}>
        {photos.map(photo => (
          <div key={photo.id} style={{ background: '#f4f6fa', borderRadius: 8, padding: 8, boxShadow: '0 1px 8px rgba(0,0,0,0.05)' }}>
            <img src={photo.img_src} alt={photo.camera.full_name} style={{ width: '100%', borderRadius: 6 }} />
            <div style={{ fontSize: 14, marginTop: 8 }}><b>Camera:</b> {photo.camera.name}</div>
            <div style={{ fontSize: 13, color: '#888' }}><b>Earth Date:</b> {photo.earth_date}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MarsRover; 