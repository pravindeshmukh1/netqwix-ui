import { axiosInstance } from "../../config/axios-interceptor";

export const myClips = async (payload) => {
  try {
    const response = await axiosInstance({
      method: "POST",
      url: `${process.env.NEXT_PUBLIC_API_BASE_URL}/common/get-clips`,
      data: payload,
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });
    return response.data;
  } catch (err) {
    throw err;
  }
};


