import axios from "axios";
import axiosRetry from "axios-retry";

const BaseRequest = axios.create({
  baseURL: "https://5wj72.mocklab.io/",
  timeout: 10000,
});

axiosRetry(BaseRequest, {
  retries: 3,
  onRetry: () => console.log("retry request"),
});

export default BaseRequest;
