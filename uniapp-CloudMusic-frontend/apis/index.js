import request from '@/utils/request/index.js'

// 轮播图
export function apiGetBanner(data) {
	return request.request({
		url: '/banner',
		method: 'GET',
		data,
		authType: 'None',
	})
}

// 推荐歌单

export function apiGetRecommendSongs(data) {
	return request.request({
		url: '/personalized',
		method: 'GET',
		data,
		authType: 'None',
	})

}

// 新碟
export function apiGetTopAlbum(data) {
	return request.request({
		url: '/album/newest',
		method: 'GET',
		data,
		authType: 'None',
	})

}
// 新歌
export function apiGetTopSong(data) {
	return request.request({
		url: '/top/song',
		method: 'GET',
		data,
		authType: 'None',
	})

}

// 首页相关视频
export function apiGetRelatedVideo(data) {
	return request.request({
		url: '/related/allvideo',
		method: 'GET',
		data,
		authType: 'None',
	})

}
