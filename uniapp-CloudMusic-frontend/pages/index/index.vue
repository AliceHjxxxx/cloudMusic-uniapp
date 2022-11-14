<template>
	<view>
		<view class="banner">
			<swiper :indicator-dots="true" class="swiper" :autoplay="true" :interval="3000" :duration="500"
				indicator-active-color="rgba(255,255,255,0.5)" :circular="true">
				<swiper-item v-for="(item,index) in banners" :key="index">
					<view class="swiper-item">
						<!-- <img
							src="https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fhbimg.huaban.com%2F557f695d9b74a863cc533ff32ab3e381180a81291d046-z4P3he_fw658&refer=http%3A%2F%2Fhbimg.huaban.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=auto?sec=1670759387&t=11d9e94ae987cc72d46c42595938d82a"></img> -->
						<img :src="item.imageUrl" alt="">
						<view class="tag">
							{{item.typeTitle}}
						</view>
					</view>
				</swiper-item>
			</swiper>
		</view>
		<!-- 主入口 -->
		<view class="main-bar flex-box">
			<view class="flex-item" v-for="(item,index) in contentBar" :key="index">
				<!-- <image class="img" mode="" :src="'../../static/image/index/t_'+(index+1)+'.png'"></image> -->
				<image class="img" mode="" :src="`../../static/image/index/t_${index+1}.png`"></image>
				<view>
					{{item.name}}
				</view>
				<view class="date" v-if="index===0">
					{{new Date().getDate()}}
				</view>
			</view>
		</view>
		<!-- 推荐歌单 -->
		<song-list title='推荐歌单' link="/pages/songSquare/songSquare?limit=30" :list="recommendSongs"></song-list>
		<!-- 新歌推荐 -->
		<view class="song-list">
			<view class="switch-line flex-box">
				<view class="flex-box">
					<view class="switch-item" @click="swichTab(1)" :class="newType===1?'on':''">
						新碟
					</view>|
					<view class="switch-item" @click="swichTab(2)" :class="newType===2?'on':''">
						新歌
					</view>
				</view>
				<template>
					<view>
						<view class=" more" v-if="newType===1">
							更多新碟
						</view>
						<view class="more" v-if="newType===2">
							更多新歌
						</view>
					</view>
				</template>
			</view>
			<scroll-view scroll-x="true" class="scroll-view">
				<view class="item" v-for="(item,index) in latestTempAlbum" :key="index">
					<image :src="item.picUrl" mode="" class="img"></image>
					<view class="desc ellipsis">
						{{item.name}}
					</view>
					<view class="desc ellipsis c9">
						{{item.artists[0].name }}
					</view>
				</view>
			</scroll-view>
		</view>
		<!-- 精选视频 -->
		<view class="song-list video-list">
			<view class="title-bar">
				精选视频
				<view class="more fr">更多</view>
			</view>
			<view class="video-item" v-for="(item,index) in relatedVideo" :key="item.vid">
				<image :src="item.coverUrl" class="img" mode=""></image>
				<view class="desc ellipsis c9">
					{{item.title}}
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import songList from '../../components/songList.vue'
	import {
		apiGetBanner,
		apiGetRecommendSongs,
		apiGetTopAlbum,
		apiGetTopSong,
		apiGetRelatedVideo
	} from '@/apis/index.js'
	export default {
		components: {
			songList,
		},
		data() {
			return {
				recommendSongs: [],
				contentBar: [{
						name: '每日推荐',
					}, {
						name: '歌单',
					}, {
						name: '排行榜',

					}, {
						name: '电台',
					},
					{
						name: '直播',

					}
				],
				banners: [],
				newType: 1,
				latestTempAlbum: [],
				relatedVideo: []
			}
		},
		onLoad() {

			this.getBanner()
			this.getRecommendSongs()
			this.getLastAlbum()
			this.getRelatedVideo()
		},
		methods: {
			swichTab(num) {
				this.newType = num
				// 新歌
				if (num === 2) {
					this.getTopSong()
				} else {
					this.getLastAlbum()
				}

			},
			getLastAlbum() {
				apiGetTopAlbum().then((res) => {
					// console.log(res)
					this.latestTempAlbum = res.albums
				})
			},
			getTopSong() {
				apiGetTopSong({
					type: 0
				}).then(res => {
					// console.log(res)
					this.latestTempAlbum = []
					res.data.slice(0, 10).forEach(item => {
						this.latestTempAlbum.push(item.album)
					})
				})
			},
			getBanner() {
				apiGetBanner().then((res) => {
					this.banners = res.banners
				})
			},
			getRecommendSongs() {
				const params = {
					limit: 6
				}
				apiGetRecommendSongs(params).then((res) => {
					this.recommendSongs = res.result

				})
			},
			getRelatedVideo() {
				const params = {
					id: 6524
				}
				apiGetRelatedVideo(params).then(res => {
					this.relatedVideo = res.data
				})
			}
		}
	}
</script>

<style lang="scss">
	page {
		color: #1a1a1a;
		font-size: 24rpx;
	}

	.banner {
		width: 100%;
		height: 268rpx;
		margin: 30rpx auto 44rpx;

		.swiper {
			height: 268rpx;

			.swiper-item {
				position: relative;
				display: block;
				width: 686rpx;
				height: 268rpx;
				margin: 0 auto;
				border-radius: 14rpx;
				overflow: hidden;

				img {
					display: block;
					width: 100%;
					height: 100%;
				}

				.tag {
					position: absolute;
					z-index: 10;
					bottom: 0;
					right: 0;
					height: 34rpx;
					padding: 0 14rpx;
					line-height: 34rpx;
					background-color: #43a5f0;
					color: #fff;
					border-top-left-radius: 14rpx;

				}
			}
		}
	}

	.main-bar {
		padding-bottom: 22rpx;
		text-align: center;
		line-height: 70rpx;
		color: #666;
		border-bottom: 1rpx solid #e6e6e6;

		.img {
			display: block;
			margin: 0 auto;
			width: 90rpx;
			height: 90rpx;
		}

		.flex-item {
			position: relative;

			.date {
				position: absolute;
				left: 60rpx;
				top: 40rpx;
				line-height: 1;
				font-size: 24rpx;
				color: #ff392d;
				transform: scale(0.9);
				font-weight: 700;
			}
		}
	}

	.song-list {
		padding-left: 32rpx;

		.title-bar {
			font-size: 34rpx;
			font-weight: 600;
			line-height: 110rpx;
		}

		.switch-line {
			justify-content: space-between;

			.flex-box {
				line-height: 110rpx;
				width: 300rpx;

				.switch-item {
					font-weight: 600;

					&:first-child {
						padding-right: 22rpx;
					}

					&:last-child {
						padding-left: 22rpx;
					}

					&.on {
						color: #333;
						font-size: 34rpx;
					}
				}
			}
		}

		.more {
			width: 150rpx;
			height: 50rpx;
			line-height: 50rpx;
			text-align: center;
			margin-top: 30rpx;
			margin-right: 32rpx;
			color: #333;
			font-weight: 400;
			font-size: 24rpx;
			border: 2rpx solid #e6e6e6;
			border-radius: 50rpx;
		}
	}

	.scroll-view {
		width: 100%;
		white-space: nowrap;
	}

	.item {
		position: relative;
		display: inline-block;
		width: 218rpx;
		padding-bottom: 16rpx;
		margin-right: 16rpx;
		line-height: 34rpx;

		&::before {
			content: '';
			position: absolute;
			left: 0;
			top: 0;
			width: 100%;
			height: 40rpx;
			z-index: 2;
			background-image: linear-gradient(180deg, rgba(0, 0, 0, 0.2), transparent);
		}

		.img {
			display: block;
			width: 100%;
			height: 218rpx;
			margin-bottom: 16rpx;
			background-color: #eee;
			border-radius: 10rpx;
		}
	}

	.video-list {
		padding-left: 0;

		.title-bar {
			padding-left: 32rpx;
		}

		.video-item {
			width: 686rpx;
			height: 490rpx;
			margin: 0 auto;
			background: #f8f8f8;
			border-radius: 10rpx;
			overflow: hidden;
			margin-bottom: 24rpx;

			.img {
				display: block;
				width: 686rpx;
				height: 390rpx;
				background-color: #666;

			}

			.desc {
				font-size: 30rpx;
				font-weight: 600;
				line-height: 100rpx;
				padding-left: 40rpx;
			}
		}
	}

	/* #ifdef MP-WEIXIN */
	.banner {
		margin-top: 60rpx;
	}

	/* #endif */
</style>
