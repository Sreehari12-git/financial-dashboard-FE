import React, { useEffect, useState } from 'react'
import { getDashboardOverview } from '../api/dashboardApi';
import {
  IndianRupee,
  Landmark,
  ShieldCheck,
} from "lucide-react";
import "./Cards.css"

function Cards() {
    const[overview,setOverview] = useState({totalAssets: 0, totalLiabilities: 0, netWorth: 0});

    useEffect(() => {
        fetchOverview();
    }, []);

    const fetchOverview = async() => {
        try {
            const data = await getDashboardOverview();
            setOverview(data.data);
        }
        catch(error) {
            console.log(error);
        }
    };

    const formatCurrency = (value) => {
        if (value >= 10000000) {
            return `₹${(value / 10000000).toFixed(1)}Cr`;
        }

        if (value >= 100000) {
            return `₹${(value / 100000).toFixed(1)}L`;
        }

        return `$${value.toLocaleString()}`;
    };

  return (
    <div className="cards-container">

      <div className="dashboard-card green-border">
        <div className="card-header">
          <p>Total Family Assets</p>
          <IndianRupee size={20} />
        </div>

        <h1 className="green-text">
          {formatCurrency(overview.totalAssets)}
        </h1>
      </div>

      <div className="dashboard-card red-border">
        <div className="card-header">
          <p>Total Family Debt</p>
          <Landmark size={20} />
        </div>

        <h1>
          {formatCurrency(
            overview.totalLiabilities
          )}
        </h1>
      </div>

      <div className="dashboard-card blue-border">
        <div className="card-header">
          <p>Net Wealth</p>
          <ShieldCheck size={20} />
        </div>

        <h1 className="green-text">
          {formatCurrency(overview.netWorth)}
        </h1>
      </div>

    </div>
  );
}



export default Cards;

