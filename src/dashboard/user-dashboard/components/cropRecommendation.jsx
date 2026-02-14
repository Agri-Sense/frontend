import { useState } from 'react'
import axios from 'axios'
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const MODEL_SERVER_URL = 'http://localhost:8000';

const CropRecommendation = () => {
    const [formData, setFormData] = useState({
        nitrogen: '',
        phosphorus: '',
        potassium: '',
        temperature: '',
        humidity: '',
        ph: '',
        rainfall: ''
    });
    const [result, setResult] = useState(null);
    const [loading, setLoading] = useState(false);

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Validate all fields
        if (!formData.nitrogen || !formData.phosphorus || !formData.potassium ||
            !formData.temperature || !formData.humidity || !formData.ph || !formData.rainfall) {
            toast.error("Please fill in all fields");
            return;
        }

        setLoading(true);
        try {
            const response = await axios.get(
                `${MODEL_SERVER_URL}/pred/${formData.nitrogen}/${formData.phosphorus}/${formData.potassium}/${formData.temperature}/${formData.humidity}/${formData.ph}/${formData.rainfall}`
            );

            if (response.data.recommendations) {
                setResult(response.data.recommendations);
                toast.success(`Recommended Crops: ${response.data.recommendations.join(", ")}`);
            } else if (response.data.error) {
                toast.error(response.data.error);
            }
        } catch (error) {
            console.error(error);
            toast.error("Failed to get crop recommendation");
        } finally {
            setLoading(false);
        }
    };

    const cropInfo = {
        'rice': { season: 'Kharif', water: 'High', soil: 'Clay loam' },
        'maize': { season: 'Kharif/Rabi', water: 'Medium', soil: 'Well-drained' },
        'jute': { season: 'Kharif', water: 'High', soil: 'Alluvial' },
        'cotton': { season: 'Kharif', water: 'Medium', soil: 'Black cotton' },
        'coconut': { season: 'Year-round', water: 'High', soil: 'Sandy loam' },
        'papaya': { season: 'Year-round', water: 'Medium', soil: 'Well-drained' },
        'orange': { season: 'Rabi', water: 'Medium', soil: 'Red loamy' },
        'apple': { season: 'Rabi', water: 'Medium', soil: 'Well-drained' },
        'muskmelon': { season: 'Summer', water: 'Low', soil: 'Sandy' },
        'watermelon': { season: 'Summer', water: 'Low', soil: 'Sandy' },
        'grapes': { season: 'Spring', water: 'Medium', soil: 'Loamy' },
        'mango': { season: 'Kharif', water: 'Medium', soil: 'Alluvial' },
        'banana': { season: 'Year-round', water: 'High', soil: 'Deep loamy' },
        'pomegranate': { season: 'Spring', water: 'Low', soil: 'Well-drained' },
        'lentil': { season: 'Rabi', water: 'Low', soil: 'Loamy' },
        'blackgram': { season: 'Kharif', water: 'Medium', soil: 'Black cotton' },
        'mungbean': { season: 'Kharif/Summer', water: 'Low', soil: 'Sandy loam' },
        'mothbeans': { season: 'Kharif', water: 'Low', soil: 'Sandy' },
        'pigeonpeas': { season: 'Kharif', water: 'Low', soil: 'Well-drained' },
        'kidneybeans': { season: 'Rabi', water: 'Medium', soil: 'Loamy' },
        'chickpea': { season: 'Rabi', water: 'Low', soil: 'Sandy loam' },
        'coffee': { season: 'Year-round', water: 'Medium', soil: 'Red loamy' }
    };

    return (
        <>
            <label htmlFor="#" className="content-header">Crop Recommendation</label>
            <div style={{ padding: '20px', maxWidth: '800px', margin: '0 auto' }}>
                <div style={{
                    backgroundColor: '#f8f9fa',
                    padding: '25px',
                    borderRadius: '10px',
                    boxShadow: '0 2px 10px rgba(0,0,0,0.1)'
                }}>
                    <p style={{ marginBottom: '20px', color: '#666' }}>
                        Enter your soil and environmental data to get top 3 crop recommendations
                    </p>

                    <form onSubmit={handleSubmit}>
                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '15px' }}>
                            <div>
                                <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>Nitrogen (N)</label>
                                <input
                                    type="number"
                                    name="nitrogen"
                                    value={formData.nitrogen}
                                    onChange={handleChange}
                                    placeholder="0-140"
                                    style={{ width: '100%', padding: '10px', borderRadius: '5px', border: '1px solid #ddd' }}
                                />
                            </div>
                            <div>
                                <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>Phosphorus (P)</label>
                                <input
                                    type="number"
                                    name="phosphorus"
                                    value={formData.phosphorus}
                                    onChange={handleChange}
                                    placeholder="0-145"
                                    style={{ width: '100%', padding: '10px', borderRadius: '5px', border: '1px solid #ddd' }}
                                />
                            </div>
                            <div>
                                <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>Potassium (K)</label>
                                <input
                                    type="number"
                                    name="potassium"
                                    value={formData.potassium}
                                    onChange={handleChange}
                                    placeholder="0-205"
                                    style={{ width: '100%', padding: '10px', borderRadius: '5px', border: '1px solid #ddd' }}
                                />
                            </div>
                            <div>
                                <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>Temperature (°C)</label>
                                <input
                                    type="number"
                                    name="temperature"
                                    value={formData.temperature}
                                    onChange={handleChange}
                                    placeholder="10-45"
                                    step="0.1"
                                    style={{ width: '100%', padding: '10px', borderRadius: '5px', border: '1px solid #ddd' }}
                                />
                            </div>
                            <div>
                                <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>Humidity (%)</label>
                                <input
                                    type="number"
                                    name="humidity"
                                    value={formData.humidity}
                                    onChange={handleChange}
                                    placeholder="10-100"
                                    step="0.1"
                                    style={{ width: '100%', padding: '10px', borderRadius: '5px', border: '1px solid #ddd' }}
                                />
                            </div>
                            <div>
                                <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>pH Level</label>
                                <input
                                    type="number"
                                    name="ph"
                                    value={formData.ph}
                                    onChange={handleChange}
                                    placeholder="3-10"
                                    step="0.1"
                                    style={{ width: '100%', padding: '10px', borderRadius: '5px', border: '1px solid #ddd' }}
                                />
                            </div>
                            <div>
                                <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>Rainfall (mm)</label>
                                <input
                                    type="number"
                                    name="rainfall"
                                    value={formData.rainfall}
                                    onChange={handleChange}
                                    placeholder="20-300"
                                    step="0.1"
                                    style={{ width: '100%', padding: '10px', borderRadius: '5px', border: '1px solid #ddd' }}
                                />
                            </div>
                        </div>

                        <button
                            type="submit"
                            disabled={loading}
                            style={{
                                marginTop: '20px',
                                width: '100%',
                                padding: '12px',
                                backgroundColor: loading ? '#ccc' : '#4CAF50',
                                color: 'white',
                                border: 'none',
                                borderRadius: '5px',
                                cursor: loading ? 'not-allowed' : 'pointer',
                                fontSize: '16px',
                                fontWeight: 'bold'
                            }}
                        >
                            {loading ? 'Analyzing...' : 'Get Recommendation'}
                        </button>
                    </form>

                    {result && Array.isArray(result) && (
                        <div style={{ marginTop: '25px' }}>
                            <h2 style={{ color: '#2e7d32', textAlign: 'center' }}>Recommended Crops</h2>
                            <div style={{
                                display: 'grid',
                                gridTemplateColumns: result.length > 1 ? 'repeat(auto-fit, minmax(200px, 1fr))' : '1fr',
                                gap: '20px'
                            }}>
                                {result.map((crop, index) => (
                                    <div key={index} style={{
                                        padding: '15px',
                                        backgroundColor: index === 0 ? '#e8f5e9' : '#fff',
                                        borderRadius: '10px',
                                        border: index === 0 ? '2px solid #4CAF50' : '1px solid #ddd',
                                        textAlign: 'center',
                                        boxShadow: index === 0 ? '0 4px 12px rgba(76, 175, 80, 0.2)' : '0 2px 4px rgba(0,0,0,0.05)'
                                    }}>
                                        <div style={{ fontSize: '12px', color: '#666', marginBottom: '5px' }}>
                                            {index === 0 ? 'Best Match' : `Suggestion #${index + 1}`}
                                        </div>
                                        <h3 style={{ color: '#1b5e20', margin: '5px 0', fontSize: index === 0 ? '24px' : '20px' }}>
                                            {crop.charAt(0).toUpperCase() + crop.slice(1)}
                                        </h3>

                                        {cropInfo[crop] && (
                                            <div style={{
                                                display: 'flex',
                                                flexDirection: 'column',
                                                gap: '5px',
                                                marginTop: '10px',
                                                fontSize: '13px',
                                                textAlign: 'left'
                                            }}>
                                                <span>📅 <strong>Season:</strong> {cropInfo[crop].season}</span>
                                                <span>💧 <strong>Water:</strong> {cropInfo[crop].water}</span>
                                                <span>🌍 <strong>Soil:</strong> {cropInfo[crop].soil}</span>
                                            </div>
                                        )}
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}
                </div>
            </div>
            <ToastContainer />
        </>
    );
};

export default CropRecommendation;
