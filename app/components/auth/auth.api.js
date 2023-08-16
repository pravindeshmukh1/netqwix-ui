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
        "Access-Control-Allow-Origin": "*",
      },
    });
    return res.data;
  } catch (err) {
    throw err;
  }
};

export const getMe = async () => {
  try {
    const res = await axiosInstance({
      method: "get",
      url: `${process.env.NEXT_PUBLIC_API_BASE_URL}/user/me`,
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });
    return res.data;
  } catch (err) {
    throw err;
  }
};

export const googleLogin = async (payload) => {
  try {
    const res = await axiosInstance({
      method: "post",
      url: `${process.env.NEXT_PUBLIC_API_BASE_URL}/auth/verify-google-login`,
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
