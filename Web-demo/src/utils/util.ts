import request from "./request";
import { AxiosRequestConfig } from "axios";
let promise: null | Promise<any>;

interface CustomRequestConfig extends AxiosRequestConfig {
  __is_refresh_token: boolean;
}
export const refreshToken = async () => {
  if (promise) {
    return promise;
  }
  promise = new Promise(async (resolve) => {
    console.log('刷新token', localStorage.getItem("y_r_t"));
    const resp: any = await request.get("/refresh_token", {
      headers: {
        Authorization: localStorage.getItem("y_r_t"),
      },
      __is_refresh_token: true,
    } as CustomRequestConfig);
    console.log("resp", resp);
    localStorage.setItem("y_t", resp.token);
    resolve(resp.code == 200);
  });
  promise.finally(() => {
    promise = null;
  });
  return promise;
};

export const isRefreshToken = (config: CustomRequestConfig) => {
  console.log("config.__is_refresh_token", !config.__is_refresh_token);

  return !config.__is_refresh_token;
};
