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

export const traineeClips = async (payload) => {
  try {
    const response = await axiosInstance({
      method: "POST",
      url: `${process.env.NEXT_PUBLIC_API_BASE_URL}/common/trainee-clips`,
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


export const reports = async (payload) => {
  try {
    const response = await axiosInstance({
      method: "POST",
      url: `${process.env.NEXT_PUBLIC_API_BASE_URL}/report/get-all`,
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



export const shareClips = async (payload) => {
  try {
    const response = await axiosInstance({
      method: "POST",
      url: `${process.env.NEXT_PUBLIC_API_BASE_URL}/user/share-clips`,
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



