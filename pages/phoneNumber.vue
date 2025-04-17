<template>
	<view class="wrap">
		<view class="box">
			<view class="content">
				<view class="contentWrap">
					<img src="../../../static/email.png" alt="" />
					<text>2392228720@qq.com</text>
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
		name: "phoneNumber",
		data() {
			return {

			}
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
	}

	.btn {
		display: flex;
		align-items: center;
		justify-content: center;
		padding: 15px;
		text-align: center;
		color: red;
		border-radius: 8px;
		letter-spacing: 3px;
	}
	
	.bgcolorWhite{
		background-color: #fff;
	}
	
	.bgcolorBule{
		background-color: #0166FF;
	}

	.content {
		display: flex;
		flex-direction: column;
		gap: 10px;
	}

	.btnWrap {
		display: flex;
		flex-direction: column;
		gap: 10px;
	}
</style>