import axios from 'axios'
import Qs from 'qs'
import router from "../router";
import {Toast} from "vant"

// 创建axios实例
let instance = axios.create({
    timeout: 0,
    baseURL: "http://test.baas.yingbei365.com/api/",
    headers: {}
});

// 添加请求拦截器
instance.interceptors.request.use(function (config) {
    Toast.loading({
        duration: 0,
        message: '请稍后...',
    });
    // 设置 token
    let token = sessionStorage.getItem("Token") || "";
    config.headers.Authorization = token;
    // 在发送请求之前做些什么
    return config;
}, function (error) {
    // 对请求错误做些什么
    return Promise.reject(error);
});

// 添加响应拦截器
instance.interceptors.response.use(function (response) {
    if (response.data.code !== 200) {
        Toast(response.data.message);
    } else {
        Toast.clear();
    }
    // 对响应数据做点什么
    return response;
}, function (error) {
    Toast.clear();
    // 422 token 过期
    let code = error.response.data.code;
    if (code === 422) {
        Toast("登陆过期");
        sessionStorage.removeItem("Token");
        router.push({path: "/login"});
    } else {
        Toast(error.response.data.message);
    }
    // 对响应错误做点什么
    return Promise.reject(error);
});

/**
 * url 请求地址
 * params/data 请求参数
 * config 请求配置（没有则不传）
 */
const get = (url, params, config) => {
    return instance.get(url, {params: params, ...config})
};

const post = (url, data, config) => {
    // 上传图片配置
    if (config && config.headers['Content-Type'] === 'multipart/form-data') {
        return instance.post(url, data, config)
    }
    return instance.post(url, Qs.stringify(data), config)
};

export default {
    get,
    post,
}
