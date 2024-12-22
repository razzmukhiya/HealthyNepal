import React, { useState } from 'react';
import '../../styles/VendorDashboard.css';

const Withdrawl = () => {
  const [amount, setAmount] = useState('');
  const [bankDetails, setBankDetails] = useState({
    accountName: '',
    accountNumber: '',
    bankName: '',
    branch: ''
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle withdrawal request here
    console.log('Withdrawal request:', { amount, bankDetails });
  };

  return (
    <div className="withdrawl-container">
      <h2>Withdrawal Management</h2>
      <div className="withdrawl-content">
        <div className="balance-section">
          <h3>Available Balance</h3>
          <p className="balance-amount">NPR 0.00</p>
        </div>

        <form onSubmit={handleSubmit} className="withdrawl-form">
          <div className="form-group">
            <label>Withdrawal Amount (NPR)</label>
            <input
              type="number"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              placeholder="Enter amount"
              min="0"
              required
            />
          </div>

          <div className="form-group">
            <label>Account Holder Name</label>
            <input
              type="text"
              value={bankDetails.accountName}
              onChange={(e) => setBankDetails({...bankDetails, accountName: e.target.value})}
              placeholder="Enter account holder name"
              required
            />
          </div>

          <div className="form-group">
            <label>Account Number</label>
            <input
              type="text"
              value={bankDetails.accountNumber}
              onChange={(e) => setBankDetails({...bankDetails, accountNumber: e.target.value})}
              placeholder="Enter account number"
              required
            />
          </div>

          <div className="form-group">
            <label>Bank Name</label>
            <input
              type="text"
              value={bankDetails.bankName}
              onChange={(e) => setBankDetails({...bankDetails, bankName: e.target.value})}
              placeholder="Enter bank name"
              required
            />
          </div>

          <div className="form-group">
            <label>Branch</label>
            <input
              type="text"
              value={bankDetails.branch}
              onChange={(e) => setBankDetails({...bankDetails, branch: e.target.value})}
              placeholder="Enter branch name"
              required
            />
          </div>

          <button type="submit" className="withdrawl-submit-btn">
            Request Withdrawal
          </button>
        </form>
      </div>
    </div>
  );
};

export default Withdrawl;
