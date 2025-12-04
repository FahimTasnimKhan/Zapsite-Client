import axios from "axios";
import React from "react";

const axiosSecure = axios.create({
  baseURL: "http://localhost:3000",
  timeout: 5000,
  headers: { "X-Custom-Header": "foobar" },
});

const useAxioxSecure = () => {
  return axiosSecure;
};

export default useAxioxSecure;
