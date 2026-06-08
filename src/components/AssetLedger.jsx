import React, { useEffect, useState } from "react";
import { getAssets } from "../api/assetsApi";
import "./AssetLedger.css";
import AddAssets from "./AddAssets";

function AssetLedger() {
  const [assets, setAssets] = useState([]);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    fetchAssets();
  }, []);

  const fetchAssets = async () => {
    try {
      const data = await getAssets();
      setAssets(data.data);
    } catch (error) {
      console.log(error);
    }
  };

  const formatCurrency = (value) => {
    if (value >= 10000000) {
      return `$${(value / 10000000).toFixed(1)}Cr`;
    }
    if (value >= 100000) {
      return `$${(value / 100000).toFixed(1)}L`;
    }
    return `$${value.toLocaleString()}`;
  };

  return (
    <div className="ledger-container">
      <div className="ledger-header">
        <h2>Comprehensive Ledger</h2>
        <div className="ledger-actions">
          <button className="add-btn" onClick={() => setShowModal(true)}>Add Asset</button>
        </div>
      </div>

      <div className="ledger-table-head">
        <p>Asset Name</p>
        <p>Category</p>
        <p>Valuation</p>
        <p>Net Yield</p>
        <p>Member</p>
      </div>

      {assets.map((asset) => (
        <div key={asset.id} className="ledger-row">
          <div className="asset-info">
            <div>
              <h3>{asset.assetName}</h3>
            </div>
          </div>
          <div>
            <span className="category-badge">{asset.category}</span>
          </div>
          <div className="valuation">
            {formatCurrency(asset.currentValue)}
          </div>
          <div className="yield">
            {asset.annualYield || 0}%
          </div>
          <div className="member">
            {asset.familyMember.fullName}
            <span>{asset.familyMember.relation}</span>
          </div>

        </div>
      ))}
      {showModal && (
        <AddAssets
          onClose={() => setShowModal(false)}
          onSuccess={fetchAssets}   
        />
      )}

    </div>
  );
}

export default AssetLedger;

