<template>
	<view class="wrap">
		<view class="box">
			<view class="content">
				<view class="contentWrap">
					<img src="../../../static/手机.png" alt="" />
					<text>+86 {{ maskedPhoneNumber }}</text>
				</view>
				<view class="btnWrap">
					<view class="btn bgcolorBule">
						<text>更换手机号</text>
					</view>
					<view class="btn bgcolorWhite">
						<text>解绑手机号</text>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
export default {
	name: "phoneNumber",
	data() {
		return {
			phoneNumber: "18347156218",
		}
	},
	computed: {
		maskedPhoneNumber() {
			return this.phoneNumber.replace(/(\d{3})\d{4}(\d{4})/, '$1****$2');
		},
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