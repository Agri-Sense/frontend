import { useLiveSensing } from '../../../hooks/useLiveSensing';

const Insights = () => {
    const { data, status } = useLiveSensing();

    const getStatusColor = (val, min, max) => {
        if (val < min || val > max) return '#e74c3c'; // Danger
        return '#2ecc71'; // Healthy
    };

    const getRecommendation = (type, val) => {
        if (type === 'temperature') {
            if (val > 35) return "Turn on ventilation/cooling";
            if (val < 15) return "Ensure Greenhouse heating";
        }
        if (type === 'moisture') {
            if (val < 30) return "Enable Irrigation System";
            if (val > 80) return "Stop Irrigation immediately";
        }
        if (type === 'light') {
            if (val < 100) return "Check for shading issues";
        }
        return "System running optimally";
    };

    if (!data) return (
        <div style={{ padding: '40px', textAlign: 'center' }}>
            <div className="spinner-border text-success" role="status"></div>
            <p style={{ marginTop: '15px' }}>Waiting for sensor data...</p>
        </div>
    );

    return (
        <>
            <label className="content-header">Farm Health Insights</label>
            <div style={{ padding: '20px' }}>
                <div style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
                    gap: '20px',
                    marginBottom: '30px'
                }}>
                    {/* Temperature Card */}
                    <div style={{ backgroundColor: '#fff', padding: '20px', borderRadius: '15px', boxShadow: '0 4px 6px rgba(0,0,0,0.05)', borderLeft: `8px solid ${getStatusColor(data.temperature, 20, 30)}` }}>
                        <div style={{ color: '#666', fontSize: '14px', fontWeight: 'bold' }}>TEMPERATURE</div>
                        <div style={{ fontSize: '32px', margin: '10px 0', color: '#333' }}>{data.temperature}°C</div>
                        <div style={{ fontSize: '13px', color: '#888' }}>Rec: {getRecommendation('temperature', data.temperature)}</div>
                    </div>

                    {/* Humidity Card */}
                    <div style={{ backgroundColor: '#fff', padding: '20px', borderRadius: '15px', boxShadow: '0 4px 6px rgba(0,0,0,0.05)', borderLeft: `8px solid ${getStatusColor(data.humidity, 40, 70)}` }}>
                        <div style={{ color: '#666', fontSize: '14px', fontWeight: 'bold' }}>HUMIDITY</div>
                        <div style={{ fontSize: '32px', margin: '10px 0', color: '#333' }}>{data.humidity}%</div>
                        <div style={{ fontSize: '13px', color: '#888' }}>Rec: System running optimally</div>
                    </div>

                    {/* Moisture Card */}
                    <div style={{ backgroundColor: '#fff', padding: '20px', borderRadius: '15px', boxShadow: '0 4px 6px rgba(0,0,0,0.05)', borderLeft: `8px solid ${getStatusColor(data.moisture, 30, 60)}` }}>
                        <div style={{ color: '#666', fontSize: '14px', fontWeight: 'bold' }}>SOIL MOISTURE</div>
                        <div style={{ fontSize: '32px', margin: '10px 0', color: '#333' }}>{data.moisture}%</div>
                        <div style={{ fontSize: '13px', color: '#888' }}>Rec: {getRecommendation('moisture', data.moisture)}</div>
                    </div>

                    {/* Light Card */}
                    <div style={{ backgroundColor: '#fff', padding: '20px', borderRadius: '15px', boxShadow: '0 4px 6px rgba(0,0,0,0.05)', borderLeft: `8px solid ${getStatusColor(data.light, 200, 800)}` }}>
                        <div style={{ color: '#666', fontSize: '14px', fontWeight: 'bold' }}>LIGHT INTENSITY</div>
                        <div style={{ fontSize: '32px', margin: '10px 0', color: '#333' }}>{data.light} LUX</div>
                        <div style={{ fontSize: '13px', color: '#888' }}>Rec: {getRecommendation('light', data.light)}</div>
                    </div>
                </div>

                <div style={{
                    backgroundColor: '#e8f5e9',
                    padding: '20px',
                    borderRadius: '12px',
                    border: '1px solid #c8e6c9',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '15px'
                }}>
                    <i className="bi bi-info-circle-fill" style={{ fontSize: '24px', color: '#2e7d32' }}></i>
                    <div>
                        <strong style={{ display: 'block', color: '#1b5e20' }}>System Status: {status}</strong>
                        <span style={{ fontSize: '14px', color: '#388e3c' }}>All sensors are transmitting live data to the analysis engine. Thresholds are calibrated for standard vegetable crops.</span>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Insights;