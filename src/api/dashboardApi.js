import axios from "axios";
import api from "./axios";

export const getDashboardOverview = async() => {
    const response = await api.get("/dashboard/cards");
    return response.data;
}

