import axios from "axios";
import api from "./axios";


export const getMemberProfile = async(id) => {
    const response = await api.get(`/member/${id}`);
    return response.data;
}


