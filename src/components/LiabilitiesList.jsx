import { useEffect, useState } from "react";
import { createLiabilities, getAllLiabilities } from "../api/liabilities";
import "./LiabilitiesList.css";

function LiabilitiesList() {
  const [liabilities, setLiabilities] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [form, setForm] = useState({
    liabilityName: "",
    category: "",
    totalAmount: "",
    remainingAmount: "",
    monthlyPayment: "",
    familyMemberId: ""
  });

  useEffect(() => {
    fetchLiabilities();
  }, []);

  async function fetchLiabilities() {
    try {
      const response = await getAllLiabilities();
      setLiabilities(response.data);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  }

  async function handleAddLiability() {
    try {
      const response = await createLiabilities(form);
      setShowModal(false);
      fetchLiabilities();
    } catch (error) {
      console.log(error);
    }
  }

  if (loading) {
    return <p className="liabilities-empty">Loading...</p>;
  }

  return (
    <div className="liabilities-container">
      <div className="liabilities-header">
        <h2>All Liabilities</h2>
        <button className="add-liability-btn" onClick={() => setShowModal(true)}>
          Add liability
        </button>
      </div>

      <div className="liabilities-table-head">
        <p>Name</p>
        <p>Category</p>
        <p>Total</p>
        <p>Remaining</p>
        <p>Member</p>
      </div>

      {liabilities.length === 0 ? (
        <p className="liabilities-empty">No liabilities found</p>
      ) : (
        liabilities.map((liability) => (
          <div className="liabilities-row" key={liability.id}>
            <h3>{liability.liabilityName}</h3>
            <span className="category-badge">{liability.category}</span>
            <span className="total-amount">₹{liability.totalAmount}</span>
            <span className="remaining-amount">₹{liability.remainingAmount}</span>
            <div className="member-cell">
              {liability.familyMember.fullName}
              <span>{liability.familyMember.relation}</span>
            </div>
          </div>
        ))
      )}

      {showModal && (
        <div className="modal-overlay">
          <div className="modal-box">
            <div className="modal-header">
              <h2>Add Liability</h2>
              <button className="modal-close" onClick={() => setShowModal(false)}>✕</button>
            </div>

            <div className="modal-body">
              <div className="form-row">
                <div className="form-group">
                  <label>Liability Name <span>*</span></label>
                  <input
                    placeholder="e.g. Home Loan"
                    value={form.liabilityName}
                    onChange={(e) => setForm({ ...form, liabilityName: e.target.value })}
                  />
                </div>
                <div className="form-group">
                  <label>Category <span>*</span></label>
                  <select value={form.category} onChange={(e) => setForm({ ...form, category: e.target.value })}>
                    <option value="">Select category</option>
                    <option value="AUTO LOAN">AUTO LOAN</option>
                    <option value="BANK LOAN">BANK LOAN</option>
                    <option value= "CREDIT CARD">CREDIT CARD</option>
                  </select>
                </div>
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label>Total Amount <span>*</span></label>
                  <input
                    placeholder="₹ 0.00"
                    value={form.totalAmount}
                    onChange={(e) => setForm({ ...form, totalAmount: e.target.value })}
                  />
                </div>
                <div className="form-group">
                  <label>Remaining Amount <span>*</span></label>
                  <input
                    placeholder="₹ 0.00"
                    value={form.remainingAmount}
                    onChange={(e) => setForm({ ...form, remainingAmount: e.target.value })}
                  />
                </div>
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label>Monthly Payment</label>
                  <input
                    placeholder="₹ 0.00"
                    value={form.monthlyPayment}
                    onChange={(e) => setForm({ ...form, monthlyPayment: e.target.value })}
                  />
                </div>
                <div className="form-group">
                  <label>Family Member ID</label>
                  <input
                    placeholder="Member ID"
                    value={form.familyMemberId}
                    onChange={(e) => setForm({ ...form, familyMemberId: e.target.value })}
                  />
                </div>
              </div>
            </div>

            <div className="modal-footer">
              <button className="btn-cancel" onClick={() => setShowModal(false)}>Cancel</button>
              <button className="btn-submit" onClick={handleAddLiability}>Add Liability</button>
            </div>
          </div>
        </div>
      )}
    </div> 
  );           
}            
export default LiabilitiesList;

