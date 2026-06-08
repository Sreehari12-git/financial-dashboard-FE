import axios from "axios";
import api from "./axios";

export const getAllLiabilities = async() => {
    const response = await api.get("/liability/all");
    return response.data
}

export const createLiabilities = async(form) => {
    const response = await api.post("/liability/create", form);
    return response.data;
}

export const liabilityAllocation = async() => {
    const response = await api.get("/liability/allocation");
    return response.data;
}

