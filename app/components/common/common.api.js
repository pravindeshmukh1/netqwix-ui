import { axiosInstance } from "../../../config/axios-interceptor";
import { Utils } from "../../../utils/utils";
import { LOCAL_STORAGE_KEYS } from "../../common/constants";

export const addRating = async (payload) => {
  try {
    const res = await axiosInstance({
      method: "put",
      url: `${process.env.NEXT_PUBLIC_API_BASE_URL}/user/rating`,
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

export const getScheduledMeetingDetails = async () => {
  try {
    const response = await axiosInstance({
      method: "get",
      url: `${process.env.NEXT_PUBLIC_API_BASE_URL}/user/scheduled-meetings`,
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
        Authorization: `Bearer ${Utils.getToken(
          LOCAL_STORAGE_KEYS.ACCESS_TOKEN
        )}`,
      },
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const updateBookedSessionScheduledMeeting = async (payload) => {
  try {
    const response = await axiosInstance({
      method: "put",
      url: `${process.env.NEXT_PUBLIC_API_BASE_URL}/user/update-booked-session/${payload.id}`,
      data: payload,
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
        Authorization: `Bearer ${Utils.getToken(
          LOCAL_STORAGE_KEYS.ACCESS_TOKEN
        )}`,
      },
    });
    return response.data;
  } catch (err) {
    throw err;
  }
};
