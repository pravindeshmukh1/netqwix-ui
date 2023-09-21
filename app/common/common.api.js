import { axiosInstance } from "../../config/axios-interceptor";

export const checkSlot = async (payload) => {
  try {
    const response = await axiosInstance({
      method: "post",
      url: `${process.env.NEXT_PUBLIC_API_BASE_URL}/trainee/check-slot`,
      data: payload,
      headers: {
        "Content-Type": "application/json",
      },
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};
