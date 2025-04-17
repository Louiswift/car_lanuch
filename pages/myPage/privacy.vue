<template>
	<view class="container" :style="{ height: containerHeight + 'px' }">
		<view class="content">
			<scroll-view scroll-y>
				<view class="item-wrap">
					<view>
						<text class="title">1. 个人信息收集</text>
						<text class="text">
							我们在您使用本应用时，可能会收集以下信息：
							- 设备信息（设备型号、操作系统版本等）
							- 账户信息（手机号、邮箱等）
							- 使用日志（访问时间、点击操作等）
							这些信息将用于优化产品体验，提高服务质量。
						</text>
					</view>

					<view>
						<text class="title">2. 信息使用</text>
						<text class="text">
							我们收集的信息将用于：
							- 提供、维护和改进我们的服务
							- 向您发送重要通知，如版本更新、功能调整
							- 保障您的账户安全，防止欺诈行为
							我们不会向任何第三方出售或共享您的个人信息，除非征得您的同意或法律要求。
						</text>
					</view>

					<view>
						<text class="title">3. 信息保护</text>
						<text class="text">
							我们采取多种安全措施保护您的数据安全，包括但不限于：
							- 数据加密存储
							- 访问权限控制
							- 安全审计与监控
							但请注意，任何网络传输都可能存在风险，请您注意保护个人信息。
						</text>
					</view>

					<view>
						<text class="title">4. 用户权利</text>
						<text class="text">
							您享有以下权利：
							- 查询、修改您的个人信息
							- 撤回授权或删除账户信息
							- 申请数据副本
							若您对隐私政策有任何疑问或请求，请通过官方渠道联系我们。
						</text>
					</view>

					<view>
						<text class="title">5. 变更与更新</text>
						<text class="text">
							本隐私政策可能会根据业务需求或法律法规进行更新，变更后的内容将在应用内通知您。
							我们建议您定期查看本政策，以了解最新信息。
						</text>
					</view>
				</view>
			</scroll-view>
		</view>
	</view>
</template>

<script>
export default {
	data() {
		return {
			containerHeight: 0,
		}
	},
	onReady() {
		const systemInfo = uni.getSystemInfoSync();
		this.containerHeight = systemInfo.windowHeight;
	},
	methods: {
	}
}
</script>

<style scoped>
.container {
	display: flex;
	flex-direction: column;
	background-color: #f5f5f5;
}

.content {
	display: flex;
	flex-direction: column;
	gap: 20px;
	flex: 1;
	padding: 20px;
	overflow-y: auto;
}

.item-wrap {
	display: flex;
	flex-direction: column;
	gap: 20px;
}

.title {
	font-size: 18px;
	font-weight: bold;
	display: block;
	margin-bottom: 5px;
}

.text {
	font-size: 14px;
	color: #666;
}
</style>
