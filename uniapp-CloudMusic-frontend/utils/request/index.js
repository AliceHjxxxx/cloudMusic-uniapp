import Request from './request.js'

let baseUrl = 'http://localhost:3000';

// #ifdef APP-PLUS || MP-WEIXIN
baseUrl = 'http://47.92.161.176';
// #endif

const config = {
	baseUrl: baseUrl
}
// 自定义请求拦截
const reqInterceptor = async (options) => {
	uni.showLoading({
		title: '加载中...'
	})
	// _requestLog(options,'成功通过！');
	return options;
}
// 自定义响应拦截
const resInterceptor = (response, config = {}) => {

	uni.hideLoading()
	const statusCode = response.statusCode
	if (statusCode >= 200 && statusCode < 300) { //成功
		return response.data
	} else if (statusCode === 500) {
		uni.showToast({
			icon: 'error',
			title: '服务器错误'
		})
		return {
			//判断当前是否是reject
			wakaryReqToReject: true,
			msg: '服务器错误',
			res: response
		}
	} else {
		uni.showToast({
			icon: 'error',
			title: '服务器开小差了'
		})
		return {
			wakaryReqToReject: true,
			msg: response.data.msg,
			res: response
		}
	}

}

const req = new Request(config, reqInterceptor, resInterceptor)

export default req
