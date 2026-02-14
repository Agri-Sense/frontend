import { useState, useEffect } from 'react';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Operations = () => {
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);

    const BACKEND_URL = 'http://localhost:9000';

    useEffect(() => {
        const fetchOrders = async () => {
            try {
                const token = JSON.parse(localStorage.getItem('userInfo'))?.token;
                const res = await axios.get(`${BACKEND_URL}/user/get-order`, {
                    headers: { Authorization: `Bearer ${token}` }
                });

                if (res.data.success) {
                    setOrders(res.data.data);
                }
            } catch (err) {
                console.error(err);
                toast.error("Failed to fetch orders");
            } finally {
                setLoading(false);
            }
        };

        fetchOrders();
    }, []);

    const toggleStatus = async (orderId) => {
        try {
            const token = JSON.parse(localStorage.getItem('userInfo'))?.token;
            const res = await axios.post(`${BACKEND_URL}/user/change-status`, { order_id: orderId }, {
                headers: { Authorization: `Bearer ${token}` }
            });

            if (res.data.success) {
                setOrders(prev => prev.map(o => o._id === orderId ? { ...o, status: !o.status } : o));
                toast.success("Order status toggled");
            }
        } catch (err) {
            toast.error("Failed to change status");
        }
    };

    if (loading) return <div style={{ padding: '20px', textAlign: 'center' }}>Loading operations...</div>;

    return (
        <>
            <label className="content-header">Operations & Order History</label>
            <div style={{ padding: '20px' }}>
                <div style={{
                    backgroundColor: '#fff',
                    borderRadius: '12px',
                    padding: '20px',
                    boxShadow: '0 2px 10px rgba(0,0,0,0.05)'
                }}>
                    <h5 style={{ marginBottom: '20px', color: '#2e7d32' }}>Recent P2P Listings</h5>

                    {orders.length === 0 ? (
                        <div style={{ textAlign: 'center', padding: '40px', color: '#666' }}>
                            <i className="bi bi-cart-x" style={{ fontSize: '48px' }}></i>
                            <p style={{ marginTop: '10px' }}>No orders found. List your crops in the "Sell" section!</p>
                        </div>
                    ) : (
                        <div className="table-responsive">
                            <table className="table table-hover">
                                <thead style={{ backgroundColor: '#f8f9fa' }}>
                                    <tr>
                                        <th>Crop Name</th>
                                        <th>Quantity</th>
                                        <th>Price/Unit</th>
                                        <th>Total Value</th>
                                        <th>Status</th>
                                        <th>Action</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {orders.map((order) => (
                                        <tr key={order._id}>
                                            <td style={{ fontWeight: 'bold' }}>{order.crop_name}</td>
                                            <td>{order.quantity}</td>
                                            <td>Rs {order.amount}</td>
                                            <td>Rs {order.total}</td>
                                            <td>
                                                <span className={`badge ${order.status ? 'bg-success' : 'bg-warning text-dark'}`} style={{ padding: '8px 12px' }}>
                                                    {order.status ? 'AVAILABLE' : 'PENDING'}
                                                </span>
                                            </td>
                                            <td>
                                                <button
                                                    onClick={() => toggleStatus(order._id)}
                                                    className="btn btn-sm btn-outline-success"
                                                >
                                                    Toggle Status
                                                </button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    )}
                </div>
            </div>
            <ToastContainer />
        </>
    );
};

export default Operations;