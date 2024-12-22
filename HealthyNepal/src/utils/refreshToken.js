import axios from "axios";
import { server } from "./api";

export const refreshSellerToken = async () => {
    try {
        const refreshToken = localStorage.getItem("sellerRefreshToken");
        if (!refreshToken) {
            throw new Error("No refresh token found");
        }

        const { data } = await axios.post(
            `${server}/shop/refresh-token`,
            { refreshToken },
            {
                withCredentials: true,
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                }
            }
        );

        if (!data.success || !data.accessToken) {
            throw new Error("Failed to refresh token");
        }

        localStorage.setItem("sellerAccessToken", data.accessToken);
        return data.accessToken;
    } catch (error) {
        localStorage.removeItem("sellerAccessToken");
        localStorage.removeItem("sellerRefreshToken");
        throw error;
    }
};
