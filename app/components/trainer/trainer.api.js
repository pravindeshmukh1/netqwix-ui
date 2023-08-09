import { axiosInstance } from "../../../config/axios-interceptor";

export const updateDrawing = async (payload) => {
  try {
    const response = await axiosInstance({
      method: "put",
      url: `${process.env.NEXT_PUBLIC_API_BASE_URL}/trainer/drawing`,
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