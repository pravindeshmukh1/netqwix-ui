import { axiosInstance } from "../../../config/axios-interceptor";

export const signup = async (payload) => {
  try {
    const res = await axiosInstance({
      method: "post",
      url: `${process.env.NEXT_PUBLIC_API_BASE_URL}/auth/signup`,
      data: JSON.stringify(payload),
      headers: {
        "Content-Type": "application/json",
      },
    });

    return res.data;
  } catch (err) {
    throw err;
  }
};

export const login = async (payload) => {
  try {
    const res = await axiosInstance({
      method: "post",
      url: `${process.env.NEXT_PUBLIC_API_BASE_URL}/auth/login`,
      data: JSON.stringify(payload),
      headers: {
        "Content-Type": "application/json",
      },
    });
    return res.data;
  } catch (err) {
    throw err;
  }
};
