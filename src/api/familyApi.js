import axios from "axios";
import api from "./axios";

export const getFamilyTree = async() => {
    const response = await api.get("/family/family-tree");
    return response.data;
}

export const createMember = async(data) => {
    const response = await api.post("/family-members/create", data);
    return response.data
}

