import pathToRegexp from 'path-to-regexp'
const NodeRSA = require('node-rsa')

// 判断是否是开发模式
const MODEL = process.env.NODE_ENV === 'development'
// const HOST = model ? 'http://192.168.1.65:9000' : 'http://rrnyy.cn:9000'
const HOST = 'http://192.168.1.65:9000'

/**
 * @param {String} key 要获取的key
 * @param {*} defaultValue 如果没有值返回的默认值
 */
export const getSessionKey = (key, defaultValue) => {
    const item = window.sessionStorage.getItem(key)
    if (item == null && defaultValue !== undefined) {
        return defaultValue
    }
    return item
}

/**
 * 获取URL 域名 + 端口
 */
export const getBaseUrl = url => {
    var reg = /^((\w+):\/\/([^/:]*)(?::(\d+))?)(.*)/
    reg.exec(url)
    return RegExp.$1
}

export const keyMirror = obj => {
    let key
    let mirrored = {}
    if (obj && typeof obj === 'object') {
        for (key in obj) {
            if ({}.hasOwnProperty.call(obj, key)) {
                mirrored[key] = key
            }
        }
    }
    return mirrored
}

/**
 * 数组格式转树状结构
 * @param   {Array}     array
 * @param   {String}    id
 * @param   {String}    pid
 * @param   {String}    children
 * @return  {Array}
 */
export const arrayToTree = (
    array,
    id = 'id',
    pid = 'pid',
    children = 'children'
) => {
    let data = array.map(item => ({ ...item }))
    let result = []
    let hash = {}
    data.forEach((item, index) => {
        hash[data[index][id]] = data[index]
    })

    data.forEach(item => {
        let hashVP = hash[item[pid]]
        if (hashVP) {
            !hashVP[children] && (hashVP[children] = [])
            hashVP[children].push(item)
        } else {
            result.push(item)
        }
    })
    return result
}

// 想办法优化下这种查找方式
export function getCurrentMenu(location, arrayMenu) {
    if (arrayMenu) {
        let current = []
        for (let i = 0; i < arrayMenu.length; i++) {
            const e = arrayMenu[i]
            const child = getCurrentMenu(location, e.children)
            if (!!child && child.length > 0) {
                child.push({ ...e, children: null })
                return child
            }
            if (e.href && pathToRegexp(e.href).exec(location)) {
                current.push({ ...e, children: null })
                return current
            }
        }
        return current
    }
    return null
}

const publicKey =
    '-----BEGIN PUBLIC KEY-----' +
    'MFwwDQYJKoZIhvcNAQEBBQADSwAwSAJBAIxn+zxdOETdkFuaEf9ZQHxLc9c/7V+gjPlkmABFdBKeeLr0782yGe2MoTPVdmuzBpVgDDUK7sP/WHuM9Ki1/zUCAwEAAQ==' +
    '-----END PUBLIC KEY-----'

export const encryptData = data => {
    var key = new NodeRSA()
    key.importKey(publicKey, 'public')
    key.setOptions({ encryptionScheme: 'pkcs1' })
    var result = key.encrypt(JSON.stringify(data), 'base64')
    return result
}

// 获取审核颜色
export const getColorClass = str => {
    switch (str) {
        case 'approved':
            return 'text-success'
        case '正在直播':
            return 'text-success'
        case 'rejected':
            return 'text-danger'
        case '点击查看':
            return 'text-danger cursor-pointer'
        case '审核中':
            return 'text-warning'
        case '未直播':
            return 'text-warning'
        case '重审':
            return 'cursor-pointer'
        case 'pending':
            return 'text-warning'
        case '待处理':
            return 'text-danger'
        case '已处理':
            return 'text-success'
        case '已完成':
            return 'text-info'
        case '处理中':
            return 'text-warning'
        case 'banned':
            return 'text-danger'
        case 'living':
            return 'text-success'
        case 'paused':
            return 'text-warning'
        case 'lose':
            return 'text-lose'
        case 'ACTIVE':
            return 'text-success'
        case 'OFFLINE':
            return 'text-danger'
        case 'unbind':
            return 'text-warning'
        case 'bind':
            return 'text-info'
        case '增加':
            return 'text-danger'
        case '减少':
            return 'text-warning'
        case '加积分':
            return 'text-danger'
        case '支付失败':
            return 'text-danger'
        case '购买积分':
            return 'text-danger'
        case '减积分':
            return 'text-warning'
        case '等待支付':
            return 'text-warning'
        case '冻结':
            return 'text-primary'
        case '恢复':
            return 'text-success'
        case '支付成功':
            return 'text-success'
        case 'pay_success':
            return 'text-success'
        case 'pay_failed':
            return 'text-danger'
        case 'pay_waiting':
            return 'text-warning'
        case '正常':
            return 'text-success'
        default:
            return ''
    }
}

// 状态码对应的文档
export const getStatusStr = str => {
    switch (str) {
        case 'approved':
            return '通过'
        case 'pending':
            return '待审核'
        case 'PENDING':
            return '待处理'
        case 'IN_PROGRESS':
            return '已处理'
        case 'FINISHED':
            return '已处理'
        case 'rejected':
            return '未通过'
        case 'bug':
            return '操作错误'
        case 'advice':
            return '体验建议'
        case 'other':
            return '其它'
        case 'living':
            return '直播中'
        case 'banned':
            return '禁播'
        case 'paused':
            return '暂停直播'
        case 'lose':
            return '余额不足停播'
        case 'ACTIVE':
            return '在线'
        case 'OFFLINE':
            return '离线'
        case 'bind':
            return '已绑定'
        case 'unbind':
            return '已解绑'
        default:
            return str
    }
}

// 序列化日期
/**
 * @param 获取当前日期的时间戳返回对应日期
 * @param {Number | String}
 * @param {Number} 1 => "2017-09-08 09:25:21"
 * @param {Number} 2 => "2017-09-08"
 * @prarm {String} year  获取当前年份
 * @prarm {String} month  获取当前月份
 * @prarm {String} day  获取当前几号
 * */
export const formatDate = option => {
    option = option || {}
    option.time = option.time || '/'
    option.type = option.type || ''
    // 为什么转成时间戳 因为ios - 的时间格式会报错 由于日期格式不统一 先new一下
    option.time = Date.parse(new Date(option.time))
    if (isNaN(option.time)) {
        return '/'
    }
    let date = new Date(option.time)
    let year = date.getFullYear()
    let month = date.getMonth() + 1
    let day = date.getDate()
    let hour = date.getHours()
    let minute = date.getMinutes()
    let second = date.getSeconds()
    month < 10 ? (month = '0' + month) : (month = month.toString())
    day < 10 ? (day = '0' + day) : (day = day.toString())
    hour < 10 ? (hour = '0' + hour) : (hour = hour.toString())
    minute < 10 ? (minute = '0' + minute) : (minute = minute.toString())
    second < 10 ? (second = '0' + second) : (second = second.toString())
    switch (option.type) {
        case 1:
            var time =
                year +
                '-' +
                month +
                '-' +
                day +
                ' ' +
                hour +
                ':' +
                minute +
                ':' +
                second
            return time
        case 2:
            return year + '-' + month + '-' + day
        case 3:
            return {
                date: year + '-' + month + '-' + day,
                hour,
                minute
            }
        case 'year':
            return year
        case 'month':
            return month
        case 'day':
            return day
        default:
            return ''
    }
}

/**
 *
 * @param {String | Number} id
 * 如果id的类型是string或者是number  返回true 不是就返回false
 */
export const isId = id => {
    // 字符串

    if (typeof id === 'string') {
        if (id === '' || /\s+/g.test(id)) {
            return false
        }
        if (id.length > 0) {
            return true
        }
        if (!isNaN(id)) {
            return true
        }
        // 数字
    } else if (typeof id === 'number') {
        if (!isNaN(id)) {
            return true
        }
    }
    return false
}

/**
 * 过滤字符串
 * 现在只过滤 < >
 * @param {String}   str 要过滤的字符串
 */
export const filterStr = str => {
    if (typeof str === 'string') {
        return str.replace(/>|</g, '')
    } else {
        return str
    }
}

/**
 * 确认弹框的二次封装
 * @param {Object}   options
 * @param {Object}   options.$this Vue当前组件的this对象 必传
 * @param {String}   options.title 弹窗的title文字
 * @param {String}   options.msg   弹窗的详细描述文字
 * @param {String}   options.type  弹窗的提示类型
 * @param {Function} options.suc   弹窗的成功回调函数 使用箭头函数 this就是当前vue组件
 * @param {Function} options.err   弹窗的取消回调函数 使用箭头函数 this就是当前vue组件
 */
export const ht_confirm = options => {
    let defaults = {
        $this: null,
        title: '提示',
        msg: '是否确定删除？',
        type: 'info',
        suc: function() {},
        err: function() {}
    }
    let result = Object.assign(defaults, options)
    result.$this
        .$confirm(result.msg, result.title, {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: result.type
        })
        .then(() => {
            result.suc()
        })
        .catch(err => {
            result.err(err)
        })
}

// 获取图片地址
export const getImg = (fileId, md5Key) => {
    if (MODEL) {
        return HOST + '/File/download?fileId=' + fileId + '&md5Key=' + md5Key
    } else {
        return '/File/download?fileId=' + fileId + '&md5Key=' + md5Key
    }
}

// 图片出错显示的图片
export const getNoImg = () => {
    return 'data:image/png;base64,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'
}

/**
 * 获取公司名称
 * 第一个数组是公司数据的数组
 * 第二个是公司的id
 */
export const getCompanyName = (arr, id) => {
    let obj = arr.find(v => {
        return Number(v.id) === Number(id)
    })
    return obj && obj.companyName ? obj.companyName : ''
}

/**
 * 触发resize事件
 */
export const triggerResize = () => {
    if (document.createEvent) {
        var event = document.createEvent('HTMLEvents')
        event.initEvent('resize', true, true)
        window.dispatchEvent(event)
    } else if (document.createEventObject) {
        window.fireEvent('onresize')
    }
}

/**
 * bytes转其他单位
 * @param {Number} bytes
 */
export const bytesToSize = bytes => {
    if (bytes === 0) return '0 B'
    let k = 1000 // or 1024
    let sizes = ['B', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB']
    let i = Math.floor(Math.log(bytes) / Math.log(k))
    return (bytes / Math.pow(k, i)).toPrecision(3) + ' ' + sizes[i]
}
/**
 * 打乱数组
 * @param {Array} arr 要被打乱的数组
 */
export const randomArr = arr => {
    function randomsort() {
        return Math.random() > 0.5 ? -1 : 1
        // 用Math.random()函数生成0~1之间的随机数与0.5比较，返回-1或1
    }
    let newArr = arr.sort(randomsort)
    return newArr
}

// 数字字母下划线
export const passReg = /^\w{6,16}$/
export const mobileReg = /^1\d{10}$/

/**
 * 相当于JQ的trigger 触发事件
 * @param {Object} el dom对象
 * @param {String} event 触发的事件
 */
export const trigger = (el, event) => {
    if (document.all) {
        el.event()
    } else {
        const evt = document.createEvent('Events') // 还有onchange则是HtmlEvents
        evt.initEvent(event, true, true)
        el.dispatchEvent(evt)
    }
}

/**
 * 下载传入的文件流
 * @param { Blob } blob 文件流
 * @param { String } file_name 生成的文件名称 例如 xxx.jpg xxx.txt
 */
export const download_blob = (blob, file_name) => {
    return new Promise((resolve, reject) => {
        try {
            const BLOB = new Blob([blob])
            if ('download' in document.createElement('a')) {
                // 非IE下载
                const elink = document.createElement('a')
                elink.download = file_name
                elink.style.display = 'none'
                elink.href = URL.createObjectURL(BLOB)
                document.body.appendChild(elink)
                elink.click()
                // trigger 不触发下载 trigger( elink, 'click' )
                // 删除引用 释放URL 对象
                URL.revokeObjectURL(elink.href)
                document.body.removeChild(elink)
                // IE10+下载
            } else {
                navigator.msSaveBlob(BLOB, file_name)
            }
            resolve({
                status: 'success',
                content: ''
            })
        } catch (error) {
            reject(error)
        }
    })
}

/**
 *
 */
export const dataURLtoBlob = dataurl => {
    let arr = dataurl.split(',')
    let mime = arr[0].match(/:(.*?);/)[1]
    let bstr = atob(arr[1])
    let n = bstr.length
    let u8arr = new Uint8Array(n)
    while (n--) {
        u8arr[n] = bstr.charCodeAt(n)
    }
    return new Blob([u8arr], { type: mime })
}

/**
 * 获取页面滚动高度
 */
export const getScrollTop = function() {
    let scrollTop = 0
    if (document.documentElement && document.documentElement.scrollTop) {
        scrollTop = document.documentElement.scrollTop
    } else if (document.body) {
        scrollTop = document.body.scrollTop
    }
    return scrollTop
}

/**
 *
 * @param {String} str 日期对象 针对IE IOS不兼容--格式的日期 时区没统一 现在后台改成时间戳了 不需要此方法了
 */
export const getSpecialIeDate = str => {
    // return typeof str === "string"
    //     ? str.substring(0, 10).replace(/-/g, "/") + " " + str.substring(11, 19)
    //     : str;
    return str
}

/**
 * 异步加载百度地图
 * @param {String} ak 地图的ak值
 */
export const loadBDMap = ak => {
    return new Promise(function(resolve, reject) {
        window.init = function() {
            // resolve(BMap)
        }
        var script = document.createElement('script')
        script.type = 'text/javascript'
        script.src =
            'http://api.map.baidu.com/api?v=3.0&ak=' + ak + '&callback=init'
        script.onerror = reject(new Error())
        document.head.appendChild(script)
    })
}

/**
 * 匀速动画
 * @param {Object} options 传入的对象
 * @param {Object} options.el 传入的dom对象
 * @param {Number} options.Sx 要沿着X轴移动的距离
 * @param {Number} options.Sy 要沿着Y轴移动的距离
 * @param {Number} options.time 移动时间
 */
export const uniformSpeed = function(options) {
    function UniformSpeed(option) {
        if (!(this instanceof UniformSpeed)) {
            return new UniformSpeed(option)
        }
        option = option || {}
        option.el = option.el || undefined
        option.Sx = option.Sx || 0
        option.Sy = option.Sy || 0
        option.time = option.time || 1
        if (!option.el) {
            throw new Error('缺少dom对象!')
        }
        this.el = option.el
        this.Sx = option.Sx
        this.Sy = option.Sy
        this.Vx = 0
        this.Vy = 0
        this.time = option.time
        this.timeX = null
        this.timeY = null
        this.frame = 16.7

        this._init()
    }
    UniformSpeed.prototype = {
        contructor: UniformSpeed,
        _init: function() {
            this._getV()
            this._moveX()
            this._moveY()
        },
        _getV: function() {
            this.Vx = this.Sx / (this.time * 1000)
            this.Vy = this.Sy / (this.time * 1000)
        },
        _moveX: function() {
            const onceMove = this.frame * this.Vx
            let nowS = 0
            let _this = this
            clearInterval(this.timeX)
            this.timeX = setInterval(function() {
                nowS = nowS + onceMove
                _this.el.style.left = ~~nowS + 'px'
                if (nowS >= _this.Sx) {
                    clearInterval(_this.timeX)
                }
            }, this.frame)
        },
        _moveY: function() {
            const onceMove = this.frame * this.Vy
            let nowS = 0
            let _this = this
            clearInterval(this.timeY)
            this.timeY = setInterval(function() {
                nowS = nowS + onceMove
                _this.el.style.top = ~~nowS + 'px'
                if (nowS >= _this.Sy) {
                    clearInterval(_this.timeY)
                }
            }, this.frame)
        }
    }
    var speed = new UniformSpeed(options)
    return speed
}

/**
 * 时间戳转多少时间
 * @param {Date} 日期时间戳
 */
export const time2Long = date => {
    // 传入时间戳
    if (isNaN(date)) {
        return '/'
    }
    // 1 - 1000 毫秒
    if (date >= 1 && date < 1000) {
        return `${date} 毫秒`
        // 1-59s  1000 - 59999
    } else if (date >= 1000 && date < 60000) {
        return `${Math.round(date / 1000)} 秒`
        // 1-59.99分 1*60s*1000  59.99*60*1000 3599400  3600000
    } else if (date >= 60000 && date < 3600000) {
        return `${Math.round(date / 60000)} 分钟`
        // 24小时 一小时3600000毫秒 86400000
    } else if (date >= 3600000 && date < 86400000) {
        return `${Math.round(date / 3600000)} 小时`
    } else if (date >= 86400000) {
        return `${Math.round(date / 86400000)} 天`
    }
}

export const msgTypes = {
    /**
     * 缺少关键信息，请稍后再试！
     * @type {lose}
     */
    saveSuc: '保存成功！',
    /**
     * 缺少关键信息，请稍后再试！
     * @type {lose}
     */
    lose: '缺少关键信息，请稍后再试！',
    /**
     * 修改成功！
     * @type {edit}
     */
    edit: '修改成功！',
    /**
     * 充值成功！
     * @type {rechange}
     */
    rechange: '充值成功！',
    /**
     * 提交审核成功！
     * @type {add2check}
     */
    add2check: '提交审核成功！',
    /**
     * 提交成功！
     * @type {add}
     */
    add: '提交成功！',
    /**
     * 删除成功！
     * @type {deleteSuc}
     */
    deleteSuc: '删除成功！',
    /**
     * 操作成功！
     * @type {operation}
     */
    operation: '操作成功！',
    /**
     * 赠送成功！
     * @type {given}
     */
    given: '赠送成功！'
}

/**
 * 固定的三种不可添加和编辑的角色
 */

export const freezeRoleList = [
    'superAdministrator',
    'normalAdministrator',
    'gatewayOperator'
]

// 子路由匹配父路由而高亮
// 匹配的正则 /^\/[^\/]+(\/[^\/]+\/)?/
// 这里只针对三级路由 无法匹配高亮父路由的情况
export const formatRouterPath = fullpath => {
    let path = fullpath
    if (path.indexOf('/file/upload') > -1) {
        return '/file/fileList'
    }
    if (path.indexOf('/camera/') > -1) {
        return '/camera/list'
    }
    if (path.indexOf('/gatewayFirmwareAdd') > -1) {
        return '/file/gatewayFirmwareList'
    }
    if (path.indexOf('/firmwareVersionAdd') > -1) {
        return '/file/firmwareVersionList'
    }
    if (path.indexOf('/LockFirmwareAdd') > -1) {
        return '/file/lockFirmwareList'
    }
    if (path.indexOf('/sys/userAddForUser') > -1) {
        return '/sys/userListForUser'
    }
    if (path.indexOf('/company/') > -1) {
        return '/company/list'
    }
    if (path === '/sys/server/resource') {
        return '/sys/server/resource'
    }
    if (/^\/log\/(?!apiLog|exceptionPush)/.test(path)) {
        return '/log/terminal'
    }
    const reg = /^\/[^/]+\/[^/]+(?=\/)/
    const parentPathArr = path.match(reg)
    Array.isArray(parentPathArr) && (path = parentPathArr[0])
    return path
}
