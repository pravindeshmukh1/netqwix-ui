import { axiosInstance } from "../../../config/axios-interceptor";

export const getAvailability = async (payload) => {
  try {
    const res = await axiosInstance({
      method: "post",
      url: `${process.env.NEXT_PUBLIC_API_BASE_URL}/trainer/get-availability`,
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
      data: JSON.stringify(payload),
    });
    return res.data;
  } catch (err) {
    throw err;
  }
};
