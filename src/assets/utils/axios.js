import axios from 'axios'
// import qs from 'qs'
import auth from './auth'
import { getBaseUrl } from '../common/utils'

// axios 配置
axios.defaults.timeout = 60000
// axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded;charset=UTF-8';
// axios.defaults.baseURL = 'http://localhost:8008';
axios.defaults.baseURL = getBaseUrl(window.location.href)
axios.defaults.headers.common['authUid'] = auth.getUid()
axios.defaults.headers.common['authSid'] = auth.getSid()
axios.defaults.headers.common['Authorization'] = auth.getToken()
// axios.defaults.headers.post['Content-Type'] = 'application/json';
// POST传参序列化
axios.interceptors.request.use(
    config => {
        if (config.method === 'post') {
            if (/htkj001\.oss|rryn/.test(config.url)) {
                config.headers['Content-Type'] = false
            } else {
                // config.data = qs.stringify(config.data)
                config.headers['Content-Type'] =
                    'application/x-www-form-urlencoded'
            }
        }
        // config.headers['Content-Type'] = 'multipart/form-data'
        return config
    },
    error => {
        return Promise.reject(error)
    }
)

// 返回状态判断
axios.interceptors.response.use(
    response => {
        if (response.data && response.data.code) {
            if (response.data.code === '2001') {
                auth.logout()
            }
        }
        return response
    },
    error => {
        if (error.response) {
        }
    }
)

export default axios
