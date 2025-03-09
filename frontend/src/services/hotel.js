import axiosInstance from "../utils/axios";

// Helper function to handle API responses
const handleApiResponse = (res) => {
  if (res.data.success) {
    return { success: true, data: res.data.data.doc };
  } else {
    return { success: false, error: res.data.error || "Something went wrong" };
  }
};

// Helper function to handle errors
const handleApiError = (error) => {
  return {
    success: false,
    error: error.response?.data?.error || error.message || "Unknown error",
  };
};

export const getHotelById = async (id) => {
  try {
    const res = await axiosInstance.get(`/hotels/${id}`);
    return handleApiResponse(res);
  } catch (error) {
    return handleApiError(error);
  }
};

// Fetch flights with filters
export const getHotels = async (filters) => {
  try {
    const res = await axiosInstance.get("/hotels/search", { params: filters });
    return handleApiResponse(res);
  } catch (error) {
    return handleApiError(error);
  }
};

export const getHotelsStats = async (filters) => {
  try {
    const res = await axiosInstance.get("/hotels/getHotelsStats");
    return handleApiResponse(res);
  } catch (error) {
    return handleApiError(error);
  }
};
