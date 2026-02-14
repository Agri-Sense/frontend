import { useState, useEffect } from 'react';
import axios from 'axios';

const MarketNews = () => {
    const [news, setNews] = useState([]);
    const [loading, setLoading] = useState(true);

    const BACKEND_URL = 'http://localhost:9000';

    useEffect(() => {
        const fetchNews = async () => {
            try {
                const res = await axios.get(`${BACKEND_URL}/forum/news`);
                if (res.data.success) {
                    setNews(res.data.data);
                }
            } catch (err) {
                console.error("Failed to fetch news", err);
            } finally {
                setLoading(false);
            }
        };

        fetchNews();
    }, []);

    if (loading) return (
        <div style={{ padding: '40px', textAlign: 'center' }}>
            <div className="spinner-border text-success" role="status"></div>
            <p style={{ marginTop: '15px', color: '#666' }}>Fetching real-time market news...</p>
        </div>
    );

    return (
        <div style={{ padding: '20px', height: '100%', overflowY: 'auto' }}>
            <h4 style={{ marginBottom: '20px', color: '#2e7d32', borderBottom: '2px solid #e8f5e9', paddingBottom: '10px' }}>
                <i className="bi bi-newspaper" style={{ marginRight: '10px' }}></i>
                Indian Agricultural Market News
            </h4>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '15px' }}>
                {news.map((item, index) => (
                    <div key={index} style={{
                        backgroundColor: '#fff',
                        padding: '20px',
                        borderRadius: '12px',
                        boxShadow: '0 2px 8px rgba(0,0,0,0.05)',
                        borderLeft: '5px solid #4CAF50',
                        transition: 'transform 0.2s',
                        cursor: 'pointer'
                    }}
                        onClick={() => window.open(item.link, '_blank')}
                        onMouseOver={(e) => e.currentTarget.style.transform = 'translateY(-2px)'}
                        onMouseOut={(e) => e.currentTarget.style.transform = 'translateY(0)'}
                    >
                        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                            <span style={{ fontSize: '12px', color: '#2e7d32', fontWeight: 'bold', textTransform: 'uppercase' }}>
                                {item.source}
                            </span>
                            <span style={{ fontSize: '12px', color: '#999' }}>
                                {new Date(item.pubDate).toLocaleDateString(undefined, { day: 'numeric', month: 'short' })}
                            </span>
                        </div>
                        <h5 style={{ fontSize: '18px', color: '#333', marginBottom: '10px', lineHeight: '1.4' }}>
                            {item.title}
                        </h5>
                        <p style={{ fontSize: '14px', color: '#666', margin: 0 }}>
                            {item.snippet}
                        </p>
                    </div>
                ))}
            </div>

            <div style={{ textAlign: 'center', marginTop: '30px', color: '#999', fontSize: '12px' }}>
                Market data synced with Google News India • AgriSense AI
            </div>
        </div>
    );
};

export default MarketNews;
