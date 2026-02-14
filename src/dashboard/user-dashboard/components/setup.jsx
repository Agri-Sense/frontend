import { useState, useContext } from 'react';
import { UserContext } from '../../../context/userContext';
import { toast, ToastContainer } from 'react-toastify';

const Setup = () => {
    const { user } = useContext(UserContext);
    const [farmSettings, setFarmSettings] = useState({
        farmName: user.firm_name || '',
        location: user.address || '',
        primaryCrop: 'Rice',
        farmSize: '5'
    });

    const handleSave = () => {
        toast.info("Settings saved locally for this session. Persistent farm metadata update coming in next version.");
    };

    return (
        <>
            <label className="content-header">Farm Configuration</label>
            <div style={{ padding: '20px', maxWidth: '800px' }}>
                <div style={{ backgroundColor: '#fff', padding: '30px', borderRadius: '15px', boxShadow: '0 4px 20px rgba(0,0,0,0.08)' }}>
                    <h5 style={{ color: '#2e7d32', marginBottom: '25px' }}>Farm Metadata & Infrastructure</h5>

                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '30px' }}>
                        <div>
                            <label style={{ display: 'block', marginBottom: '10px', fontSize: '14px', fontWeight: '600' }}>Farm/Firm name</label>
                            <input
                                type="text"
                                className="form-control"
                                value={farmSettings.farmName}
                                onChange={(e) => setFarmSettings({ ...farmSettings, farmName: e.target.value })}
                            />
                        </div>
                        <div>
                            <label style={{ display: 'block', marginBottom: '10px', fontSize: '14px', fontWeight: '600' }}>Primary Crop</label>
                            <select className="form-select" value={farmSettings.primaryCrop} onChange={(e) => setFarmSettings({ ...farmSettings, primaryCrop: e.target.value })}>
                                <option>Rice</option>
                                <option>Maize</option>
                                <option>Wheat</option>
                                <option>Cotton</option>
                            </select>
                        </div>
                        <div>
                            <label style={{ display: 'block', marginBottom: '10px', fontSize: '14px', fontWeight: '600' }}>Farm Size (Acres)</label>
                            <input
                                type="number"
                                className="form-control"
                                value={farmSettings.farmSize}
                                onChange={(e) => setFarmSettings({ ...farmSettings, farmSize: e.target.value })}
                            />
                        </div>
                        <div>
                            <label style={{ display: 'block', marginBottom: '10px', fontSize: '14px', fontWeight: '600' }}>Region/State</label>
                            <input
                                type="text"
                                className="form-control"
                                value={farmSettings.location}
                                onChange={(e) => setFarmSettings({ ...farmSettings, location: e.target.value })}
                            />
                        </div>
                    </div>

                    <div style={{ marginTop: '40px', paddingTop: '20px', borderTop: '1px solid #eee' }}>
                        <h6 style={{ color: '#666', marginBottom: '15px' }}>Device Configuration</h6>
                        <div style={{ display: 'flex', gap: '20px' }}>
                            <div style={{ flex: 1, padding: '15px', border: '1px solid #e0e0e0', borderRadius: '10px' }}>
                                <div style={{ fontWeight: 'bold', fontSize: '14px' }}>Main Hub (ESP32)</div>
                                <div style={{ fontSize: '12px', color: '#4CAF50' }}>Status: ONLINE • 192.168.1.104</div>
                            </div>
                            <div style={{ flex: 1, padding: '15px', border: '1px dashed #ccc', borderRadius: '10px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#999', cursor: 'pointer' }}>
                                <i className="bi bi-plus-circle" style={{ marginRight: '8px' }}></i> Add Slave Node
                            </div>
                        </div>
                    </div>

                    <button
                        onClick={handleSave}
                        style={{ marginTop: '30px', padding: '12px 30px', backgroundColor: '#4CAF50', color: '#fff', border: 'none', borderRadius: '8px', fontWeight: 'bold' }}
                    >
                        Save Configuration
                    </button>
                </div>
            </div>
            <ToastContainer />
        </>
    );
};

export default Setup;