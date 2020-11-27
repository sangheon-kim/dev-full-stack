import axios, { AxiosResponse } from "axios";

class Api {
  private static defaultHeaderOptions: {[key: string]: string} = {
    "Access-Control-Allow-Origin": "*",
    "content-type": "application/json",
  };
  
  protected ajax(
    method: "get" | "post" | "put" | "patch" | "delete",
    apiUrl: string,
    url: string,
    data: {[key: string]: any} = {},
    options: {[key: string]: any} = {},
    header: {[key: string]: any} = {}
  ):Promise<AxiosResponse> {
    const _options = { ...Api.defaultHeaderOptions, headers: {...header}, ...options };
    
    if (method === "get" || method === "delete") {
      let qs = Object.keys(data).length > 0 
               ? ('?' + Object.entries(data).map((entry) => entry.join('=')).join('&')) 
               : '';
      return axios[method](`${apiUrl}${url}${qs}`, _options);
    } else {
      return axios[method](`${apiUrl}${url}`, data, _options);
    }
  }
  
}

export default Api;
