import axios from "axios";
import api from "./axios";

export const loginUser = async(email,password) => {
    try {
        const response = await api.post("/login", {
            email,
            password
        })

        return response.data
    }
    catch(error) {
        console.log(error);
        throw error;
    }
}


export const registerUser = async(fullName, email,password,age,occupation,annualIncome) => {
    try{
        const response = await api.post("/register", {
            fullName,
            email,
            password,
            age,
            occupation,
            annualIncome
        });

        return response.data;
    }
    catch(error) {
        console.log(error);
        throw error;
    }
}

export const logout = async() => {
    return await api.post("/logout");
}

export const getCurrentUser = async() => {
    try {
        const response = await api.get("/me");
        return response.data;
    }
    catch(error) {
        console.log(error);
        throw error;
    }
}

