<template>
	<view class="wrap">
		<view class="box">
			<view class="content">
				<view class="contentWrap">
					<img src="../../../static/email.png" alt="" />
					<text>{{ userInfo.email }}</text>
				</view>
				<view class="btnWrap">
					<view class="btn bgcolorBule">
						<text>更换邮箱</text>
					</view>
					<view class="btn bgcolorWhite">
						<text>解绑邮箱</text>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
export default {
	name: "email",
	data() {
		return {
			userInfo: {},
		}
	},
	onReady() {
		uni.getStorage({
			key: 'userInfo',
			success: (res) => {
				if (res.data.status === 200) {
					this.userInfo = res.data.message;
					console.log(this.userInfo)
				}
			},
			fail: function () {
				console.log('没有找到用户信息');
			}
		});
	},
	methods: {

	}
}
</script>

<style scoped>
.wrap {
	height: 100vh;
	padding: 20px;
	background-color: #F7F8FC;
}

.box {
	margin-top: 60px;
}

img {
	width: 60px;
}

.contentWrap {
	display: flex;
	gap: 10px;
	flex-direction: column;
	align-items: center;
	font-size: 18px;
}

.btn {
	display: flex;
	align-items: center;
	justify-content: center;
	padding: 15px;
	text-align: center;
	border-radius: 8px;
	letter-spacing: 3px;
	font-size: 14px;
}

.bgcolorWhite {
	color: #F1444F;
	font-weight: bolder;
	background-color: #fff;
}

.bgcolorBule {
	color: #fff;
	background-color: #0166FF;
}

.btnWrap {
	display: flex;
	flex-direction: column;
	gap: 20px;
}

.content {
	display: flex;
	flex-direction: column;
	gap: 20px;
}
</style>