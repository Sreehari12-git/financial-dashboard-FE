import axios from "axios";
import api from "./axios";

export const getAssets = async() => {
    const response = await api.get("/assets/all");
    return response.data;
}

export const createAssets = async(assetData) => {
    const response = await api.post("/assets/create",assetData);
    return response.data;
}

export const getAllocation = async() => {
    const response = await api.get("/assets/allocation");
    return response.data;
}

