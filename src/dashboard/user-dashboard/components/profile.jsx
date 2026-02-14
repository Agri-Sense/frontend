import { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { UserContext } from '../../../context/userContext';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Profile = () => {
    const { user, setUser } = useContext(UserContext);
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [formData, setFormData] = useState({
        full_name: '',
        phone: '',
        firm_name: '',
        address: '',
        country: ''
    });

    const BACKEND_URL = 'http://localhost:9000';

    useEffect(() => {
        const fetchProfile = async () => {
            try {
                const token = JSON.parse(localStorage.getItem('userInfo'))?.token;
                const res = await axios.get(`${BACKEND_URL}/user/profile`, {
                    headers: { Authorization: `Bearer ${token}` }
                });

                if (res.data.success) {
                    setFormData({
                        full_name: res.data.data.full_name || '',
                        phone: res.data.data.phone || '',
                        firm_name: res.data.data.firm_name || '',
                        address: res.data.data.address || '',
                        country: res.data.data.country || ''
                    });
                }
            } catch (err) {
                console.error(err);
                toast.error("Failed to fetch profile data");
            } finally {
                setLoading(false);
            }
        };

        fetchProfile();
    }, []);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setSaving(true);
        try {
            const token = JSON.parse(localStorage.getItem('userInfo'))?.token;
            const res = await axios.put(`${BACKEND_URL}/user/profile`, formData, {
                headers: { Authorization: `Bearer ${token}` }
            });

            if (res.data.success) {
                toast.success("Profile updated successfully!");
                // Update context if needed
                const updatedUser = { ...user, ...res.data.data };
                setUser(updatedUser);
                localStorage.setItem('userInfo', JSON.stringify(updatedUser));
            }
        } catch (err) {
            console.error(err);
            toast.error(err.response?.data?.error || "Failed to update profile");
        } finally {
            setSaving(false);
        }
    };

    if (loading) return <div style={{ padding: '20px', textAlign: 'center' }}>Loading profile...</div>;

    return (
        <>
            <label className="content-header">Edit Profile</label>
            <div style={{ padding: '20px', maxWidth: '600px', margin: '0 auto' }}>
                <div style={{
                    backgroundColor: '#fff',
                    padding: '30px',
                    borderRadius: '12px',
                    boxShadow: '0 4px 15px rgba(0,0,0,0.05)'
                }}>
                    <div style={{ textAlign: 'center', marginBottom: '30px' }}>
                        <img
                            src={user.profile_pic || "https://res.cloudinary.com/du4ytrjmm/image/upload/v1673176521/agri-sense/blank-profile-picture-973460_1280_snt79x.png"}
                            alt="Profile"
                            style={{ width: '100px', height: '100px', borderRadius: '50%', objectFit: 'cover', border: '3px solid #4CAF50' }}
                        />
                        <h4 style={{ marginTop: '15px', color: '#333' }}>{user.username}</h4>
                        <span style={{ color: '#666', fontSize: '14px' }}>{user.email}</span>
                    </div>

                    <form onSubmit={handleSubmit}>
                        <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '20px' }}>
                            <div>
                                <label style={{ display: 'block', marginBottom: '8px', fontWeight: 'bold', color: '#555' }}>Full Name</label>
                                <input
                                    type="text"
                                    name="full_name"
                                    value={formData.full_name}
                                    onChange={handleChange}
                                    style={{ width: '100%', padding: '12px', borderRadius: '8px', border: '1px solid #ddd' }}
                                    required
                                />
                            </div>
                            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '15px' }}>
                                <div>
                                    <label style={{ display: 'block', marginBottom: '8px', fontWeight: 'bold', color: '#555' }}>Phone</label>
                                    <input
                                        type="text"
                                        name="phone"
                                        value={formData.phone}
                                        onChange={handleChange}
                                        style={{ width: '100%', padding: '12px', borderRadius: '8px', border: '1px solid #ddd' }}
                                        required
                                    />
                                </div>
                                <div>
                                    <label style={{ display: 'block', marginBottom: '8px', fontWeight: 'bold', color: '#555' }}>Country</label>
                                    <input
                                        type="text"
                                        name="country"
                                        value={formData.country}
                                        onChange={handleChange}
                                        style={{ width: '100%', padding: '12px', borderRadius: '8px', border: '1px solid #ddd' }}
                                        required
                                    />
                                </div>
                            </div>
                            <div>
                                <label style={{ display: 'block', marginBottom: '8px', fontWeight: 'bold', color: '#555' }}>Firm Name</label>
                                <input
                                    type="text"
                                    name="firm_name"
                                    value={formData.firm_name}
                                    onChange={handleChange}
                                    style={{ width: '100%', padding: '12px', borderRadius: '8px', border: '1px solid #ddd' }}
                                />
                            </div>
                            <div>
                                <label style={{ display: 'block', marginBottom: '8px', fontWeight: 'bold', color: '#555' }}>Address</label>
                                <textarea
                                    name="address"
                                    value={formData.address}
                                    onChange={handleChange}
                                    rows="3"
                                    style={{ width: '100%', padding: '12px', borderRadius: '8px', border: '1px solid #ddd', resize: 'none' }}
                                    required
                                />
                            </div>
                        </div>

                        <button
                            type="submit"
                            disabled={saving}
                            style={{
                                marginTop: '30px',
                                width: '100%',
                                padding: '14px',
                                backgroundColor: saving ? '#ccc' : '#4CAF50',
                                color: 'white',
                                border: 'none',
                                borderRadius: '8px',
                                cursor: saving ? 'not-allowed' : 'pointer',
                                fontSize: '16px',
                                fontWeight: 'bold',
                                transition: '0.3s'
                            }}
                        >
                            {saving ? 'Saving Changes...' : 'Save Profile'}
                        </button>
                    </form>
                </div>
            </div>
            <ToastContainer />
        </>
    );
};

export default Profile;