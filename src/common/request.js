import axios from "axios";
import config from "../config";
import mobx from '../store/mobx';
import history from "./history";
import { logout } from "./utils";

// 添加请求拦截器
axios.interceptors.request.use(
    function (config) {
        // 在发送请求之前做些什么
        console.log("request  config", config);
        mobx.showLoading();
        const token = localStorage.getItem('loginToken');
        if (token) {
            config.headers.token = token;
        }
        return config;
    },
    function (error) {
        // 对请求错误做些什么
        mobx.hideLoading();
        mobx.showError(error);
        return Promise.reject(error);
    }
);

// 添加响应拦截器
axios.interceptors.response.use(
    function (response) {
        // 2xx 范围内的状态码都会触发该函数。
        // 对响应数据做点什么
        console.log("response  config", response);
        mobx.hideLoading();
        return response;
    },
    function (error) {
        // 超出 2xx 范围的状态码都会触发该函数。
        // 对响应错误做点什么
        mobx.hideLoading();
        if (error?.response?.status === 403 || error?.response?.status === 401) {
            logout();
            history.replace("/login");
            return Promise.reject(error);
        }
        mobx.showError(error?.response?.data?.msg || error?.message);
        return Promise.reject(error);
    }
);
export function getApi(url, ...params) {
    return axios.get('/api' + url, params);
}

export function postApi(url, data, ...params) {
    return axios.post('/api' + url, data, params);
}

export function checkLogin() {
    postApi('/users/checkLogin');
}