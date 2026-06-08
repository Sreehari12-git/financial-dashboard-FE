import {Chart as ChartJS,ArcElement,Tooltip,Legend} from "chart.js";
import { useEffect, useState } from "react";
import { Pie } from "react-chartjs-2";
import { getAllocation } from "../api/assetsApi";

ChartJS.register(ArcElement,Tooltip,Legend);
const AssetAllocation = () => {
    const [allocation, setAllocation] = useState([]);

    useEffect(() => {
      fetchAllocation();
      },[])

      const fetchAllocation = async() => {
    const data = await getAllocation();
  setAllocation(data);
}

const chartData = {
  labels: allocation.map(item => item.category),
  datasets: [
    {
      data: allocation.map(item => item.percentage),
      backgroundColor: [
          "#1E8E3E",
        "#4F5BD5",
        "#F4B400"
      ]
    }
  ]
};

const options = {
    responsive: true,
    maintainAspectRatio: false,
    cutout: "70%",           
    plugins: {
        legend: {
            display: true,
            position: "bottom",
            labels: {
                usePointStyle: true,
                pointStyle: "circle",
                font: { size: 12, family: "Georgia, serif" },
                color: "#1a1208",
                padding: 16,
            }
        },
        tooltip: { enabled: true }
    }
};

return (
    <div style={{ display: "flex", flexDirection: "column", width: "260px" }}>
        <h3 style={{ fontSize: "14px", fontWeight: 700, color: "#1a1208", marginBottom: "12px" }}>
            Asset Allocation   
        </h3>
        <div style={{ height: "260px" }}>
            <Pie data={chartData} options={options} />
        </div>
    </div>
)
}

export default AssetAllocation

