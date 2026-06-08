import { useState } from "react";
import { createAssets } from "../api/assetsApi";
import "./AddAssets.css";

function AddAssets({ onClose,  onSuccess }) {

  const [form, setForm] = useState({
    assetName: "",
    category: "",
    purchaseValue: "",
    currentValue: "",
    annualYield: "",
    purchaseDate: "",
    familyMemberId: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  function handleChange(e) {
    const name = e.target.name;
    const value = e.target.value;

    setForm({...form,[name]: value});
  }



  async function handleSubmit() {

    setError("");

    if (
      form.assetName === "" ||
      form.category === "" ||
      form.purchaseValue === "" ||
      form.currentValue === "" ||
      form.familyMemberId === ""
    ) {
      setError("Please fill all required fields");
      return;
    }
    try {
      setLoading(true);
      await createAssets(form);
      if (onSuccess) {
        onSuccess();
      }
      onClose();
    } catch (error) {

      if (error.response && error.response.data.message) {
        setError(error.response.data.message);
      } else {
        setError("Failed to create asset");
      }
    } finally {
      setLoading(false);
    }
  }



  return (
    <div className="modal-overlay" onClick={onClose}>

      <div
        className="modal-box"
        onClick={(e) => e.stopPropagation()}
      >

        <div className="modal-header">
          <h2>Add New Asset</h2>

          <button
            className="modal-close"
            onClick={onClose}
          >
            ✕
          </button>
        </div>



        <div className="modal-body">

          <div className="form-group">
            <label>Asset Name *</label>

            <input
              type="text"
              name="assetName"
              placeholder="Enter asset name"
              value={form.assetName}
              onChange={handleChange}
            />
          </div>



          <div className="form-row">

            <div className="form-group">
              <label>Category *</label>

              <select
                name="category"
                value={form.category}
                onChange={handleChange}
              >
                <option value="">Select Category</option>
                <option value="REAL ESTATE">Real Estate</option>
                <option value="LIQUID">Liquid</option>
                <option value="INVESTMENT">Investment</option>
              </select>
            </div>



            <div className="form-group">
              <label>Family Member ID *</label>

              <input
                type="number"
                name="familyMemberId"
                placeholder="Enter member id"
                value={form.familyMemberId}
                onChange={handleChange}
              />
            </div>

          </div>



          <div className="form-row">

            <div className="form-group">
              <label>Purchase Value *</label>

              <input
                type="number"
                name="purchaseValue"
                placeholder="Enter purchase value"
                value={form.purchaseValue}
                onChange={handleChange}
              />
            </div>



            <div className="form-group">
              <label>Current Value *</label>

              <input
                type="number"
                name="currentValue"
                placeholder="Enter current value"
                value={form.currentValue}
                onChange={handleChange}
              />
            </div>

          </div>



          <div className="form-row">

            <div className="form-group">
              <label>Annual Yield</label>

              <input
                type="number"
                name="annualYield"
                placeholder="Enter annual yield"
                value={form.annualYield}
                onChange={handleChange}
              />
            </div>



            <div className="form-group">
              <label>Purchase Date</label>

              <input
                type="date"
                name="purchaseDate"
                value={form.purchaseDate}
                onChange={handleChange}
              />
            </div>

          </div>



          {error && (
            <p className="form-error">
              {error}
            </p>
          )}

        </div>



        <div className="modal-footer">

          <button
            className="btn-cancel"
            onClick={onClose}
          >
            Cancel
          </button>



          <button
            className="btn-submit"
            onClick={handleSubmit}
            disabled={loading}
          >
            {loading ? "Creating..." : "Add Asset"}
          </button>

        </div>

      </div>

    </div>
  );
}

export default AddAssets;

