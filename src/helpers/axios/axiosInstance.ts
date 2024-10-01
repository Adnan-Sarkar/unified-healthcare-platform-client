import axios from "axios";

export type TGenericErrorResponse = {
  statusCode: number;
  message: string;
  errorMessages: TGenericErrorMessage[];
};

export type TGenericErrorMessage = {
  path: string | number;
  message: string;
};

export type TMeta = {
  page: number;
  limit: number;
  total: number;
};

export type TResponseSuccessType = {
  success: boolean;
  statusCode: number;
  message: string;
  data: any;
  meta?: TMeta | undefined;
};

const axiosInstance = axios.create();

axiosInstance.defaults.headers.post["Content-Type"] = "application/json";
axiosInstance.defaults.headers["Accept"] = "application/json";
axiosInstance.defaults.timeout = 60000;

// Add a request interceptor
axiosInstance.interceptors.request.use(
  function (config) {
    return config;
  },
  function (error) {
    return Promise.reject(error);
  }
);

// Add a response interceptor
axiosInstance.interceptors.response.use(
  // for success response
  // @ts-ignore
  function (response: any) {
    const responseObj: TResponseSuccessType = {
      success: response?.success,
      statusCode: response?.statusCode,
      message: response?.message,
      data: response?.data,
    };
    return responseObj;
  },

  // for error response
  async function (error) {
    const responseObj: TGenericErrorResponse = {
      statusCode: error?.response?.data?.statusCode || 500,
      message: error?.response?.data?.message || "Something went wrong!",
      errorMessages: error?.response?.data?.errorDetails,
    };
    return Promise.reject(responseObj);
  }
);

export default axiosInstance;
