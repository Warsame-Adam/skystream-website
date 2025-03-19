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

// Fetch locations
export const getLocations = async () => {
  try {
    const res = await axiosInstance.get("/locations/");
    return handleApiResponse(res);
  } catch (error) {
    return handleApiError(error);
  }
};

// Fetch airlines
export const getAirlines = async () => {
  try {
    const res = await axiosInstance.get("/airlines/");
    return handleApiResponse(res);
  } catch (error) {
    return handleApiError(error);
  }
};

//fetch airports
export const getAirports = async () => {
  try {
    const res = await axiosInstance.get("/airports/");
    return handleApiResponse(res);
  } catch (error) {
    return handleApiError(error);
  }
};

// Fetch flight classes
export const getFlightClasses = async () => {
  try {
    const res = await axiosInstance.get("/flightsClasses/");
    return handleApiResponse(res);
  } catch (error) {
    return handleApiError(error);
  }
};

// Fetch flights with filters
export const getFlights = async (filters) => {
  try {
    const res = await axiosInstance.get("/flights/search", { params: filters });
    return handleApiResponse(res);
  } catch (error) {
    return handleApiError(error);
  }
};

export const getMyFavFlights = async (userToken) => {
  try {
    const res = await axiosInstance.get("/flights/favoriteFlights", {
      headers: {
        Authorization: `Bearer ${userToken}`,
      },
    });
    return handleApiResponse(res);
  } catch (error) {
    return handleApiError(error);
  }
};
export const showInterest = async (flightId) => {
  try {
    const res = await axiosInstance.post(`/flights/showInterest/${flightId}`);
    return handleApiResponse(res);
  } catch (error) {
    return handleApiError(error);
  }
};
