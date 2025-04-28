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
export const getFabCityHotels = async () => {
  try {
    const res = await axiosInstance.get("/hotels/getFabCityHotels");
    return handleApiResponse(res);
  } catch (error) {
    return handleApiError(error);
  }
};
export const getHotelsStats = async (filters) => {
  try {
    // send the filters as query‑string params
    const res = await axiosInstance.get(
      "/hotels/getHotelsStats",
      { params: filters }
    );

    /* stats endpoint payload:
         {
           success: true,
           data: { highestRatedHotel: …, average4StarPrice: … }
         }
       so we return res.data.data directly                              */
    if (res.data.success) {
      return { success: true, data: res.data.data };
    }
    return { success: false, error: res.data.error || "Something went wrong" };
  } catch (error) {
    return {
      success: false,
      error: error.response?.data?.error || error.message || "Unknown error",
    };
  }
};

export const getRecommendedHotels = async (id) => {
  try {
    const res = await axiosInstance.get(`/hotels/recommendedHotels/${id}`);
    return handleApiResponse(res);
  } catch (error) {
    return handleApiError(error);
  }
};
