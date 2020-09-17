import axios from "axios";

axios.defaults.baseURL ="http://localhost:6699";
//   process.env.NODE_ENV === "production" ? "/" : 


axios.defaults.headers.post["Content-Type"] = "application/json;charset=UTF-8";

axios.interceptors.request.use(
  (config) => {
    //在发送请求前把sessionStorage中的token写到请求头里
	let access_token = sessionStorage.getItem("access_token");
	if (access_token) {
		config.headers = {
		Authorization: `Bearer ${access_token}`,
		};
	}
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);
axios.interceptors.response.use(
  (response) => response.data,
  (error) => Promise.reject(error)
);
export default axios;