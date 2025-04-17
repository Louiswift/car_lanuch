<template>
	<view class="container">
		<!-- 卡片区域 -->
		<scroll-view class="card-container">
			<view class="content">
				<view class="card" @click="toggleDoor">
					<image src="https://launcher-car-assets.vercel.app/static/chemen.png" style="width: 40px;height: 40px;" />
					<p>{{ doorStatus === 'open' ? '关闭车门' : '打开车门' }}</p>
				</view>

				<view class="card" @click="toggleTrunk">
					<image src="https://launcher-car-assets.vercel.app/static/houbeixiang.png" style="width: 40px;height: 40px;" />
					<p>{{ trunkStatus === 'open' ? '关闭后备箱' : '打开后备箱' }}</p>
				</view>

				<view class="card" @click="toggleAirConditioner">
					<image src="https://launcher-car-assets.vercel.app/static/kongtiao.png" style="width: 50px;height: 50px;" />
					<p>{{ airConditionerStatus === 'on' ? '关闭空调' : '打开空调' }}</p>
				</view>

				<view class="card" @click="toggleCenterScreen">
					<image src="https://launcher-car-assets.vercel.app/static/zhongkong.png" style="width: 35px;height: 35px;" />
					<p>{{ centerScreenStatus === 'on' ? '关闭中控屏' : '打开中控屏' }}</p>
				</view>
			</view>
		</scroll-view>
		<view @click="sendMessage(4, null)" style="width: 100%;height: 400px;"></view>
	</view>
</template>

<script>
import mqtt from 'mqtt';
import Nav from '@/components/Nav.vue'; // 引入你的 Nav 组件
export default {
	onTabItemTap(item) {
		uni.$emit("tabChanged", item);
	},
	data() {
		return {
			value6: 1,
			doorStatus: 'closed',
			trunkStatus: 'closed',
			airConditionerStatus: 'off',
			centerScreenStatus: 'off',
			client: null,
			connectionStatus: '未连接',
			message: '',
			kaijiIf: true,
		};
	},
	components: {
		Nav
	},
	methods: {
		connectMQTT() {
			const options = {
				host: 'mqtt://broker.emqx.io',
				port: 1883,
			};
			this.client = mqtt.connect("ws://broker.emqx.io:8083/mqtt");

			this.client.on('connect', () => {
				this.connectionStatus = '已连接';
				console.log('已连接');
			});

			this.client.on('error', (err) => {
				console.error('Connection 连接错误: ', err);
				this.connectionStatus = '连接错误';
			});

			// this.client.on('close', () => {
			// 	this.connectionStatus = '已断开';
			// 	console.log('Disconnected from MQTT 已断开');
			// });
		},
		// 发送消息的方法
		sendMessage(index, data) {
			// 如果 this.client 存在且已连接
			if (this.client && this.client.connected) {
				// 向指定主题发布消息，并在发布完成后执行回调函数
				this.message = {
					"carId": "20241010",
					"flag": index,
					"message": data
				};
				this.client.publish('car_launcher', JSON.stringify(this.message), (err) => {
					if (err) {
						console.error('Publish error: ', err);
					} else {
						console.log('Message sent: ', this.message);
						// 发送消息后清空输入框内容
						this.message = '';
					}
				});
			} else {
				console.error('Client not connected');
			}
		},
		toggleDoor() {
			if (this.doorStatus === 'open') {
				this.doorStatus = 'closed';
				this.sendMessage(1, '关闭车门');
			} else {
				this.doorStatus = 'open';
				this.sendMessage(1, '打开车门');
			}
		},
		toggleTrunk() {
			if (this.trunkStatus === 'open') {
				this.trunkStatus = 'closed';
				this.sendMessage(2, '关闭后备箱');
			} else {
				this.trunkStatus = 'open';
				this.sendMessage(2, '打开后备箱');
			}
		},
		toggleAirConditioner() {
			if (this.airConditionerStatus === 'on') {
				this.airConditionerStatus = 'off';
				this.sendMessage(3, '关闭空调');
			} else {
				this.airConditionerStatus = 'on';
				this.sendMessage(3, '打开空调');
			}
		},
		toggleCenterScreen() {
			if (this.kaijiIf) {
				this.kaijiIf = false;
				this.sendMessage(0, '关机');
			} else {
				this.kaijiIf = true;
				this.sendMessage(0, '开机');
			}
			this.centerScreenStatus = this.kaijiIf ? 'on' : 'off';
		},
	},
	mounted() {
		this.connectMQTT();
	},
	beforeDestroy() {
		if (this.client) {
			this.client.end();
		}
	}
};
</script>

<style lang="scss">
.container {
	display: flex;
	flex-direction: column;
	height: calc(100vh - 95px);
	background-color: #f5f5f5;
}

.content{
	padding: 20px;
	display: grid;
	gap: 15px;
	grid-template-columns: repeat(2,1fr);
}

.card-row {
	padding-left: 10px;
	padding-right: 10px;
	display: flex;
	justify-content: space-between;
	width: 94%;
	height: 150px;
}

.card {
	display: flex;
	flex-direction: column;
	text-align: center;
	align-items: center;
	justify-content: center;
	gap: 10px;
	height: 150px;
	border-radius: 15px;
	background-color: #ffffff;
	box-shadow: 0 4px 8px rgba(0, 0, 0, 0.15);
	transition: background-color 0.3s ease;

	&:hover {
		background-color: #eaeaea;
	}

	image {
		margin-right: 15px;
	}

	p {
		font-size: 18px;
		font-weight: bold;
		color: #555;
	}
}
</style>