import axios from 'axios'
import Qs from 'qs'

// 创建axios实例
let instance = axios.create({
    timeout: 0,
    baseURL: "",
    headers: {}
});

// 添加请求拦截器
axios.interceptors.request.use(function (config) {
    // 在发送请求之前做些什么
    return config;
}, function (error) {
    // 对请求错误做些什么
    return Promise.reject(error);
});

// 添加响应拦截器
axios.interceptors.response.use(function (response) {
    // 对响应数据做点什么
    return response;
}, function (error) {
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
