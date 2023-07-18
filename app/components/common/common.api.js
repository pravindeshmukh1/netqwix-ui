import { axiosInstance } from "../../../config/axios-interceptor";
import { Utils } from "../../../utils/utils";
import { LOCAL_STORAGE_KEYS } from "../../common/constants";

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
