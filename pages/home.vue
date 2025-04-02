<template>
	<view style="">
		<!-- 3D 模型区域 -->
		<canvas style="padding: 10px; margin:0 auto;" id="container" type="webgl">
			<model style="border-radius: 10px;" />
		</canvas>

		<!-- 卡片区域 -->
		<scroll-view class="card-container">
			<view class="content">
				<view class="card">
					<p>当前电量</p>
					<div class="text_my">85%</div>
					<image style="width: 50px;height: 50px;" src="../static/dian.png" class="battery-icon"></image>
				</view>
				<view class="card">
					<p>续航里程</p>
					<div class="text_my">355KM</div>
					<image style="width: 50px;height: 50px;" src="../static/xvhang.png" class="car-icon"></image>
				</view>
				<view class="card">
					<p>胎压状况</p>
					<div class="text_my">正常</div>

					<image style="width: 50px;height: 50px;" src="../static/chelun.png" class="battery-icon"></image>
				</view>
				<view class="card">
					<p>型号</p>
					<div class="text_my">BYD</div>

					<image style="width: 50px;height: 50px;" src="../static/car.png" class="battery-icon"></image>
				</view>
			</view>
		</scroll-view>
	</view>
</template>

<script>
import model from "./index/model.vue"
import speechMethods from './utils/speechModule.js';
import Nav from '@/components/Nav.vue'

export default {
	onTabItemTap(item) {
		uni.$emit("tabChanged", item);
	},
	data() {
		return {
			right2: false,
			right1: false,
			left1: false,
			left2: false,
			responseData: '',
		};
	},
	mounted() {
		speechMethods.connectWebSocket();
	},
	components: {
		model: model,
		Nav
	},
	methods: {}
};
</script>

<style lang="scss" scoped>
/* 3D 模型区域的样式 */

#container {
	width: 100%;
	height: 400px;
}

.text_my {
	font-weight: bold;
}

/* 卡片容器样式 */
.card-container {
	height: 300px;
	overflow: hidden;
}

/* 卡片行样式 */
.card-row {
	padding-left: 10px;
	padding-right: 10px;
	display: flex;
	justify-content: space-between;
	margin-top: 10px;
	height: 50%;
}

.container {
	display: flex;
	flex-direction: column;
	height: calc(100vh - 95px);
	background-color: #f5f5f5;
}

.content{
	display: grid;
	gap: 15px;
	padding: 20px;
	grid-template-columns: repeat(2,1fr);
}

/* 卡片样式 */
.card {
	height: fit-content;
	padding: 10px;
	border: 1px solid #ccc;
	border-radius: 10px;
	text-align: center;
	box-sizing: border-box;
	line-height: 25px;
}

/* 电量信息卡片中电池图标样式 */
.card:nth-child(1).battery-icon {
	width: 30px;
	height: 30px;
	vertical-align: middle;
	margin-left: 10px;
}

/* 续航里程卡片中汽车图标样式 */
.card:nth-child(2).car-icon {
	width: 30px;
	height: 30px;
	vertical-align: middle;
	margin-left: 10px;
}

/* 其他信息 1 卡片中样式 */
.card:nth-child(3) h3 {
	font-size: 20px;
	font-weight: bold;
	margin-bottom: 10px;
}

/* 其他信息 2 卡片中指示灯图标样式 */
.card:nth-child(4).indicator-icon {
	width: 40px;
	height: 40px;
	margin-bottom: 10px;
}
</style>