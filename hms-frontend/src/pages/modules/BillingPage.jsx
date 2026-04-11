import React, { useState, useEffect } from "react";
import billingService from "../../services/billingService";
import { useAuth } from "../../context/AuthContext";

const BillingPage = () => {
    const { user } = useAuth();
    const [bills, setBills] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchBills = async () => {
            try {
                let data = [];
                if (user.role === "ADMIN") {
                    data = await billingService.getAllBills();
                } else {
                    const patientId = 1; // Placeholder
                    data = await billingService.getPatientBills(patientId);
                }
                setBills(data);
            } catch (err) {
                console.error("Failed to fetch bills", err);
            } finally {
                setLoading(false);
            }
        };
        fetchBills();
    }, [user.role]);

    const handlePayment = async (id) => {
        try {
            // Mock payment processing
            const razorpayOrderId = "order_" + Math.random().toString(36).substring(7);
            await billingService.processPayment(id, razorpayOrderId);
            setBills(bills.map(b => 
                b.id === id ? { ...b, billingStatus: "PAID", razorpayOrderId } : b
            ));
            alert("Payment successful!");
        } catch (err) {
            alert("Payment failed.");
        }
    };

    if (loading) return <div className="text-center mt-5"><div className="spinner-border text-primary"></div></div>;

    return (
        <div className="container-fluid">
            <h2 className="mb-4 fw-bold">Billing & Invoices</h2>
            <div className="card shadow-sm border-0 rounded-4 p-4">
                <div className="table-responsive">
                    <table className="table table-hover align-middle">
                        <thead className="table-light">
                            <tr>
                                <th>Bill ID</th>
                                <th>Date</th>
                                <th>Description</th>
                                <th>Amount</th>
                                <th>Status</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {bills.map((bill) => (
                                <tr key={bill.id}>
                                    <td className="fw-bold fs-6">#B-{bill.id}</td>
                                    <td>{new Date(bill.billingDate).toLocaleDateString()}</td>
                                    <td>{bill.description}</td>
                                    <td>
                                        <span className="fw-bold">${bill.amount.toFixed(2)}</span>
                                    </td>
                                    <td>
                                        <span className={`badge rounded-pill ${bill.billingStatus === "PAID" ? "bg-success" : "bg-danger"}`}>
                                            {bill.billingStatus}
                                        </span>
                                    </td>
                                    <td>
                                        {bill.billingStatus === "PENDING" && (
                                            <button 
                                                className="btn btn-sm btn-primary rounded-pill fw-bold"
                                                onClick={() => handlePayment(bill.id)}
                                            >
                                                Pay Now
                                            </button>
                                        )}
                                        {bill.billingStatus === "PAID" && (
                                            <button className="btn btn-sm btn-outline-secondary rounded-pill fw-bold disabled">
                                                Invoiced
                                            </button>
                                        )}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default BillingPage;
